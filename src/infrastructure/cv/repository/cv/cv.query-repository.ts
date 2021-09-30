import { Injectable } from '@nestjs/common';
import { CvQueryRepositoryInterface } from '../../../../domain/cv/repository/cv.query-repository.interface';
import { CVInterface } from '../../../../domain/cv/model/cv/cv.model';
import { optionsFindAll, optionsFindOne } from '../../../../domain/shared/repository/repository.type';
import { GetQuery, GetQueryBuilder } from '../../../elasticsearch/get-query.builder';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ApiResponse } from '@elastic/elasticsearch';
import { plainToClass } from 'class-transformer';
import { CvQueryRepositoryException } from './cv.query-repository.exception';
import { CvDocument } from '../../document/cv/cv.document';

@Injectable()
export class CvQueryRepository implements CvQueryRepositoryInterface {
  private readonly index: string;
  private readonly elasticsearchService: ElasticsearchService

  constructor(elasticsearchService: ElasticsearchService) {
    this.elasticsearchService = elasticsearchService;
    this.index = 'cv';
  }

  public async findOne(options: optionsFindOne): Promise<CVInterface | null> {
    const query: GetQuery = new GetQueryBuilder(this.index, options.uuid)
      .addSources(options.sources || [])
      .query
    ;

    try {
      const response: ApiResponse<any> = await this.elasticsearchService.get<CvDocument>(query);
      return plainToClass(CvDocument, response.body._source, { strategy: 'excludeAll', excludeExtraneousValues: true });
    } catch (e) {
      if (e.status === 404) {
        return null;
      }
      throw new CvQueryRepositoryException(`CvQueryRepository - Error on findOne uuid '${options.uuid}'`, query, e);
    }
  }

  public async listAll(options: optionsFindAll): Promise<CVInterface[]> {
    return Promise.resolve([]);
  }
}
