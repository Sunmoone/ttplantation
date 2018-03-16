//index.js
import {createPlant, getOrSave} from '../../services/UserService.js'
import {listPlant} from '../../services/PlantService.js'

const app = getApp()
Page({
  data: {
    showTip: false,
    plants: []
  },
  onLoad: function(){
    //get hasTip
    const hasTip = wx.getStorageSync('hasTip')
    if(hasTip!=='true'){
      this.setData({showTip: true})
      wx.setStorageSync('hasTip', 'true')
    }
    //get planting_rid
    const user_info = app.globalData.userInfo
    getOrSave(user_info, function (res) {
      const rid = res.data.planting_rid
      if (rid !== -1) {
        wx.redirectTo({
          url: '../home/index?rid=' + rid,
        })
      }
    })
  },
  onSiteTap: function(){
    wx.navigateTo({
      url: '../my-tree/detail',
    })
  },
  onPlantTap: function (e) {
    const pid = e.target.dataset.pid
    createPlant({
      pid: pid,
      uid: app.globalData.userInfo.user_id
    }, function(res){
      wx.navigateTo({
        url: '../home/index?rid='+res.data.rid,
      })
    })
  },
  onConfirmTap: function(){
    this.setData({
      showTip: false
    })
  }
})
