import { z, ZodError } from "zod";

export class NekoApiError extends Error {
  public status: number;
  public message: string;
  public details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);

    this.status = status;
    this.message = message;
    this.details = details;
  }
}

export function isNekoApiError(error: unknown): error is NekoApiError {
  return error instanceof NekoApiError;
}

export function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export function zodErrorToNekoApiError(error: ZodError): NekoApiError {
  return new NekoApiError(
    400,
    "Invalid request parameters",
    z.treeifyError(error)
  );
}
