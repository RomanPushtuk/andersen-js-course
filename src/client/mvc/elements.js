// Посчитал что так вынести элементы страницы будет удобнее
function elements() {
  // Модальное окно по добавленю
  this.inputName = document.getElementById('inputName');
  this.selectStars = document.getElementById('selectStars');
  this.selectRooms = document.getElementById('selectRooms');
  this.inputAddress = document.getElementById('inputAddress');

  // Модальное окно по редактированию
  this.idChengeItem = document.getElementById('idChengeItem');
  this.changeName = document.getElementById('changeName');
  this.changeSelectStars = document.getElementById('changeSelectStars');
  this.changeSelectRooms = document.getElementById('changeSelectRooms');
  this.changeAddress = document.getElementById('changeAddress');
  this.changeHostelButton = document.getElementById('changeHostelButton');

  // Модальное окно по удалению
  this.deleteHostelButton = document.getElementById('deleteHostelButton');
  this.modalBodyData = document.getElementById('modalBodyData');
  this.idDeleteItem = document.getElementById('idDeleteItem');

  // Элементы вне модальных окон
  this.addHostelButton = document.getElementById('addHostelButton');
  this.table = document.getElementById('table');
  this.closeAddModal = document.getElementById('closeAddModal');

  // Информация о подключении к серверу
  this.infoConnect = document.getElementById('infoConnect');
}

export default elements;
