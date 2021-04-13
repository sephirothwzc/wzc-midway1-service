import { provide } from 'midway';

export interface IMigrationsService extends MigrationsService {}

@provide()
export class MigrationsService {}
