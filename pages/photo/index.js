import {listMsg} from '../../services/UserService.js'
import {formatTime} from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    photos: []
  },
  onLoad: function(){
    const {uid} = app.globalData.userInfo
    listMsg({uid:uid, type:2}, res => {
      const photos = res.data.map(item=>{
        item.time = formatTime(item.time)
        return item
      })
      this.setData({photos: photos})
    })
  }
})
