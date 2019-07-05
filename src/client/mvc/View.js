import EventEmitter from './EventEmitter';
// Все HTML элементы
import elements from './elements';
import { ADD_RECORD, DELETE_RECORD, CHANGE_RECORD } from './constants';
import { createRecord, getDataFromApp } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();

    // Инициализируем элементы
    elements.call(this);
    // Клик по кнопке "Добавить"
    this.addHostelButton.addEventListener('click', this.handleAdd.bind(this));
    // Клик по кнопке "Close"
    this.closeAddModal.addEventListener('click', this.clearModal.bind(this));
    // Клик по кнопке "Редактировать"
    this.changeHostelButton.addEventListener('click', this.handleChange.bind(this));
    // Клик по кнопке "Удалить"
    this.deleteHostelButton.addEventListener('click', this.handleDelete.bind(this));
  }

  handleAdd() {
    const hostel = getDataFromApp.call(this, { mode: 'add' });
    this.emit(ADD_RECORD, hostel);
    this.clearModal();
  }

  handleChange() {
    const hostel = getDataFromApp.call(this, { mode: 'change' });
    this.emit(CHANGE_RECORD, hostel);
  }

  handleDelete() {
    const obj = getDataFromApp.call(this, { mode: 'delete' });
    this.emit(DELETE_RECORD, obj);
  }

  changeRecord({ _id, name, stars, rooms, address }) {
    const element = document.getElementById(_id);
    const [tdName, tdStars, tdRooms, tdAddress] = element.children;
    tdName.innerText = name;
    tdStars.innerText = stars;
    tdRooms.innerText = rooms;
    tdAddress.innerText = address;
  }

  deleteRecord({ _id }) {
    document.getElementById(_id).parentNode.removeChild(document.getElementById(_id));
  }

  addRecord(data) {
    this.table.appendChild(createRecord(data));
  }

  // Отчищаем модальное окно добавления при выходе из него
  clearModal() {
    this.inputName.value = '';
    this.selectStars.value = '1';
    this.selectRooms.value = '1';
    this.inputAddress.value = '';
  }

  showTable(data) {
    data
      .then(table => {
        table.forEach(item => {
          this.table.appendChild(createRecord.call(this, item));
        });
      })
      .catch(err => {
        console.log('Не удалось подключится к серверу', err);
        this.infoConnect.innerText = 'Не удалось подключится к серверу! Повторите попытку позже.';
      });
  }
}

export default View;
