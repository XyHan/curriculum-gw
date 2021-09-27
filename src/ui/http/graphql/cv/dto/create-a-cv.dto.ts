import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class CreateACvDto {
  @Field(type => String)
  @IsOptional()
  @IsString()
  requestId: string;
}
