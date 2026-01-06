import {
  isZodError,
  NekoApiError,
  zodErrorToNekoApiError,
} from "@/lib/neko-api-error";
import * as partnerRepository from "../partner/repository";
import { createPartnerContactDtoToPartnerContact } from "./adapter";
import { createPartnerContactDto, updatePartnerContactDto } from "./dto";
import * as partnerContactRepository from "./repository";

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
          createPartnerContactDtoToPartnerContact(parsedPayload)
        );

        const { _id, name, email, phone } = pc;

        return {
          id: _id.toString(),
          name,
          email,
          phone,
        };
      } catch (error) {
        if (isZodError(error)) {
          throw zodErrorToNekoApiError(error);
        }
        throw error;
      }
    },

    async update({
      partnerContactId,
      userId,
      payload,
    }: {
      partnerContactId: string;
      userId: string;
      payload: unknown;
    }) {
      try {
        const partnerContact = await partnerContactRepository.findById(
          partnerContactId
        );

        if (!partnerContact) {
          throw new NekoApiError(404, "Partner contact not found.");
        }

        const partnerId = partnerContact.partner_id.toString();

        const partner = await partnerRepository.findByIdAndUserId(
          partnerId,
          userId
        );

        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const parsedPayload = updatePartnerContactDto.parse(payload);

        const updatedPartnerContact = await partnerContactRepository.update(
          partnerContactId,
          parsedPayload
        );

        if (!updatedPartnerContact) {
          throw new NekoApiError(404, "Partner contact not found.");
        }

        const { _id, name, email, phone } = updatedPartnerContact;

        return {
          id: _id.toString(),
          name,
          email,
          phone,
        };
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
