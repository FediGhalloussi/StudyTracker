import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Task } from './task.model';
import { CreateTaskInput } from './task.input';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => [Task])
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  async createTask(@Args('data') data: CreateTaskInput): Promise<Task> {
    return this.taskService.createTask(data);
  }
}
