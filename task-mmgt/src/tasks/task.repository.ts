import { Repository, EntityRepository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDTO } from './dto/create_task.dto';
import { HttpException, InternalServerErrorException, Logger } from '@nestjs/common';
import { TaskStatus } from './task_status.enum';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';
import { UserEntity } from 'src/auth/user.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    // custom method

    private logger = new Logger('TaskRepository');

    async getTasks(filterDTO: GetTasksFilterDTO): Promise<TaskEntity[]> {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }
        let tasks: TaskEntity[];
        try {
            tasks = await query.getMany();
        } catch (error) {
            this.logger.error('Failed get tasks for user ');
            throw new InternalServerErrorException();
        }
        return tasks;
    }
    async createTask(createTaskDTO: CreateTaskDTO, user: UserEntity): Promise<TaskEntity> {
        const { title, description } = createTaskDTO;
        const task = new TaskEntity();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        try {
            await task.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

        delete task.user;
        return task;
    }
}
