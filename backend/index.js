// Define your allowed frontend origins
const ALLOWED_ORIGINS = [
  "https://uskulpt.in",
  "https://www.uskulpt.in",
  "https://uskulpt-project.pages.dev"
];

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin");

    // 1. Handle CORS Preflight (OPTIONS) Requests
    if (request.method === "OPTIONS") {
      return handlePreflight(origin);
    }

    // 2. Process Actual API Requests (GET, POST, etc.)
    try {
      // Example Health Check Route (Used for your Step 3.5 smoke test!)
      const url = new URL(request.url);
      if (url.pathname === "/api/health") {
        return jsonResponse({ status: "healthy", timestamp: Date.now() }, 200, origin);
      }

      // Default fallback response
      return jsonResponse({ message: "Cloudflare Backend Operational" }, 200, origin);

    } catch (error) {
      return jsonResponse({ error: error.message }, 500, origin);
    }
  }
};

/**
 * Generates CORS headers dynamically based on the requesting origin
 */
function corsHeaders(requestOrigin) {
  // If the request origin is in our allowed list, reflect it. Otherwise, default to the main domain.
  const allowedOrigin = ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : "https://uskulpt.in";
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400", // Cache preflight response for 24 hours
    "Vary": "Origin" // Tells browsers/caches to evaluate the origin header uniquely
  };
}

/**
 * Handles browser preflight checks quickly and cleanly
 */
function handlePreflight(origin) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders(origin)
  });
}

/**
 * Helper function to return standardized JSON with the security headers attached
 */
function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin)
    }
  });
}
