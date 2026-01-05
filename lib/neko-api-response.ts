import { NextResponse } from "next/server";

export interface NekoApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

export interface NekoApiMetadata {
  [key: string]: unknown;
}

type NekoSuccessResponse<T, M extends NekoApiMetadata = NekoApiMetadata> = {
  success: true;
  data: T;
  metadata?: M;
};

type NekoErrorResponse = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export function nekoSuccessResponse<
  T,
  M extends NekoApiMetadata = NekoApiMetadata
>(data: T, status: number = 200, metadata?: M) {
  const body: NekoSuccessResponse<T, M> = {
    success: true,
    data,
    ...(metadata && { metadata }),
  };

  return NextResponse.json(body, { status });
}

export function nekoErrorResponse(
  message: string,
  status: number = 500,
  details?: unknown
) {
  const body: NekoErrorResponse = {
    success: false,
    error: {
      message,
      details,
    },
  };
  return NextResponse.json(body, { status });
}
