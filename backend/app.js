const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');

app.use('/post', postRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log('server start!  port: ', port);
});
