// import { foo, createCb } from './asynchronous-programming/1';
// foo(20, createCb('str'));

// import { parseJSON, successCb, failureCb } from './asynchronous-programming/2';
// parseJSON('{"x" : 10}', successCb, failureCb);
// parseJSON('{x}', successCb, failureCb);

// import { delay } from './asynchronous-programming/3';
// delay(5000).then(value => console.log('Done with ' + value));
//
// import { doubleQuery } from './asynchronous-programming/4';
// doubleQuery();

// import { multiRequestParallel, multiRequestConsist } from './asynchronous-programming/5';
// multiRequestParallel();
// multiRequestConsist();

import { getResolvedPromise } from './asynchronous-programming/6';
const resolve = value => {
  if (value > 300) {
    throw new Error('Ошибка');
  }
  console.log(value);
  return value;
};
getResolvedPromise(400)
  .then(resolve)
  .catch(console.log)
  .finally(() => console.log('This is Finaly'));

// import { foo } from './asynchronous-programming/7';
// foo();

// import { foo } from './asynchronous-programming/8';
// foo('https://jsonplaceholder.typicode.com/users');

// import { foo } from './asynchronous-programming/9';
// foo();

// import { Musican } from './asynchronous-programming/10';
//
// const musican = new Musican('https://jsonplaceholder.typicode.com/albums');
// musican.getAlbums().then(albums => console.log(albums));
