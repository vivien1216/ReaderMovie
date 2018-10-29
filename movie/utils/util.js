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
}

module.exports = {
  convertToStarsArray: convertToStarsArray
}
