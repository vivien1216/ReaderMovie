// pages/read/read.js
var newsData = require('../../data/news-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000
  },
  onLoad: function () {
    this.setData ({
      newsList: newsData.postList
    });
  }
})