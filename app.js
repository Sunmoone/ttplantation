//app.js
import {getOrSave} from './services/UserService.js'
App({
  onLaunch: function () {
    const that = this
    wx.login({
      success: function(res){
        wx.getUserInfo({
          success: function (res) {
            const user_info = res.data.user_info
            that.globalData.userInfo = user_info
          }
        })
      },
      fail: function(res){
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: {
      id: 111,
      name: 'junlongtao',
      avatar: 'xxxxx',
    }
  }
})