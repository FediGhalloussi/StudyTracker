
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
        ...(data.examId ? { examId: data.examId } : {}),
        ...(data.assignmentId ? { assignmentId: data.assignmentId } : {}),
        ...(data.revisionPlanId ? { revisionPlanId: data.revisionPlanId } : {}),
      },
      include: {
        assignment: true,
        exam: true
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.task.delete({ where: { id } });
    return true;
  }
  async getTasksByDate(dateStr: string): Promise<Task[]> {
    const start = new Date(dateStr);
    const end = new Date(dateStr);
    end.setDate(end.getDate() + 1);

    return this.prisma.task.findMany({
      where: {
        scheduledAt: {
          gte: start,
          lt: end,
        },
      },
      orderBy: {
        scheduledAt: 'asc',
      },
      include: {
        assignment: true,
        exam: true,
      },
    });
  }
}
