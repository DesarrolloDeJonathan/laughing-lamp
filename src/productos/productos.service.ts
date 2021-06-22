import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; //necario llamar el prisma service
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService 
{
  //Para hacer las consulta con prisma
  constructor(private prismaService: PrismaService){

  }
  async create(createProductoDto: any) {
    return this.prismaService.user.create({
      data: { email:createProductoDto.email, name: createProductoDto.name }
    }); 
  }
  
  async findAll() {
    return this.prismaService.user.findMany({
      include: { posts: true },
    })
  }

  
  //Para consultar un usuario
  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id: id},
      // select: {email:true, name:true}
    })
    // return `This action returns a #${id} producto`;
  }

  update(updateProductoDto: any) {
    return this.prismaService.user.update({
      where: { id: updateProductoDto.id },
      data: {name: updateProductoDto.name, email: updateProductoDto.email}
    })
  }

  async remove(id: number) {
    return this.prismaService.user.delete({
      where: { id: id }
    })
  }
}
