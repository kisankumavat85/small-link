export { auth as middleware } from "@/auth";

export const maxDuration = 60;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
