import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class CvType {
  @Expose()
  @Field()
  uuid: string;

  @Expose()
  @Field()
  birthday: string;

  @Expose()
  @Field()
  city: string;

  @Expose()
  @Field()
  email: string;

  @Expose()
  @Field()
  firstname: string;

  @Expose()
  @Field()
  githubLink: string;

  @Expose()
  @Field()
  lastname: string;

  @Expose()
  @Field()
  nationality: string;

  @Expose()
  @Field()
  title: string;

  @Expose()
  @Field()
  zipCode: number;
}
