const getUsers = url => fetch(url);

async function foo(url) {
  try {
    const response = await getUsers(url);
    const result = await response.json();
    console.log(result[0]);
  } catch (err) {
    console.log('Error', err);
  }
}

export { foo };
