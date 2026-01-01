import { NextResponse } from "next/server";

/**
 * Flexible interface for API response metadata.
 * Can be extended for specific metadata needs.
 */
export interface Metadata {
  [key: string]: unknown;
}

/**
 * Specific metadata for list responses, including pagination details.
 */
export interface PaginationMetadata extends Metadata {
  current_page: number;
  items_per_page: number;
  total_records: number;
  total_pages: number;
}

type SuccessResponse<T, M extends Metadata = Metadata> = {
  success: true;
  data: T;
  metadata?: M;
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
 * @param metadata Optional metadata to include in the response.
 */
export function successResponse<T, M extends Metadata = Metadata>(
  data: T,
  status: number = 200,
  metadata?: M
) {
  const body: SuccessResponse<T, M> = {
    success: true,
    data,
    ...(metadata && { metadata }),
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
