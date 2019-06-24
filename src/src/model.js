import { difference } from './helpers';

class Model {
  constructor() {
    this.state = {
      recipts: {},
      items: {},
    };
    this.recipts = this.state.recipts;
    this.items = this.state.items;
  }

  getRecipt(id) {
    return this.recipts[id];
  }

  getItem(id) {
    return this.items[id];
  }

  getNewReciptId() {
    return Object.keys(this.recipts).length;
  }

  getNewItemId() {
    return Object.keys(this.items).length;
  }

  addRecipt({ id, name, recipt }) {
    // Если нет рецепта с таким именеи то добавить его в рецепты
    const result = Object.keys(this.recipts).some(item => {
      return this.recipts[item].name === name;
    });
    if (!result) {
      this.recipts[id] = {};
      this.recipts[id].id = id;
      this.recipts[id].name = name;
      this.recipts[id].recipt = recipt;
      return this.getRecipt(id);
    }
    return false;
  }

  addItem({ id, name }) {
    // Если такой предмет уже есть то ничего не делаем
    const result = Object.keys(this.items).some(item => {
      return this.items[item].name === name;
    });
    if (!result) {
      this.items[id] = {};
      this.items[id].id = id;
      this.items[id].name = name;
      return this.getItem(id);
    }
    return this.getItem(id);
  }

  // Возврвщает строку предметов для такого крафта
  getElementsRecipt(id) {
    const recipt = this.getRecipt(id).recipt;
    return recipt;
  }

  // Принимает массив элементов которые есть на столе
  // Проверяет соответствует ли хоть один рецепт таким предметам
  // Если соответствует то возвращает его имя, или нет то false
  checkRecipt(elements) {
    const objRecipt = Object.keys(this.recipts).find(item => {
      if (difference(elements, this.recipts[item].recipt)) return true;
    });
    if (objRecipt !== undefined) {
      return this.recipts[objRecipt].name;
    }
    return false;
  }
}

export default Model;
