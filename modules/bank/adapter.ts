import type { ListBankDto } from "./dto";
import type { BankDocument } from "./schema";

export function bankToListDto(bank: BankDocument): ListBankDto {
  return {
    id: bank._id.toString(),
    code: bank.code ?? "",
    name: bank.name ?? "",
  };
}
