import {
  Args,
  Context,
  Mutation, Query,
  Resolver,
} from '@nestjs/graphql';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../../../infrastructure/logger/logger-adapter.service';
import { CommandBus, ICommandBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { CommandType } from '../shared/type/command.type';
import { CvType } from './type/cv.type';
import { CreateACvDto } from './dto/create-a-cv.dto';
import { CreateACvCommand } from '../../../../application/command/cv/create-a-cv/create-a-cv.command';
import { ResolverException } from '../shared/exception/resolver.exception';
import { v4 as uuidV4 } from 'uuid';

@Resolver(of => CvType)
export class CvResolver {
  constructor(
    @Inject(LoggerAdapterService) private readonly logger: LoggerAdapterService,
    @Inject(CommandBus) private readonly commandBus: ICommandBus,
  ) {}

  @Query(returns => [CvType])
  public async listAllCVs(@Context() context): Promise<CvType[]> {
    try {
      return [];
    } catch (e) {
      throw this.httpException500(`Error during CVs listing`, context, e);
    }
  }

  @Mutation(returns => CommandType)
  async createACv(
    @Context() context,
    @Args() args: CreateACvDto,
  ): Promise<CommandType> {
    try {
      const command = plainToClass(
        CreateACvCommand,
        Object.assign({}, args, { userUuid: '47546f8f-67ba-478e-b948-a8fe2746de6e', uuid: uuidV4() })
      );
      const handledCommand = await this.commandBus.execute(command);
      return plainToClass(CommandType, handledCommand, { strategy: 'excludeAll', excludeExtraneousValues: true });
    } catch (e) {
      throw this.httpException500(`Error during CV creation - requestId ${args.requestId}`, context, e);
    }
  }

  private httpException500(message: string, context: any, cause: Error): HttpException {
    this.logger.verror(new ResolverException(`CvResolver - ${message}`, context, cause));
    return new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
