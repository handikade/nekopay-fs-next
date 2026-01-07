import { connectMongo } from "@/lib/mongoose";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import { ServiceError } from "@/lib/service-error";
import bankService from "@/modules/bank/service";

export async function GET(request: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const banks = await bankService.findAll(query);

    return nekoSuccessResponse(banks, 200, {
      message: "Successfully retrieved banks",
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return nekoErrorResponse(error.message, error.status);
    }
    console.error("Error in bank GET route:", error);
    return nekoErrorResponse("An unexpected error occurred", 500);
  }
}
