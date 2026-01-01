import { NextResponse } from "next/server";

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

/**
 * Creates a standardized successful API response.
 * @param data The payload to be returned.
 * @param status The HTTP status code. Defaults to 200.
 */
export function successResponse<T>(data: T, status: number = 200) {
  const body: SuccessResponse<T> = {
    success: true,
    data,
  };
  return NextResponse.json(body, { status });
}

/**
 * Creates a standardized error API response.
 * @param message The error message.
 * @param status The HTTP status code. Defaults to 500.
 * @param details Additional error details (e.g., validation errors).
 */
export function errorResponse(
  message: string,
  status: number = 500,
  details?: unknown
) {
  const body: ErrorResponse = {
    success: false,
    error: {
      message,
      details,
    },
  };
  return NextResponse.json(body, { status });
}
