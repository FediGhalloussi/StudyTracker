
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Assignment } from './assignment.model';
import { CreateAssignmentInput } from './assignment.input';
import { AssignmentService } from './assignment.service';

@Resolver(() => Assignment)
export class AssignmentResolver {
  constructor(private service: AssignmentService) {}

  @Query(() => [Assignment])
  getAllAssignments() {
    return this.service.getAll();
  }

  @Mutation(() => Assignment)
  createAssignment(@Args('data') data: CreateAssignmentInput) {
    return this.service.create(data);
  }
}
