import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth_credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() authCredentialsDTO: AuthCredentialsDTO) {
        const user = await this.authService.signUp(authCredentialsDTO);
        return {
            username: user.username,
        };
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() authCredentialsDTO: AuthCredentialsDTO) {
        const username = await this.authService.signIn(authCredentialsDTO);
        return {
            username,
        };
    }
}
