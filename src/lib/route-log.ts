export function logRouteData(route: string, detail: string) {
  if (process.env.NODE_ENV === "production" && process.env.LOG_ROUTE_DATA !== "1") return;
  console.info(`[route-data] ${route}: ${detail}`);
}
