import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // console.log(request.nextUrl.pathname, "<<<<<<<<<<<<<<<<<");

  // const allCookies = request.cookies.getAll();
  // console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  // if (request.method === 'GET'){
  //   return NextResponse.next()
  // }

  // If accessing login path let user through
  const loginPaths = ["/login", "/api/login"];
  if (loginPaths.some((path) => path === request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Check for token in cookies
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/books/:path*", "/api/:function*", "/", "/add", "/edit/:path*"],
};
