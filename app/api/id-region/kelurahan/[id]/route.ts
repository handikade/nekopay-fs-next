import { isNekoApiError } from "@/lib/neko-api-error";
import {
  nekoErrorResponse,
  nekoSuccessResponse,
} from "@/lib/neko-api-response";
import { getKelurahan } from "@/modules/id-region/service";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getKelurahan(id);
    return nekoSuccessResponse(data);
  } catch (error) {
    if (isNekoApiError(error)) {
      return nekoErrorResponse(error.message, error.status, error.details);
    }

    console.error(error);
    return nekoErrorResponse("An unexpected error occurred nyan!");
  }
}
