import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  //La data que enviamos desde fuera (postman)
  create(@Body("data") createProductoDto: any) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch()
  update(@Body('data')updateProductoDto: any) {
    return this.productosService.update(updateProductoDto);
    // console.log(updateProductoDto); para verlo en consola hy ver si esta llegando los datos
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
    // console.log(id);
  }
}
