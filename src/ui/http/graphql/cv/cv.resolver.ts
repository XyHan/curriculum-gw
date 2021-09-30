import {
  Args,
  Context,
  Mutation, Query,
  Resolver,
} from '@nestjs/graphql';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { LoggerAdapterService } from '../../../../infrastructure/logger/logger-adapter.service';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { CommandType } from '../shared/type/command.type';
import { CvType } from './type/cv.type';
import { CreateACvDto } from './dto/create-a-cv.dto';
import { CreateACvCommand } from '../../../../application/command/cv/create-a-cv/create-a-cv.command';
import { ResolverException } from '../shared/exception/resolver.exception';
import { v4 as uuidV4 } from 'uuid';
import { UpdateACvDto } from './dto/update-a-cv.dto';
import { UpdateACvCommand } from '../../../../application/command/cv/update-a-cv/update-a-cv.command';
import { FindOneCvDto } from './dto/find-one-cv.dto';
import { FindOneCvByUuidQuery } from '../../../../application/query/cv/find-one-cv-by-uuid/find-one-cv-by-uuid.query';

@Resolver(of => CvType)
export class CvResolver {
  constructor(
    @Inject(LoggerAdapterService) private readonly logger: LoggerAdapterService,
    @Inject(CommandBus) private readonly commandBus: ICommandBus,
    @Inject(QueryBus) private readonly queryBus: IQueryBus,
  ) {}

  @Query(returns => CvType)
  public async findOneCV(
    @Context() context,
    @Args() args: FindOneCvDto,
  ): Promise<CvType> {
    try {
      const query = plainToClass(FindOneCvByUuidQuery, Object.assign({}, args, { sources: [] }));
      const cvDocument = await this.queryBus.execute(query);
      if (!cvDocument) this.httpException404(`CV ${args.uuid} not found`);
      return plainToClass(CvType, cvDocument, { strategy: 'excludeAll', excludeExtraneousValues: true });
    } catch (e) {
      throw this.httpException500(`Error during find one cv with uuid ${args.uuid}`, context, e);
    }
  }

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

  @Mutation(returns => CommandType)
  async updateACv(
    @Context() context,
    @Args() args: UpdateACvDto,
  ): Promise<CommandType> {
    try {
      const command = plainToClass(
        UpdateACvCommand,
        Object.assign({}, args, { userUuid: '47546f8f-67ba-478e-b948-a8fe2746de6e' })
      );
      const handledCommand = await this.commandBus.execute(command);
      return plainToClass(CommandType, handledCommand, { strategy: 'excludeAll', excludeExtraneousValues: true });
    } catch (e) {
      throw this.httpException500(`Error during CV update - requestId ${args.requestId} | uuid: ${args.uuid}`, context, e);
    }
  }

  private httpException500(message: string, context: any, cause: Error): HttpException {
    this.logger.verror(new ResolverException(`CvResolver - ${message}`, context, cause));
    return new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  private httpException404(message: string): HttpException {
    this.logger.log(message);
    return new HttpException(message, HttpStatus.NOT_FOUND);
  }
}
