const references = (tableName, keyName = 'id') => {
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

const allowNull = process.env.NODE_ENV === 'production';
module.exports = { references, allowNull };
