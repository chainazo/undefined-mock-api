import * as Joi from "joi";
import {
  Parameter,
  Route,
  RoutingContext,
} from "vingle-corgi";

export const route =
  Route.GET(
    "/users", "List of users",
    {},
    async function() {
      const viewerId = this.params.viewerId as number;
      const count = this.params.count as number;

      return this.json({
        data: {
          foo: "bar",
        },
      });
    });
