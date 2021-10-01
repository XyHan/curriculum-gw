import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { ConfigInterface } from '../../../config/config.interface';

export const cvEsIndexProvider: FactoryProvider = {
  provide: 'CV_ES_INDEX',
  useFactory: (configService: ConfigInterface) => {
    return configService.esIndexes.get('cv');
  },
  inject: [ConfigService],
}
