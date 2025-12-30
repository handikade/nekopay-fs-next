import { NextResponse } from "next/server";
import partnerService from "@/modules/partner/service";
import { ServiceError } from "@/lib/service-error";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const payload = await request.json();
    const { id } = params;

    const updatedPartner = await partnerService.update(id, payload, session);

    return NextResponse.json(updatedPartner, { status: 200 });
  } catch (error) {
    if (error instanceof ServiceError) {
      return NextResponse.json(
        {
          message: error.message,
          errors: error.details,
        },
        { status: error.status }
      );
    }

    // Generic error
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
