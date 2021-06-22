import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ProductosModule } from './productos/productos.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { PostsService } from './posts/posts.service';
import { PrismaService } from './prisma.service';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [
    // ProductosModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: process.env.JWT_EXPIRESIN
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  ],
  controllers: [AppController, PostsController, UsuariosController],
  providers: [AppService, UsuariosService, PostsService, PrismaService],
})
export class AppModule {}
