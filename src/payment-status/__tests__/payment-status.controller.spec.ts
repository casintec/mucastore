import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStatusController } from '../payment-status.controller';
import { PaymentStatusService } from '../payment-status.service';

describe('PaymentStatusController', () => {
  let controller: PaymentStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentStatusController],
      providers: [PaymentStatusService],
    }).compile();

    controller = module.get<PaymentStatusController>(PaymentStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
