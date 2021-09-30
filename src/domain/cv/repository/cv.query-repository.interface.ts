import { CVInterface } from '../model/cv/cv.model';
import { optionsFindAll, optionsFindOne } from '../../shared/repository/repository.type';

export interface CvQueryRepositoryInterface {
  findOne(options: optionsFindOne): Promise<CVInterface | null>;
  listAll(options: optionsFindAll): Promise<CVInterface[]>;
}
