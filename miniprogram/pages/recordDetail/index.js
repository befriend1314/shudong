// index.js
// const app = getApp()

Page({
  data: {
    record: {}
  },
  onLoad(options) {
    this.fetchData(options.id)
  },

  fetchData(id) {
    wx.showLoading({
      title: '',
    });
   wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'queryDetail',
        id,
      }
    }).then((resp) => {
      this.setData({
        record: resp.result.data[0]
      })
     wx.hideLoading();
   }).catch((e) => {
      console.log(e);
     wx.hideLoading();
   });
  },
});
