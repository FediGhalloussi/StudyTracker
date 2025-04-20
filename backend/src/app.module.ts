
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { SubjectModule } from './subject/subject.module';
import { ChapterModule } from './chapter/chapter.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ExamModule } from './exam/exam.module';
import { RevisionPlanModule } from './revision-plan/revision-plan.module';
import '../prisma/enums.graphql';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // accessible partout sans devoir l’importer dans chaque module
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
    TaskModule,
    SubjectModule,
    ChapterModule,
    AssignmentModule,
    ExamModule,
    RevisionPlanModule,
  ],
})
export class AppModule {}
