export default {
  async fetch(request, env, ctx) {
    return new Response(JSON.stringify({ status: "backend is online" }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  },
};
