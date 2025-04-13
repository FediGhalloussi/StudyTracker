
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput } from './task.input';
import { Task } from '@prisma/client';
import { TaskType } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async create(data: CreateTaskInput): Promise<Task> {
    return  this.prisma.task.create({
      data: {
        title: data.title,
        type: data.type as TaskType,
        scheduledAt: new Date(data.scheduledAt),
        duration: data.duration,
        done: data.done,
        ...(data.examId ? { examId: data.examId } : {}),
        ...(data.assignmentId ? { assignmentId: data.assignmentId } : {}),
        ...(data.revisionPlanId ? { revisionPlanId: data.revisionPlanId } : {}),
      },
    });
  }
}
