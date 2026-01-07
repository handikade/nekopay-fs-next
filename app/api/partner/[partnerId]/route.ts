import { errorResponse, successResponse } from "@/lib/api-response";
import { connectMongo } from "@/lib/mongoose";
import { ServiceError } from "@/lib/service-error";
import partnerService from "@/modules/partner/service";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  await connectMongo();

  try {
    const session = await getServerSession(authOptions);
    const { partnerId } = await params;
    const partner = await partnerService.findById(partnerId, session);
    return successResponse(partner);
  } catch (error) {
    if (error instanceof ServiceError) {
      return errorResponse(error.message, error.status, error.details);
    }

    // Generic error
    console.error("An unexpected error occurred:", error);
    return errorResponse("An unexpected error occurred");
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectMongo();

  try {
    const session = await getServerSession(authOptions);
    const payload = await request.json();
    const { id } = await params;

    const updatedPartner = await partnerService.update(id, payload, session);

    return successResponse(updatedPartner);
  } catch (error) {
    if (error instanceof ServiceError) {
      return errorResponse(error.message, error.status, error.details);
    }

    // Generic error
    console.error("An unexpected error occurred:", error);
    return errorResponse("An unexpected error occurred");
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectMongo();

  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    const deletedPartner = await partnerService.deleteById(id, session);

    return successResponse(deletedPartner);
  } catch (error) {
    if (error instanceof ServiceError) {
      return errorResponse(error.message, error.status, error.details);
    }

    // Generic error
    console.error("An unexpected error occurred:", error);
    return errorResponse("An unexpected error occurred");
  }
}
