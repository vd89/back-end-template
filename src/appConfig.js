import config from 'config';
import path from 'path';
const __dirname = path.resolve();
export default {
  port: config.get('PORT') || '',
  availableLocals: config.get('AVAILABLE_LOCALS') || '',
  defaultLanguage: config.get('DEFAULT_LANGUAGE') || '',
  projectRoot: path.join(__dirname, '.'),
  sessionSecret: config.get('SESSION_SECRET') || '',
  jwtSecret: config.get('JWT_SECRET') || '',
  whiteList: config.get('CORS_WHITELIST') || [],
};
