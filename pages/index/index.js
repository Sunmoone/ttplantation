//index.js
import {createPlant} from '../../services/UserService.js'

const app = getApp()
Page({
  data: {
    showTip: true
  },
  onSiteTap: function(){
    wx.navigateTo({
      url: '../my-tree/detail',
    })
  },
  onPlantTap: function(e){
    const pid = e.target.dataset.pid
    createPlant({
      pid: pid,
      uid: app.globalData.userInfo.user_id
    }, function(res){
      wx.navigateTo({
        url: '/home/index?pid='+pid,
      })
    })
  },
  onConfirmTap: function(){
    this.setData({
      showTip: false
    })
  }
})
