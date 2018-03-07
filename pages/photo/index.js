//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    photos: [{
      src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
      date: '2018.2.3'
    }, {
        src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
        date: '2018.2.4'
      }, {
        src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
        date: '2018.2.4'
    }, {
      src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
      date: '2018.2.4'
      }, {
        src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
        date: '2018.2.4'
    }, {
      src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
      date: '2018.2.4'
      }, {
        src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
        date: '2018.2.4'
    }, {
      src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
      date: '2018.2.4'
      }, {
        src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
        date: '2018.2.4'
    }, {
      src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
      date: '2018.2.4'
      }, {
        src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
        date: '2018.2.4'
    }, {
      src: 'http://s7.sinaimg.cn/middle/611c7110hbe439ea30d76&690',
      date: '2018.2.4'
    }]
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '相册'
    })
  }
})
