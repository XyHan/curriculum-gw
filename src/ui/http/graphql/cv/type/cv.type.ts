import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class CvType {
  @Expose()
  @Field()
  uuid: string;
}
