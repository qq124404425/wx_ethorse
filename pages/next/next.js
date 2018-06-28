// pages/next/next.js
const app = getApp
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
    isBreed: 0,
    cooldown: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      isBreed: options.isBreed,
      cooldown: options.cooldown
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