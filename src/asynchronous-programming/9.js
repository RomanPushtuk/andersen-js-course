const asyncBar = async () => 'Some string';
const foo = async () => {
  asyncBar().then(console.log);
};

export { foo };
