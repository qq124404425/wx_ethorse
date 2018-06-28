// pages/nuggets1/nuggets1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    blood: 175,
    blood_name: 0,
    blood_pure: 0,
    ear_name: 0,
    eye_name: 0,
    figure_name: 0,
    foot_name: 0,
    hair_name: 0,
    mouth_name: 0,
    nose_name: 0,
    skin_color: 0,
    tail_name: 0,
    digrate: 0,
    digspeed: 0,
    isDig: 0,
    digend: 0
  },
  dig: function(e){
    wx.showLoading({
      title: '掘金中',
      mask: true
    })
    console.log(e)
    let ponyId = e.currentTarget.dataset.ponyid
    wx.request({
      url: 'https://www.ethorse.shop/app/wxPonyDig',
      data: {
        userId: wx.getStorageSync('id'),
        userToken: wx.getStorageSync('token'),
        ponyId: ponyId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let pages = getCurrentPages();//当前页面
        let prevPage = pages[pages.length - 2];//上一页面
        console.log(res)
        wx.hideLoading()
        if (res.data.code === 0) {
          app.globalData.dig_ponys = res.data.data.dig_ponys
          prevPage.setData({
            dig_ponys: res.data.data.dig_ponys,
            invite_detail: res.data.data.invite_detail,
            dig_detail: res.data.data.dig_detail
          })
          wx.showModal({
            title: '提示',
            content: '掘金马开始掘金啦~',
            success: function (res) {
              if (res.confirm) {
                app.globalData.flag = 2
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                app.globalData.flag = 2
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            success: function (res) {
              if (res.confirm) {
                app.globalData.flag = 2
                wx.navigateBack({
                  delta: 1
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      blood: options.blood,
      blood_name: options.blood_name,
      blood_pure: options.blood_pure,
      ear_name: options.ear_name,
      eye_name: options.eye_name,
      figure_name: options.figure_name,
      foot_name: options.foot_name,
      hair_name: options.hair_name,
      mouth_name: options.mouth_name,
      nose_name: options.nose_name,
      skin_color: options.skin_color,
      tail_name: options.tail_name,
      digrate: options.digrate,
      digspeed: options.digspeed,
      isDig: options.isDig,
      digend: options.digend
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