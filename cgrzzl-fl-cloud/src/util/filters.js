
import moment from 'moment'
export default {
  // 数字格式化千分位
  formatMoney: value => {
    var result = '';
    if (value) {
      const fmtSplit = value.toString().split('.')
      var num = fmtSplit[0];
      // var num = (value || 0).toString(), result = '';
      while (num.length > 3) {
          result = ',' + num.slice(-3) + result;
          num = num.slice(0, num.length - 3);
      }
      if (num) { result = num + result; }
      if (fmtSplit.length > 1) result += `.${fmtSplit[1]}`
    } else {
      result = '0';
    }
    return result;
  },
  //去掉千分位
  removeMoney: value => {
    return parseFloat(s.replace(/[^\d\.-]/g, ""));
  },
  formatDate: value => {
    var date = ''
    if (value) date = moment(value).format('YYYY-MM-DD')
    return date
  },
  formatHour: value => {
    var date = ''
    if (value) date = moment(value).format('YYYY-MM-DD HH:mm:ss')
    return date
  },

  corpAckStatusTranlateName: value => {
    var name = '';
    switch(value) {
      case 1:
         name = '初始状态'
         break;
      case  2:
         name = '待确权'
         break;
      case  3:
        name = '已确权'
        break;
      case  4:
        name = '无需确权'
        break;
      case  5:
        name = '部分确权'
        break;
      case  6:
        name = '确权申请审核中'
        break;
     
    } 
    return name;     
  },
  billType: value => {
    var name = '';
    switch(value) {
      case 1:
         name = '商票'
         break;
      case  2:
         name = '国股'
         break;
      case  3:
        name = '城商'
        break;
      case  4:
        name = '三农'
        break;
      case  5:
        name = '财票'
        break;
     
    } 
    return name;     
  },
  quoteLimit: value => {
    var name = '';
    switch(value) {
      case 1:
         name = '24小时'
         break;
      case  2:
         name = '48小时'
         break;
      case  3:
        name = '72小时'
        break;
      case  4:
        name = '无限时'
        break;
        default :
        name='未报价'
     
    } 
    return name;     
  },


  quoteLimit: value => {
    var name = '';
    switch(value) {
      case 1:
         name = '24小时'
         break;
      case  2:
         name = '48小时'
         break;
      case  3:
        name = '72小时'
        break;
      case  4:
        name = '无限时'
        break;
        default :
        name='未报价'
     
    } 
    return name;     
  },

   //企业管理理 配置管理的 流程列表
   flowStatus:value=>{  // 1 东风金融-创格开立；2 邀请开立流程；3 转让流程;4东风金融-创格融资
      if(value){
          let arrMsg = [{1:"东风金融-创格开立 "},{2:"东风金融-创格转让"},{3:"东风金融-创格融资"},{4:"东风金融-创格延期兑付"}];
          let statusName = arrMsg.filter((item)=>Number(Object.keys(item)[0]) === value)
          return statusName.length > 0 ? statusName[0][value] : ""
      }
   },
   //流程节点:的内容  11 开立内审 12开立外审 13 开立担保审核 14平台审核 15开立资方审核 21邀请开立核心审核 22邀请开立链属审核 23邀请开立担保审核 24邀请开立平台审核 25邀请开立资方审核 31转让内审 32转让外审 41融资内审 42融资外审 43融资平台审核 44融资资方审核
   //流程节点：\n10开立审核\n20接收审核\n30转让审核\n40融资审核\n50担保审核\n60资方审核（开立）\n70资方审核（融资）\n80平台审核（开立）\n90平台审核（融资）
   flowPointStatus:(value, type)=>{
      if(value){
          let name = "";
          if(type){
            if(type === 1){
              name = "开立申请"
            }
          }
          let arrMsg = [{0:"开立申请"},{10:"开立审核"},{20:"转让审核"},{30:"担保审核"},{40:"接收审核"},{50:"融资审核"},{55:"车企审核（融资）"},{60:"平台审核"},{70:"平台审核（融资）"},{80:"资方审核（开立）"},{90:"资方审核（融资）"},{99:"正常持有"},{100:"延期兑付审核"},{110:"车企审核"},{120:"平台审核（延期兑付）"},{130:"资方审核（延期兑付）"},{140:"平台审核"},{150:'资方审核'}];
          let statusName = arrMsg.filter((item)=>Number(Object.keys(item)[0]) === value)
          return statusName.length > 0 ? statusName[0][value] : ""
      }
   },

   /** 获取企业渠道账户信息  账户状态 */
   fundAccountState:value=>{
      if(value){
          let arrMsg = [{1:"可结算"},{2:"可充值可提现"}];
          let statusName = arrMsg.filter((item)=>Number(Object.keys(item)[0]) === value)
          return statusName.length > 0 ? statusName[0][value] : ""
      }
   },
   fundAccountBindState:value=>{
    var name = '';
    switch(value) {
      case 1:
         name = '已绑卡未激活'
         break;
      case  2:
         name = '卡激活<临时状态>'
         break;
      case  3:
        name = '卡认证'
        break;
        default :
        name='未绑卡'
     
    } 
    return name; 

 },


/** 审核流程的   回调回来的审核状态内容。 */
statusCheckFillter:value=>{
  var name = '';
    switch(value) {
      case 1:
         name = '同意'
         break;
      case  2:
         name = '拒绝'
         break;
      case  3:
        name='退回'
        break;
    } 
    return name; 
},

deferredPaymentStatusFillter:value=>{
  var name = '';
    switch(value) {
      case null:
        name = '待申请'
        break;
      case 0:
         name = '待申请'
         break;
      case  60:
         name = '拒绝'
         break;
      case  10:
        name='内审待审核'
        break;
      case  20:
        name='车企待审核'
        break;
      case  30:
        name='平台待审核'
        break;
      case  40:
          name='资方待审核'
          break;
      case  50:
        name='延期成功'
        break;
    } 
    return name; 
}






}