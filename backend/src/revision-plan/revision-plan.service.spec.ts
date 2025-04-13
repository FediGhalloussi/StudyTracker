import { Test, TestingModule } from '@nestjs/testing';
import { RevisionPlanService } from './revision-plan.service';

describe('RevisionPlanService', () => {
  let service: RevisionPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevisionPlanService],
    }).compile();

    service = module.get<RevisionPlanService>(RevisionPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
