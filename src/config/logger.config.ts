import winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';

export const loggerConfig = WinstonModule.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        utilities.format.nestLike('BookStore', {
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});
