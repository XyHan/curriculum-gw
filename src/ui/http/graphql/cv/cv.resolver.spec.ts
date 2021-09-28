import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { createACvCommandHandlerProvider } from '../../../../infrastructure/cv/provider/create-a-cv.command-handler.provider';
import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CreateACvCommandHandler } from '../../../../application/command/cv/create-a-cv/create-a-cv.command-handler';
import { PublisherService } from '../../../../infrastructure/amqp/publisher/publisher.service';
import { LoggerAdapterService } from '../../../../infrastructure/logger/logger-adapter.service';
import { ConfigService } from '../../../../infrastructure/config/config.service';
import { ConfigInterface } from '../../../../infrastructure/config/config.interface';

// Disables log
jest.mock('@nestjs/common/services/logger.service');

describe('CvResolver tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(createACvCommandHandlerProvider)
      .useValue({
        provide: 'CREATE_A_CV_COMMAND_HANDLER',
        useFactory: (publisher: PublisherInterface, logger: LoggerInterface, config: ConfigInterface) => {
          return new CreateACvCommandHandler(publisher, logger, config);
        },
        inject: [PublisherService, LoggerAdapterService, ConfigService],
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('success', () => {
    it('createACv mutation success', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation createACv {
              createACv(
                requestId: "181a146e-8c58-44c2-a828-1439b606e1e7"
                forname: "Jim"
                lastname: "Hopper"
                birthday: "2011-01-01T15:03:01.012345Z"
                githubLink: "https://github.com/jhopper"
                email: "jhopper@hawkins.com"
                nationality: "Américaine"
                title: "Chef de la police"
                zipCode: 54530
                city: "Hawkins"
              ) {
                requestId
              }
            }
        `
        });
      const data = response?.body?.data?.createACv;
      expect(data?.requestId).toEqual('181a146e-8c58-44c2-a828-1439b606e1e7');
    });
  });

  describe('error', () => {
    it('createACv mutation - fields missing - error', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation createACv {
              createACv(
                requestId: "181a146e-8c58-44c2-a828-1439b606e1e7"
              ) {
                requestId
              }
            }
        `
        });
      const errors = response?.body?.errors;
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(9);
      expect(errors[0].message).toEqual('Field "createACv" argument "lastname" of type "String!" is required, but it was not provided.');
      expect(errors[1].message).toEqual('Field "createACv" argument "forname" of type "String!" is required, but it was not provided.');
      expect(errors[2].message).toEqual('Field "createACv" argument "city" of type "String!" is required, but it was not provided.');
      expect(errors[3].message).toEqual('Field "createACv" argument "zipCode" of type "Float!" is required, but it was not provided.');
      expect(errors[4].message).toEqual('Field "createACv" argument "email" of type "String!" is required, but it was not provided.');
      expect(errors[5].message).toEqual('Field "createACv" argument "birthday" of type "DateTime!" is required, but it was not provided.');
      expect(errors[6].message).toEqual('Field "createACv" argument "nationality" of type "String!" is required, but it was not provided.');
      expect(errors[7].message).toEqual('Field "createACv" argument "githubLink" of type "String!" is required, but it was not provided.');
      expect(errors[8].message).toEqual('Field "createACv" argument "title" of type "String!" is required, but it was not provided.');
    });
  });
});
