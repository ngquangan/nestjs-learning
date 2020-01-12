import { Controller, Get, Post, Body, Param, NotFoundException, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create_task.dto';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';
import { TaskStatusValidationPipe } from './pipes/task_status_validation.pipe';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task_status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Promise<TaskEntity[]> {
        return this.tasksService.getAllTasks(filterDTO);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe) // auto check if body is DTO and has validator
    createTask(
        @Body() createTaskDTO: CreateTaskDTO,
    ): Promise<TaskEntity> {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch('/:id/status')
    async updateTask(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus) {
        await this.tasksService.updateTaskStatus(id, status);
        return {
            status: 'OK',
        };
    }

    @Delete('/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        await this.tasksService.deleteTask(id);
        return {
            status: 'OK',
        };
    }
}
