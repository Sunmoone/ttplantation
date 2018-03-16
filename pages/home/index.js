import {plantDetail} from '../../services/PlantService.js'
import {recordDetail} from '../../services/RecordService.js'

const app = getApp()

Page({
  data: {
    record: {
      step: 1
    },
    plant: {
      name: '甘肃川坝河谷.苹果园',
      water: 500
    },
    rankList:[{
      name: 'miaomiao',
      avatar: '',
      water: 8000
    }],
    photos: [{
      src: ''
    }],
    duration: 500,
    balls:[]
  },
  onLoad: function (options) {
    //get plant detail
    recordDetail({rid: options.rid}, res => {
      this.setData({
        record: res.data
      })
      plantDetail({pid: res.data.pid}, res => {
        this.setData({
          plant: res.data
        })
      })
    })

    //get duration, unit:s
    if (wx.getUseDuration) {
      wx.getUseDuration({
        success: function (res) {
          this.renderBalls(res.data.duration)
        }
      })
    } else {
      this.renderBalls(50 * 60)
    }
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
  renderBalls: function(time){
    const balls = []
    const count = Math.floor(time / 50)
    for (let i = 0; i < 7; i++) {
      const r = Math.random(.5, 1) * 100 + 60
      const cta = Math.PI / 6 * i
      const x = Math.floor(Math.sin(cta) * r)
      const y = Math.floor(Math.cos(cta) * r)
      const bottom = x + 50 + Math.random(-1, 1) * 20
      const left = 165 - y + Math.random(-1, 1) * 20
      const delay = Math.random() * Math.random() * 6
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
