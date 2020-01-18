import { Controller, Get, Post, Body, Param, NotFoundException, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create_task.dto';
import { GetTasksFilterDTO } from './dto/get_tasks_filter.dto';
import { TaskStatusValidationPipe } from './pipes/task_status_validation.pipe';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task_status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get_user.decorator';
import { UserEntity } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {

    private logger = new Logger('TaskController');
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDTO: GetTasksFilterDTO,
        @GetUser() user: UserEntity,
        ): Promise<TaskEntity[]> {
        this.logger.verbose('User ' + user.username + ' retrieving all tasks ' + JSON.stringify(filterDTO));
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
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity> {
        this.logger.verbose('User ' +  user.username + ' creating a new task ' + JSON.stringify(createTaskDTO));
        return this.tasksService.createTask(createTaskDTO, user);
    }

    @Patch('/:id/status')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: UserEntity,
        ) {
        await this.tasksService.updateTaskStatus(id, status, user);
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
