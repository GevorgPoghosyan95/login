import express from 'express';

import users from './users.api';
import auth from './auth.api';
import home from "./home.api";

const app = express();

// API
app.use('/users', users);
app.use('/auth', auth);
app.use('/home', home);

export default app;
