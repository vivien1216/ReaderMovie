// pages/movie/more-movie/more-movie.js
var util = require("../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: '',
    navigateTitle: '',
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣top250":
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);

    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + "&count=20";
    util.http(nextUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh: function () {
    var refreshUrl = thsi.data.requestUrl + "start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.toString().substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        stars: util.convertToStarsArray(subject.rating.stars),
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var totalMovies = {}
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }

    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})