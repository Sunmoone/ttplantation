// components/energyball.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type: 'minus',
    top: Math.random(.5, 1)*100,
    left: Math.random(.5, 1)*100
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },

  ready: function(){
    setInterval(() => {
      let {top, left, type} = this.data
      const rand = Math.random()*10
      const range = 10
      if (type === 'minus') {
        top += Math.random() * range
        left += Math.random() * range
        type = 'plus'
      }else{
        top -= Math.random() * range
        left -= Math.random() * range
        type = 'minus'
      }

      this.setData({
        top: top,
        left: left,
        type: type
      })
    },2000)
  }
})
