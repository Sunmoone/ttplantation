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
  },
  onSiteTap: function(e){
    const pid = e.target.dataset.pid
    wx.navigateTo({
      url: '../my-tree/detail?pid='+pid,
    })
  },
  onPlantTap: function (e) {
    const rid = app.globalData.userInfo.planting_rid
    if(rid!==-1){
      wx.navigateTo({
        url: '../home/index?rid='+rid,
      })
      return false
    }
    const pid = e.target.dataset.pid
    createPlant({
      pid: pid,
      uid: app.globalData.userInfo.uid
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
