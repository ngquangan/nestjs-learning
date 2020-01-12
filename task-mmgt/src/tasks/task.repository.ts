import { Repository, EntityRepository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDTO } from './dto/create_task.dto';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { TaskStatus } from './task_status.enum';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    // custom method

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
            throw new InternalServerErrorException();
        }
        return tasks;
    }
    async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
        const { title, description } = createTaskDTO;
        const task = new TaskEntity();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        try {
            await task.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
        return task;
    }
}
