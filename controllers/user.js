/**
 * 用户基础操作 数据包括微信用户数据
 */
const userDAO = require('../dao/user');

// search 查询用户是否注册
const checkForRegistration = (req, res, next) => {
  console.log("查询用户注册");
  console.log(req.query);

  res.type('application/json');
  if(req.query.openid) {
    userDAO.select(req.query.openid).then(result => {
      // if(result && result.length) {
      //   res.status(200).json({isExit: 1});
      // } else {
      //   res.status(200).json({isExit: 0});
      // }
      res.status(200).json({data: result[0]});
    }).catch(error => {
      console.log('error',error);
      if(error.code && error.code === 'ECONNREFUSED') {
        res.status(500);
      }

      res.status(404).send({msg: 'DATA NOT FOUND'});
    })
  } else {
    res.status(404).send({msg: 'DATA NOT FOUND'});
  }
  
  // res.json({openid: req.query.openid});
}

module.exports = {
  checkForRegistration,
} 
