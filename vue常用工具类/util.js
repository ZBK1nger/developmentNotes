//时间戳转换时间  
function toDate(number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}


function isNotBlank(string) {
  if (string == null) {
    return false;
  } else if (string == undefined) {
    return false;
  } else if (string == "undefined") {
    return false;
  } else if (string.length == 0) {
    return false;
  } else {
    return true;
  }
}

function isEmpty(string) {
  if (string == null) {
    return true;
  } else if (string == undefined) {
    return true;
  } else if (string == "undefined") {
    return true;
  } else if (string.length == 0) {
    return true;
  } else {
    return false;
  }
}

function isNotUndefined(value) {
  if (value === undefined) {
    return false
  } else if (value == undefined) {
    return false
  } else if (typeof (value) == "undefined") {
    return false
  } else if (string == "undefined") {
    return false;
  } else {
    return true
  }
}


function configTimeInterval(second, timeStamp) {
  if (second < 0) {
    second = 1;
  }
  var prettyDate = '';
  if (second < 60 * 60 * 24 * 30) {
    if (second < 60) {
      prettyDate = second + '秒前';
    } else if (second < 60 * 60) {
      prettyDate = (second / 60).toFixed(0) + '分钟前'
    } else if (second < 60 * 60 * 24) {
      prettyDate = (second / 60 / 60).toFixed(0) + '小时前'
    } else {
      prettyDate = (second / 60 / 60 / 24).toFixed(0) + '天前'
    }
  } else {
    var newDate = new Date();
    newDate.setTime(timeStamp);
    prettyDate = newDate.format('YYYY-MM-dd')
  }
  return prettyDate;
}

//时间戳转时间字符串
function configReleaseTime(timeStamp) {
  var newDate = new Date();
  newDate.setTime(timeStamp);
  var prettyDate = newDate.format('YYYY.MM.dd hh:mm')
  return prettyDate;
}


Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
        date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}


/** 判断对象是否为空 */
function judgeObj(obj) {
  if (JSON.stringify(obj) == "{}" || obj == null) return true;
  else return false;
}

/** 判断数组是否为空 */
function judgeArray(arr) {
  if (arr == null || arr == undefined) {
    return true
  } else {
    if (arr.length == 0) {
      return true
    } else {
      return false
    }
  }
}

/** string == null return -- */
function formatEmptyHouseAttribute(obj) {
  var string = '';
  if (this.isString(obj)) {
    string = obj;
  } else if (obj == null) {
    return '--'
  } else {
    string = obj.toString()
  }
  if (this.isNotBlank(string)) {
    return string;
  } else {
    string = '--'
    return string;
  }
}

//配置图片
function formatHouseListPic(obj) {
  var picUrl = ""
  var list = [];
  if (this.isNotBlank(obj)) {
    if (obj.indexOf(",") != -1) {
      list = obj.split(",")
      picUrl = getApp().globalData.httpPicBase + list[0]
    } else {
      picUrl = getApp().globalData.httpPicBase + obj;
    }
    return picUrl;
  } else {
    return '/assets/house_no_pic.png'
  }
}

//将用逗号分隔的字符串转化为数组
function formatStringToList(string) {
  var list = [];
  if (this.isNotBlank(string)) {
    console.log(string)
    if (string.indexOf(',') != -1) {
      string.split(',').forEach(function (item) {
        list.push(getApp().globalData.httpPicBase + item)
      })
    } else {
      list.push(getApp().globalData.httpPicBase + string)
    }
    return list

  } else {
    return null
  }
}


//判断是否是字符串
function isString(str) {
  if (Object.prototype.toString.call(str) === "[object String]") {
    return true;
  } else {
    return false;
  }
}

/**验证身份证号 */
function verifyIDCard(id) {
  // 1 "验证通过!", 0 //校验不通过
  var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
  //号码规则校验
  if (!format.test(id)) {
    return {
      'status': 0,
      'msg': '身份证号码不合规'
    };
  }
  //区位码校验
  //出生年月日校验   前正则限制起始年份为1900;
  var year = id.substr(6, 4), //身份证年
    month = id.substr(10, 2), //身份证月
    date = id.substr(12, 2), //身份证日
    time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
    now_time = Date.parse(new Date()), //当前时间戳
    dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
  if (time > now_time || date > dates) {
    return {
      'status': 0,
      'msg': '出生日期不合规'
    }
  }
  //校验码判断
  var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
  var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
  var id_array = id.split("");
  var sum = 0;
  for (var k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k]);
  }
  if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
    return {
      'status': 0,
      'msg': '身份证校验码不合规'
    }
  }
  return {
    'status': 1,
    'msg': '校验通过'
  }
}

/**三十二位随机数 */
function randomWord() {

  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var nums = "";

  for (var i = 0; i < 32; i++) {

    var id = parseInt(Math.random() * 61);

    nums += chars[id];

  }

  return nums;

}


/**验证手机号 */
function vaildPhone(tel) {
  var myreg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
  if (!this.isNotBlank(tel)) {
    return false;
  } else if (!myreg.test(tel)) {
    return false;
  } else {
    return true;
  }
}

/**验证邮件*/
function vaildEmail(email) {
  var emailReg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
  if (!this.isNotBlank(email)) {
    return false;
  } else if (!emailReg.test(email)) {
    return false;
  } else {
    return true;
  }
}


// 6-16位数字加字母组合密码
function checkPwd(pwd) {
  var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  var re = new RegExp(reg)
  if (re.test(pwd)) {
    return true;
  } else {
    return false;
  }
}


/** 判断当前输入的是否为整数 */
function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

//正则验证，只能为数字面积小数点后不能大于两位数字
function isNumberAndfix2(value) {
  var data;
  if (/^(\d?)+(\.\d{0,2})?$/.test(value)) { //正则验证，只能为数字面积小数点后不能大于两位数字
    data = value;
  } else {
    data = “”
  }
  return data
}


//是否含有中文（也包含日文和韩文）
function isChineseChar(str) {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
}
//时间转化时间戳
function timestamp(strtime){
  var date = new Date(strtime);
  var date = new Date(strtime.replace(/-/g, '/'));
 var time = Date.parse(date)
  return time
}

//截取"2019-12-13 11:20:46"中的年月
function date2chinese (data){
  if(data){
      var intercept = data.split('').splice(0,7)
      var intercepta =  intercept.splice(4,1)
      for(var i = 0;i<4;i++){
          switch (intercept[i]) {
              case "1":
                  intercept[i] = "一"
                  break;
              case "2":
                  intercept[i] = "二"
                  break;
              case "3":
                  intercept[i] = "三"
                  break;
              case "4":
                  intercept[i] = "四"
                  break;
              case "5":
                  intercept[i] = "五"
                  break;
              case "6":
                  intercept[i] = "六"
                  break;
              case "7":
                  intercept[i] = "七"
                  break;
              case "8":
                  intercept[i] = "八"
                  break;
              case "9":
                  intercept[i] = "九"
                  break;
              case "0":
                  intercept[i] = "〇"
                  break;  
          }
      }
      let years = intercept.splice(0,4).join('')
      var interceptb = intercept.join('')
      var month;
      switch (interceptb) {
          case "01":
              month = "一"
              break;
          case '02':
              month = '二'
              break;
          case '03':
              month = '三'
              break;
          case '04':
              month = '四'
              break;
          case '05':
              month = '五'
              break;
          case '06':
              month = '六'
              break;
          case '07':
              month = '七'
              break;
          case '08':
              month = '八'
              break;
          case '09':
              month = '九'
              break;
          case '10':
              month = '十'
              break;
          case '11':
              month = '十一'
              break;
          case '12':
              month = '十二'
              break;
      }
      return [years,month]
  }
}

export default {
  toDate,
  isNotBlank,
  isEmpty,
  isNotUndefined,
  judgeObj,
  judgeArray,
  isString,
  vaildPhone,
  vaildEmail,
  checkPwd,
  verifyIDCard,
  isNumber,
  isChineseChar,
  formatEmptyHouseAttribute,
  formatHouseListPic,
  configTimeInterval,
  isNumberAndfix2,
  configHousePicUrl,
  formatStringToList,
  timestamp,
  date2chinese
}
