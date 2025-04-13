import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentResolver } from './assignment.resolver';

@Module({
  providers: [AssignmentService, AssignmentResolver]
})
export class AssignmentModule {}
