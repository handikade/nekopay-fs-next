import { connectMongo } from "@/lib/mongoose";
import { isNekoApiError } from "@/lib/neko-api-error";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import partnerContactService from "@/modules/partner-contact/service";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectMongo();

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return nekoErrorResponse("Unauthorized", 401);
    }

    const payload = await request.json();
    const { id } = await params;

    const updatedPartner = await partnerContactService.update({
      partnerContactId: id,
      payload,
      userId: session.user.id,
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
