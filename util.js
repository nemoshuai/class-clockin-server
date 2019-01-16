const formatData = source => {
  const dataStr = JSON.stringify(source);
  return JSON.parse(dataStr);
}

module.exports = {
  formatData
}