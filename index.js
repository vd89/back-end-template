import debug from 'debug';
import app from './src/app.js';
import appConfig from './src/appConfig.js';

const indexDebug = debug('app:index ->');
const { PORT } = appConfig;

(async ()=>{
  indexDebug('Starting the server');
  await app.listen(PORT, () => {
    try {
      indexDebug(`Server is running on the http://localhost:${PORT}`);
    } catch (err) {
      indexDebug(err.message);
    }
  });
})();
