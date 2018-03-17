import {plantDetail} from '../../services/PlantService.js'
import {recordDetail} from '../../services/RecordService.js'
import {listMsg, listFriend, inviteUser} from '../../services/UserService.js'

const app = getApp()
Page({
  data: {},
  onLoad: function (options) {
    //get plant detail
    recordDetail({rid: options.rid}, res => {
      const treeImg = {
        1: 'sprout',
        2: 'leaf',
        3: 'trunk',
        4: 'bloom',
        5: 'fruit'
      }
      this.setData({
        record: res.data,
        treeImg: treeImg[res.data.step]
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

    //get photos
    const user = app.globalData.userInfo
    listMsg({uid: user.uid}, res => {
      this.setData({photos: res.data})
    })

    //get ranks
    listFriend({
      uid: user.uid,
      page: 1,
      size: 10
    }, res => {
      this.setData({friends: res.data})
    })

    //get user
    this.setData({user: user})
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
  onInviteConfirm: function(e){
    const value = e.detail.value
    const user = app.globalData.userInfo
    inviteUser({uid: user.uid, invite_uid: value}, res => {
      wx.showToast({
        title: '添加好友成功',
      })
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
