import { Test, TestingModule } from '@nestjs/testing';
import { OpenNotifyController } from './open-notify.controller';
import { OpenNotifyService } from './open-notify.service';

describe('OpenNotifyController', () => {
  let controller: OpenNotifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenNotifyController],
      providers: [OpenNotifyService]
    }).compile();

    controller = module.get<OpenNotifyController>(OpenNotifyController);
  });
});

