import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectInput } from './subject.input';
import { Subject } from '@prisma/client';

@Injectable()
export class SubjectService {
    constructor(private prisma: PrismaService) {}

    async getSubjects(): Promise<Subject[]> {
        return this.prisma.subject.findMany();
    }

    async createSubject(data: CreateSubjectInput): Promise<Subject> {
        return this.prisma.subject.create({ data });
    }
}
