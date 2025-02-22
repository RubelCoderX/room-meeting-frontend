import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./utils/currentUser";
import { verifyToken } from "./utils/verifyToken";

const Authroutes = ["/login", "/register"];
type Role = keyof typeof roleBasedRoutes;
const roleBasedRoutes = {
  user: ["/my-booking"],
  admin: [/^\/adminDashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (Authroutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/my-booking",
    // "/login",
    "/adminDashboard",
    "/adminDashboard/:page*",
  ],
};
