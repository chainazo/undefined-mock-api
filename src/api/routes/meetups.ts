import * as faker from "faker";
import * as Joi from "joi";
import { Namespace, Parameter, Route, RoutingContext } from "vingle-corgi";
import { injectCORSHeaders } from "../../helpers/cors";
import { exceptionHandler } from "../../helpers/expcetion_handler";
import { MockedDataFactory } from "../../helpers/mocked_data";

enum ChoiceType {
  RACE = 0,
  RANDOM = 1,
  MANUAL = 2,
}

enum ReservationState {
  WAITING = 0,
  CONFIRMED = 1,
  REJECTED = 2,
}

export const route = new Namespace("/meetups", {
  exceptionHandler,
  children: [
    Route.OPTIONS(
    "",
    "CORS Pre-Flight Request", {},
    async function() {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
          ...injectCORSHeaders(this),
        },
        body: "",
      };
    }),
    Route.GET(
    "", "List of meetups",
    {
      count: Parameter.Query(Joi.number().optional().default(30)),
      after: Parameter.Query(Joi.number().optional()),
    },
    async function() {
      return this.json({
        data: Array.from(new Array(10)).map(() => MockedDataFactory.meetup()),
        paging: {
          after: 1234,
        },
      });
    }),
    Route.POST(
      "", "Create new meetup", {
        title: Parameter.Body(Joi.string().required()),
        summary: Parameter.Body(Joi.string().required()),
        started_at: Parameter.Body(Joi.date().required()),
        ended_at: Parameter.Body(Joi.date().optional()),
        choice_type: Parameter.Body(Joi.allow([
          ChoiceType.MANUAL,
          ChoiceType.RACE,
          ChoiceType.RANDOM,
        ])),
        content: Parameter.Body(Joi.string().required()),
        location: Parameter.Body(Joi.string().required()),
    }, async function() {
        return this.json({
          data: {
            id: faker.random.number(),
            owner_id: faker.random.number(),
            ...this.params,
            created_at: new Date(),
            updated_at: new Date(),
          },
        }, 200, { ...injectCORSHeaders(this) });
    }),
    new Namespace("/:meetupId", {
      params: {
        meetupId: Joi.number().required(),
      },
      children: [
        Route.GET("", "Show meetup", {
          meetupId: Parameter.Path(Joi.number().required()),
        }, async function() {
          const meetupId = this.params.meetupId as number;

          return this.json({
            data: {
              ...MockedDataFactory.meetup(),
              id: meetupId,
            },
          }, 200, { ...injectCORSHeaders(this) });
        }),
        Route.GET("/attendees", "List attendees of given meetup id", {
          state: Parameter.Query(Joi.allow([
            ReservationState.WAITING,
            ReservationState.CONFIRMED,
            ReservationState.REJECTED,
          ]).optional()),
        }, async function() {
          return this.json({
            data: Array.from(new Array(10)).map(() => MockedDataFactory.user()),
          }, 200, { ...injectCORSHeaders(this) });
        }),
        Route.POST("/approve", "Approve reservation of given user ids", {
          users: Parameter.Body(Joi.array().items(Joi.number().required())),
        }, async function() {
          const meetupId = this.params.meetupId as number;
          const userIds = this.params.users as number[];

          return this.json({
            data: userIds,
          });
        }),
      ],
    }),
  ],
});
