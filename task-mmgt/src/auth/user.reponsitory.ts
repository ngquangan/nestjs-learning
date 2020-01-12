import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth_credentials.dto';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<UserEntity> {
        const { username, password } = authCredentialsDTO;

        const salt = await bcrypt.genSalt(13);

        const hashedPassword = await this.hashPassword(password, salt);

        const user = new UserEntity();
        user.username = username;
        user.salt = salt;
        user.password = hashedPassword;

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists!');
            }
            throw new InternalServerErrorException();
        }
        return user;
    }

    async validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        const { username, password } = authCredentialsDTO;
        const user = await this.findOne({username});
        if (!user) {
            throw new NotFoundException();
        }
        const isCompare = user && await user.validatePassword(password);
        if (isCompare) {
            return user.username;
        }
        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
