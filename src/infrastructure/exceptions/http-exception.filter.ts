import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import CustomerIdInvalidException from '../../domain/exceptions/customer-id-invalid.exception';

@Catch()
export default class HttpExceptionFilter implements ExceptionFilter<Error> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { message, status } = this.isBusinessException(exception);
    response.status(status).send({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isBusinessException(exception: HttpException): any {
    if (exception instanceof CustomerIdInvalidException) {
      return {
        message: exception.message,
        status: 400,
      };
    }
    if (exception instanceof BadRequestException) {
      const message = exception.getResponse();
      const status = exception.getStatus();
      return {
        message,
        status,
      };
    }
    Logger.log(exception.stack);
    return {
      message: exception.message.replace(/\n/g, '') || 'Internal server error',
      status: 500,
    };
  }
}
