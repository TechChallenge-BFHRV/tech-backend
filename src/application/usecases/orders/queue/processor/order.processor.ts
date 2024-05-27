import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { OrderQueueUseCase } from '../order-queue.usecase';

@Processor('order-queue')
export class OrderProcessor {
  constructor(private readonly orderQueueUseCase: OrderQueueUseCase) {}

  @Process()
  async handleOrder(job: Job) {
    const { orderId, status } = job.data;
    await this.orderQueueUseCase.updateOrderStatus(orderId, status);
    console.log(`Updated order ${orderId} to status ${status}`);
  }
}
