import { cookies } from "next/headers";
import { verifyToken } from "./verifyToken";
import { JwtPayload } from "jsonwebtoken";
interface UserPayload extends JwtPayload {
  id: string;
  name: string;
  role: "user" | "admin";
}
export async function getCurrentUser() {
  const token = cookies().get("token")?.value;
  console.log("token", token);

  if (!token) return null;

  try {
    const user = verifyToken(token) as UserPayload;
    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
