import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {

  }

  async create(data: CreateUsuarioDto): Promise<Usuario> {
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

    const token = this.jwtService.sign({ user: user });

    const tkn = Object.assign(user, { token });

    return tkn;
  }

  async findAll(): Promise<Usuario[]> {
    return this.prismaService.user.findMany({
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
