import { postAddress } from '../../services/UserService.js'

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mobile: '',
    address: '',
    region: [],
    treeName: ''
  },
  onLoad: function(options) {
    this.setData({
      treeName: decodeURIComponent(options.name)
    });
  },
  onSubmit: function(){
    const {name, mobile, region, address} = this.data
    if(!name||!mobile||!region||!address){
      wx.showToast({
        icon: 'none',
        title: '请填写完整的收货人信息',
      })
      return false
    }
    var postData = {
      name: name,
      mobile: mobile,
      region: region.toString(),
      address: address,
      uid: app.globalData.userInfo.user_id
    }
    console.log(postData);
    postAddress(postData, (res) => {
      wx.showToast({
        icon: 'success',
        title: '地址填写成功',
      });
      console.log(res);
    })
  },
  onNameInput:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  onMobileInput: function(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  onAddressInput: function(e){
    this.setData({
      address: e.detail.value
    })
  },
  onRegionChange: function(e){
    this.setData({
      region: e.detail.value
    })
  }
})