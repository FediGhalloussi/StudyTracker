
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RevisionPlan } from './revision-plan.model';
import { CreateRevisionPlanInput } from './revision-plan.input';
import { RevisionPlanService } from './revision-plan.service';

@Resolver(() => RevisionPlan)
export class RevisionPlanResolver {
  constructor(private service: RevisionPlanService) {}

  @Query(() => [RevisionPlan])
  getAllRevisionPlans() {
    return this.service.getAll();
  }

  @Mutation(() => RevisionPlan)
  createRevisionPlan(@Args('data') data: CreateRevisionPlanInput) {
    return this.service.create(data);
  }
}
