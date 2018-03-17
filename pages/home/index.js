import {plantDetail} from '../../services/PlantService.js'
import {recordDetail} from '../../services/RecordService.js'
import {listMsg, listFriend, inviteUser, getAddress, receiveEnergy} from '../../services/UserService.js'

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
          const minutes = res.data.duration/60
          const record = this.data.record
          this.renderBalls(minutes - record.harvest_energy)
        }
      })
    } else {
      this.renderBalls(76)
    }

    //get photos
    const user = app.globalData.userInfo
    listMsg({uid: user.uid}, res => {
      this.setData({photos: res.data})
    })

    //list friend
    this.listFriend()

    //get user
    this.setData({user: user})
  },
  listFriend: function(){
    const user = app.globalData.userInfo
    listFriend({
      uid: user.uid,
      page: 1,
      size: 10
    }, res => {
      this.setData({ friends: res.data })
    })
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
  onMyMsgCellTap: function(){
    wx.navigateTo({
      url: '../home/msg',
    })
  },
  onPlantTap: function(){
    wx.navigateTo({
      url: '../my-tree/detail?pid='+this.data.record.pid,
    })
  },
  onEnvelopeTap: function(){
    wx.navigateTo({
      url: '../envelope/index',
    })
  },
  onEnergyBallTap: function (e) {
    const balls = this.data.balls
    const index = e.currentTarget.dataset.index
    const ball = balls[index]
    if(ball.received){
      return false
    }
    const rid = this.data.record.rid
    receiveEnergy({ rid: rid, num: ball.num, type: ball.type }, res => {
      const balls = this.data.balls
      balls[index].received = true
      balls[index].delay = 0
      this.setData({ balls: balls, record: res.data })
    })
  },
  onWateringTap: function(e){
    const index = e.currentTarget.dataset.index
    const friends = this.data.friends
    const item = friends[index]
    const user = app.globalData.userInfo
    watering({uid: user.uid, watering_uid: item.uid}, res=>{
      friends[index].hasWatering = true
      this.setData({friends: friends})
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
        title: '好友添加成功',
      })
      this.listFriend()
    })
  },
  //time unit: minute
  renderBalls: function(time){
    const balls = []
    const num = 10
    const count = Math.floor(time / num)
    for (let i = 0; i < count; i++) {
      const r = Math.random(.5, 1) * 100 + 60
      const cta = Math.PI / 6 * i
      const x = Math.floor(Math.sin(cta) * r)
      const y = Math.floor(Math.cos(cta) * r)
      const bottom = x + 80 + Math.random(-1, 1) * 40
      const left = 165 - y + Math.random(-1, 1) * 40
      const delay = Math.random() * Math.random() * 6
      balls.push({
        index: i,
        num: num,
        type: 1,
        bottom: bottom,
        left: left,
        delay: delay,
        received: false
      })
    }
    this.setData({
      balls: balls
    })
  }
})
