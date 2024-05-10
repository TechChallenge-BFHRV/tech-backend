import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraestructureModule } from './infraestructure/infrastructure.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), InfraestructureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
