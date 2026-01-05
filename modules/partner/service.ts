import incrementDocNumber from "@/lib/increment-doc-number";
import { buildPaginationLinks, PaginationLinks } from "@/lib/pagination";
import { ServiceError } from "@/lib/service-error";
import { type Session } from "next-auth";
import { z, ZodError } from "zod";
import {
  adaptCreatePartnerDtoToPartner,
  adaptFindPartnersQueryDtoToSearchQuery,
  partnerToListDto,
} from "./adapter";
import {
  createPartnerDto,
  CreatePartnerDto,
  findPartnersQueryDto,
  updatePartnerDto,
} from "./dto";
import * as partnerRepository from "./repository";

// Define the shape of the repository dependency for the factory
type PartnerRepository = {
  create: typeof partnerRepository.create;
  update: typeof partnerRepository.update;
  findAll: typeof partnerRepository.findAll;
  findById: typeof partnerRepository.findById;
  deleteById: typeof partnerRepository.deleteById;
  findLatestByUserId: typeof partnerRepository.findLatestByUserId;
};

/**
 * Factory function to create a partner service.
 * @param repo - The partner repository implementation.
 * @returns An object with service methods.
 */
export function PartnerServiceFactory(repo: PartnerRepository) {
  return {
    /**
     * Creates a new partner.
     * This service function handles validation and adds session-based user data.
     * @param payload - The raw partner data from the client. Should not include `user_id` or `created_by`.
     * @param session - The user session object.
     * @returns The newly created partner document.
     * @throws {ServiceError} If the user is not authenticated or if the payload fails validation.
     */
    async create(payload: unknown, session: Session | null) {
      const userId = (session?.user as { id?: string })?.id;
      const userEmail = session?.user?.email;

      if (!userId || !userEmail) {
        throw new ServiceError(
          401,
          "You must be logged in to create a partner."
        );
      }

      try {
        const inputSchema = createPartnerDto.omit({
          user_id: true,
          created_by: true,
        });
        const parsedPayload = inputSchema.parse(payload);

        const completePayload: CreatePartnerDto = {
          ...parsedPayload,
          user_id: userId,
          created_by: userEmail,
        };

        const newPartner = await repo.create(
          adaptCreatePartnerDtoToPartner(completePayload)
        );

        return newPartner;
      } catch (error) {
        if (error instanceof ZodError) {
          // Re-throw Zod validation errors as a structured ServiceError
          throw new ServiceError(
            400,
            "Invalid input data",
            z.treeifyError(error)
          );
        }
        // Re-throw other errors
        throw error;
      }
    },

    /**
     * Updates an existing partner.
     * @param id - The ID of the partner to update.
     * @param payload - The data to update.
     * @param session - The user session object.
     * @returns The updated partner document.
     * @throws {ServiceError} If the user is not authenticated, payload is invalid, or partner is not found.
     */
    async update(id: string, payload: unknown, session: Session | null) {
      // 1. Ensure user is authenticated
      if (!session?.user) {
        throw new ServiceError(
          401,
          "You must be logged in to update a partner."
        );
      }

      try {
        const parsedPayload = updatePartnerDto.parse(payload);

        const updatedPartner = await repo.update(id, parsedPayload);

        if (!updatedPartner) {
          throw new ServiceError(404, "Partner not found.");
        }

        return updatedPartner;
      } catch (error) {
        if (error instanceof ZodError) {
          throw new ServiceError(
            400,
            "Invalid input data",
            z.treeifyError(error)
          );
        }

        throw error;
      }
    },

    /**
     * Retrieves a list of partners based on the query parameters.
     * @param query - The query parameters.
     * @param session - The user session object.
     * @returns An object containing the list of partners and the total count of records.
     * @throws {ServiceError} If the user is not authenticated, payload is invalid, or partner is not found.
     */
    async findAll(
      query: unknown,
      session: Session | null,
      config: { withPagination: boolean; baseUrl?: string } = {
        withPagination: false,
      }
    ) {
      if (!session?.user) {
        throw new ServiceError(401, "You must be logged in to view partners.");
      }

      try {
        const parsedQuery = findPartnersQueryDto.parse(query);
        const searchQuery = adaptFindPartnersQueryDtoToSearchQuery(parsedQuery);
        const { partners, total_records } = await repo.findAll(searchQuery);
        const meta = {
          total_records,
          current_page: searchQuery.page,
          items_per_page: searchQuery.limit,
          total_pages: Math.ceil(total_records / searchQuery.limit),
        };

        const response: {
          partners: ReturnType<typeof partnerToListDto>[];
          meta: typeof meta;
          links?: PaginationLinks;
        } = {
          partners: partners.map((p) => partnerToListDto(p)),
          meta,
        };

        if (config.withPagination) {
          if (!config.baseUrl) {
            // This is a server-side error, so we throw a standard Error
            throw new Error("baseUrl is required when withPagination is true.");
          }

          response.links = buildPaginationLinks({
            baseUrl: config.baseUrl,
            page: searchQuery.page,
            limit: searchQuery.limit,
            totalRecords: total_records,
            sortBy: searchQuery.sortBy,
            sortOrder: searchQuery.sortOrder,
            filters: parsedQuery,
          });
        }

        return response;
      } catch (error) {
        if (error instanceof ZodError) {
          throw new ServiceError(
            400,
            "Invalid input data",
            z.treeifyError(error)
          );
        }

        throw error;
      }
    },

    async findById(id: string, session: Session | null) {
      if (!session?.user) {
        throw new ServiceError(401, "You must be logged in to view a partner.");
      }

      const found = await repo.findById(id);

      if (!found) {
        throw new ServiceError(404, "Partner not found.");
      }

      return found;
    },

    async deleteById(id: string, session: Session | null) {
      if (!session?.user) {
        throw new ServiceError(
          401,
          "You must be logged in to delete a partner."
        );
      }

      const found = await repo.findById(id);

      if (!found) {
        throw new ServiceError(404, "Partner not found.");
      }

      return await repo.deleteById(id);
    },

    async generateNextPartnerNumber(session: Session | null) {
      const userId = (session?.user as { id?: string })?.id;
      if (!userId) {
        throw new ServiceError(401, "You must be logged in.");
      }

      const latestPartner = await repo.findLatestByUserId(userId);
      // Use 'PN' as the default prefix if no partners exist yet.
      const lastNumber = latestPartner?.partner_number || "PN";
      return incrementDocNumber(lastNumber);
    },
  };
}

const partnerService = PartnerServiceFactory(partnerRepository);
export default partnerService;
