const urls = [
  'http://www.json-generator.com/api/json/get/cevhxOsZnS',
  'http://www.json-generator.com/api/json/get/cguaPsRxAi',
  'http://www.json-generator.com/api/json/get/cfDZdmxnDm',
  'http://www.json-generator.com/api/json/get/cfkrfOjrfS',
  'http://www.json-generator.com/api/json/get/ceQMMKpidK',
];

const multiRequestParallel = async () => {
  const promises = urls.map(item => {
    return fetch(item);
  });
  const response = await Promise.all(promises);
  response.forEach(item => item.json().then(data => console.log(data)));
};

const multiRequestConsist = async () => {
  const promises = urls.map(item => {
    return fetch(item);
  });
  for await (let result of promises) {
    console.log(await result.json());
  }
};

export { multiRequestParallel, multiRequestConsist };
