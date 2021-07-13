import { IsEmail, IsNotEmpty } from "class-validator";

export class Usuario {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;
    
    salt: string;

    @IsNotEmpty()
    password: string;

    token: string;
}
