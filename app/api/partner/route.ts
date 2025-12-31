import { connectMongo } from "@/lib/mongoose";
import { ServiceError } from "@/lib/service-error";
import partnerService from "@/modules/partner/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  await connectMongo();
  try {
    const payload = await request.json();
    const session = await getServerSession(authOptions);
    const newPartner = await partnerService.create(payload, session);
    return NextResponse.json(newPartner, { status: 201 });
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

export async function GET(request: Request) {
  await connectMongo();
  try {
    const session = await getServerSession(authOptions);

    const url = new URL(request.url);
    const { searchParams } = url;
    const query = Object.fromEntries(searchParams.entries());

    const result = await partnerService.findAll(query, session);
    return NextResponse.json(result, { status: 200 });
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
