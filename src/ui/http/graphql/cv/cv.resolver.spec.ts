import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FixtureService } from '../../../../../test/fixture.service';

// Disables log
jest.mock('@nestjs/common/services/logger.service');

describe('CvResolver tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await FixtureService.init();
  });

  afterAll(async () => {
    await FixtureService.close(app);
  })

  describe('success', () => {
    it('createACv mutation success', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation createACv {
              createACv(
                requestId: "181a146e-8c58-44c2-a828-1439b606e1e7"
                firstname: "Jim"
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

    it('updateACv mutation success', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation updateACv {
              updateACv(
                requestId: "181a146e-8c58-44c2-a828-1439b606e1e7"
                uuid: "5643be26-29c7-44dd-a336-7dd6909fd909"
                firstname: "Jim"
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
      const data = response?.body?.data?.updateACv;
      expect(data?.requestId).toEqual('181a146e-8c58-44c2-a828-1439b606e1e7');
    });

    it('deleteACv mutation success', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation  deleteACv {
              deleteACv(
                requestId: "181a146e-8c58-44c2-a828-1439b606e1e7"
                uuid: "5643be26-29c7-44dd-a336-7dd6909fd909"
              ) {
                requestId
              }
            }
        `
        });
      const data = response?.body?.data?.deleteACv;
      expect(data?.requestId).toEqual('181a146e-8c58-44c2-a828-1439b606e1e7');
    });

    it('FindOneCV query success', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            {
              findOneCV(uuid: "236ab0d3-adc4-498d-bce8-95c5bcdfb4d3") {
                birthday
                city
                email
                firstname
                githubLink
                lastname
                nationality
                uuid
                zipCode
                title
              }
            }
        `
        });
      const data = response?.body?.data?.findOneCV;
      expect(data?.uuid).toEqual('236ab0d3-adc4-498d-bce8-95c5bcdfb4d3');
      expect(data?.firstname).toEqual('Joyce');
      expect(data?.lastname).toEqual('Byers');
      expect(data?.title).toEqual('Vendeuse');
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
      expect(errors[1].message).toEqual('Field "createACv" argument "firstname" of type "String!" is required, but it was not provided.');
      expect(errors[2].message).toEqual('Field "createACv" argument "city" of type "String!" is required, but it was not provided.');
      expect(errors[3].message).toEqual('Field "createACv" argument "zipCode" of type "Float!" is required, but it was not provided.');
      expect(errors[4].message).toEqual('Field "createACv" argument "email" of type "String!" is required, but it was not provided.');
      expect(errors[5].message).toEqual('Field "createACv" argument "birthday" of type "DateTime!" is required, but it was not provided.');
      expect(errors[6].message).toEqual('Field "createACv" argument "nationality" of type "String!" is required, but it was not provided.');
      expect(errors[7].message).toEqual('Field "createACv" argument "githubLink" of type "String!" is required, but it was not provided.');
      expect(errors[8].message).toEqual('Field "createACv" argument "title" of type "String!" is required, but it was not provided.');
    });

    it('updateACv mutation - fields missing - error', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation updateACv {
              updateACv(
                requestId: "181a146e-8c58-44c2-a828-1439b606e1e7"
              ) {
                requestId
              }
            }
        `
        });
      const errors = response?.body?.errors;
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(10);
      expect(errors[0].message).toEqual('Field "updateACv" argument "uuid" of type "String!" is required, but it was not provided.');
      expect(errors[1].message).toEqual('Field "updateACv" argument "lastname" of type "String!" is required, but it was not provided.');
      expect(errors[2].message).toEqual('Field "updateACv" argument "firstname" of type "String!" is required, but it was not provided.');
      expect(errors[3].message).toEqual('Field "updateACv" argument "city" of type "String!" is required, but it was not provided.');
      expect(errors[4].message).toEqual('Field "updateACv" argument "zipCode" of type "Float!" is required, but it was not provided.');
      expect(errors[5].message).toEqual('Field "updateACv" argument "email" of type "String!" is required, but it was not provided.');
      expect(errors[6].message).toEqual('Field "updateACv" argument "birthday" of type "DateTime!" is required, but it was not provided.');
      expect(errors[7].message).toEqual('Field "updateACv" argument "nationality" of type "String!" is required, but it was not provided.');
      expect(errors[8].message).toEqual('Field "updateACv" argument "githubLink" of type "String!" is required, but it was not provided.');
      expect(errors[9].message).toEqual('Field "updateACv" argument "title" of type "String!" is required, but it was not provided.');
    });

    it('deleteACv mutation - fields missing - error', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation deleteACv {
              deleteACv(
                requestId: "181a146e-8c58-44c2-a828-1439b606e1e7"
              ) {
                requestId
              }
            }
        `
        });
      const errors = response?.body?.errors;
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);
      expect(errors[0].message).toEqual('Field "deleteACv" argument "uuid" of type "String!" is required, but it was not provided.');
    });

    it('FindOneCV query 404', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            {
              findOneCV(uuid: "236ab0d3-xxxx-xxxx-bce8-95c5bcdfb4d3") {
                birthday
              }
            }
        `
        });
      const errors = response?.body?.errors;
      expect(errors.length).toEqual(1);
      expect(errors[0].message).toEqual('CV 236ab0d3-xxxx-xxxx-bce8-95c5bcdfb4d3 not found');
    });
  });
});
