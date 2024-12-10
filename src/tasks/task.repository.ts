import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateClassDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  public async createTask(createTaskDto: CreateClassDto): Promise<Task> {
    const { description, title } = createTaskDto;
    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
}
