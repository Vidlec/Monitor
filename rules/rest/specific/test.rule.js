module.exports = (connection, data, pre) => {
  return {
    host: data.name,
    identifier: data.name + '|' + data.priority + '|' + connection.gwName,
    priority: data.severity,
    tool: pre.tool,
  };
};
