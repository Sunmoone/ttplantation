//app.js
import {getOrSave} from './services/UserService.js'
App({
  onLaunch: function () {
    const that = this
    wx.login({
      success: function(res){
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            const userInfo = res.data.userInfo
            that.globalData.userInfo = userInfo
          }
        })
      },
      fail: function(res){
        console.log(res)
      }
    })
    // this.globalData.userInfo = {
    //   user_id: 52919861934,
    //   total_energy: 100
    // }
  },
  globalData: {
    userInfo: {
      id: 222,
      name: 'junlongtao',
      avatar: 'xxxxx',
    }
  }
})