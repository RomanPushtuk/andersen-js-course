import { EventEmitter } from './helpers';

class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;

    view.on('CREATE_RECIPT', this.addNewRecipt.bind(this)); // Создане рецепа
    view.on('GET_ELEMENTS_RECIPT', this.getElementsRecipt.bind(this)); // Получене предмеов для крафта
    // Если на столе появляеся комбинация предмеов
    // которые могут создать новый предмет, то мы его создаем
    view.on('ON_THE_TABLE', this.followTable.bind(this));
    view.on('CREATE_ITEM', this.addNewItem.bind(this));
  }

  addNewRecipt({ name, recipt }) {
    const element = this.model.addRecipt({
      id: `recipt${this.model.getNewReciptId() + 1}`,
      name: name,
      recipt: recipt,
    });
    if (element) {
      this.view.addNewRecipt(element);
    } else {
      alert('Такой рецепт уже есть');
    }
  }

  addNewItem({ name }) {
    const element = this.model.addItem({
      id: `item${this.model.getNewItemId() + 1}`,
      name: name,
    });
    this.view.addNewItemToList(element);
  }

  // Получает сприсок предметов для рецепта и выводит их на экран
  getElementsRecipt(id) {
    const recipt = this.model.getElementsRecipt(id);
    this.view.showRecipt(recipt);
  }

  // Передаем []id всех элеменов которые находяся на столе
  followTable(elements) {
    const result = this.model.checkRecipt(elements);
    // Если такой элемент находится то мы показываем пользователю что его можно создать
    if (result) {
      // Создадим такой предмет и отобразим в моделе
      const element = this.model.addItem({
        id: `item${this.model.getNewItemId() + 1}`,
        name: result,
      });
      this.view.generateNewItem(element);
    }
    // else {
    //   this.view.generateNewItem(result);
    // }
  }
}

export default Controller;
