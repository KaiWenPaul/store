/**
 * Create by Paul
 * 提交订单结算页面
 */
(function(){
	var playOrder={
		init:function(){
		//获得订单数组信息
		this.shopList=common.getData('shopList');
		//渲染订单页面
		this.renderShoplist(this.shopList);
		//获取订单总额
		this.pay_account=common.getData('pay_account');
		$("#pay_account").text(this.pay_account.toFixed(2));
		$("#need_pay").text(this.pay_account.toFixed(2));
		this.bindEvents();
		this.queryCoupon();
		},
		bindEvents:function(){
			var self=this;
			$("#good_coupons").on('click',function(){
				$("#coupons_Pop").removeClass('dsn');
			});
			//点击优惠券列表元素
			$(".pop_con").on('click','li',function(){
				$(this).addClass('select').siblings().removeClass('select');
			});
			//点击确定或者取消按钮
			$("#coupons_Btn div").on('click',function(){
				self.selectCoupon($(this));
			});
			//点击配送方式
			$("#send-way li").on('click',function(){
				self.sendWay(this);
			});
			//提交订单
			$("#submit_order").on('click',function(){
				self.next();
			})
		},
		//渲染订单
		renderShoplist:function(data){
			var tpl=$("#tpl-shopList").html();
			var htmlStr=_.template(tpl)({shopList:data});
			$("#good_list").html(htmlStr);
		},
		//优惠券渲染
		renderCoupon:function(data){
			var tpl=$("#tpl-coupon").html();
			var coupon=data.list;
			var htmlStr=_.template(tpl)({coupon:coupon});
			$(".coupons_list").append(htmlStr);
		},
		//优惠券接口查询
		queryCoupon:function(){
			var self=this;
			var url=common.urlRoot+'coupon';
			var data={};
			common.ajax(url,data,function(res){
			   self.renderCoupon(res);
			});
		},
		//确定或者取消按钮
		selectCoupon:function(ele){
			//点击元素的下标
			var index=$(ele).index();
			//取出需要折扣的地方
			var container_right=$("#good_coupons .container_right");
			//被选中的优惠的li元素
			var selectCpoupon=$(".coupons_list .select");
			//订单金额
			var payMoney=$("#pay_account").text();
			//还需要再付的订单额
			var needPay=$("#need_pay").text();
			//有效日期
			var effectiveDate=selectCpoupon.data('effectiveDate');
			//点击取消时
			if(index===0){
				$("#coupons_Pop").addClass('dsn');
			}
			if(index===1){
				//选择不优惠时
				if(selectCpoupon.index()===0){
					var selectValue=selectCpoupon.find('.coupons_messg_txt').text();
					container_right.text(selectValue);
					$("#coupons_Pop").addClass('dsn');
					$("#need_pay").text(payMoney.toFixed(2));
					$("#order_discount").text('0.00');
				}else {
					//优惠的金额
				    var selectValue=selectCpoupon.data('amount');
				    //满足优惠的金额
				    var minBuyAmount=selectCpoupon.data('minbuyamount');
				    var effectiveDate=selectCpoupon.data('effectivedate');
				    //判断是否达到优惠条件
				    if((minBuyAmount-payMoney)>0){
				    	alert('订单金额达不到标准！');
			       }else if((new Date()-new Date(effectiveDate))>0){
				    	alert('优惠券已过期！');
				   }else{
				 	    container_right.text('￥'+selectValue.toFixed(2));
				 	    $("#coupons_Pop").addClass('dsn');
				 	    $("#order_discount").text(selectValue.toFixed(2));
				 	    $("#need_pay").text((payMoney-selectValue).toFixed(2));
				    }
					
				}
			}
		},
		//配送方式
		sendWay:function(ele){
			var index=$(ele).index();
			if(index===0){
				$("#store_invite").addClass('select');
				$("#good_delivery").removeClass('select');
				$("#user_inf").addClass('dsn');
			}
			if(index===1){
				$("#store_invite").removeClass('select');
				$("#good_delivery").addClass('select');
				$("#user_inf").removeClass('dsn');
			}
		},
		next:function(){
			var List=$("#good_list li");
			var idList=[];
			var id;
			for(var i=0;i<List.length;i++){
				id=List.eq(i).data('id');
				idList.push(id);
			}
			var url=common.urlRoot+'placeOrder';
			var data={list:idList};
			common.ajax(url,data,function(res){
				var payList={
//					amount:$("#pay_account").text(),
					orderNum:res.orderNum,
					orderMoney:$("#pay_account").text(),
					discount:$("#order_discount").text(),
					needToPay:$("#need_pay").text()
				}
				common.setData('payList',payList);
				location.href='payIndex.html';
			});	
		}
	};
	playOrder.init();
})()
