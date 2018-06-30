//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    flag: 1,
    userInfo: {},
    id: '',
    token: '',
    pid: '',
    ethi: 0,
    share: 0,
    invite: 0,
    telephone: 0,
    virified: 0,
    zero_ponys: {},
    dig_ponys: {},
    invite_detail: {},
    dig_detail: {},
    hasUserInfo: false,
    showModal: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onPullDownRefresh: function() {
    var that = this
    wx.request({
      url: 'https://www.ethorse.shop/app/pullDownRefresh',
      data: {
        userId: app.globalData.id,
        userToken: app.globalData.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 0) {
          that.setData({
            ethi: res.data.data.ethi,
            share: res.data.data.share,
            invite: res.data.data.invite,
            virified: res.data.data.virified,
            zero_ponys: res.data.data.zero_ponys,
            dig_ponys: res.data.data.dig_ponys,
            invite_detail: res.data.data.invite_detail,
            dig_detail: res.data.data.dig_detail
          })
          app.globalData.ethi = res.data.data.ethi
          app.globalData.share = res.data.data.share
          app.globalData.invite = res.data.data.invite
          app.globalData.virified = res.data.data.virified
          app.globalData.zero_ponys = res.data.data.zero_ponys
          app.globalData.dig_ponys = res.data.data.dig_ponys,
          app.globalData.invite_detail = res.data.data.invite_detail
          app.globalData.dig_detail = res.data.data.dig_detail
          wx.stopPullDownRefresh()
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            success: function (res) {
              if (res.confirm) {

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  //分享事件处理函数
  onShareAppMessage: function(e) {
    console.log('share')
    // console.log('/pages/index/index?pid=' + wx.getStorageSync('id') + '&pUser=' + this.data.userInfo.nickName)
    var that = this
    return {
      title: '以太马',
      desc: '区块链养成游戏',
      path: '/pages/index/index?pid=' + wx.getStorageSync('id'),
      success: (res) => {
        let shareTickets = res.shareTickets
        if (shareTickets != null) {
          console.log(shareTickets)
          if (shareTickets.length == 0) {
            return false;
          }
          wx.getShareInfo({
            shareTicket: shareTickets[0],
            success: function(res) {
              console.log(res)
              wx.request({
                url: 'https://www.ethorse.shop/app/wxShareInfo',
                data: {
                  userId: app.globalData.id,
                  userToken: app.globalData.token,
                  session_key: wx.getStorageSync('session_key'),
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                  if (res.data.code === 0) {
                    app.globalData.share = res.data.data.share
                    that.setData({
                      share: res.data.data.share
                    })
                    wx.showToast({
                      title: '分享成功',
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: res.data.message,
                      success: function (res) {
                        if (res.confirm) {
                          
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        }

        // wx.request({
        //   url: 'https://www.ethorse.shop/app/wxShare',
        //   data: {
        //     userId: app.globalData.id,
        //     userToken: app.globalData.token
        //   },
        //   header: {
        //     'content-type': 'application/json' // 默认值
        //   },
        //   success: function (res) {
        //     console.log(res)
        //     console.log('share success')
        //     if(res.data.code === 0){
        //       app.globalData.share = res.data.data.share
        //       that.setData({
        //         share: res.data.data.share
        //       })
        //     }else{
        //       wx.showToast({
        //         title: res.data.message
        //       })
        //     }
        //   }
        // })
      }
    }
  },
  //切换
  switchBtn: function(e) {
    console.log(e)
    this.setData({
      flag: e.target.dataset.flag
    })
  },
  onShow: function() {
    console.log('onshow')
    console.log(this.data)
    console.log(app.globalData)
    this.setData({
      zero_ponys: app.globalData.zero_ponys,
      dig_ponys: app.globalData.dig_ponys
    })
  },

  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    //是否通过推广链接进入
    if (options.pid != undefined) {
      // wx.showToast({
      //   title: '来自' + options.pid + '的分享',
      //   icon: 'success',
      //   duration: 10000
      // })
      //邀请人id
      wx.setStorageSync('pid', options.pid)
    }
    if (app.globalData.userInfo) {
      console.log(111)
      console.log('pid' + wx.getStorageSync('pid'))
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        id: app.globalData.id,
        token: app.globalData.token,
        ethi: app.globalData.ethi,
        share: app.globalData.share,
        invite: app.globalData.invite,
        virified: app.globalData.virified,
        zero_ponys: app.globalData.zero_ponys,
        dig_ponys: app.globalData.dig_ponys,
        invite_detail: app.globalData.invite_detail,
        dig_detail: app.globalData.dig_detail
      })
      console.log(app.globalData)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(222)
      app.userInfoReadyCallback = res => {
        wx.showLoading({
          title: '获取中',
          mask: true
        })
        var that = this
        console.log('begin wxLogin')
        wx.request({
          url: 'https://www.ethorse.shop/app/wxLogin',
          data: {
            session_key: wx.getStorageSync('session_key'),
            encryptedData: res.encryptedData,
            iv: res.iv,
          },

          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            console.log(res)
            console.log(that.data)
            if (res.data.code === 0) {
              wx.setStorageSync('id', res.data.data.id)
              wx.setStorageSync('token', res.data.data.token)
              app.globalData.id = res.data.data.id
              app.globalData.token = res.data.data.token
              that.setData({
                id: res.data.data.id,
                token: res.data.data.token,
                ethi: res.data.data.ethi,
                share: res.data.data.share,
                invite: res.data.data.invite,
                virified: res.data.data.virified,
                zero_ponys: res.data.data.zero_ponys,
                dig_ponys: res.data.data.dig_ponys,
                invite_detail: res.data.data.invite_detail,
                dig_detail: res.data.data.dig_detail
              })
              app.globalData.ethi = res.data.data.ethi
              app.globalData.share = res.data.data.share
              app.globalData.invite = res.data.data.invite
              app.globalData.virified = res.data.data.virified
              app.globalData.zero_ponys = res.data.data.zero_ponys
              app.globalData.dig_ponys = res.data.data.dig_ponys,
              app.globalData.invite_detail = res.data.data.invite_detail
              app.globalData.dig_detail = res.data.data.dig_detail
              wx.hideLoading()
            } else if (res.data.code === 1001) {
              wx.login({
                success: res => {
                  wx.request({
                    url: 'https://www.ethorse.shop/app/wxOpenid',
                    data: {
                      code: res.code
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: function(res) {
                      console.log('session重新获取:' + res.data.data.session_key)
                      wx.setStorageSync('session_key', res.data.data.session_key)
                    }
                  })
                }
              })
              wx.hideLoading()
            }
          },
          fail: function(res) {
            wx.showToast({
              title: '服务器内部错误',
            })
          }
        })
        console.log('end wxLogin')
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log(333)
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    wx.showToast({
      title: '获取中',
      icon: 'loading'
    })
    var that = this
    wx.request({
      url: 'https://www.ethorse.shop/app/wxLogin',
      data: {
        session_key: wx.getStorageSync('session_key'),
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        pid: wx.getStorageSync('pid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if (res.data.code === 0) {
          app.globalData.userInfo = e.detail.userInfo
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
          wx.setStorageSync('id', res.data.data.id)
          wx.setStorageSync('token', res.data.data.token)
          that.setData({
            id: res.data.data.id,
            token: res.data.data.token,
            ethi: res.data.data.ethi,
            share: res.data.data.share,
            invite: res.data.data.invite,
            virified: res.data.data.virified,
            zero_ponys: res.data.data.zero_ponys,
            dig_ponys: res.data.data.dig_ponys,
            invite_detail: res.data.data.invite_detail,
            dig_detail: res.data.data.dig_detail
          })
          app.globalData.id = res.data.data.id
          app.globalData.token = res.data.data.token
          app.globalData.ethi = res.data.data.ethi
          app.globalData.share = res.data.data.share
          app.globalData.invite = res.data.data.invite
          app.globalData.virified = res.data.data.virified
          app.globalData.zero_ponys = res.data.data.zero_ponys
          app.globalData.dig_ponys = res.data.data.dig_ponys
          app.globalData.invite_detail = res.data.data.invite_detail
          app.globalData.dig_detail = res.data.data.dig_detail
          console.log(app.globalData)
        } else if (res.data.code === 1001) {
          wx.login({
            success: res => {
              wx.request({
                url: 'https://www.ethorse.shop/app/wxOpenid',
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                  console.log('session重新获取:' + res.data.data.session_key)
                  wx.setStorageSync('session_key', res.data.data.session_key)
                }
              })
            }
          })
          this.getUserInfo()
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '服务器内部错误',
        })
      }
    })
  },

  virify: function() {
    wx.navigateTo({
      url: '../info/info'
    })
  }
})