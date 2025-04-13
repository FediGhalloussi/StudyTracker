
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentInput } from './assignment.input';
import { Assignment } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      include: { // à changer selon les besoins du front
        subject: true,
      },
    });
  }

  async create(data: CreateAssignmentInput): Promise<Assignment> {
    return this.prisma.assignment.create({ data });
  }
}
