import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Просто редирект на dashboard без всяких проверок
    return NextResponse.redirect("http://localhost:3000/dashboard", { status: 302 })
  } catch {
    return NextResponse.redirect("http://localhost:3000/dashboard", { status: 302 })
  }
}