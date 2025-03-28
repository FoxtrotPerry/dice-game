import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { type GameStage, stageToRouteMap } from "./types/gameStage";

const middleware = (request: NextRequest) => {
  const requestedRoute = request.nextUrl.pathname;
  const gameStageCookie = request.cookies.get("gameStage");
  const currentGameStage = gameStageCookie?.value;
  if (!currentGameStage) return;

  // if the requested route is a route dependent on the game stage
  if (Object.values(stageToRouteMap).includes(requestedRoute)) {
    // get the route associated with the current game stage
    const correctRoute = stageToRouteMap[currentGameStage as GameStage];
    // if the requested route doesn't match the route associated with the game's current state
    if (requestedRoute !== correctRoute) {
      const url = request.nextUrl.clone();
      url.pathname = correctRoute;
      // redirect to the correct route
      return NextResponse.redirect(url);
    }
  }
};

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/setup",
  "/first-roll",
  "/game",
  "/game/(.*)",
  "/game-over",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
  return middleware(request);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
