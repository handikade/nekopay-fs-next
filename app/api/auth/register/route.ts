import { type NekoAPIResponse } from "@/lib/api-wrapper.type";
import { ServiceError } from "@/lib/service-error";
import * as userService from "@/modules/user/user-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const user = await userService.register(body);
    const res: NekoAPIResponse<{ id: string | null | undefined }> = {
      status: "success",
      data: user,
      message: "Registration successful",
    };
    return NextResponse.json(res);
  } catch (error) {
    if (error instanceof ServiceError) {
      return NextResponse.json({ status: "error", message: error.message }, { status: error.status });
    }
    console.error(error);
    return NextResponse.json({ status: "error", message: "An unexpected error occurred" }, { status: 500 });
  }
}
