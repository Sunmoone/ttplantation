//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasWatering: false,
    location: '中环广场',
    plant: {
      name: '甘肃川坝河谷.苹果园',
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
  onLoad: function () {},
  onPlantTap: function(){
    wx.navigateTo({
      url: '../my-tree/detail',
    })
  },
  onEnvelopeTap: function(){
    wx.navigateTo({
      url: '../envelope/index',
    })
  }, 
  onWateringTap: function(){
    this.setData({
      hasWatering: true
    })
    wx.showToast({
      title: '为好友浇水成功',
      icon: 'none'
    })
  },
  onBtnTap: function(){
    wx.navigateTo({
      url: '../receive/index'
    })
  }
})
