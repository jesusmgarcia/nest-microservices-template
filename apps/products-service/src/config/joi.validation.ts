import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NATS_SERVERS: Joi.string().required(),
}).unknown(true);
