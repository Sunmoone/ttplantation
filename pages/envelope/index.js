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
      size: 10  
    }, res => {
      const msgs = res.data.map(item => {
        item.time = formatTime(item.time)
        return item
      })
      // this.setData({
      //   msgs: msgs
      // })
    })
  },
  onItemTap: function(e){
    const index = e.currentTarget.dataset.index
    this.setData({msg: this.data.msgs[index]})
  },
  onCloseTap: function(){
    this.setData({msg: null})
  }
})