//app.js
App({
  wxShareInfo: function(opt){
    console.log('-----share Info-----')
    console.log(opt)
    if (ops.scene == 1044) {
      if (shareTickets != null) {
        console.log(shareTickets)
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            console.log(res)
            wx.request({
              url: 'https://www.ethorse.shop/app/wxShareInfo',
              data: {
                session_key: wx.getStorageSync('session_key'),
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res)
              }
            })
          }
        })
      }
    }
  },
  onLaunch: function() {
    //检查用户的session是否过期，如果过期，需要重新获取
    if (wx.getStorageSync('session_key') == null) {}
    wx.checkSession({
      success: function(res) {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('seesion未失效：' + wx.getStorageSync('session_key'))
      },
      fail: function() {
        // session_key 已经失效，需要重新执行登录流程
        wx.showToast({
          title: '登录',
          icon: 'loading'
        })
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
                console.log(res)
                console.log(res.data.data.session_key)
                console.log('session过期获取:' + res.data.data.session_key)
                wx.setStorageSync('session_key', res.data.data.session_key)
                wx.hideToast()
              }
            })
          }
        })
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.encryptedData = res.encryptedData
              this.globalData.iv = res.iv
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          //wx.hideToast()
        }
      }
    })
  },
  globalData: {
    flag: 1,
    userInfo: null,
    id: null,
    token: null,
    ethi: 0,
    share: 0,
    invite: 0,
    virified: 0,
    zero_ponys: null,
    dig_ponys: null,
    invite_detail: null
  }
})