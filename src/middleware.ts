import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Remove the auth check for feeds page
  return NextResponse.next()
}

export const config = {
  matcher: '/feeds/:path*'
} 