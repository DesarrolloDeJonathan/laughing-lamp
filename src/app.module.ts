import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsuariosResolver } from './usuarios/usuario.resolver';


@Module({
  imports: [
    GraphQLModule.forRoot({
      cors: {
        origin: '*',
        credentials: true,
      },
      context: ({ req, res }) => ({
        req: req,
        res: res
      }),
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  ],
  controllers: [AppController, PostsController, UsuariosController],
  providers: [AppService, UsuariosService, PostsService, PrismaService, UsuariosResolver],
})
export class AppModule { }
