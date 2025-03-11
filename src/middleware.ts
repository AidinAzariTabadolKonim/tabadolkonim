import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/", // Home page
  "/about", // About page
  "/sign-in(.*)", // Sign-in page (with wildcard for dynamic routes)
  "/sign-up(.*)", // Sign-up page (with wildcard for dynamic routes)
  "/api/accounts",
]);

export default clerkMiddleware(async (auth, req) => {
  // Await the auth() call to get the ClerkMiddlewareAuthObject

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next|static|favicon.ico|.*\\..*).*)",
    // Match API routes and TRPC routes
    "/(api|trpc)(.*)",
  ],
};
