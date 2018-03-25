// pages/envelope/index.js
import {listMsg} from '../../services/UserService'
import {formatTime} from '../../utils/util.js'

const app = getApp()

Page({
  data: {
    msgs: [],
    hasMore: true
  },
  onLoad: function(options){
    this.listMsg(1)
  },
  listMsg: function(page){
    if(!this.data.hasMore){
      return false
    }
    const size = 10
    const user = app.globalData.userInfo
    listMsg({
      uid: user.uid,
      page: page,
      size: size,
      type: 1
    }, res => {
      const items = res.data.map(item => {
        item.time = formatTime(item.time)
        return item
      })
      const msgs = page===1?[]:this.data.msgs
      this.setData({
        page: page,
        msgs: msgs.concat(items),
        hasMore: res.data.length<size?false: true
      })
    })
  },
  onViewMoreTap: function(e){
    this.listMsg(this.data.page+1)
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
    const {userInfo, plant} = app.globalData
    return {
      title: msg.title,
      desc: `我在头条种植园种了一棵${plant.name}树！好友码是${userInfo.uid}，快来帮我浇水吧~`,
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