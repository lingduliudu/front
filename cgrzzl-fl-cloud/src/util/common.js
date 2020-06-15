/**
 * 金额转换为小数点后两位
 */
export function changeMoneyFloat(val) {
    if (val != "") {
        return parseFloat(val.toString().replace(/,/g, ""))
            .toFixed(2)
            .toString();
    } else {
        return "";
    }
}

/**
 * 金额转换为千分位小数点后两位
 */
export function changeMoneyThousand(val) {

    var regExpInfo = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    if (val != ""&&val) {
        return parseFloat((''+val).replace(/,/g, ""))
            .toFixed(2)
            .replace(regExpInfo, "$1,");
    } else {
        return 0;
    }
}
export function convertCurrency(money) {  
    //汉字的数字  
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');  
    //基本单位  
    var cnIntRadice = new Array('', '拾', '佰', '仟');  
    //对应整数部分扩展单位  
    var cnIntUnits = new Array('', '万', '亿', '兆');  
    //对应小数部分单位  
    var cnDecUnits = new Array('角', '分', '毫', '厘');  
    //整数金额时后面跟的字符  
    var cnInteger = '整';  
    //整型完以后的单位  
    var cnIntLast = '元';  
    //最大处理的数字  
    var maxNum = 999999999999999.9999;  
    //金额整数部分  
    var integerNum;  
    //金额小数部分  
    var decimalNum;  
    //输出的中文金额字符串  
    var chineseStr = '';  
    //分离金额后用的数组，预定义  
    var parts;  

    if (money == '') { return '零元整'; }  
    money = parseFloat(money);  
    if (money >= maxNum) {  
      //超出最大处理数字  
      return '';  
    }  
    if (money == 0) {  
      chineseStr = cnNums[0] + cnIntLast + cnInteger;  
      return chineseStr;  
    }  
    //转换为字符串  
    money = money.toString();  
    if (money.indexOf('.') == -1) {  
      integerNum = money;  
      decimalNum = '';  
    } else {  
      parts = money.split('.');  
      integerNum = parts[0];  
      decimalNum = parts[1].substr(0, 4);  
    }  
    //获取整型部分转换  
    if (parseInt(integerNum, 10) > 0) {  
      var zeroCount = 0;  
      var IntLen = integerNum.length;  
      for (var i = 0; i < IntLen; i++) {  
        var n = integerNum.substr(i, 1);  
        var p = IntLen - i - 1;  
        var q = p / 4;  
        var m = p % 4;  
        if (n == '0') {  
          zeroCount++;  
        } else {  
          if (zeroCount > 0) {  
            chineseStr += cnNums[0];  
          }  
          //归零  
          zeroCount = 0;  
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];  
        }  
        if (m == 0 && zeroCount < 4) {  
          chineseStr += cnIntUnits[q];  
        }  
      }  
      chineseStr += cnIntLast;  
    }  
    //小数部分  
    if (decimalNum != '') {  
      var decLen = decimalNum.length;  
      for (var i = 0; i < decLen; i++) {  
        var n = decimalNum.substr(i, 1);  
    
        //原始方法
       // if (n != '0') {  
        //  chineseStr += cnNums[Number(n)] + cnDecUnits[i];  
      //  }  
      //自己改写
          if(i==0&&cnNums[Number(n)]=='零'){
            chineseStr += cnNums[Number(n)]
          }else{
            chineseStr += cnNums[Number(n)] + cnDecUnits[i];  

          }
      }  
    }  
    if (chineseStr == '') {  
      chineseStr += cnNums[0] + cnIntLast + cnInteger;  
    } else if (decimalNum == '') {  
      chineseStr += cnInteger;  
    }  
    
    return chineseStr 
  } 
  //处理累加
  export function adds (...arg) {
    var r1, r2, m, result = this;
    arg.forEach(value => {
        try { r1 = result.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = value.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        result = Math.round(result * m + value * m) / m;
    });
    return result;
};
  //JSEncrypt加密方法
export function getPassword(password) {
    var encrypt = new JSEncrypt();
    //设置公钥
    encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDe+9YejJ5J5mPIHc2LK6owKSk6yW3YXLH/lKLKjsLvDU/2IBe8yYlEj45vd4djc/WG0Szmh3JoDXNbJvFfG/l2u7ndtWPbZsnubjY2qdMlfqNji8itF5v4CBddYF3YwznqxLkQvPc0HQVtPHLZyVHkPRSHfTOcwMFVySovIA7Z6QIDAQAB");
    return encrypt.encrypt(password);
};