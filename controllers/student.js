const studentDAO = require('../dao/student');

const getStudentInfo = (req, res, next) => {
  console.log("查询学生用户信息");
  console.log(req.query);

  res.type('application/json');
  if(req.query.openid) {
    studentDAO.select(req.query.openid).then(result => {
      console.log("查询学生信息成功", result);
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
}

module.exports = {
  getStudentInfo
}