import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class DeleteACvDto {
  @Field(type => String)
  @IsString()
  public requestId: string;

  @Field(type => String)
  @IsString()
  public uuid: string;
}
