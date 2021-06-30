import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { type } from "os";

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    password!: string;
}
