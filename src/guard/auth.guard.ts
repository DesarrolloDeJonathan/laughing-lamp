import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import * as jwt from 'jsonwebtoken';
import { PrismaService } from "src/prisma.service";

type getToken = { user_id: number, iat: number, exp: number };
const prismaService = new PrismaService();

@Injectable()
export class AuhtGuardJwt extends AuthGuard('jwt') {

    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest();
        let query = context.getHandler().name;
        let token = "";

        if (request.headers.authorization !== undefined) {
            token = request.headers.authorization.split(" ")[1];
        }

        if (query == "signIn") {
            return true;
        }

        try {
            var token_des = jwt.verify(token, process.env.JWT_SECRET) as getToken;

            var user_token = await prismaService.user.findUnique({
                where: { id: token_des.user_id },
                select: { token: true }
            })

            if (user_token.token !== token) {
                throw new UnauthorizedException("Token incorrecto");
            }


        } catch (error) {
            throw new UnauthorizedException("Usuario no autorizado " + error);
        }

        return true;
    }
}