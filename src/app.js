import express from 'express';
import debug from 'debug';
import cookieParser from 'cookie-parser';
import i18n from 'i18n';
import path from 'path';
import appConfig from './appConfig.js';
import { sessionConfig } from './helper/sessionHelper.js';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';

const app = express();
const appLog = debug('app:app -> ');
const { availableLocals, defaultLanguage, projectRoot, whiteList } = appConfig;

i18n.configure({
  locales: availableLocals,
  directory: path.join(projectRoot, 'src', 'locals'),
  defaultLocale: defaultLanguage,
});
if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookies.secure = true; // serve secure cookies
}

const corsOptions = {
  origin: function(origin, callBack) {
    if (whiteList.indexOf(origin) !== -1) {
      callBack(null, true);
    } else {
      callBack(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(i18n.init);
app.use(cookieParser());
app.use(
    session({
      name: 'back-end-temp',
      key: sessionConfig.key,
      secret: sessionConfig.secret,
      resave: sessionConfig.resave,
      saveUninitialized: sessionConfig.saveUninitialized,
      cookie: sessionConfig.cookies,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
// app.use(cors());

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
