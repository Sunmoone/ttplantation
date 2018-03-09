// pages/envelope/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envelopes: [{
      content: '请查看苹果长势',
      from: '我的农场',
      date: '2018.06.23'
    },{
      content: '大魅甘肃欢迎你',
      from: 'xx县政府',
      date: '2018.06.23'
    },{
      content: '村里人都开刹车',
      from: '众泰汽车',
      date: '2018.06.23'
    }]
  },
  onItemTap: function(){
    wx.navigateTo({
      url: '/pages/envelope/detail',
    })
  }
})