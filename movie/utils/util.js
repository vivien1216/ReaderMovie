function convertToStarsArray(stars) {
  var array = [];
  var num = stars.toString().substring(0, 1);
  for (var i = 1; i <= 5; i++) {
    if (i < +num) {
      array.push(i);
    } else {
      array.push(0);
    }
  }
  return array;
};

function http(url, callBack) {
  wx.request({
    url: url,
    mmethod: 'Get',
    header: {
      "content-type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http
}
