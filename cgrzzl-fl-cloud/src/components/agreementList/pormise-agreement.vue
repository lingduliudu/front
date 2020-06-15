<!--承诺付款协议-->
<template>
    <div>
	<div>
			<p style="line-height:39.65pt; margin:0pt; orphans:0; text-align:center; widows:0"><span style="font-family:微软雅黑; font-size:22pt">付款承诺函</span></p>

			<p style="line-height:23pt; margin:0pt; orphans:0; text-indent:22pt; widows:0"><span style="font-family:微软雅黑; font-size:12pt">因 </span><span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline">  </span>
				<a name="_cmntref1"><span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline">开瑞新能源汽车</span></a>
				<span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline">  </span><span style="font-family:微软雅黑; font-size:12pt">有限公司（以下简称“卖方”）向我司提供货物、服务或设施，我司承担相应付款责任，我司保证总计人民币</span><span style="font-family:微软雅黑; font-size:12pt">￥</span><span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline">              </span><span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline">{{payInfo.money}}元</span><span style="font-family:微软雅黑; font-size:12pt"></span><span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline">  {{'('+payInfo.bmoney+')'}}      </span><span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline">(元）</span><span style="font-family:微软雅黑; font-size:12pt">的应付账款在</span><span style="font-family:微软雅黑; font-size:12pt; ">{{payData.today}} （以下简称“承诺付款日”）前，按照我司在</span><span style="font-family:微软雅黑; font-size:12pt">芜湖</span><span style="font-family:微软雅黑; font-size:12pt">市好用汽车租赁</span><span style="font-family:微软雅黑; font-size:12pt">有限公司运营的</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格平台</span><span style="font-family:微软雅黑; font-size:12pt">接收到的《最终还款明细表》所列明的收款方（以下简称“最终持单人”）的收款信息付款。</span></p>
			<p style="line-height:23pt; margin:0pt; orphans:0; text-indent:22pt; widows:0"><span style="font-family:微软雅黑; font-size:12pt">我司确认并同意：</span></p>
			<p style="line-height:23pt; margin:0pt; orphans:0; text-indent:22pt; widows:0"><span style="font-family:微软雅黑; font-size:12pt">1、我司基于本承诺函开立</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">，保证在接到本承诺函（本承诺函包括全部和部分流转的</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">），即无条件按照《最终还款明</span><span style="font-family:微软雅黑; font-size:12pt">细表》的信息付款。</span></p>
			<p style="line-height:23pt; margin:0pt; orphans:0; text-indent:22pt; widows:0"><span style="font-family:微软雅黑; font-size:12pt">2、我司同意《</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">会员</span><span style="font-family:微软雅黑; font-size:12pt">服务协议》、《</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">开单协议》的相关约定，同意卖方在取得我司开立的</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">后，有权将</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">项下我司应付款项全部或部分流转给其债权人。通过</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">全部或部分流转，持有</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">的卖方债权人（以下简称“新债权人”）有权要求我司履行付款义务，同时卖方不再享有向我司追索已流转</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">项下款项的权利。新债权人亦有权继续转让</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">，我司将依据</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格平台</span><span style="font-family:微软雅黑; font-size:12pt">发送的《最终还款明细表》所列明的信息向</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">的最终持单人付款，该付款义务的履行不受</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt">流转相关方之间、我司与卖方或我司与第三方之间任何商业纠纷的影响，我司不就该付款责任主张抵销或者进行抗辩。</span></p>
			<p style="line-height:23pt; margin:0pt; orphans:0; text-indent:22pt; widows:0"><span style="font-family:微软雅黑; font-size:12pt">3、我司与卖方签署的商务合同或订单等相关协议中约定的收款账户、承诺付款日、付款金额等信息与《最终还款明细表》中所列明的信息不一致时，以我司在</span><span style="font-family:微软雅黑; font-size:12pt">东风金融-创格平台</span><span style="font-family:微软雅黑; font-size:12pt">收到的《最终还款明细表》所列明的信息为准。</span></p>
			<p style="line-height:23pt; margin:0pt; orphans:0; text-indent:22pt; widows:0"><span style="font-family:微软雅黑; font-size:12pt">4、如我司未按《最终还款明细表》所列明的信息，在上述约定的承诺付款日前付款</span><span style="font-family:宋体; font-size:12pt">，</span><span style="font-family:微软雅黑; font-size:12pt">需按拖欠款项的实际天数及</span><span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline"> </span><span style="font-family:微软雅黑; font-size:12pt; text-decoration:underline">  </span><span style="font-family:微软雅黑; font-size:12pt">{{payInfo.interestPenalty}}%/日</span><span style="font-family:微软雅黑; font-size:12pt">的逾期利率向持单人支付逾期利息。</span></p>
			<p style="line-height:23pt; margin:0pt; orphans:0; text-indent:22pt; widows:0"><span style="font-family:微软雅黑; font-size:12pt; font-weight:bold">本承诺函经签章后生效，生效后所附</span><span style="font-family:微软雅黑; font-size:12pt; font-weight:bold">东风金融-创格</span><span style="font-family:微软雅黑; font-size:12pt; font-weight:bold">自动生效，不得撤销或更改。</span></p>
			<p style="font-size:12pt; line-height:150%; margin:0pt; orphans:0; text-align:right; widows:0"><span style="font-family:微软雅黑; font-size:12pt">承诺方： </span><span style="font-family:微软雅黑; font-size:12pt">  </span>
				<a name="_cmntref2"><span style="font-family:微软雅黑; font-size:12pt">{{payData.corpName}}</span></a>
			   <span style="font-family:微软雅黑; font-size:12pt">  </span></p>
			<p style="font-size:12pt; line-height:150%; margin:0pt; orphans:0; text-align:right; widows:0"><span style="font-family:微软雅黑; font-size:12pt"> {{payData.today}}</span></p>
			<p style="font-size:12pt; line-height:150%; margin:0pt; orphans:0; widows:0"><span style="font-family:微软雅黑; font-size:12pt">&#xa0;</span></p>
		</div>
	

    </div>
</template>
<script>
import moment from 'moment';
export default {
    data() {
        return {
            payData: {
                receiveCompanyName: '',
                amountMoney: '',
                promisePayDate: '',
                currentComapnyName: '',
                today: '',
                corpName:JSON.parse(sessionStorage.corpList).corpName,
                money:0,
                bmoney:'零'

            }
        }
    },
     props:{
             payInfo: {
                type: Object,
                default: {
                        money:0,
                        bmoney:'零',
                        interestPenalty:0
                }
            },
    },
    mounted() {
        // Object.assign(this.payData,this.payInfo);
        this.payData.today = sessionStorage.currentday
        console.log(sessionStorage.currentday)
    }
}
</script>
