// pages/envelope/index.js
import {listMsg} from '../../services/UserService'
const app = getApp()
Page({
  data: {
    msgs: [{
      content: '请查看苹果长势',
      from: '我的农场',
      date: '2018.06.23'
    }]
  },
  onLoad: function(){
    listMsg({
      uid: app.globalData.userInfo.user_id,
      page: 1,
      size: 10  
    }, res => {
      this.setData({
        msgs: res.data||[]
      })
    })
  },
  onItemTap: function(){
    wx.navigateTo({
      url: '/pages/envelope/detail',
    })
  }
})