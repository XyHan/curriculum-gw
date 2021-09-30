import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConfigInterface } from '../config/config.interface';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigInterface) => ({
        node: configService.esNode,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [
    ElasticsearchModule
  ]
})
export class SearchModule {}
