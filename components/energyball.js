// components/energyball.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 0
    },
    top: {
      type: Number,
      value: 0
    },
    left: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type: 'minus',
    top: 0,
    left: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },

  attached: function(){
    this.setData({
      top: this.data.top,
      left: this.data.left
    })
  },

  ready: function(){
    setInterval(() => {
      let {type, top, left} = this.data
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
