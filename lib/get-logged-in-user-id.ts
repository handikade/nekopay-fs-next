import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NekoApiError } from "@/lib/neko-api-error";
import { getServerSession } from "next-auth";

export async function getLoggedInUserId() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new NekoApiError(401, "Unauthorized");
  }

  return userId;
}
