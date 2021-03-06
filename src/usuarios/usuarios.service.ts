import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { Usuarios } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {

  }

  async create(data: CreateUsuarioDto): Promise<Usuarios> {
    const salt = await bcrypt.genSalt();

    return this.prismaService.user.create({
      data: { email: data.email, name: data.name, salt: salt, password: await bcrypt.hash(data.password, salt) }
    });
  }

  async signIn(data: any) {
    const salt = await this.prismaService.user.findFirst({
      where: { email: data.email },
      select: { salt: true }
    })

    if (salt === null) {
      throw new UnauthorizedException("Creadenciales inválidas");
    }

    const user = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
        password: await bcrypt.hash(data.password, salt.salt)
      },
    })

    if (user === null) {
      throw new UnauthorizedException("Creadenciales inválidas");
    }

    const token = this.jwtService.sign({ user_id: user.id });

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: { token: token }
    })

  }

  async findAll(): Promise<Usuarios[]> {
    return await this.prismaService.user.findMany({
      include: { posts: true }
    });

  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id: id }
    });
  }

  async update(data: any) {
    return this.prismaService.user.update({
      where: { id: data.id },
      data: { name: data.name, email: data.email }
    });
  }

  async remove(id: number) {
    return this.prismaService.user.delete({
      where: { id: id }
    });
  }
}
