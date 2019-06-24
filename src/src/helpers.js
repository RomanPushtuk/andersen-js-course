class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(arg));
    }
  }
}

// Возвращает id предметов которые на верстаке или на столе
const onWorkbench = cachs => {
  return Array.from(cachs)
    .map(item => {
      if (item.firstElementChild) {
        return item.firstElementChild.getAttribute('id');
      }
    })
    .filter(item => {
      return item !== undefined;
    });
};

// Вешаем драги на элементы и на рецеты
const hangDrage = (list, cb = undefined) => {
  Array.from(list.children).forEach(item => {
    if (item.getAttribute('id')) {
      // Если у блока есть id значит нужно дать ему возможность двигаться
      item.addEventListener('dragstart', evt => {
        evt.dataTransfer.setData('text', item.getAttribute('id'));
        if (cb) {
          cb();
        }
      });
    }
  });
};

// Вешаем ловилки на элемены
// block - блок в коором ищем id на коорые нужно повесить ловилки
const hangDrop = (id, block = undefined, cb = undefined) => {
  if (block !== undefined) {
    Array.from(block.children).forEach(item => {
      if (item.getAttribute('id') === id) {
        item.addEventListener('dragover', ev => {
          ev.preventDefault();
        });
        item.addEventListener('drop', evt => {
          evt.preventDefault();
          const data = evt.dataTransfer.getData('text');
          evt.target.appendChild(document.getElementById(data));
          if (cb) {
            cb();
          }
        });
      }
    });
  } else {
    const element = document.getElementById(id);
    element.addEventListener('dragover', ev => {
      ev.preventDefault();
    });
    element.addEventListener('drop', evt => {
      evt.preventDefault();
      const data = evt.dataTransfer.getData('text');
      evt.target.appendChild(document.getElementById(data));
    });
  }
};

// Разность множеств
// нужно для определения возможно ли сделать такой предмет по рецетам которые есть в state
// или нет, принимает [] и [] , возвращеат bool
const difference = (arrA, arrB) => {
  const diffA = arrA.sort();
  const diffB = arrB.sort();
  if (diffA === diffB) return true;
  if (diffA.length !== diffB.length) return false;
  for (let i = 0; i < diffA.length; ++i) {
    if (diffA[i] !== diffB[i]) return false;
  }
  return true;
};

// Создает элемент и понимает какой ему нужно создать новый рецепт или предмет
const createElement = ({ id, name, recipt }) => {
  const element = document.createElement('div');
  element.innerText = name;
  if (recipt !== undefined && id !== undefined) {
    element.setAttribute('class', 'recipt');
    element.setAttribute('draggable', 'true');
    element.setAttribute('id', id);

    element.addEventListener('dragstart', evt => {
      evt.dataTransfer.setData('text', element.getAttribute('id'));
    });
    return element;
  }
  if (id !== undefined) {
    element.setAttribute('class', 'item');
    element.setAttribute('draggable', 'true');
    element.setAttribute('id', id);

    element.addEventListener('dragstart', evt => {
      evt.dataTransfer.setData('text', element.getAttribute('id'));
    });
    return element;
  }
  element.setAttribute('class', 'item');
  element.setAttribute('draggable', 'true');
  return element;
};

export { EventEmitter, onWorkbench, hangDrage, hangDrop, createElement, difference };
