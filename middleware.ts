import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/dashboard")) {
    if (!token) return NextResponse.redirect(new URL("/", request.url))

    try {
      const memberRes = await fetch(
        `https://discord.com/api/v10/users/@me/guilds/1458604301332250657/member`,
        { headers: { Authorization: `Bearer ${token.accessToken}` }, cache: "no-store" }
      )

      if (!memberRes.ok) return NextResponse.redirect(new URL("/bro", request.url))

      const member = await memberRes.json()
      const hasRole = member.roles?.includes("1458605702024003606")
      if (!hasRole) return NextResponse.redirect(new URL("/bro", request.url))

    } catch {
      return NextResponse.redirect(new URL("/bro", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"]
}
