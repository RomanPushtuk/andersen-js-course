import { MAIN_URL } from './constants';

class Requests {
  constructor(url) {
    this.url = url;
  }

  addData(hostel) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hostel),
    })
      .then(response => {
        console.log('Получили ответ от сервера - add ', response);
        return response;
      })
      .catch(response => console.log(`Не удалось отправить запрос - ${response}`));
  }

  chengeData(hostel) {
    return fetch(this.url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hostel),
    })
      .then(response => {
        console.log('Получили ответ от сервера - chenge ', response);
        return response;
      })
      .catch(response => console.log(`Не удалось отправить запрос - ${response}`));
  }

  deleteData(obj) {
    return fetch(this.url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(response => {
        console.log('Получили ответ от сервера - delete ', response);
        return response;
      })
      .catch(response => console.log(`Не удалось отправить запрос - ${response}`));
  }

  getAllHostels() {
    return fetch(this.url);
  }
}

// Показываем где находится наш сервер
const requests = new Requests(MAIN_URL);
export default requests;
