/**
 * Create by Paul
 * 面对面支付界面
 */
(function(){
	var payToface={
		init:function(){
			this.payList=common.getData('payList');
			$("#need_pay").text(this.payList.needToPay);
			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			//点击支付事件
			$("#face_pay").on('click',function(){
				self.next();
			});
			//清空输入框金额
			$("#icon_del").on('click',function(){
				$("#pay_value").val('');
			})
		},
		next:function(){
			var pay_value=$("#pay_value").val();
			var need_pay=$("#need_pay").text();
			if(parseInt(pay_value)==parseInt(need_pay)){
				var data = this.payList;
				var url = common.urlRoot+'pay';
				common.ajax(url, data, function(res) {
				location.href = 'result.html';
				});
			}else{
				alert('您输入的金额不对！');
			}
		}
	};
	payToface.init();
})()
