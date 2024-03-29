const express = require('express');

require('dotenv').config();

const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const corsAllow = require('./middlewares/cors');

const userRouter = require('./routes/user');

const cardRouter = require('./routes/card');

const {
  createUser, login,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-error');

const AllErrors = require('./middlewares/all-errors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());

app.use(corsAllow);

// логгер запросов
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError(`Страницы по адресу ${req.baseUrl} не существует`));
});

// логгер ошибок
app.use(errorLogger);

app.use(errors());

app.use(AllErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
