
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChapterInput } from './chapter.input';
import { Chapter } from '@prisma/client';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Chapter[]> {
    return this.prisma.chapter.findMany({
      include: { subject: true }
    });
  }

  async create(data: CreateChapterInput): Promise<Chapter> {
    return this.prisma.chapter.create({
      data,
      include: { subject: true },
    });
  }

}
