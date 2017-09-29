Object.assign = Object.assign || function(target, ...varArgs) {
  let result = Object(target);
  varArgs.forEach((nextSource) => {
    for (const nextKey in nextSource) {
      result[nextKey] = nextSource[nextKey];
    }
  });
  return result;
};