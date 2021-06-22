import { IsEmail, IsNotEmpty, IsString} from "class-validator";

//Para ver que es lo que llega desde el front
export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  password: string;
}
