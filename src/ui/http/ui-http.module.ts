import { Module } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [],
  providers: [AuthGuard],
})
export class UiHttpModule {}
