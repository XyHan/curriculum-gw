import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { UiHttpModule } from './ui/http/ui-http.module';

@Module({
  imports: [
    InfrastructureModule,
    UiHttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
