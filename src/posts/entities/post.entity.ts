import { IsNotEmpty } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";

export class Post {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  content?: string;

  published?: boolean;

  author?: Usuario;

}
