import { type NekoAPIResponse } from "@/lib/api-wrapper.type";
import { ServiceError } from "@/lib/service-error";
import * as authService from "@/modules/auth/auth-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const user = await authService.login(body);
    const res: NekoAPIResponse<{ id: string | null | undefined }> = {
      status: "success",
      data: user,
      message: "",
    };
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);

    if (error instanceof ServiceError)
      return NextResponse.json(error, { status: error.status });

    return NextResponse.json(error, { status: 400 });
  }
}
