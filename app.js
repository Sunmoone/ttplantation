//app.js
import {getOrSave} from './services/UserService.js'
App({
  onLaunch: function () {
    const that = this
    wx.login({
      success: function(res){
        wx.getUserInfo({
          success: function (res) {
            that.log(res)
            const userInfo = res.data.userInfo
            const myUid = wx.getStorageSync('myUid')
            if(myUid){
              userInfo.user_id = myUid
            }else{
              userInfo.user_id = parseInt(Math.random()*10000)
            }
            wx.setStorageSync('myUid', userInfo.user_id)
            that.globalData.userInfo = userInfo
          }
        })
      },
      fail: function (res) {
        that.log(res)
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
  },
  log: function(data){
    if(console.log){
      console.log(data)
    }else{
      wx.showToast({
        title: JSON.stringify(data),
      })
    }
  }
})