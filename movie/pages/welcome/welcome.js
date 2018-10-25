// pages/welcome/welcome.js
Page({
  onTap: function (event) {
    wx.redirectTo({
      url: '../news/read',
    })
  }
})