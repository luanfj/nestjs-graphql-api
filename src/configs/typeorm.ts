import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:
    process.env.NODE_ENV === 'test'
      ? 'mongodb://localhost/nestjs-graphql-test'
      : 'mongodb://localhost/nestjs-graphql',
  synchronize: true,
  autoLoadEntities: true,
  useUnifiedTopology: true,
};
