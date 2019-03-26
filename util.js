const formatData = source => {
  const dataStr = JSON.stringify(source);
  return JSON.parse(dataStr);
}

// const getDistance = (la1, lo1, la2, lo2) => {
//   // 角度转弧度
//   let La1 = la1 * Math.PI / 180.0;
//   let La2 = la2 * Math.PI / 180.0;
//   // 经度差
//   let la0 =  La1 - La2;
//   // 纬度差
//   let lb0 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
//   let distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(la0 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(lb0 / 2), 2)));
//   // 乘以地球半径
//   distance = distance * 6378.137;
//   distance = Math.round(distance * 10000) / 10000;
//   distance = distance.toFixed(2);
//   return distance;
// }

module.exports = {
  formatData,
  // getDistance
}