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
    this.globalData.myAudio = wx.createInnerAudioContext()
    this.globalData.myAudio.src = 'http://dl.stream.qqmusic.qq.com/C400003LiS0B4T8yZ2.m4a?vkey=FACE8AE5886B17F5CA5702F27344D5336165A59BB8503E6176A3B05BF91806FEED7318E91A5E7DF9BB43897AA1F9E3B8FF41AF8D378CBFBD&guid=3202463400&uin=1152921504793862977&fromtag=66'
    this.globalData.myAudio.play();
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
  onHide: function () {
    this.globalData.myAudio.pause();
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