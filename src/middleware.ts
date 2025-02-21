import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./utils/currentUser";

const Authroutes = ["/login", "/register"];
type Role = keyof typeof roleBasedRoutes;
const roleBasedRoutes = {
  user: ["/my-booking"],
  admin: [/^\/adminDashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();
  //   console.log("User Data:", user);
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

// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "./utils/verifyToken";

// const Authroutes = ["/login", "/register"];

// type Role = keyof typeof roleBasedRoutes;
// const roleBasedRoutes = {
//   user: ["/my-booking"],
//   admin: [/^\/adminDashboard/],
// };

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   //   console.log("Requested Path:", pathname);

//   // Get token from cookies
//   const token = request.cookies.get("refreshToken")?.value;

//   if (!token) {
//     if (Authroutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const decodedUser: any = verifyToken(token);
//   console.log("Decoded User:", decodedUser);

//   if (!decodedUser) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   console.log("User Data:", decodedUser);

//   if (decodedUser?.role && roleBasedRoutes[decodedUser.role as Role]) {
//     const routes = roleBasedRoutes[decodedUser.role as Role];
//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: ["/my-booking", "/adminDashboard", "/adminDashboard/:page*"],
// };
