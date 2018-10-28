// pages/welcome/welcome.js
Page({
  onTap: function (event) {
    wx.switchTab({
      url: '../news/read',
    })
  }
})