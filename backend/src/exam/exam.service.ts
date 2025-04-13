
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamInput } from './exam.input';
import { Exam } from '@prisma/client';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Exam[]> {
    return this.prisma.exam.findMany();
  }

  async create(data: CreateExamInput): Promise<Exam> {
    return this.prisma.exam.create({ data });
  }
}
