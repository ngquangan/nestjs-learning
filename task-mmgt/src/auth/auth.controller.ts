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
    signUp(@Body() authCredentialsDTO: AuthCredentialsDTO) {
        return this.authService.signUp(authCredentialsDTO);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() authCredentialsDTO: AuthCredentialsDTO) {
        return this.authService.signIn(authCredentialsDTO);
    }
}
