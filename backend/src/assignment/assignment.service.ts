
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentInput } from './assignment.input';
import { Assignment } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      include: {
        subject: true,
      },
    });
  }

  async create(data: CreateAssignmentInput): Promise<Assignment> {
    return this.prisma.assignment.create({
      data,
      include: {
        subject: true,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.assignment.delete({ where: { id } });
    return true;
  }
}
