/**
 * Create by Paul
 * 支付页面
 */
(function(){
	var payIndex={
		init:function(){
			//获取接口信息
			this.payList=common.getData('payList');
			this.render(this.payList);
			this.bindEvents();
		},
		bindEvents:function(){
			$("#order_pay_btn").on('click',function(){
				location.href="faceToFace.html";
			})
		},
		render:function(data){
			$("#id_order").text(data.orderNum);
			$("#order_price").text(data.orderMoney);
			$("#order_coupons").text(data.discount);
			$("#order_needpay").text(data.needToPay);
		}
	};
	payIndex.init();
})()
