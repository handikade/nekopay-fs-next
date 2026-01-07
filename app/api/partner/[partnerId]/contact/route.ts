import { getLoggedInUserId } from "@/lib/get-logged-in-user-id";
import { connectMongo } from "@/lib/mongoose";
import { isNekoApiError } from "@/lib/neko-api-error";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import partnerContactService from "@/modules/partner-contact/service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();
    const { partnerId } = await params;

    const body = await request.json();
    const payload = { ...body, user_id: userId, partner_id: partnerId };

    const created = await partnerContactService.create(payload);

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
    const contacts = await partnerContactService.findAll({
      userId,
      partnerId,
    });
    return nekoSuccessResponse(contacts);
  } catch (error) {
    if (isNekoApiError(error)) {
      return nekoErrorResponse(error.message, error.status, error.details);
    }
    console.error("An unexpected error occurred:", error);
    return nekoErrorResponse("An unexpected error occurred");
  }
}
