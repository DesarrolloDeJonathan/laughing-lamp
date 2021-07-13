import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuarios } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  create(@Body("data") data: CreateUsuarioDto): Promise<Usuarios> {
    return this.usuariosService.create(data);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('signIn')
  signIn(@Body("data") data: any) {
    return this.usuariosService.signIn(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch()
  update(@Body('data') data: any) {
    return this.usuariosService.update(data);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}

