const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const pageSize = event.pages.pageSize
  const pageNo = event.pages.pageNo
  const skinNo = (pageNo - 1) * pageSize
  // 返回数据库查询结果
  const count = await db.collection('talks').count();
  const total = Math.ceil(count.total/pageSize) || 1
  const result = await db.collection('talks').orderBy('createTime', 'desc').skip(skinNo).limit(pageSize).get();
  const pages = {
    total: total,
    pageNo,
    pageSize
  }
  return {
    pagination: pages,
    ...result
  }
};
