/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [],
})
export class InfraestructureModule {}
