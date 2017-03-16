/**
 * Create by Paul
 * 购物车页面
 */
(function(){
	var shoppingCar={
		init:function(){
			this.queryList();
			this.bindEvents();
		},
		//绑定事件
		bindEvents:function(){
			var self=this;
			//全选
			$("#select_all .no_select").on('click',function(){
				self.allCheck(this);
			});
			//单选
			$("#shopping_list").on('click','.no_select',function(){
				self.check(this);
			});
			//编辑
			$("#car_edit").on('click',function(){
				self.edit(this);
				self.countMoney();
			});
			//计数
			$("#shopping_list").on('click','.number_content div',function(ev){
				self.count(this);
			});
			//点击删除按钮
			$("#delete_btn").on('click',function(){
				//判断删除选中商品的数目
				var selectLen=$('#shopping_list .select_ok').length;
	            if(selectLen===0){
	            	 $("#none_Select").removeClass('dsn');
	            	setTimeout(function(){
	            	  $("#none_Select").addClass('dsn');
	            	},500);
	         
	    	    }else{
	    	    	 $("#delete-num").text(selectLen);
	    	    	 $('#sure_Del').removeClass('dsn');
	    	    }
				 $("#sure_Del_btn").removeClass('dsn');
			});
			//确定删除按钮
			$('#sure_Del_btn div').on('click', function (ev) {
                self.deleteShop(this);
            });
            //去结算
            $("#account_btn").on('click',function(){
            	self.next();
            	location.href = 'playOrder.html';
            })
		},
		render:function(data){
			var tpl=$("#tpl").html();
			var shopCar=data.list;
			var htmlStr=_.template(tpl)({shopCar:shopCar});
			$("#shopping_list").html(htmlStr);
			this.countMoney();
		},
		//请求数据
		queryList:function(){
			var self=this;
			var url=common.urlRoot+'shopCarList';
			var data={};
			common.ajax(url,data,function(res){
				self.render(res);
			});
		},
		//总选按钮
		allCheck:function(ele){
		    if($(ele).hasClass('select_ok')){
				$(ele).removeClass('select_ok');
				$('#shopping_list .no_select').removeClass('select_ok');
			}else{
				$(ele).addClass('select_ok');
				$('#shopping_list .no_select').addClass('select_ok');
			}
			this.countMoney();
		},
		//单选效果
		check:function(ele){
			$(ele).toggleClass('select_ok');
			var toalcheck=$("#shopping_list .no_select").length;
			var check=$("#shopping_list .select_ok").length;
			var $allcheck=$("#select_all .no_select");
			if(toalcheck===check){
				$allcheck.addClass('select_ok');
			}else{
				$allcheck.removeClass('select_ok');
			}
			this.countMoney();
		},
		//编辑框
		edit:function(ele){
			if($(ele).text()==='编辑'){
				$(ele).text('完成');
				$('#shopping_list .no_select').removeClass('select_ok');
                $('#select_all .select_all').removeClass('select_ok');
                $('#shopping_list .number').hide();
                $('.number_content').removeClass('dsn');
                $('#total_box').addClass('dsn');
                $('#account_btn').addClass('dsn');
                $('#delete_btn').removeClass('dsn');
                // 给li添加select_del 用来区分是编辑状态还是非编辑状态
                $('#shopping_list li').addClass('select_del');
                $('#select_all').addClass('select_del');
			}else{
				$(ele).text('编辑');
				 $('#shopping_list .no_select').addClass('select_ok');
                $('#select_all .select_all').addClass('select_ok');
                $('#shopping_list .number').show();
                $('.number_content').addClass('dsn');
                $('#total_box').removeClass('dsn');
                $('#account_btn').removeClass('dsn');
                $('#delete_btn').addClass('dsn');
                // 去除编辑状态
                $('#shopping_list li').removeClass('select_del');
                $('#select_all').removeClass('select_del');
			}
		},
		//编辑框数量加减
		count:function(ele){
			var index=$(ele).index();
			var $num=$(ele).siblings('.number_edit');
			var num=$num.text();
			if(index===0&&num>1){
				$num.text(--num);
			}
			else if(index===2){
				$num.text(++num);
			}
			 $(ele).closest('li').find('.number span').text(num);
		},
		//计算订单总额
		countMoney:function(ele){
			var $selectList = $('#shopping_list .select_ok');
            // 迭代(遍历)列表
            var sum = 0;
            var $li;
            var totalPrice;
         $.each($selectList, function (index, item) {//下标值与元素
             // 获取当前元素的父级元素li
             $li = $(item).closest('li');
              // 获取每种商品数量和价格然后相乘
              totalPrice = $li.find('.unit_price span').text() * $li.find('.number span').text();
              sum += totalPrice;
          });
            // 把计算的结果填充到合计的地方
            $('#pay_account').text(sum + '.00');
	    },
	    //删除商品
	    deleteShop:function(ele){
	    	if($(ele).hasClass('pop_sure_btn')){
	    	var selectLi = $('#shopping_list .select_ok').parents('li');
	    	var id;
	    	var idList=[];
	    	for(var i=0;i<selectLi.length;i++){
	    		id=selectLi.eq(i).data('id');
	    		idList.push(id);
	    	}
	    	var url=common.urlRoot+'deleteFromShopCar';
	    	var data={list:idList};
	    	common.ajax(url,data,function(){
	    		 $('#shopping_list .select_ok').parents('li').remove();
                    if ($('#shopping_list li').length === 0) {
                        // 当列表的li元素没有的时候,显示购物车空空
                        $('#empty_cart').removeClass('dsn');
                        // 隐藏其他
                        $('#shoppingcar').addClass('dsn');
                    }
	    	});
	    	}else{
	    		$("#sure_Del_btn").addClass('dsn');
	    	}
	    	$('#sure_Del').addClass('dsn');
	    },
	    next:function(){
	    	var selectList=$('#shopping_list .select_ok').parents('li');
	    	var shopList=[];
	    	var obj,id,shopName,imgUrl,price,prdNum;
	    	//把选中订单商品存进数组
	    	for(var i=0;i<selectList.length;i++){
	    		obj={
	    			id:selectList.eq(i).data('id'),
	    			shopName:selectList.eq(i).data('shopname'),
	    			imgUrl:selectList.eq(i).data('imgurl'),
	    			price:selectList.eq(i).data('price'),
	    			prdNum:selectList.eq(i).find('.prd_num').text()
	    		}
	    		shopList.push(obj);
	    	}	    	
	    	//缓存本地订单
	    	common.setData('shopList',shopList);
	    	//缓存订单金额
	    	common.setData('pay_account',$('#pay_account').text());
	    }
	
	};
	shoppingCar.init();
})()
