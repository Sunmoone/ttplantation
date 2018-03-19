//app.js
import {getOrSave} from './services/UserService.js'

const uid = parseInt(Math.random()*10000)
App({
  onLaunch: function () {
    const that = this
    wx.login({
      success: function(res){
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.data?res.data.userInfo:res.userInfo
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '',
          content: JSON.stringify(res),
        })
      }
    })
    this.globalData.myAudio = wx.createInnerAudioContext()
    setTimeout(()=>{
      this.globalData.myAudio.src = 'http://dl.stream.qqmusic.qq.com/C400003LiS0B4T8yZ2.m4a?vkey=FACE8AE5886B17F5CA5702F27344D5336165A59BB8503E6176A3B05BF91806FEED7318E91A5E7DF9BB43897AA1F9E3B8FF41AF8D378CBFBD&guid=3202463400&uin=1152921504793862977&fromtag=66'
      this.globalData.myAudio.play();
    },1500)
  },
  globalData: {
    userInfo: {
      user_id: uid,
      name: uid,
      avatar_url: uid,
      screen_name: uid
    }
  },
  onHide: function () {
    this.globalData.myAudio.pause();
  },
  log: function(data){
    wx.showModal({
      content: JSON.stringify(data),
    })
  },
  onError: function (msg) {
    wx.showModal({
      content: msg
    })
  },
  toast: function(content){
    try{
      wx.toast({title: content})
    } catch (e) {
      wx.showModal({
        title: '',
        showCancel: false,
        content: content,
      })
    }
  }
})