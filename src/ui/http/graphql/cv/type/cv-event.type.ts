import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class CvEventType {
  @Expose()
  @Field({ nullable: true })
  uuid?: string;
}
