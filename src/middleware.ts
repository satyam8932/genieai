import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

// Define route patterns that require authentication
const isProtectedRoute = createRouteMatcher([
  // Securing All the API routes except webhook for stripe
  
  '/chat(.*)',  // Matches any path starting with '/chat'
  '/create-chat(.*)',  // Matches any path starting with '/create-chat'
  '/get-messages(.*)',  // Matches any path starting with '/get-messages'
  '/dashboard(.*)', // Matches any path starting with '/dashboard
  '/docbot(.*)', // Matches any path starting with '/docbot
]);

export default clerkMiddleware((auth, req) => {
  // Protect routes that match the `isProtectedRoute` pattern
  if (isProtectedRoute(req)) {
      auth().protect();  // Ensure the user is authenticated for protected routes
  }
});

// Define the middleware configuration for matching requests
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  // Explanation of the matcher patterns:
  // 1. '/((?!.*\\..*|_next).*)': Match all paths except those with a file extension or paths starting with '_next'.
  // 2. '/': Match the root path.
  // 3. '/(api|trpc)(.*)': Match any API or TRPC routes.
};
