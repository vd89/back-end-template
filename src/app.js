import express from 'express';
import debug from 'debug';

const app = express();
const appLog = debug('app:app -> ');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', async (req, res, next) => {
  try {
    return res.status(200).json({
      msg: 'Success',
      status: 200,
      data: 'Pong',
    });
  } catch (e) {
    appLog(e.message);
    next(e);
  }
});

export default app;
