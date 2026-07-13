// middleware.ts
import { next } from '@vercel/functions';

export default function middleware(request: Request): Response | Promise<Response> {
  const url = new URL(request.url);

  // Intercept any outgoing requests targeting our proxy route
  if (url.pathname.startsWith('/api')) {
    // Clone the incoming request headers using the standard Web API
    const requestHeaders = new Headers(request.headers);
    
    // Inject the production secret key from Vercel's environment variables
    requestHeaders.set('X-API-Key', process.env['SCANNER_API_KEY'] || '');

    // Forward the request upstream to your Go backend with the newly attached header
    return next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Allow all non-API traffic (like your static Angular HTML/JS assets) to pass through normally
  return next();
}