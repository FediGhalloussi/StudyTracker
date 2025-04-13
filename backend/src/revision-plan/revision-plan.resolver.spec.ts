import { Test, TestingModule } from '@nestjs/testing';
import { RevisionPlanResolver } from './revision-plan.resolver';

describe('RevisionPlanResolver', () => {
  let resolver: RevisionPlanResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevisionPlanResolver],
    }).compile();

    resolver = module.get<RevisionPlanResolver>(RevisionPlanResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
