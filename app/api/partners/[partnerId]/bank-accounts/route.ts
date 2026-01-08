import { getLoggedInUserId } from "@/lib/get-logged-in-user-id";
import { connectMongo } from "@/lib/mongoose";
import { isNekoApiError } from "@/lib/neko-api-error";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import partnerBankAccountService from "@/modules/partner-bank-account/service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();
    const { partnerId } = await params;

    const body = await request.json();
    const payload = { ...body, userId, partnerId };

    const created = await partnerBankAccountService.create(payload);

    return nekoSuccessResponse(created, 201);
  } catch (error) {
    if (isNekoApiError(error)) {
      return nekoErrorResponse(error.message, error.status, error.details);
    }
    console.error("An unexpected error occurred:", error);
    return nekoErrorResponse("An unexpected error occurred");
  }
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();
    const { partnerId } = await params;
    const bankAccounts = await partnerBankAccountService.findAll({
      userId,
      partnerId,
    });
    return nekoSuccessResponse(bankAccounts);
  } catch (error) {
    if (isNekoApiError(error)) {
      return nekoErrorResponse(error.message, error.status, error.details);
    }
    console.error("An unexpected error occurred:", error);
    return nekoErrorResponse("An unexpected error occurred");
  }
}
