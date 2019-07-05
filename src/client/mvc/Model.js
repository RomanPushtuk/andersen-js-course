import requests from './Requests';

class Model {
  async hostels() {
    // Все данные из таблицы получаются этим методом
    const data = await requests.getAllHostels();
    const item = await data.json(); // obj
    return item;
  }

  async addHostel(hostel) {
    // Запрос на добавленение к серверу
    const data = await requests.addData(hostel); //Response
    const item = await data.json(); // obj
    return item;
  }

  async changeHostel(hostel) {
    // Запрос на редактирование к серверу
    const data = await requests.chengeData(hostel); //Response
    const item = await data.json(); // obj
    return item;
  }

  async deleteHostel(obj) {
    // Запрос на удаление
    const data = await requests.deleteData(obj);
    const item = data.json();
    return item;
  }
}

export default Model;
