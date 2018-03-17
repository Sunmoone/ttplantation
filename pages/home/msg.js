// pages/home/msg.js
import {listWateringMsg} from '../../services/UserService.js'
Page({
  data: {
    msgs: [{
      content: 'fkdjfsdklfjkdsl',
      time: 14536635243,
    }]
  },
  onLoad: function (options) {
    listWateringMsg({uid: user.uid, page: 1, size: 10}, function(res){
      this.setData({msgs: res.data})
    })
  }
})