import { CVInterface } from '../../../domain/cv/model/cv/cv.model';
import { EventInterface } from '../event.interface';

export class DeletedCvEvent implements EventInterface {
  constructor(public readonly cv: CVInterface) {}
}
