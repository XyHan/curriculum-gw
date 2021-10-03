import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { DateTime } from '../../../shared/type/datetime.type';

@ArgsType()
export class CreateACvDto {
  @Field(type => String)
  @IsString()
  public requestId: string;

  @Field(type => String)
  @IsString()
  public lastname: string;

  @Field(type => String)
  @IsString()
  public firstname: string;

  @Field(type => String)
  @IsString()
  public city: string;

  @Field(type => Number)
  @IsNumber()
  public zipCode: number;

  @Field(type => String)
  @IsString()
  public email: string;

  @Field(type => DateTime)
  public birthday: string;

  @Field(type => String)
  @IsString()
  public nationality: string;

  @Field(type => String)
  @IsString()
  public githubLink: string;

  @Field(type => String)
  @IsString()
  public title: string;
}
