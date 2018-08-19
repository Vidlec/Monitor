module.exports = (connection, data) => {
  if (connection.gwName === 'testGw') return 'test';
  return null;
};
