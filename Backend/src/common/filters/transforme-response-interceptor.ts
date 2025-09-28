import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    // intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //     const ctx = context.switchToHttp();
    //     const request = ctx.getRequest<Request>();
    //     const response = ctx.getResponse<Response>();

    //     return next.handle().pipe(
    //         map((data) => ({
    //             statusCode: response.statusCode,
    //             data,
    //             path: request.url,
    //             timestamp: new Date().toISOString(),
    //         })),
    //     );
    // }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();

        return next.handle().pipe(
            map((data) => {
                if (!data) return { status: "ok" };
                return data;
            })
        );
    }
}
