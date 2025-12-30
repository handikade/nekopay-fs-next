import { ServiceError } from "@/lib/service-error";
import { type Session } from "next-auth";
import { z, ZodError } from "zod";
import {
  createPartnerDto,
  CreatePartnerDto,
  updatePartnerDto,
  UpdatePartnerDto,
} from "./dto";
import * as partnerRepository from "./repository";

// Define the shape of the repository dependency for the factory
type PartnerRepository = {
  create: typeof partnerRepository.create;
  update: typeof partnerRepository.update;
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
      // 1. Get user from session and ensure user is authenticated
      const userId = (session?.user as { id?: string })?.id;
      const userEmail = session?.user?.email;

      if (!userId || !userEmail) {
        throw new ServiceError(401, "You must be logged in to create a partner.");
      }

      try {
        // 2. Validate the incoming payload against the DTO, but exclude fields
        //    that the service is responsible for setting.
        const inputSchema = createPartnerDto.omit({
          user_id: true,
          created_by: true,
        });
        const parsedPayload = inputSchema.parse(payload);

        // 3. Combine the validated payload with the data from the session
        const completePayload: CreatePartnerDto = {
          ...parsedPayload,
          user_id: userId,
          created_by: userEmail,
        };

        // 4. Pass the complete, validated DTO to the injected repository
        const newPartner = await repo.create(completePayload);

        return newPartner;
      } catch (error) {
        if (error instanceof ZodError) {
          // Re-throw Zod validation errors as a structured ServiceError
          throw new ServiceError(400, "Invalid input data", z.treeifyError(error));
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
        throw new ServiceError(401, "You must be logged in to update a partner.");
      }

      try {
        // 2. Validate the payload
        const parsedPayload = updatePartnerDto.parse(payload);

        // 3. Pass to repository
        const updatedPartner = await repo.update(id, parsedPayload);

        if (!updatedPartner) {
          throw new ServiceError(404, "Partner not found.");
        }

        return updatedPartner;
      } catch (error) {
        if (error instanceof ZodError) {
          throw new ServiceError(400, "Invalid input data", z.treeifyError(error));
        }
        // Re-throw other errors, including the 404 from above
        throw error;
      }
    },
  };
}

// Create and export a default instance of the service for application use.
const partnerService = PartnerServiceFactory(partnerRepository);
export default partnerService;
