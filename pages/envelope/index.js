// pages/envelope/index.js
import {listMsg} from '../../services/UserService'
import {formatTime} from '../../utils/util.js'

const app = getApp()
Page({
  data: {
    msgs: []
  },
  onLoad: function(){
    listMsg({
      uid: app.globalData.userInfo.user_id,
      page: 1,
      size: 10  
    }, res => {
      const msgs = res.data.map(item => {
        item.time = formatTime(item.time)
        return item
      })
      this.setData({
        msgs: msgs
      })
    })
  },
  onItemTap: function(){
    wx.navigateTo({
      url: '/pages/envelope/detail',
    })
  }
})