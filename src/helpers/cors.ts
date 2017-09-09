import { RoutingContext } from "vingle-corgi";

export function injectCORSHeaders(context: RoutingContext) {
  return {
    "Access-Control-Allow-Origin": context.headers.origin,
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": context.headers["access-control-request-headers"] ||
      "Origin, Content-Type, Accept, Content-Length",
  };
}
