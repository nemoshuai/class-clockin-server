const courseDAO = require('../dao/course');
const stuCourseDAO = require('../dao/stu_course');
const teacherDAO = require('../dao/teacher');

const createCourse = (req, res, next) => {
  console.log(req.body);
  const course = req.body.course;
  console.log("前台数据send course", course);
  // 插入数据库
  courseDAO.insert(course).then(result => {
    console.log("insert course success", result);
    res.status(200).send({success: 1});
  }).catch(error => {
    console.log("insert course error", error);
    res.status(500).send({msg: '创建课程失败'});
  });
}

const getCourseAll = (req, res, next) => {
  // 获取全部课程
  courseDAO.selectAll().then(async result => {
    console.log("select course all success", result);
    let list = [];
    await Promise.all(result.map(async course => {
      await teacherDAO.selectByTeaId(course.tea_id).then(res => {
        // console.log("课程 老师", res);
        const tea_name = res[0].tea_name;
        const tempCourse = { ...course, tea_name};
        list.push(tempCourse);
      })
    }));
    res.status(200).send({list: list});
  }).catch(error => {
    console.log("select course all error", error);
    res.status(500).send({msg: '服务器错误'});
  });
}

const getSpecificCourses = async (req, res, next) => {
  console.log("获取特定课程");
  // 获取教师创建课程
  if(req.params.usertype == 't') {
    courseDAO.selectByTeaId(req.params.id).then(result => {
      res.status(200).send({list: result});
    }).catch(error => {
      console.log("select course specific error", error);
      res.status(500).send({msg: '服务器错误'});
    });
  } else if(req.params.usertype == 's') {
    // 获取学生选取的课程列表
    await stuCourseDAO.select(req.params.id).then( async result => {
      console.log(result);
      // res.status(200).send({list: result});
      let list = [];
      
      await Promise.all(result.map(async stu_course_item => {
        await courseDAO.selectByCourseId(stu_course_item.course_id).then(result=>{
          list.push(result[0]);
        });
      }));
      console.log("list", list);
      res.status(200).send({list: list});
    }).catch(error => {
      console.log("select stu course error", error);
      res.status(500).send({msg: '服务器错误'});
    })
  }
}

const getCourse = (req, res, next) => {
  console.log("通过course_id, 获取课程");
  courseDAO.selectByCourseId(req.params.course_id).then(async result => {
    console.log("select course success", result);
      let tempCourse = {};
      await teacherDAO.selectByTeaId(result[0].tea_id).then(res => {
        // console.log("课程 老师", res);
        const tea_name = res[0].tea_name;
        tempCourse = { ...result[0], tea_name};
      });
    res.status(200).send({data: tempCourse});
  }).catch(error => {
    console.log("select course error", error);
    res.status(500).send({msg: '服务器错误'});
  });
}

// 检查是否已选
const checkIsPicked = (req, res, next) => {
  console.log("picked", req.params);
  stuCourseDAO.selectByStuCourse(req.params).then(result => {
    console.log("select single stu_course success", result);
    res.status(200).send({isPicked: result.length});
  }).catch(error => {
    console.log("select single stu_course success", error);
    res.status(500).send({msg: '服务器错误'});
  });
}

// 选课
const pickedCourse = (req, res, next) => {
  console.log("picked", req.params);
  stuCourseDAO.insert(req.params).then(result => {
    console.log("insert single stu_course success", result);
    res.status(200).send({success: 1});
  }).catch(error => {
    console.log("select single stu_course success", error);
    res.status(500).send({msg: '服务器错误'});
  });
}

module.exports = {
  createCourse,
  getCourseAll,
  getSpecificCourses,
  getCourse,
  checkIsPicked,
  pickedCourse
}