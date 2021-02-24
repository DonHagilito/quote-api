const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getIndexById = (id, arr) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr.findIndex(element => element.id == id);
}

module.exports = {
  getRandomElement,
  getIndexById
};
