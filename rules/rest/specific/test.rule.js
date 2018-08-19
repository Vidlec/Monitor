module.exports = (connection, data) => {
  return {
    host: data.name,
    identifier: data.name + '|' + data.priority + '|' + connection.gwName,
    priority: data.severity,
  };
};
