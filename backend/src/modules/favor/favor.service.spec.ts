import { Test, TestingModule } from '@nestjs/testing';
import { FavorService } from './favor.service';

describe('FavorService', () => {
  let service: FavorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavorService],
    }).compile();

    service = module.get<FavorService>(FavorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
