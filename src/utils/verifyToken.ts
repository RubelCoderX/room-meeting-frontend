import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  console.log("token", token);
  return jwtDecode(token);
};
