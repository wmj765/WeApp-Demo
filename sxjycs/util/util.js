var big = require('../page/common/big.min.js');
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}


function clearNoNum(obj){   
    obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    obj = obj.replace(/^\./g,"");  //验证第一个字符是数字而不是. 
    obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.   
    obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    return obj;
}


/**
 * 数字转科学计数法
 */
function formatNum(num,Precision,csslength){
    if(num.length>csslength){
        return big(num).toExponential(Precision);
    }else{
      return num;
    }
}

function numAdd(num1,num2){
  return big(num1==""?0:num1).plus(big(num2==""?0:num2));
}

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  clearNoNum:clearNoNum,
  formatNum:formatNum,
  numAdd:numAdd
}
