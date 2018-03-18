// pages/home/msg.js
import {listWateringMsg} from '../../services/UserService.js'
import {formatTime} from '../../utils/util.js'

const app = getApp()
const user = app.globalData.userInfo
Page({
  data: {
    msgs: []
  },
  onLoad: function (options) {
    const user = app.globalData.userInfo
    listWateringMsg({uid: user.uid, page: 1, size: 10}, res => {
      const msgs = res.data.map(item=>{
        item.time = formatTime(item.time)
        return item
      })
      this.setData({msgs: msgs})
    })
  }
})