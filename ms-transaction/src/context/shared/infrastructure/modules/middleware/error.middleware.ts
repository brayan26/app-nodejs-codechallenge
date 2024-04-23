import { BaseError } from '@context/shared/domain/errors/BaseError';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let responseBody = {};

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof BaseError) {
      responseBody = {
        message: exception.info,
        statusCode: exception.status,
        timestamp: new Date().toISOString(),
      };
    }

    //httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
