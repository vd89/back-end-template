import config from 'config';

export default {
  PORT: config.get('ENV.dev.PORT') || process.node.PORT,
};
