import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const session = req.cookies.get("session")?.value;
    const { pathname } = req.nextUrl;

    const publicPaths = [
        "/",
        "/auth/login",
        "/auth/register",
        "/api",
        "/_next",
        "/favicon.ico",
    ];

    const isPublic = publicPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (!session && !isPublic) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    if (session && pathname.startsWith("/auth")) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
