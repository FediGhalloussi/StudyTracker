import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskInput } from './task.input';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async getTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async createTask(data: CreateTaskInput): Promise<Task> {
        // ici on pourrait rajouter une logique métier ex : vérifier un doublon, envoyer un mail, etc.
        return this.prisma.task.create({
            data,
        });
    }
}
