import { EggPlugin } from 'midway';

export default {
  static: true, // default is true
  mongoose: {
    enable: false,
    package: 'egg-mongoose',
  },
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  cache9: {
    enable: true,
    package: 'egg-cache-9',
  },
} as EggPlugin;
