import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {

  }
  async create(createUsuarioDto: any): Promise<Usuario> {
    const salt = await bcrypt.genSalt()

    return this.prismaService.user.create({
      //aquí se esta guardando normal sin encriptar
      data: { email:createUsuarioDto.email, name: createUsuarioDto.name, password: await bcrypt.hash (createUsuarioDto.password, salt),salt:salt }
    });
  }
//Metodo par inciar seccion
// se encripta nuevamente apartir de la llave salt para comparar y validamos credenciales
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
    // Despues que ya esta logueado se genera

    const token = this.jwtService.sign({ user: user });
    console.log(token);

    const tkn = Object.assign(user, { token });

    return tkn;

  }

  async findAll() {
    return this.prismaService.user.findMany({
      include: { posts: { select: {title: true, published: true}}}
    })
  }

  //Para consultar un usuario
  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id: id},
      // select: {email:true, name:true}
    })
    // return `This action returns a #${id} Usuario`;
  }

  update(updateUsuarioDto: any) {
    return this.prismaService.user.update({
      where: { id: updateUsuarioDto.id },
      data: {name: updateUsuarioDto.name, email: updateUsuarioDto.email}
    })
  }

  async remove(id: number) {
    return this.prismaService.user.delete({
      where: { id: id }
    })
  }
  // create(createUsuarioDto: CreateUsuarioDto) {
  //   return 'This action adds a new usuario';
  // }

  // findAll() {
  //   return `This action returns all usuarios`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} usuario`;
  // }

  // update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  //   return `This action updates a #${id} usuario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
