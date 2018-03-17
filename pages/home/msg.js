// pages/home/msg.js
import {listWateringMsg} from '../../services/UserService.js'
import {formatTime} from '../../utils/util.js'

const app = getApp()
const user = app.globalData.userInfo
Page({
  data: {
    msgs: [{
      content: 'fkdjfsdklfjkdsl',
      time: '2018.03',
    }]
  },
  onLoad: function (options) {
    listWateringMsg({uid: user.uid, page: 1, size: 10}, res => {
      const msgs = res.data.map(item=>{
        item.time = formatTime(item.time)
        return item
      })
      this.setData({msgs: msgs})
    })
  }
})