// pages/news/news-detail/news-detail.js
var postsData = require('../../../data/news-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })

    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },

  onCollectionTap: function(event) {
    this.getPostsCollectedSyc();
  },

  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享给QQ好友",
      "分享到朋友圈",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        //res.cancel 用户是否点击了取消按钮
        //res.taoIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消？'  + '现在无法实现分享功能',
        })
      }
    })
  },

  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },

  showToast: function(postsCollected, postCollected) {
    var that = this;
    //更新文章是否有缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而切换图片
    that.setData({
        collected: postCollected
      }),
      wx.showToast({
        title: postCollected ? '收藏成功' : '取消收藏',
        duration: 1000,
        icon: 'success'
      })
  }
})