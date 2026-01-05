import {
  isZodError,
  NekoApiError,
  zodErrorToNekoApiError,
} from "@/lib/neko-api-error";
import { bankToListDto } from "./adapter";
import { findBanksQueryDto } from "./dto";
import * as bankRepository from "./repository";

// Define the shape of the repository dependency
type BankRepository = {
  findAll: typeof bankRepository.findAll;
};

export function BankServiceFactory(repo: BankRepository) {
  return {
    /**
     * Retrieves a list of banks based on query parameters.
     * @param query - The query parameters (code, name).
     * @returns An array of banks.
     */
    async findAll(query: unknown) {
      try {
        const parsedQuery = findBanksQueryDto.parse(query);

        const banks = await repo.findAll(parsedQuery);

        return banks.map((b) => bankToListDto(b));
      } catch (error) {
        if (isZodError(error)) {
          throw zodErrorToNekoApiError(error);
        }

        if (!(error instanceof NekoApiError)) {
          console.error("Unexpected error in bank service findAll:", error);
          throw new NekoApiError(
            500,
            "An unexpected error occurred in the bank service."
          );
        }

        throw error;
      }
    },
  };
}

const bankService = BankServiceFactory(bankRepository);
export default bankService;
