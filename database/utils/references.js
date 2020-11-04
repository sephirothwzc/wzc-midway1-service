module.exports = (tableName, keyName = 'id') => {
  if (process.env.NODE_ENV === 'production') {
    return undefined;
  }
  return {
    model: {
      tableName,
    },
    keyName,
  };
};
