import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = 'Internal server error';
        let errors: any = null;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();

            if (typeof res === 'string') {
                message = res;
            } else if ((res as any).message) {
                message = (res as any).message;
            }

            // ValidationPipe -> массив ошибок
            if ((res as any).message && Array.isArray((res as any).message)) {
                errors = (res as any).message;
            }

        } else if (exception instanceof Error) {
            message = exception.message;
        }

        // Логируем все неожиданные ошибки
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(exception);
        }

        const responseBody: any = {
            statusCode: status,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        };

        if (errors) responseBody.errors = errors;

        response.status(status).json(responseBody);
    }
}
