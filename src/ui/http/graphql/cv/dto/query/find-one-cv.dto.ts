import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class FindOneCvDto {
  @Field(type => String)
  @IsString()
  public uuid: string;
}
