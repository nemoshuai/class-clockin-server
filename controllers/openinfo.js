/***
 * 获取用户openid session_key 数据处理
 */
const request = require("request");


const index = (req, res, next) => {
  let appId = "wxcaf50973e176aa75";
  let secret = "6b406d5f41bf6d0d74181eecda73a2f3";
  if(req.query.code) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${req.query.code}&grant_type=authorization_code`
    request.get(url,(err, response, body) => {
      if (err) {
        console.log('err',err);
        res.status(404).send({msg: 'DATA NOT FOUND'});
      } 
      if (response) { 
        // console.log('response', response); 
      }
      if (body) {
        const bodyData = JSON.parse(body);
        const data = { openid: bodyData.openid, session_key: bodyData.session_key };
        // console.log(data);
        res.status(200).json(data);
      }
    });
  }
}

module.exports = {
  index,
}