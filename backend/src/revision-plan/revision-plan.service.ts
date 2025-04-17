
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRevisionPlanInput } from './revision-plan.input';
import { RevisionPlan } from '@prisma/client';

@Injectable()
export class RevisionPlanService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<RevisionPlan[]> {
    return this.prisma.revisionPlan.findMany({
      include: {
        tasks: true,
      },
    });
  }

  async create(data: CreateRevisionPlanInput): Promise<RevisionPlan> {
    return this.prisma.revisionPlan.create({ data });
  }
}
