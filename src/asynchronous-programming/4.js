const url1 = 'http://www.json-generator.com/api/json/get/cfQCylRjuG';
const url2 = 'http://www.json-generator.com/api/json/get/cfVGucaXPC';

function doubleQuery() {
  fetch(url1)
    .then(result => result.json())
    .then(({ getUsersData }) => {
      if (getUsersData) {
        return fetch(url2);
      }
    })
    .then(data => data.json())
    .then(console.log);
}

export { doubleQuery };
