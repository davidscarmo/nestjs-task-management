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
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { search, status } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.title.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

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
  // deleteTaskById(id: string): Task {
  //   const indexTask = this.tasks.findIndex((task) => task.id === id);
  //   if (indexTask < 0) {
  //     throw new NotFoundException('Task with id ' + id + ' not found');
  //   }
  //   const deletedTask = this.tasks[indexTask];
  //   this.tasks.splice(indexTask, 1);
  //   return deletedTask;
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}