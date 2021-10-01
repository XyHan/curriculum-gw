import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { CvDataES } from './data/cv/cv.data-es';
import { CVInterface } from '../src/domain/cv/model/cv/cv.model';

export class FixtureService {
  public static async init(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app: INestApplication = moduleFixture.createNestApplication();
    await app.init();
    await this.loadFixtures(app);

    return app;
  }

  public static async close(app: INestApplication): Promise<void> {
    await this.deleteFixtures(app);
    await app.close();
  }

  private static async loadFixtures(app: INestApplication): Promise<void> {
    const elasticsearchService: ElasticsearchService = app.get(ElasticsearchService);
    await this.loadCvFixtures(elasticsearchService);
  }

  private static async deleteFixtures(app: INestApplication): Promise<void> {
    const elasticsearchService: ElasticsearchService = app.get(ElasticsearchService);
    const indexes: string[] = [CvDataES.index];
    await Promise.all(indexes.map((index: string) => this.deleteData(elasticsearchService, index)));
  }

  private static async loadCvFixtures(elasticsearchService: ElasticsearchService): Promise<void> {
    const index = CvDataES.index;
    await Promise.all(CvDataES.data.map((datum: CVInterface) => {
      this.indexData(elasticsearchService, index, datum);
    }));
  }

  private static async indexData(elasticsearchService: ElasticsearchService, index: string, datum: any): Promise<void> {
    await elasticsearchService.index({
      refresh: true,
      index,
      id: datum.uuid,
      body: datum
    })
  }

  private static async deleteData(elasticsearchService: ElasticsearchService, index: string): Promise<void> {
    setTimeout(async () => {
      await elasticsearchService.deleteByQuery({
        refresh: true,
        allow_no_indices: true,
        conflicts: 'proceed',
        index,
        body: {
          query: {
            match_all: {}
          }
        }
      })
    }, 500);
  }
}
