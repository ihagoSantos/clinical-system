import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty({
        message: 'O e-mail é obrigatório.'
    })
    @IsEmail({}, {
        message: 'O e-mail deve ser válido.'
    })
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(8, {
        message: 'A senha deve conter pelo menos 8 caracteres.'
    })
    @ApiProperty()
    password: string;
}
