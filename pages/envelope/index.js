// pages/envelope/index.js
import {listMsg} from '../../services/UserService'
import {formatTime} from '../../utils/util.js'

const app = getApp()

Page({
  data: {
    msgs: []
  },
  onLoad: function(options){
    const user = app.globalData.userInfo
    listMsg({
      uid: user.uid,
      page: 1,
      size: 10,
      type: 1
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
  onItemTap: function(e){
    const index = e.currentTarget.dataset.index
    this.setData({msg: this.data.msgs[index]})
  },
  onCloseTap: function(){
    this.setData({msg: null})
  },
  onShareAppMessage (option) {
    const msg = this.data.msg
    return {
      title: msg.title,
      desc: msg.body,
      path: '/pages/guide/index', // ?后面的参数会在分享页面打开时传入onLoad方法
      imageUrl: msg.poster, // 支持本地或远程图片，默认是小程序icon
      success () {
        console.log('分享发布器已吊起，并不意味着用户分享成功，微头条不提供这个时机的回调');
      },
      fail() {
        console.log('分享发布器吊起失败');
      }
    }
  },
})