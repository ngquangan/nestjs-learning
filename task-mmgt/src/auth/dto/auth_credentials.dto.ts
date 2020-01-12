import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}
