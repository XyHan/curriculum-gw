import { Injectable } from '@nestjs/common';
import { ConfigInterface } from './config.interface';

@Injectable()
export class ConfigService implements ConfigInterface {}
