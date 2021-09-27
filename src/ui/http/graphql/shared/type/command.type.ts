import { Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommandType {
  @Field()
  @Expose()
  requestId: string;
}
