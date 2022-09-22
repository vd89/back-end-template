import debug from 'debug';
import app from './src/app.js';
import appConfig from './src/appConfig.js';

const indexDebug = debug('app:index ->');
const { port } = appConfig;

(async ()=>{
  indexDebug('Starting the server');
  app.listen(port, () => {
    try {
      indexDebug(`Server is running on the http://localhost:${port}`);
    } catch (err) {
      indexDebug(err.message);
    }
  });
})();
