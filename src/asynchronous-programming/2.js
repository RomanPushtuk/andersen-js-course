const parseJSON = (jsonStr, successCb, failureCb) => {
  try {
    const result = JSON.parse(jsonStr);
    successCb(result);
  } catch (err) {
    failureCb(err);
  }
};

const successCb = result => {
  console.log('Secces parse');
  console.log(result);
};

const failureCb = err => {
  console.log(err);
};

export { parseJSON, successCb, failureCb };
