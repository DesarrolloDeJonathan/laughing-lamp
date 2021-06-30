import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuhtGuardJwt extends AuthGuard('jwt') {

    async canActivate(context: ExecutionContext): Promise<any> {

        const request = context.switchToHttp().getRequest();
        var token = request.headers.authorization.split(" ")[1];
        let query = context.getHandler().name;

        if (query == "signIn") {
            return true;
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new UnauthorizedException("Usuario no autorizado" + error);
        }

        return true;
    }
}
