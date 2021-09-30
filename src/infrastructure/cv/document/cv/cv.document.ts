import { CVInterface } from '../../../../domain/cv/model/cv/cv.model';
import { Expose } from 'class-transformer';

export class CvDocument implements CVInterface {
  @Expose()
  birthday: string;

  @Expose()
  city: string;

  @Expose()
  email: string;

  @Expose()
  firstname: string;

  @Expose()
  githubLink: string;

  @Expose()
  lastname: string;

  @Expose()
  nationality: string;

  @Expose()
  title: string;

  @Expose()
  uuid: string;

  @Expose()
  zipCode: number;
}
