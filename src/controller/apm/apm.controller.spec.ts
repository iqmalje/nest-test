import { Test, TestingModule } from '@nestjs/testing';
import { ApmController } from './apm.controller';

describe('ApmController', () => {
  let controller: ApmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApmController],
    }).compile();

    controller = module.get<ApmController>(ApmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
