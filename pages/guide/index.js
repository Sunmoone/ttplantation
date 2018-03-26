import { getOrSave } from '../../services/UserService.js'
import { log } from '../../utils/util.js'

// 引导页；
const app = getApp();

Page({
    data: {},
    onLoad: function () {
      setTimeout(function () {
        wx.login({
          success: function (res) {
            wx.getUserInfo({
              success: function (res) {
                app.globalData.userInfo = res.userInfo ? res.userInfo : res.data.userInfo
                const { 
                  userId, user_id, nickName, name, avatarUrl, avatar_url 
                } = app.globalData.userInfo
                getOrSave({
                  user_id: userId || user_id,
                  name: nickName || name || userId || user_id,
                  avatar_url: avatarUrl || avatar_url,
                  screen_name: nickName || name || userId || user_id,
                  showLoading: false
                }, res => {
                  app.globalData.userInfo = res.data
                  const rid = res.data.planting_rid
                  wx.redirectTo({
                    url: rid === -1 ? '../index/index' : ('../home/index?rid=' + rid),
                  })
                })
              }
            })
          },
          fail: function (res) {
            log(res)
          }
        })
      }, 1500)
    }
})
