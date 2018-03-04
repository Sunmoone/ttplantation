// pages/receive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mobile: '',
    city: 'bj',
    address: ''
  },
  onSubmit: function(){
    const {name, mobile, city, address} = this.data
    if(!name||!mobile||!city||!address){
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
  }
})