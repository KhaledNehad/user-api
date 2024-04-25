import { cookies } from "next/headers";

export async function getAuthToken() {
  const authToken = cookies().get("authToken")?.value;

  return authToken;
}
