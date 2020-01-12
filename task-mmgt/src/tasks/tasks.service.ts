import { Injectable, NotFoundException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create_task.dto';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task_status.enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
    async getAllTasks(filterDTO: GetTasksFilterDTO): Promise<TaskEntity[]> {
        return this.taskRepository.getTasks(filterDTO);
    }

    async getTaskById(id: number): Promise<TaskEntity> {
        let found: TaskEntity;
        try {
            found = await this.taskRepository.findOne(id);
        } catch (error) {
            found = null;
        }
        if (!found) {
            throw new NotFoundException();
        }
        return found;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    async updateTaskStatus(id: number, status: TaskStatus) {
        let task: TaskEntity;
        try {
            task = await this.getTaskById(id);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        if (!task) {
            throw new NotFoundException();
        }

        task.status = status;

        try {
            await task.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteTask(id: number) {
        let result: DeleteResult;
        try {
            result = await this.taskRepository.delete(id);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        if (!result.affected) {
            throw new NotFoundException();
        }
    }
}
