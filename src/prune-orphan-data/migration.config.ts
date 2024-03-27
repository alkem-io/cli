import { DataSource } from 'typeorm';
import { typeormCliConfig } from './typeorm.cli.config.run';

export const datasource = new DataSource(typeormCliConfig);
