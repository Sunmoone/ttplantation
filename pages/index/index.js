//index.js
import {createPlant} from '../../services/RecordService.js'

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
      pid: pid
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
