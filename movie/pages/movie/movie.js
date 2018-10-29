// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onMoreMovie: function (event) {
    wx.navigateTo({
      url: 'more-movie/more-movie',
    })
  }
})