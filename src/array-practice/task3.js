/* eslint-disable import/prefer-default-export */
/**
 * Реализовать функцию forEachRight в этом файле, и экспортировать ее.
 *
 * Первый аргумент - массив, второй - функция, применяющаяся на массив
 *
 * Результатом работы функции forEachRight,
 * будет вывод элементов массива в обратном порядке в консоль.
 * Одно значение - один вывод (построчно)
 *
 * forEachRight([1, 2, 3, 4], val => console.log(val)); -> в консоль 4 3 2 1
 */

export const forEachRight = (arr, cb) => {
  const arr1 = arr.slice();
  arr1.reverse().forEach(item => cb(item));
};
