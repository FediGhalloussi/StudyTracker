
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Chapter } from './chapter.model';
import { CreateChapterInput } from './chapter.input';
import { ChapterService } from './chapter.service';

@Resolver(() => Chapter)
export class ChapterResolver {
  constructor(private service: ChapterService) {}

  @Query(() => [Chapter])
  getAllChapters() {
    return this.service.getAll();
  }

  @Mutation(() => Chapter)
  createChapter(@Args('data') data: CreateChapterInput) {
    return this.service.create(data);
  }
}
