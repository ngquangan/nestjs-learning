import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth_credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get_user.decorator';

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
        return this.authService.signIn(authCredentialsDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: UserEntity) {
        console.log(user);
    }
}
