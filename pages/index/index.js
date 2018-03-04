//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onSiteTap: function(){
    wx.navigateTo({
      url: '../my-tree/detail',
    })
  },
  onPlantTap: function(e){
    wx.navigateTo({
      url: '../home/index',
    })
  }
})
