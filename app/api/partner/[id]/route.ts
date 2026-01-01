import { ServiceError } from "@/lib/service-error";
import partnerService from "@/modules/partner/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;

    const deletedPartner = await partnerService.deleteById(id, session);

    return NextResponse.json(deletedPartner, { status: 200 });
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
