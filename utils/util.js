//time单位为s
const formatTime = time => {
  const date = new Date()
  date.setTime(time*1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('.')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  log: function(data){
    wx.showModal({
      title: 'log',
      content: JSON.stringify(data),
    })
  },
  toast: function(data){
    wx.showModal({
      showCancel: false,
      content: data
    })
  }
}
