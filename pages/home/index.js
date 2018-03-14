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
  onEnergyBallTap: function(e){
    const balls = this.data.balls
    balls[e.currentTarget.dataset.index].received = true
    balls[e.currentTarget.dataset.index].delay = 0
    this.setData({
      balls: balls
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

    for(let i=0; i<7; i++){
      const [circlex, circley] = [185, 225]
      const r = Math.random(.5,1)*100 + 60
      console.log(r)
      const cta = Math.PI/6*i
      const x = Math.floor(Math.sin(cta)*r)
      const y = Math.floor(Math.cos(cta)*r)
      const bottom = x + 50 + Math.random(-1, 1)*20
      const left = 165 - y + Math.random(-1, 1) * 20
      const delay = Math.random() * Math.random() * 6
      console.log(bottom, left)
      balls.push({
        num: 50,
        bottom: bottom,
        left: left,
        delay: delay,
        index: i,
        received: false
      })
    }
    this.setData({
      balls: balls
    })
  }
})
