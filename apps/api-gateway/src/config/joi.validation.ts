import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  GATEWAY_PORT: Joi.number().required().default(3000),
  NATS_SERVERS: Joi.string().required(),
}).unknown(true);
