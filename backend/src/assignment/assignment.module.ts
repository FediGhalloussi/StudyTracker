import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentResolver } from './assignment.resolver';
import { registerEnumType } from '@nestjs/graphql';

@Module({
  providers: [AssignmentService, AssignmentResolver]
})
export class AssignmentModule {}
