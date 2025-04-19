
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

  @Mutation(() => Boolean)
  async deleteAssignment(@Args('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }

  @Mutation(() => Assignment)
  updateAssignment(
      @Args('id', { type: () => String }) id: string,
      @Args('input') input: CreateAssignmentInput,
  ) {
    return this.service.update(id, input);
  }

}
