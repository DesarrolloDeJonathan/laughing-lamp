import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';
// import { UpdateUsuarioDto } from './dto/update-usuario.dto';
// import { validate } from 'class-validator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //createUsuarioDto es el vaarible  que podemos remplazar con cualquier nombre como data
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body('data') createUsuarioDto: any) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }
  @Get('signIn')
  signIn(@Body('data') data: any) {
    return this.usuariosService.signIn(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch()
  update(@Body('data') updateUsuarioDto: any) {
    return this.usuariosService.update(updateUsuarioDto);
    // console.log(updateProductoDto); para verlo en consola hy ver si esta llegando los datos
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
    // console.log(id);
  }
}
