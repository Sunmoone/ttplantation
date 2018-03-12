//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tree: 'sprout',
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
    }],
    duration: 500,
    balls:[]
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
  },
  onMoreTreeTap: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onLoad: function(){
    wx.login({
      success: function(res){
        wx.getUserInfo({
          success: function(res){
            console.log(res)
          }
        })
      }
    })
    let time = this.data.duration
    if(wx.getUserDuration){
      time = wx.getUserDuration()
    }
    const balls = []
    const count = Math.floor(time/50)
    for(let i=1; i<=count; i++){
      const top = Math.random(1, count)/count*320
      const left = Math.random(1, count)/count*400
      balls.push({
        num: 50,
        top: top,
        left: left
      })
    }
    this.setData({
      balls: balls
    })
  }
})
