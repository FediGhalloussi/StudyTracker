
import { Resolver, Query } from '@nestjs/graphql';
import { Task } from './task.model';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Task])
  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }
}
