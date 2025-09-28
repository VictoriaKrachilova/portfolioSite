import { Body, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { RequestWithUser } from "../common/dto/types.js";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req : RequestWithUser = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader?.split(' ')[0];
            const token = authHeader?.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User not authorized' });
            }
            const payload = this.jwtService.verify(token);
            if (req.body) req.body.user = payload;
            req.userId = payload.id;
            return true;
        } catch (e) {
            throw new UnauthorizedException({ message: 'User not authorized' });
        }
    }
}
