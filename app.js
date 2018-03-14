//app.js
App({
  onLaunch: function () {
    const that = this
    wx.login({
      success: function(res){
        console.log(res)
        wx.getUserInfo({
          success: function (res) {
            console.log(JSON.stringify(res.data.user_info))
            that.globalData.userInfo = res.data.user_info
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