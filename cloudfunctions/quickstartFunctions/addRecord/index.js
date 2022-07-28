const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const {nickName, content, title} = event

  try {
    await db.collection('talks').add({
      data: {
        content,
        nickName,
        title,
        commentList: [],
        createTime: + new Date()
      }
    })
    return {
      success: true,
      msg: "成功"
    };
  } catch (error) {
    return {
      success: false,
      msg: "失败"
    };
  }
  
};
