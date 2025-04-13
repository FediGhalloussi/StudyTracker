import { Module } from '@nestjs/common';
import { RevisionPlanService } from './revision-plan.service';
import { RevisionPlanResolver } from './revision-plan.resolver';

@Module({
  providers: [RevisionPlanService, RevisionPlanResolver]
})
export class RevisionPlanModule {}
