import {plantDetail} from '../../services/PlantService.js'
import {recordDetail} from '../../services/RecordService.js'
import {listMsg, listFriend, inviteUser, getAddress, watering, receiveEnergy} from '../../services/UserService.js'
import {log, toast} from '../../utils/util.js'
const app = getApp()
Page({
  data: {},
  onLoad: function (options) {
    //get plant detail
    recordDetail({rid: options.rid}, res => {
      const record = res.data
      this.setData({
        record: record
      })
      plantDetail({ pid: record.pid }, res => {
        const plant = res.data
        const successMsg = {
          title: `经过30天的不懈努力，你积攒了5000分钟的阅读时间，浇水5000ml，陪伴了${plant.name}的播种、生长、开花、成熟，终于获得了果实！`,
          body: '请填写你的地址和电话，甘肃成县果园基地将为您邮寄一份果实，共享喜悦！',
          poster: 'http://10.8.127.110/images/pages/home/fruit-poster.png',
          showTitle: true,
          receiveFruit: true
        }
        this.setData({
          plant: plant,
          successMsg: successMsg
        })
        app.globalData.plant = plant
      })
      //get duration, unit:s
      if (wx.getUseDuration) {
        wx.getUseDuration({
          success: res => {
            log(res)
            const minutes = res.duration / 60
            this.renderBalls(minutes - record.harvest_energy_today)
          }
        })
      } else {
        this.renderBalls(70)
      }
    })

    //list friend
    this.listFriend()

    //get user
    this.setData({
      user: app.globalData.userInfo
    })
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
    receiveEnergy({ rid: rid, num: ball.num, type: ball.type, showLoading: false}, res => {
      const record = res.data
      const balls = this.data.balls
      balls[index].received = true
      balls[index].delay = 0
      this.setData({ balls: balls, record: record})
    })
  },
  onWateringTap: function (e) {
    const index = e.currentTarget.dataset.index
    const friends = this.data.friends
    const item = friends[index]
    const user = app.globalData.userInfo
    watering({uid: user.uid, to_uid: item.uid}, res=>{
      toast('浇水成功, 获得3ml能量！')
      const record = this.data.record
      record.energy += 3
      friends[index].total_energy += res.data.rand_num
      this.setData({friends: friends, record: record})
    })
  },
  onMoreTreeTap: function(){
    let userInfo = app.globalData.userInfo
    userInfo.planting_rid = -1
    app.globalData.userInfo = userInfo
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onInviteConfirm: function(e){
    const value = e.detail.value
    if(!value){
      return false
    }
    if(!/^\d+$/.test(value)){
      toast('邀请码为数字')
      return false
    }
    const user = app.globalData.userInfo
    inviteUser({uid: user.uid, invite_uid: value}, res => {
      toast('好友添加成功')
      this.listFriend()
    })
  },
  onReceiveFruitTap: function () {
    this.renderBalls(0)
    const record = this.data.record
    record.step = 0
    this.setData({record: record})
    wx.navigateTo({
      url: '../receive/index?rid='+this.data.record.rid,
    })
  },
  onBgLongTap: function(){
    wx.setStorageSync('hasTip', 'false')
    wx.navigateTo({
      url: '../index/index',
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
      let bottom = x + 80 + Math.random(-1, 1) * 40
      let left = 165 - y + Math.random(-1, 1) * 40
      if(left>305){
        left = 305
      }
      if(left<25){
        left = 25
      }
      if(bottom<80){
        bottom = 80
      }
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
