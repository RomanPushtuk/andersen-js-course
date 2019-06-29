const asyncBar = async () => 'Some string';
const foo = async () => {
  const result = await asyncBar();
  console.log(result);
};

export default foo;
