import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApplicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
