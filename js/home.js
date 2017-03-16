/**
 * Create by Paul
 * 首页
 */
(function(){
	var home={
		//初始化
		init:function(){
//			common.clearCar();
			this.bindEvents();
			    /*初始化*/
			var counter = 0; /*计数器*/
			var pageStart = 0; /*offset*/
			var pageSize = 2; /*size*/
			this.getData(pageStart, pageSize);
			// $(document).on('click', '.btn_more', function(){
			// 	counter ++;
			// 	pageStart = counter * pageSize;
			// 	getData(pageStart, pageSize);
			// });
		},
		bindEvents:function(){
			var self=this;
			var counter = 0; /*计数器*/
			var pageStart = 0; /*offset*/
			var pageSize = 2; /*size*/
			//列表商品点击跳转到详情页
		    $('#product_list').delegate('a', 'click', function(ev) {
                var id = $(this).closest('li').data('id');
                var shopNum = $('.car_trolley').text();
                var obj = {
                    id: id
                };
                localStorage.setItem('shopNum',shopNum);
                location.href = 'detail.html?' + $.param(obj);
            });
		    //推荐商品跳转到详情页
		    $("#recommend").on('click','a',function(){
		    	var id = $(this).parent().eq(0).data('id');
                var shopNum = $('.car_trolley').text();
                var obj = {
                    id: id
                };
                localStorage.setItem('shopNum',shopNum);
                location.href = 'detail.html?' + $.param(obj);
		    })
			//点击更多事件
			$("#btn_more").on('click','.btn_more',function(){
				// self.getMore();
				counter ++;
				pageStart = counter * pageSize;
				self.getData(pageStart, pageSize);
			});
		
			//购物车添加事件
			$("#product_list").on('click','.product_car',function(){
				var id=$(this).closest('li').data('id');
				self.addCar(id);
			});
			
		},
		//渲染页面
		render:function(data){
			console.log(data.list[0].id);
			//第一个模版
			var tp1=$("#tp1").html();
			var recomTpl=data.list[0];//第一个数据
			var htmlStr=_.template(tp1)({recomTpl:recomTpl});
			$("#recommend").html(htmlStr);
			//第二个模版
			// var tp2=$("#tp2").html();
			
			// var Listdatas = data.list.splice(1,4);
			// console.log(Listdatas);
			// var recomTpl2=Listdatas;
			// var htmlStr2=_.template(tp2)({recomTpl2:recomTpl2});
			// $("#product_list").html(htmlStr2);
			//显示购物车商品数量
			if(data.shopNum>0){
			   $(".car_trolley").removeClass("dsn").text(data.shopNum);
			}
		},
		getData:function(offset,size){
		   $.ajax({
			type: 'GET',
			url: 'json/shopListQuery.json',
			dataType: 'json',
			success: function(reponse){
		    var firData = reponse.list[0];
			var htmlStr =  '<img  data-id="'+firData.id +'" src="'+firData.imgUrl+'">'+
            '<div class="recom_wrap"><div class="recom_inf"> <div class="recom_tilte"><div class="recom_txt">现价</div> </div>'+
            '<div class="recom_price">'+
                '<p>￥'+firData.price+'</p>'+
                '<s>原价'+firData.oldPrice +'</s>'+
            '</div></div></div><a href="detail.html?id=<%=recomTpl.id%>"></a>';
            $("#recommend").html(htmlStr);
			var data = reponse.list.splice(1);
            // var sum = reponse.list.length;
			var sum = data.length;
			console.log(data);
			console.log(sum);
            var result = '';
            if(sum - offset < size ){
                size = sum - offset;
            }
            /*使用for循环模拟SQL里的limit(offset,size)*/
            for(var i=offset; i< (offset+size); i++){
				result +='<li data-id="' + data[i].id +'">'+
		   '<div class="product_box">'+
		   ' <a href="detail.html?id=' +  data[i].id +'"><img src="'+ data[i].imgUrl +'"></a>'+
           '<h2><a href="detail.html?id='+data[i].id+'">'+ data[i].shopName+'</a></h2>'+
            '<div class="clearfix">'+
                '<div class="product_price fl">￥<span class="product_mpney">'+data[i].price+'</span></div>'+
               '<div class="product_car fr"></div>'+
            '</div> </div></li>';
            }
    
            $('#product_list').append(result);
            
            /*******************************************/
            /*隐藏more按钮*/
            if ( (offset + size) >= sum){
                $(".btn_more").hide();
            }else{
                $(".btn_more").show();
            }
        },
        error: function(xhr, type){
            alert('Ajax error!');
        }
			})

		},
		//更多渲染
		// renderMore:function(data){
		// 	var tp2=$("#tp2").html();
		// 	var dataList = data.list.splice(5);
		// 	console.log(dataList);
		// 	var recomTpl2=dataList;
		// 	var htmlStr2=_.template(tp2)({recomTpl2:recomTpl2});
		// 	$("#product_list").append(htmlStr2);
		// 	$('#btn_more').addClass('dsn');
		// },
		//更多函数
		// getMore:function(){
		// 	home.queryList(true);
		// },
		//添加购物车
		addCar:function(id){
			var url=common.urlRoot+'addToShopCar';
			var data={id:id,prdNum:1};
			common.ajax(url,data,function(res){
				 $('#hasAdd').removeClass('dsn');
                setTimeout(function(){
                    $('#hasAdd').addClass('dsn');
                },400);
                // 商品显示的红点
                var $carNum = $('.car_trolley');
                // 获取数量
                var num = $carNum.text() | 0;
                // 如果元素时隐藏的,就显示
                if ($carNum.hasClass('dsn')) {
                    $carNum.removeClass('dsn');
                }
                // 新增加商品时,购物车的商品数量加1
                if (res.newly === 'Y') {
                    $carNum.text(++num);
                }
			});
		},
		//查询数据
// 		queryList:function(flag){
// 			var self=this;
// 			var sessionId=localStorage.getItem('sessionId');//获取sessionId参数
// //			var url=common.urlRoot+'shopListQuery';
//             var url="json/shopListQuery.json";
// //			var data={sessionId:sessionId,isMore:flag};
//             var data={isMore:flag};
// //			使用公共ajax
// 			common.ajax(url,data,function(res){
// 				//如果isMore为false
// 				if(flag){
// 					self.renderMore(res);
// 				}else{
// 					self.render(res);
// 				}
// 			});
// 		},
	};
	home.init();	
})()
