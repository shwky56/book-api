import express from 'express';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.yaml';

import fs from 'fs';
import yaml from 'js-yaml';

const docs = yaml.load(fs.readFileSync('swagger.yaml', 'utf8'));


// import { swaggerUi, specs } from './swagger .js';
import UserAPIView from './user/api/views.js';
import BookAPIView from './book/api/views.js';
import SearchAPIView from './search/api/routers.js'
import RequestAPIView from './request/api/views.js';
import ChapterAPIView from './chapter/api/views.js';
import restAuthRouters from './rest-auth/api/router.js';
import bookView from './book/views.js';
import swaggerDocs from './swagger.js';
import {
  isAdmin,
  isAuth,
  isAdminOrReadOnly,
  isReaerOrReadOnly,
  isAdminOrSifeMethod,
  adminCreateOnly,
} from './rest-auth/permissions.js';


const app = express();


app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));


app.use((express.json({ limit: "30mb", extended: true})));
app.use((express.urlencoded({ limit: "30mb", extended: true})));
app.use('/rest-auth', restAuthRouters);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/book', bookView)
app.use('/api/user', adminCreateOnly, UserAPIView.getRouter());
app.use('/api/book', adminCreateOnly, BookAPIView.getRouter());
app.use('/api/request', isAdminOrSifeMethod, RequestAPIView.getRouter());
app.use('/api/chapter', isAdmin, ChapterAPIView.getRouter());
app.use('/api/search', isAuth, SearchAPIView.getRouter());


app.listen(8000, () => {
  console.log('Server listening on port 8000');
  // swaggerDocs(app, 8000)
});
