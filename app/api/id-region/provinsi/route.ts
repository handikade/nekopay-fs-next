import { isNekoApiError } from "@/lib/neko-api-error";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import { getProvinsi } from "@/modules/id-region/service";

export async function GET() {
  try {
    const data = await getProvinsi();
    return nekoSuccessResponse(data);
  } catch (error) {
    if (isNekoApiError(error)) {
      return nekoErrorResponse(error.message, error.status, error.details);
    }

    console.error(error);
    return nekoErrorResponse("An unexpected error occurred nyan!");
  }
}
