/**
 * Create by Paul
 * 登录页面
 */

(function(){
	
	var login={
		//函数初始化
		init:function(){
			//查看已有用户名
			
			var user=localStorage.getItem('userName')
			if(user){
				$("#user-name").val(user);
				$("#checkbox").prop('checked',true);
			}
			this.bindEvents();
		},
		//绑定登录按钮事件
		bindEvents:function(){
		  var self=this;
		  $("#submit").on('click',function(ev){
		  	self.submit();
		  })
		},
		submit:function(){
			var user=$("#user-name").val();//获取用户名
			var pass=$("#password").val();//获取密码
			//进行验证
			if(!user){alert('用户名不能为空！');return false;}
			if(!pass){alert('密码不能为空！');return false;}
			//记住用户名
			var checkbox=$("#checkbox");
			var userName=$("#user-name").val();
			if(checkbox.attr('checked')==true){
				localStorage.setItem('userName',userName);
			}
			//ajax请求数据
			//调用公共ajax
			var data={userName:user,password:pass};
			var url='http://192.168.5.168:3000/login';
			common.ajax(url,data,function(res){
				alert('登录成功');
				var sessionId=localStorage.setItem('sessionId',res.sessionId);//获取sessionId作为首页的参数
				location.href='home.html';
			});
		}
	};
	login.init();
})()
