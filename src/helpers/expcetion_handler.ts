import * as Joi from "joi";
import { RoutingContext } from "vingle-corgi";

import { injectCORSHeaders } from "./cors";

export async function exceptionHandler(this: RoutingContext, error: Error) {
  if (error.name === "ValidationError") {
    const validationError = error as Joi.ValidationError;

    return this.json({
      error: {
        name: validationError.name,
        message: validationError.message,
        details: validationError.details,
      },
    }, 400, {
      ...injectCORSHeaders(this),
    });
  }

  return this.json({
    error: {
      id: this.requestId,
      summary: "Ooops something went wrong",
      message: `${error.name} : ${error.message}`,
    },
  }, 500);
}
