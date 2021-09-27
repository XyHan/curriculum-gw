import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CvResolver } from './graphql/cv/cv.resolver';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    GraphQLModule.forRoot({
      debug: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({
        headers: req?.headers,
      }),
    }),
  ],
  providers: [
    CvResolver
  ],
})
export class UiHttpModule {}
