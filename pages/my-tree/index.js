//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    trees: [{
      img:'http://s15.sinaimg.cn/middle/611c7110hbe439d23d3de&690',
      name: '成仙核桃',
      province: '甘肃省',
      city: '成县',
      days: 17
    },{
      img: 'http://s15.sinaimg.cn/middle/611c7110hbe439d23d3de&690',
      name: '成仙核桃',
      province: '甘肃省',
      city: '成县',
      days: 17
    }]
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的果树'
    })
  },
  onItemTap: function(){
    wx.navigateTo({
      url: '/pages/my-tree/detail',
    })
  },
  onShopTap: function(){
    wx.navigateTo({
      url: '/pages/my-tree/toutiao',
    })
  },
  onTaobaoTap: function(){
    wx.navigateTo({
      url: '/pages/my-tree/taobao',
    })
  }
})
