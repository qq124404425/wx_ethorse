// pages/end/end.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zero_ponys: {},
    dig_ponys: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      zero_ponys: app.globalData.zero_ponys
    })
  },
  breed: function(e){
    var that = this
    wx.showLoading({
      title: '生育中',
      mask: true
    })
    let dad_id = e.currentTarget.dataset.dad
    let mom_id = e.currentTarget.dataset.mom
    wx.request({
      url: 'https://www.ethorse.shop/app/wxPonyBirth',
      data: {
        userId: wx.getStorageSync('id'),
        userToken: wx.getStorageSync('token'),
        dad_id: dad_id,
        mom_id: mom_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        let pages = getCurrentPages();//当前页面
        let prevPage = pages[pages.length - 3];//上一页面
        wx.hideLoading()
        if (res.data.code === 0) {
          app.globalData.zero_ponys = res.data.data.zero_ponys
          app.globalData.dig_ponys = res.data.data.dig_ponys
          prevPage.setData({
            flag: 2,
            zero_ponys: res.data.data.zero_ponys,
            dig_ponys: res.data.data.dig_ponys
          })
          wx.showModal({
            title: '提示',
            content: '以太马配对成功~',
            success: function (res) {
              if (res.confirm) {
                app.globalData.flag = 1
                wx.navigateBack({
                  delta: 2
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                app.globalData.flag = 1
                wx.navigateBack({
                  delta: 2
                })
              }
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.message,
            success: function (res) {
              if (res.confirm) {
                app.globalData.flag = 1
                wx.navigateBack({
                  delta: 2
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})