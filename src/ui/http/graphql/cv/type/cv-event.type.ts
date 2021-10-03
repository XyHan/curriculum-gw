import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { CvType } from './cv.type';

@ObjectType()
export class CvEventType {
  @Expose()
  @Field()
  cv: CvType;

  @Expose()
  @Field()
  name: string;
}
