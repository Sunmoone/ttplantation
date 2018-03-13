// components/energyball.js
Component({
  properties: {
    num: {
      type: Number,
      value: 0
    },
    bottom: {
      type: Number,
      value: 0
    },
    left: {
      type: Number,
      value: 0
    },
    delay: {
      type: Number,
      value: 0
    }
  },
  data: {
    type: 'minus',
    bottom: 0,
    left: 0,
    show: true
  },
  attached: function(){
    const delay = Math.random()*Math.random()*6
    this.setData({
      bottom: this.data.bottom,
      left: this.data.left,
      delay: delay
    })
  },
  methods: {
    onTap: function () {
      this.setData({
        show: false,
        delay: 0
      })
    }
  }
})
