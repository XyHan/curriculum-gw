import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { FindOneCvByUuidQueryHandler } from './find-one-cv-by-uuid.query-handler';
import { FindOneCvByUuidQuery } from './find-one-cv-by-uuid.query';
import { CvQueryRepositoryInterface } from '../../../../domain/cv/repository/cv.query-repository.interface';
import { optionsFindOne } from '../../../../domain/shared/repository/repository.type';
import { CvModel } from '../../../../domain/cv/model/cv/cv.model';

describe('FindOneCvByUuidQueryHandler tests', () => {
  describe('success', () => {
    it('Find one cv by uuid', async () => {
      const loggerMock = new LoggerMock();
      const repositoryMock: CvQueryRepositoryInterface = {
        findOne: jest.fn((options: optionsFindOne) => {
          return new Promise((resolve) => {
            const cv = new CvModel();
            cv.uuid = options.uuid;
            setTimeout(() => resolve(cv), 20);
          });
        }),
        listAll: jest.fn()
      }
      const handler = new FindOneCvByUuidQueryHandler(repositoryMock, loggerMock);
      const query = new FindOneCvByUuidQuery('181a146e-8c58-44c2-a828-1439b606e1e7', []);
      const cv = await handler.handle(query);
      expect(cv.uuid).toEqual('181a146e-8c58-44c2-a828-1439b606e1e7');
    });
  });

  describe('error', () => {
    it('Repository exception', async () => {
      const loggerMock = new LoggerMock();
      const repositoryMock: CvQueryRepositoryInterface = {
        findOne: jest.fn((options: optionsFindOne) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error(`repository timeout`)), 20);
          });
        }),
        listAll: jest.fn()
      }
      const handler = new FindOneCvByUuidQueryHandler(repositoryMock, loggerMock);
      const query = new FindOneCvByUuidQuery('181a146e-8c58-44c2-a828-1439b606e1e7', []);
      try {
        await handler.handle(query);
      } catch (e) {
        expect(e.message).toEqual('FindOneCvByUuidQueryHandler - handler - error during handling query with uuid 181a146e-8c58-44c2-a828-1439b606e1e7: repository timeout');
      }
    });
  });
});
