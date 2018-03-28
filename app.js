//app.js
import {log} from './utils/util.js'
const uid = parseInt(Math.random()*10000)
App({
  onLaunch: function () {
    const audio = wx.createInnerAudioContext()
    if(audio){
      audio.src = 'http://10.8.127.110/images/bg.mp3'
      audio.play();
      this.globalData.myAudio = audio
    }
  },
  globalData: {
    userInfo: {
      name: uid,
      user_id: uid,
      avatar_url: uid,
      screen_name: uid
    },
    version: '1.2.0'
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
  }
})