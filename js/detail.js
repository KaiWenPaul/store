/**
 * Create by Paul
 * 详情页面
 */

(function(){
	var detail={
		init:function(){
			//用来储存商品
			this.shopList = [];
           var shopNum = localStorage.getItem('shopNum');
           // 数量大于0时显示数值
           if (shopNum > 0) {
               $('.car_trolley').removeClass('dsn').text(shopNum);
           }
			this.queryDetail();
			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			var num=parseInt($(".number_edit").text());
			$("#join_car").on('click',function(){
				self.addCar();
			});
            $("#count_btn div").on('click',function(ev){
            	self.count(this);
            });
            $("#buy_now").on('click',function(){
            	self.next();
            })
		},
		//渲染页面
		render:function(data){
			var tpl=$("#detailTpl").html();
			var detailTpl=data.productDetail;
			var htmlStr=_.template(tpl)({detailTpl:detailTpl});
			$("#section1").html(htmlStr);
		},
		count:function(s){
			var index=$(s).index();
			var leftNum=$("#leftNum").text();
			var $num=$(s).siblings('.js_num');
			var num=$num.text();
			if(index===0&&num>1){
				$num.text(--num);
				$("#leftNum").text(++leftNum);
			}
			else if(index===2&&num<leftNum){
				$num.text(++num);
				$("#leftNum").text(--leftNum);
			}
		},
		addCar:function(){
			var id=common. getParam('id');
			var url=common.urlRoot+'addToShopCar';
			var data={id:id,prdNum:$('.js_num').text()}
			common.ajax(url,data,function(res){
				$("#hasAdd").removeClass('dsn');
				setTimeout(function(){
					$("#hasAdd").addClass('dsn');
				},500);
				//显示隐藏的数量点
				var carNum=$('.car_trolley');
				if(carNum.hasClass('dsn')){
					carNum.removeClass('dsn');
				}
				var num=carNum.text();
				if(res.newly === 'Y'){
					carNum.text(++num);
				}
			});
			
		},
		//查询详情数据
        queryDetail:function(){
         var self=this;
         var id=common. getParam('id');
         var url=common.urlRoot+'productDetail';
         var data={id:id,prdNum:1};
         common.ajax(url,data,function(res){
         	self.shopList.push(res.productDetail);
         	self.render(res);
            leftNum=$("#leftnum").text();
         });
        },
        next:function(){
        	//订单单价
        	var price=$("#price").text();
        	//订单数量
        	var prdNum=$(".js_num").text();
        	this.shopList[0].prdNum=prdNum;
        	common.setData('shopList',this.shopList);
//      	alert(price*prdNum);
	      	common.setData('pay_account',price*prdNum);
	    	location.href="playOrder.html";
     	
        }
	};
	detail.init();
})()
