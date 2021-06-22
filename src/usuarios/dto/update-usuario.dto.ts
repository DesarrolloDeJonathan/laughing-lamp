import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator'
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsNotEmpty()
  id: number;
}
