import { CVInterface } from '../../../src/domain/cv/model/cv/cv.model';

export class CvDataES {
  public static readonly index = 'cv_test';
  public static readonly data: CVInterface[] = [
    {
      uuid: '8a6e1de2-d81b-4236-9e1b-d9c6730f1561',
      firstname: 'Jim',
      lastname: 'Hopper',
      title: 'Chef de la police',
      email: 'jhopper@hawkins.com',
      city: 'Hawkins',
      zipCode: 54530,
      birthday: '2021-09-29T18:41:46+00:00',
      nationality: 'Américaine',
      githubLink: 'https://github.com/jhopper'
    },
    {
      uuid: '236ab0d3-adc4-498d-bce8-95c5bcdfb4d3',
      firstname: 'Joyce',
      lastname: 'Byers',
      title: 'Vendeuse',
      email: 'jbyers@hawkins.com',
      city: 'Hawkins',
      zipCode: 54530,
      birthday: '2021-09-29T18:41:46+00:00',
      nationality: 'Américaine',
      githubLink: 'https://github.com/jbyers'
    },
    {
      uuid: '838a83c1-02cf-4407-8d08-fc2798bbb3bb',
      firstname: 'Jane',
      lastname: 'Hopper',
      title: 'Télékinésiste',
      email: 'jahopper@hawkins.com',
      city: 'Hawkins',
      zipCode: 54530,
      birthday: '2021-09-29T18:41:46+00:00',
      nationality: 'Américaine',
      githubLink: 'https://github.com/jhopper'
    }
  ];
}
