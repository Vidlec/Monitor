export async function filter(arr, callback) {
  const fail = Symbol('fail');
  return (await Promise.all(
    arr.map(async item => ((await callback(item)) ? item : fail)),
  )).filter(i => i !== fail);
}

export async function reduce(array, reducer, acc) {
  return array.reduce(reducer, Promise.resolve(acc));
}
