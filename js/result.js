/**
 * Create by Paul
 * 支付成功页面
 */
(function(){
	var success={
		init:function(){
		common.clearCar();
		//订单信息
		 this.payList=common.getData('payList');
		 $("#id_pay_order").text(this.payList.orderNum);
		 //订单列表信息
		 var shopList=common.getData('shopList');
		 this.render(shopList);
		},
		//渲染订单列表信息
		render:function(data){
			var tpl=$("#tpl").html();
			var htmlStr=_.template(tpl)({shopList:data});
			$("#pay_order").html(htmlStr);
		}
	};
	success.init();
})()
