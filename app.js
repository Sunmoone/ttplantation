//app.js
import {log} from './utils/util.js'
import {getOrSave} from './services/UserService.js'
const uid = parseInt(Math.random()*10000)
App({
  onLaunch: function () {
    const that = this
    // wx.login({
    //   success: function(res){
    //     log(res)
    //     wx.getUserInfo({
    //       success: function (res) {
    //         log(res)            
    //         that.globalData.userInfo = res.userInfo?res.userInfo:res.data.userInfo
    //         log(that.globalData.userInfo)
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //     log(res)
    //   }
    // })
    const audio = wx.createInnerAudioContext()
    if(audio){
      audio.src = 'http://10.8.127.110/images/bg.mp3'
      audio.play();
      this.globalData.myAudio = audio
    }
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
    if (this.globalData.myAudio) {
      this.globalData.myAudio.pause();
      delete this.globalData.myAudio;
    }
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