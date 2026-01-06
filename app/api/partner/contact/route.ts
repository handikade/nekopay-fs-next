import { connectMongo } from "@/lib/mongoose";
import { isNekoApiError } from "@/lib/neko-api-error";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import partnerContactService from "@/modules/partner-contact/service";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  await connectMongo();

  try {
    const session = await getServerSession(authOptions);
    console.log("", { session: JSON.stringify(session) });

    if (!session) {
      return nekoErrorResponse("Unauthorized", 401);
    }

    const userId = session.user.id;

    const body = await request.json();
    const payload = { ...body, user_id: userId };

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
