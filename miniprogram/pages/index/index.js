// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    dataList: [],
    pagination: {
      pageSize: 5,
      pageNo: 1,
      total: 1
    },
    selectedEnv: envList[0],
  },
  onLoad() {
    const {pageSize, pageNo} = this.data.pagination
    this.onFetchData(pageSize, pageNo)
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '自定义转发标题'
        })
      }, 2000)
    })
    return {
      title: '自定义转发标题',
      path: '/page/index',
      promise 
    }
  },

  onFetchData(pageSize, pageNo) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'queryRecord',
        pages: {
          pageSize,
          pageNo
        }
      }
    }).then((resp) => {
      if (resp.result.data.length > 0) {
        this.setData({
          dataList: resp.result.data,
          pagination: resp.result.pagination
        });
      }
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      wx.hideLoading();
    });
  },
  handlePrev() {
    const {pageSize, pageNo} = this.data.pagination

    if(pageNo === 1) {
      return
    } else {
      const no = pageNo - 1
      this.onFetchData(pageSize, no)
    }
  },
  handleNext() {
    const {pageSize, pageNo, total} = this.data.pagination
    if(pageNo < total) {
      const no = pageNo + 1
      this.onFetchData(pageSize, no)
    } else {
      return
    }
    
  },
  gotoDetail(event){
    const id = event.currentTarget.dataset.id
    if(id) {
      wx.navigateTo({
        url: `/pages/recordDetail/index?id=${id}`,
      });
    }
  },
  handleGetOpenId() {
    console.log('11111')
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'getOpenId',
      }
    }).then(res => {
      console.log(res)
    })
  }
});
