// pages/home/msg.js
import {listWateringMsg} from '../../services/UserService.js'
import {formatTime} from '../../utils/util.js'

const app = getApp()
const user = app.globalData.userInfo
Page({
  data: {
    msgs: [],
    hasMore: true
  },
  onLoad: function (options) {
    this.listMsg(1)
  },
  listMsg: function(page){
    if(!this.data.hasMore){
      return false
    }
    const size = 10
    const user = app.globalData.userInfo
    listWateringMsg({
      uid: user.uid,
      page: page,
      size: size
    }, res => {
      const items = res.data.map(item => Object.assign(item, {
        time: formatTime(item.time)
      }))
      const msgs = page===1?[]:this.data.msgs
      this.setData({
        page: page,
        msgs: msgs.concat(items),
        hasMore: items.length<size?false: true
      })
    })
  },
  onViewMoreTap: function(e){
    this.listMsg(this.data.page+1)
  }
})