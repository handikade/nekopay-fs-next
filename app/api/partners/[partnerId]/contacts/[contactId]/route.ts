import { getLoggedInUserId } from "@/lib/get-logged-in-user-id";
import { connectMongo } from "@/lib/mongoose";
import { isNekoApiError } from "@/lib/neko-api-error";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import partnerContactService from "@/modules/partner-contact/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ partnerId: string; contactId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();
    const { partnerId, contactId } = await params;

    const contact = await partnerContactService.findOne({
      userId,
      partnerId,
      contactId,
    });

    return nekoSuccessResponse(contact);
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
  { params }: { params: Promise<{ partnerId: string; contactId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();

    const body = await request.json();
    const { partnerId, contactId } = await params;

    const updatedPartner = await partnerContactService.update({
      userId,
      partnerId,
      contactId,
      contactData: body,
    });

    return nekoSuccessResponse(updatedPartner);
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
  { params }: { params: Promise<{ partnerId: string; contactId: string }> }
) {
  await connectMongo();

  try {
    const userId = await getLoggedInUserId();
    const { partnerId, contactId } = await params;

    const result = await partnerContactService.remove({
      userId,
      partnerId,
      contactId,
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
