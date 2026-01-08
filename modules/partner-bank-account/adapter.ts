import { Types } from "mongoose";
import type { CreatePartnerBankAccountDto } from "./dto";
import type { PartnerBankAccount } from "./schema";

export function CreatePartnerBankAccountDto_to_PartnerBankAccount(
  dto: CreatePartnerBankAccountDto
): PartnerBankAccount {
  const partnerBankAccount = {
    partnerId: new Types.ObjectId(dto.partnerId),
    userId: new Types.ObjectId(dto.userId),
    bankId: new Types.ObjectId(dto.bankId),
    accountName: dto.accountName,
    accountNumber: dto.accountNumber,
  } as PartnerBankAccount;

  return partnerBankAccount;
}
