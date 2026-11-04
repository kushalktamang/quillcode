import winston from "winston";

import type { LoggerOptions } from "./types";

const { combine, timestamp, errors, colorize, json, simple } = winston.format;

function createLogger({
  service,
  level = "info",
  isProduction = false,
  logDir = "logs",
}: LoggerOptions) {
  const fileOrConsole = (filename: string) =>
    isProduction
      ? new winston.transports.Console()
      : new winston.transports.File({ filename: `${logDir}/${filename}` });

  return winston.createLogger({
    level,
    format: combine(
      timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
      errors({ stack: true }),
      json(),
    ),
    defaultMeta: { service },
    transports: [
      new winston.transports.Console(
        isProduction ? {} : { format: combine(colorize(), errors({ stack: true }), simple()) },
      ),
      ...(isProduction
        ? []
        : [
            new winston.transports.File({
              filename: `${logDir}/combined.log`,
              maxsize: 5_000_000,
              maxFiles: 3,
            }),
            new winston.transports.File({
              filename: `${logDir}/error.log`,
              level: "error",
              maxsize: 5_000_000,
              maxFiles: 3,
            }),
          ]),
    ],
    exceptionHandlers: [fileOrConsole("exception.log")],
    rejectionHandlers: [fileOrConsole("rejections.log")],
    exitOnError: true,
  });
}

export default createLogger;
