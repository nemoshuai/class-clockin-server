const userDAO = require('../dao/user');
const studentDAO = require('../dao/student');
const teacherDAO = require('../dao/teacher');
/**
 *   usertype: that.data.usertype,
 *   useruniq: that.data.useruniq,
 *   userdata: that.data.teacher,
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const index = (req, res, next) => {
  console.log(req.body);
  const usertype = req.body.usertype;
  const useruniq = { ...req.body.useruniq, usertype };
  const openid = useruniq.openid;
  const userdata = { ...req.body.userdata, openid };
  // console.log("useruniq", useruniq);
  // console.log("userdata: ", userdata);

  // 插入数据库
  userDAO.insert(useruniq).then(result => {
    console.log("插入user数据库", result);
    if (usertype == 's') {
      studentDAO.insert(userdata).then(result => {
        console.log("插入student数据库", result);
      }).catch(error => {
        console.log("insert student error", error);
        res.status(500).send({msg: '注册失败'});
      });
    } else {
      teacherDAO.insert(userdata).then(result => {
        console.log("insert teacher success", result);
      }).catch(error => {
        console.log("insert teacher error", error);
        res.status(500).send({msg: '注册失败'})
      })
    }
  }).catch(error => {
    console.log("插入user数据库失败", error);
    res.status(500).send({msg: '注册失败'});
  });

  res.status(200).send({success: 1});
}

module.exports = {
  index,
}