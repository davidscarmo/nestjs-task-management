import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateClassDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() tasksFilterDto?: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(tasksFilterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskDto,
  ) {
    const { status } = updateTaskStatus;

    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateClassDto) {
    return this.tasksService.createTask(createTaskDto);
  }
}
