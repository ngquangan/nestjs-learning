import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.reponsitory';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth_credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    signUp(authCredentialsDTO: AuthCredentialsDTO) {
        return this.userRepository.signUp(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        const result = await this.userRepository.validateUserPassword(authCredentialsDTO);
        if (!result) {
            throw new UnauthorizedException();
        }
        return result;
    }
}
