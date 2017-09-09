import * as Joi from "joi";
import { Namespace, Router, SwaggerRoute, XRayMiddleware } from "vingle-corgi";

import { routes } from "./routes";

const router = new Router([
  new SwaggerRoute(
    "/swagger",
    {
      title: "MockAPI",
      version: "1.0.0",
    },
    routes,
  ),
  new Namespace("", {
    children: routes,
  }),
], {
  middlewares: [
    new XRayMiddleware(),
  ],
});

export const handler = router.handler();
