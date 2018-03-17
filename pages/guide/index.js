import { getOrSave } from '../../services/UserService.js'

// 引导页；
const app = getApp();

Page({
    data: {},
    onLoad: function () {
      setTimeout(function () {
        const user = app.globalData.userInfo
        getOrSave(user, res => {
          const rid = res.data.planting_rid
          wx.redirectTo({
            url: rid === -1 ? '../index/index' : ('../home/index?rid=' + rid),
          })
        })
      }, 1500)
    }
})
