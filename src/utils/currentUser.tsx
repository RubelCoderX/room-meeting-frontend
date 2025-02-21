import { cookies } from "next/headers";
import { verifyToken } from "./verifyToken";

export const getCurrentUser = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    if (!refreshToken) return null;

    const user = await verifyToken(refreshToken);

    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
