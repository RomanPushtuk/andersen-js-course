const config = require('./config');

// Инициализируем константы
config.call(this);

class DB {
  constructor(mng, url, colectionName, cb = undefined) {
    this.mongoose = mng;

    this.stateConnect = this.mongoose
      .connect(url, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('Подключились к базе данных');
        if (cb) {
          cb();
        }
      })
      .catch(err => console.log('Ошибка подключения к базе данных - ', err));

    this.hostelsShema = this.mongoose.Schema(
      {
        name: String,
        stars: Number,
        rooms: Number,
        address: String,
      },
      {
        versionKey: false,
      }
    );
    this.hostels = this.mongoose.model(colectionName, this.hostelsShema);
    // Конец контруктора
  }

  find(obj) {
    return this.hostels.find(obj);
  }

  findById(id) {
    return this.hostels.findById(id);
  }

  add(obj) {
    return this.hostels.create(obj);
  }

  // findByIdAndUpdate - не возвращает новоизмененную запись по этому сделал так
  chenge(id, obj) {
    return this.hostels.findByIdAndUpdate(id, obj, { new: true });
  }

  delete(obj) {
    return this.hostels.findOneAndDelete(obj);
  }
}

module.exports = DB;
