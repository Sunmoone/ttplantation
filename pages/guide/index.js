import { getOrSave } from '../../services/UserService.js'

// 引导页；
const app = getApp();

Page({
    data: {},
    onLoad: function () {
      const { userId, user_id, nickname, name, avatarUrl, avatar_url } = app.globalData.userInfo
      setTimeout(function(){
        getOrSave({
          user_id: userId || user_id,
          name: nickname || name || userId || user_id,
          avatar_url: avatarUrl || avatar_url,
          screen_name: nickname || name || userId || user_id,
          showLoading: false
        }, res => {
          app.globalData.userInfo = res.data
          const rid = res.data.planting_rid
          wx.redirectTo({
            url: rid === -1 ? '../index/index' : ('../home/index?rid=' + rid),
          })
        })
      }, 1500)
    }
})
