/***
 * 获取用户openid session_key /路由
 */
const openinfo = require('../controllers/openinfo');
const express = require('express');
const router = express.Router();

router.get('/', openinfo.index);

module.exports = router;