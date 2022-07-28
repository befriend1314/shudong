// miniprogram/components/wePagination/index.js

Component({

  /**
   * 页面的初始数据
   */
  data: {
    pagination: {}
  },
  properties: {
    paginationProps: Object
  },
  observers: {
    paginationProps: function(paginationProps) {
      this.setData({
        pagination: paginationProps
      });
    }
  },
  methods: {
    handlePrev() {
      this.triggerEvent('prevClick')
    },
    handleNext() {
      this.triggerEvent('nextClick')
    }
  }
  
});
