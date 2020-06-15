import {baseURL} from './sys'
export default {
  uploadFile() {
    return `${baseURL}` + '/finance-corp/web/detail/uploadBusinessLicense'
  },
  uploadIDCard() {
        return `${baseURL}` + '/finance-corp/web/detail/uploadIDCardT'
  },
  eqptImgSrc() {
    return `${baseURL}` + '/finance-file/fast/file/upload'
  },

  // 融资查看图片
  searchBusinessImg() {
    return `${baseURL}` + '/business/file/search'
  },
  // 上传签约的图片
  uploadFileLimit() {
    return `${baseURL}` + '/audit/auditFile/uploadAuditFileLimit'
  },
  //链属表格上传
  uploadChain() {
    return `${baseURL}` + '/company/chain/submitUploadChain'
  },
  // 账款凭证上传
  uploadBusiness() {
    return `${baseURL}` + '/business/file/upload'
  },
  // 生成验证码
  // verifycode(uuid) {
  //   return baseURL + '/verifycode/' + uuid
  // },

  //核心企业上传还款凭证
  uploadRepayCredit() {
    return `${baseURL}` + '/audit/auditFile/uploadAuditFileGong'
  },
  //上传线下盖过章的合同
  uploadContract() {
    return `${baseURL}` + '/finance-credit/web/financeSign/uploadContract'
  },
  //上传线下没有盖过章的合同
  //  uploadOffineContractSign
  uploadOffineContractSign() {
    return `${baseURL}` + '/finance-credit/web/financeSign/uploadOffineContractSign'
  },
  //上传还款凭证
  uploadProof() {
    return `${baseURL}` + '/finance-credit/web/financeSign/uploadProof'
  }
}

