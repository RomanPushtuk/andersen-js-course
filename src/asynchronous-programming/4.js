const url1 = 'http://www.json-generator.com/api/json/get/cfQCylRjuG';
const url2 = 'http://www.json-generator.com/api/json/get/cfVGucaXPC';

async function doubleQuery() {
  const result = await fetch(url1);
  result.json().then(async data => {
    if (data.getUsersData) {
      const preData = await fetch(url2);
      const end = await preData.json();
      console.log(end);
    }
  });
}

export { doubleQuery };
