import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Subject } from './subject.model';
import { CreateSubjectInput } from './subject.input';
import { SubjectService } from './subject.service';

@Resolver(() => Subject)
export class SubjectResolver {
    constructor(private subjectService: SubjectService) {}

    @Query(() => [Subject])
    getSubjects() {
        return this.subjectService.getSubjects();
    }

    @Mutation(() => Subject)
    createSubject(@Args('data') data: CreateSubjectInput) {
        return this.subjectService.createSubject(data);
    }
}
