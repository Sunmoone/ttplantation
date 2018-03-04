//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    location: '中环广场',
    plant: {
      name: '成县核桃',
      water: 500
    },
    rankList:[{
      name: 'miaomiao',
      avatar: '',
      water: 8000
    }, {
      name: 'haaaaa',
      avatar: '',
      water: 7500
    }, {
      name: 'kkkkkk',
      avatar: '',
      water: 6700
    }],
    photos: [{
      src: ''
    }, {
      src: ''
    }, {
      src: ''
    }]
  },
  onPhotoCellTap: function() {
    wx.navigateTo({
      url: '../photo/index'
    })
  },
  onMyTreeCellTap: function(){
    wx.navigateTo({
      url: '../my-tree/index',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onPlantTap: function(){
    wx.navigateTo({
      url: '../my-tree/detail',
    })
  }
})
