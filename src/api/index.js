import express from 'express';

import users from './users.api';
import auth from './auth.api';

const app = express();

// API
app.use('/users', users);
app.use('/auth', auth);

export default app;
