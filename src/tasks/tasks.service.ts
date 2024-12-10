import { Injectable, NotFoundException, Patch } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateClassDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('Task with id ' + id + ' not found');
    }

    return found;
  }
  createTask(createTaskDto: CreateClassDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(
        'Task no deleted, task with id ' + id + ' not found',
      );
    }
    return;
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
