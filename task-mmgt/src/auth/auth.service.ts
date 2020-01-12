import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.reponsitory';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth_credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt_payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    signUp(authCredentialsDTO: AuthCredentialsDTO) {
        return this.userRepository.signUp(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDTO);
        if (!username) {
            throw new UnauthorizedException();
        }
        const payload: JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);
        return {accessToken};
    }
}
