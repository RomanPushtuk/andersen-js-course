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
  const [url1, url2, url3, url4, url5] = urls;
  const result = [];
  result.push(await fetch(url1));
  result.push(await fetch(url2));
  result.push(await fetch(url3));
  result.push(await fetch(url4));
  result.push(await fetch(url5));
  result.forEach(async item => {
    console.log(await item.json());
  });
};

export { multiRequestParallel, multiRequestConsist };
