import {
  isZodError,
  NekoApiError,
  zodErrorToNekoApiError,
} from "@/lib/neko-api-error";
import * as partnerRepository from "../partner/repository";
import {
  CreatePartnerContactDto_to_PartnerContact,
  PartnerContactDocument_to_ListPartnerContactDto,
} from "./adapter";
import { createPartnerContactDto, updatePartnerContactDto } from "./dto";
import * as partnerContactRepository from "./repository";

import type { PartnerContact } from "./schema";

type PartnerContactRepository = typeof import("./repository");
type PartnerRepository = typeof import("../partner/repository");

export function PartnerContactServiceFactory(
  partnerContactRepository: PartnerContactRepository,
  partnerRepository: PartnerRepository
) {
  return {
    async create(payload: unknown) {
      try {
        const parsedPayload = createPartnerContactDto.parse(payload);

        const partner = await partnerRepository.findByIdAndUserId(
          parsedPayload.partner_id,
          parsedPayload.user_id
        );
        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const pc = await partnerContactRepository.create(
          CreatePartnerContactDto_to_PartnerContact(parsedPayload)
        );

        return pc.toJSON();
      } catch (error) {
        if (isZodError(error)) {
          throw zodErrorToNekoApiError(error);
        }
        throw error;
      }
    },

    async update({
      userId,
      partnerId,
      contactId,
      contactData,
    }: {
      userId: string;
      partnerId: string;
      contactId: string;
      contactData: unknown;
    }) {
      try {
        const partner = await partnerRepository.findByIdAndUserId(
          partnerId,
          userId
        );

        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const parsedPayload = updatePartnerContactDto.parse(
          contactData
        ) as PartnerContact;

        const updatedPartnerContact = await partnerContactRepository.update(
          contactId,
          parsedPayload
        );

        if (!updatedPartnerContact) {
          throw new NekoApiError(404, "Partner contact not found.");
        }

        return updatedPartnerContact.toJSON();
      } catch (error) {
        if (isZodError(error)) {
          throw zodErrorToNekoApiError(error);
        }
        throw error;
      }
    },

    async findAll({
      userId,
      partnerId,
    }: {
      userId: string;
      partnerId: string;
    }) {
      const partner = await partnerRepository.findByIdAndUserId(
        partnerId,
        userId
      );

      if (!partner) {
        throw new NekoApiError(404, "Partner not found.");
      }

      const all = await partnerContactRepository.findAll();
      const pcs = all.map(PartnerContactDocument_to_ListPartnerContactDto);

      return pcs;
    },

    async remove({
      userId,
      partnerId,
      contactId,
    }: {
      userId: string;
      partnerId: string;
      contactId: string;
    }) {
      try {
        const partner = await partnerRepository.findByIdAndUserId(
          partnerId,
          userId
        );

        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const deletedContact = await partnerContactRepository.remove(contactId);

        if (!deletedContact) {
          throw new NekoApiError(404, "Partner contact not found.");
        }

        return { message: "Partner contact deleted successfully." };
      } catch (error) {
        if (isZodError(error)) {
          throw zodErrorToNekoApiError(error);
        }
        throw error;
      }
    },

    async findOne({
      userId,
      partnerId,
      contactId,
    }: {
      userId: string;
      partnerId: string;
      contactId: string;
    }) {
      try {
        const partner = await partnerRepository.findByIdAndUserId(
          partnerId,
          userId
        );

        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const contact = await partnerContactRepository.findById(contactId);

        if (!contact) {
          throw new NekoApiError(404, "Partner contact not found.");
        }

        if (contact.partner_id.toString() !== partnerId) {
          throw new NekoApiError(403, "Forbidden: Contact does not belong to this partner.");
        }

        return contact.toJSON();
      } catch (error) {
        if (isZodError(error)) {
          throw zodErrorToNekoApiError(error);
        }
        throw error;
      }
    },
  };
}

const partnerContactService = PartnerContactServiceFactory(
  partnerContactRepository,
  partnerRepository
);
export default partnerContactService;
