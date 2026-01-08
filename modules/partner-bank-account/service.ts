import {
  isZodError,
  NekoApiError,
  zodErrorToNekoApiError,
} from "@/lib/neko-api-error";
import * as bankRepository from "../bank/repository";
import * as partnerRepository from "../partner/repository";
import { CreatePartnerBankAccountDto_to_PartnerBankAccount as adaptCreatePayload } from "./adapter";
import {
  createPartnerBankAccountDto,
  updatePartnerBankAccountDto,
} from "./dto";
import * as partnerBankAccountRepository from "./repository";

import type { PartnerBankAccount } from "./schema";

type PartnerBankAccountRepository = typeof import("./repository");
type PartnerRepository = typeof import("../partner/repository");
type BankRepository = typeof import("../bank/repository");

export function PartnerBankAccountServiceFactory(
  partnerBankAccountRepository: PartnerBankAccountRepository,
  partnerRepository: PartnerRepository,
  bankRepository: BankRepository
) {
  return {
    async create(payload: unknown) {
      try {
        const parsedPayload = createPartnerBankAccountDto.parse(payload);

        const partner = await partnerRepository.findByIdAndUserId(
          parsedPayload.partnerId,
          parsedPayload.userId
        );
        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const bank = await bankRepository.findById(parsedPayload.bankId);
        if (!bank) {
          throw new NekoApiError(404, "Bank not found.");
        }

        const created = await partnerBankAccountRepository.create(
          adaptCreatePayload(parsedPayload)
        );

        return created.toJSON();
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
      bankAccountId,
      bankAccountData,
    }: {
      userId: string;
      partnerId: string;
      bankAccountId: string;
      bankAccountData: unknown;
    }) {
      try {
        const partner = await partnerRepository.findByIdAndUserId(
          partnerId,
          userId
        );

        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const parsedPayload = updatePartnerBankAccountDto.parse(
          bankAccountData
        ) as Partial<PartnerBankAccount>;

        const updatedPartnerBankAccount =
          await partnerBankAccountRepository.update(
            bankAccountId,
            parsedPayload
          );

        if (!updatedPartnerBankAccount) {
          throw new NekoApiError(404, "Partner bank account not found.");
        }

        return updatedPartnerBankAccount.toJSON();
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

      const all = await partnerBankAccountRepository.findAll();
      const pcs = all.map((e) => e.toJSON());

      return pcs;
    },

    async remove({
      userId,
      partnerId,
      bankAccountId,
    }: {
      userId: string;
      partnerId: string;
      bankAccountId: string;
    }) {
      try {
        const partner = await partnerRepository.findByIdAndUserId(
          partnerId,
          userId
        );

        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const deletedBankAccount = await partnerBankAccountRepository.remove(
          bankAccountId
        );

        if (!deletedBankAccount) {
          throw new NekoApiError(404, "Partner bank account not found.");
        }

        return { message: "Partner bank account deleted successfully." };
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
      bankAccountId,
    }: {
      userId: string;
      partnerId: string;
      bankAccountId: string;
    }) {
      try {
        const partner = await partnerRepository.findByIdAndUserId(
          partnerId,
          userId
        );

        if (!partner) {
          throw new NekoApiError(404, "Partner not found.");
        }

        const bankAccount = await partnerBankAccountRepository.findById(
          bankAccountId
        );

        if (!bankAccount) {
          throw new NekoApiError(404, "Partner bank account not found.");
        }

        if (bankAccount.partnerId.toString() !== partnerId) {
          throw new NekoApiError(
            403,
            "Forbidden: Bank account does not belong to this partner."
          );
        }

        return bankAccount.toJSON();
      } catch (error) {
        if (isZodError(error)) {
          throw zodErrorToNekoApiError(error);
        }
        throw error;
      }
    },
  };
}

const partnerBankAccountService = PartnerBankAccountServiceFactory(
  partnerBankAccountRepository,
  partnerRepository,
  bankRepository
);
export default partnerBankAccountService;
