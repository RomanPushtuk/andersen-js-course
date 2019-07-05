const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const DB = require('./DB');
const config = require('./config');

// Инициализируем константы
config.call(this);

// Зупуск сервера
const startServer = () => {
  app.listen(this.SERVER_PORT, () => {
    console.log('Server start');
  });
};

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Насройки шаблонизатора
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Передаем колбеком зопуск сервера, чтобы он не происходил быстрее чем подключение к бд
const db = new DB(mongoose, this.DB_URL, this.COLLECTION_NAME, startServer);

app.use('/main/:id', async (request, response) => {
  const id = request.params.id;
  const obj = await db.findById(id);
  response.render('page.hbs', obj);
});

app.use('/main', async (request, response) => {
  const doc = await db.find({});
  const names = doc.map(item => {
    const { _id, name } = item;
    return {
      id: _id,
      name,
      server_url: this.SERVER_URL,
    };
  });
  response.render('main.hbs', {
    names,
  });
});

app.get('/', async (request, response) => {
  const doc = await db.find({});
  response.send(doc);
});

// post / - слушает запросы на добавление
app.post('/', async (request, response) => {
  if (!request.body) {
    return response.sendStatus(400);
  }
  const doc = await db.add(request.body);
  response.send(doc);
});

// put / - слушает запросы на изменение
app.put('/', async (request, response) => {
  if (!request.body) {
    return response.sendStatus(400);
  }
  const { _id } = request.body;
  const doc = await db.chenge(_id, request.body);
  response.send(doc);
});

// delete / - слушает запросы на удаление
app.delete('/', async (request, response) => {
  if (!request.body) {
    return response.sendStatus(400);
  }
  const doc = await db.delete(request.body);
  console.log('данные по удалению - ', doc);
  response.send(doc);
});
