// Объект представление отвечает за внешний вид, взаимодействие с HTML
// Добавление эелементов в списк удаление из списка обновлять и т.д.
// Этот класс знает лишь как работать с дом элементами
import { EventEmitter, onWorkbench, hangDrage, hangDrop, createElement } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();
    // Верстак - служит для создания рецептов
    this.workbench = document.getElementById('workbench');
    // Стол - слижит для создания предметов по рецептам
    this.table = document.getElementById('table');
    // При клике на рецепт в этой строке отображаются какие предметы нужны для крафта - <p>
    this.tableInfo = document.getElementById('table-info');
    // Здесь размещаются listItems и listRecipts, нужен чтобы удобно повесить обработчики
    this.secondaryArea = document.getElementById('secondary-area');

    // Ловилки в верстаке и в столе
    this.cachsWorkbench = document.querySelectorAll('#cach-workbench');
    this.cachsTable = document.querySelectorAll('#cach-table');

    // Тут лежат предметы и рецепты
    this.listItems = document.getElementById('items');
    this.listRecipts = document.getElementById('recipes');

    // Кнопки
    // Кнопка переключения с верстока на стол и наоборот
    this.btnToogleWorkPlace = document.getElementById('toogleWorkPlace');
    this.createRecipt = document.getElementById('createRecipt');
    this.createItem = document.getElementById('createItem');
    this.clearWorkbench = document.getElementById('clear-workbench');
    this.clearTable = document.getElementById('clear-table');

    // Окошко результата
    // В этих окошках будут появляться результаты крафта или создания рецепта
    this.devRecipt = document.getElementById('devRecipt');
    this.devItem = document.getElementById('devItem');

    this.createRecipt.addEventListener('click', this.handleCreateRecipt.bind(this));
    this.createItem.addEventListener('click', this.handleCreateItem.bind(this));
    this.btnToogleWorkPlace.addEventListener('click', this.toogleWorkPlace.bind(this));
    this.clearWorkbench.addEventListener('click', this.returnToSeats.bind(this));
    // this.clearTable.addEventListener('click', this.returnToSeatsFromTable.bind(this));

    // Повешали драги на стартовые элементы addEL - dragstart
    hangDrage(this.listItems);
    hangDrage(this.listRecipts);

    // Повешали дрпопы на ячейки крафта в верстаке и столе
    hangDrop('cach-workbench', this.workbench);
    // Если что-то перетащили на ячейку стола -> выполни handleFollowTable
    hangDrop('cach-table', this.table, this.handleFollowTable.bind(this));

    // Сделали так чтобы элементы можно было возвращать на места
    hangDrop('items', this.secondaryArea, this.handleFollowTable.bind(this));
    hangDrop('recipes', this.secondaryArea);
  }

  addNewRecipt(element) {
    const newRecipt = createElement(element);
    this.devRecipt.appendChild(newRecipt);
    newRecipt.addEventListener('click', this.handleShowRecipt.bind(this));
    this.returnToSeats();
  }

  addNewItemToList(element) {
    const newItem = createElement(element);
    this.listItems.appendChild(newItem);
  }

  // Создаем предмет если есть такой рецепт
  generateNewItem(element) {
    if (element) {
      // Если не занят devItem то создай предмет
      if (!this.devItem.firstElementChild) {
        const newItem = createElement(element);
        this.devItem.appendChild(newItem);
      }
    }
  }

  // Переключает верстак и стол туда сюда
  toogleWorkPlace() {
    this.table.classList.toggle('hidden');
    this.workbench.classList.toggle('hidden');
  }

  // Просто активировать рабочий стол
  activeTable() {
    this.table.classList.remove('hidden');
    this.workbench.classList.add('hidden');
  }

  // Просто активировать верстак
  // activeWorkbench() {
  //   this.workbench.classList.remove('hidden');
  //   this.table.classList.add('hidden');
  // }

  // Возвращает предметы с верстака и сола на свои места
  returnToSeats() {
    this.cachsWorkbench.forEach(item => {
      if (item.firstElementChild) {
        this.listItems.appendChild(item.firstElementChild);
      }
    });
    this.cachsTable.forEach(item => {
      if (item.firstElementChild) {
        this.listItems.appendChild(item.firstElementChild);
      }
    });
  }

  // Смотрим какие предметы есть на столе
  // сверяет с рецептами и определяет можно ли создать предмет
  // срабатывает при изменении положения в ячейках верстака или стола
  handleFollowTable() {
    const elements = onWorkbench(this.cachsTable);
    this.emit('ON_THE_TABLE', elements);
  }

  // Выводт строчку о том какие рецепты нужны для крафта
  showRecipt(recipt) {
    const text = recipt.reduce((accum, item) => {
      return (accum += document.getElementById(item).innerText + ', ');
    }, 'Для создания это рецепта вам нужы предметы ');
    this.tableInfo.innerText = text;
    this.activeTable();
  }

  // обработчик клика по кнопке "Создать рецепт"
  handleCreateRecipt() {
    const name = prompt('Введите имя рецепта');
    if (name === '' || name === null) return alert('Вы не ввели имя. ');
    const recipt = onWorkbench(this.cachsWorkbench);
    if (recipt.length > 0) {
      this.emit('CREATE_RECIPT', {
        name: name,
        recipt: recipt,
      });
    } else return alert('Вы не выбрали предметы для крафта');
  }

  handleCreateItem() {
    const name = prompt('Введите имя предмета');
    if (name === '' || name === null) return alert('Вы не ввели имя. ');
    this.emit('CREATE_ITEM', {
      name: name,
    });
  }

  handleShowRecipt(evt) {
    const idRecipt = evt.target.getAttribute('id');
    this.emit('GET_ELEMENTS_RECIPT', idRecipt);
  }
}
export default View;
