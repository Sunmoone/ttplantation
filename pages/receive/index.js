// pages/receive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mobile: '',
    city: 'bj',
    region: ['北京市', '北京市', '东城区'],
  },
  onSubmit: function(){
    const {name, mobile, region, address} = this.data
    if(!name||!mobile||!region||!address){
      console.log('请填写完整的收货人信息')
      return false
    }
    const requestTask = wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: this.data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
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
  onAddressInput:function(e){
    this.setData({
      address: e.detail.value
    })
  },
  onRegionChange:function(e){
    this.setData({
      region: e.detail.value
    })
  }
})