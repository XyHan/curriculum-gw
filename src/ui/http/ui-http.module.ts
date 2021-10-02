import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CvResolver } from './graphql/cv/cv.resolver';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { CqrsModule } from '@nestjs/cqrs';
import { PubSubModule } from '../../infrastructure/pub-sub/pub-sub.module';

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({
        headers: req?.headers,
      }),
    }),
    PubSubModule,
  ],
  providers: [
    CvResolver
  ],
})
export class UiHttpModule {}
