import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskEntity } from 'src/tasks/task.entity';
import { UserEntity } from 'src/auth/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'task_mmgt_system',
    entities: [TaskEntity, UserEntity],
    synchronize: true,
};
