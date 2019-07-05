import requests from './Requests';
// Все HTML элемены проекта с коорым рабоаем

// Функция которая выполнится при нажатии на кнопку удалить
function hendlerDelete(evt) {
  const perent = evt.target.parentNode.parentNode;
  const [name, stars, rooms, address] = perent.children;
  const data = `${perent.id} : ${name.innerText} : ${stars.innerText} : ${rooms.innerText} : ${
    address.innerText
  }`;
  this.modalBodyData.innerText = data;
  this.idDeleteItem.value = perent.id;
}

// Функция которая выполнится при нажатии на кнопку редактировать
function hendlerChenge(evt) {
  const perent = evt.target.parentNode.parentNode;
  const [name, stars, rooms, address] = perent.children;
  this.changeName.value = name.innerText;
  this.changeSelectStars.value = stars.innerText;
  this.changeSelectRooms.value = rooms.innerText;
  this.changeAddress.value = address.innerText;
  this.idChengeItem.value = perent.id;
}

// Создаем строку таблцы
function createRecord({ _id, name, stars, rooms, address }) {
  const trRecord = document.createElement('tr');
  trRecord.id = _id;
  const thName = document.createElement('th');
  thName.innerText = name;
  const tdStars = document.createElement('td');
  tdStars.innerText = stars;
  const tdRooms = document.createElement('td');
  tdRooms.innerText = rooms;
  const tdAddress = document.createElement('td');
  tdAddress.innerText = address;
  const tdDelete = document.createElement('td');
  const tdChange = document.createElement('td');
  const btnDelete = document.createElement('button');
  const btnChange = document.createElement('button');
  btnDelete.classList.add('btn');
  btnDelete.classList.add('btn-danger');
  btnDelete.innerText = 'Удалить';
  btnDelete.setAttribute('data-toggle', 'modal');
  btnDelete.setAttribute('data-target', '#deleteModal');
  btnDelete.addEventListener('click', hendlerDelete.bind(this));

  btnChange.classList.add('btn');
  btnChange.classList.add('btn-primary');
  btnChange.innerText = 'Редактировать';
  btnChange.setAttribute('data-toggle', 'modal');
  btnChange.setAttribute('data-target', '#modalChange');
  btnChange.addEventListener('click', hendlerChenge.bind(this));

  tdDelete.appendChild(btnDelete);
  tdChange.appendChild(btnChange);
  trRecord.appendChild(thName);
  trRecord.appendChild(tdStars);
  trRecord.appendChild(tdRooms);
  trRecord.appendChild(tdAddress);
  trRecord.appendChild(tdDelete);

  trRecord.appendChild(tdChange);
  return trRecord;
}

// Для быстрого получения объекта со значениями из разных форм
function getDataFromApp({ mode }) {
  if (mode === 'change') {
    return {
      _id: this.idChengeItem.value,
      name: this.changeName.value,
      stars: Number(this.changeSelectStars.value),
      rooms: Number(this.changeSelectRooms.value),
      address: this.changeAddress.value,
    };
  }
  if (mode === 'add') {
    return {
      name: this.inputName.value,
      stars: Number(this.selectStars.value),
      rooms: Number(this.selectRooms.value),
      address: this.inputAddress.value,
    };
  }
  if (mode === 'delete') {
    return {
      _id: this.idDeleteItem.value,
    };
  }
}

export { createRecord, getDataFromApp };
