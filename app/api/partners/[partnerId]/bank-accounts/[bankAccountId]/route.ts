import { getLoggedInUserId } from "@/lib/get-logged-in-user-id";
import { connectMongo } from "@/lib/mongoose";
import { isNekoApiError } from "@/lib/neko-api-error";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import partnerBankAccountService from "@/modules/partner-bank-account/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ partnerId: string; bankAccountId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();
    const { partnerId, bankAccountId } = await params;

    const bankAccount = await partnerBankAccountService.findOne({
      userId,
      partnerId,
      bankAccountId,
    });

    return nekoSuccessResponse(bankAccount);
  } catch (error) {
    if (isNekoApiError(error)) {
      return nekoErrorResponse(error.message, error.status, error.details);
    }

    console.error("An unexpected error occurred:", error);
    return nekoErrorResponse("An unexpected error occurred");
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ partnerId: string; bankAccountId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();

    const body = await request.json();
    const { partnerId, bankAccountId } = await params;

    const updatedBankAccount = await partnerBankAccountService.update({
      userId,
      partnerId,
      bankAccountId,
      bankAccountData: body,
    });

    return nekoSuccessResponse(updatedBankAccount);
  } catch (error) {
    if (isNekoApiError(error)) {
      return nekoErrorResponse(error.message, error.status, error.details);
    }

    console.error("An unexpected error occurred:", error);
    return nekoErrorResponse("An unexpected error occurred");
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ partnerId: string; bankAccountId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();
    const { partnerId, bankAccountId } = await params;

    const result = await partnerBankAccountService.remove({
      userId,
      partnerId,
      bankAccountId,
    });

    return nekoSuccessResponse(result);
  } catch (error) {
    if (isNekoApiError(error)) {
      return nekoErrorResponse(error.message, error.status, error.details);
    }

    console.error("An unexpected error occurred:", error);
    return nekoErrorResponse("An unexpected error occurred");
  }
}
