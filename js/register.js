/**
 * Created by Paul on 2016/8/17 0017.
 * 注册页面
 */

(function() {

    var register = {
    	//函数初始化
        init: function() {
            this.bindEvents();
        },
       //绑定注册按钮事件
        bindEvents: function() {
            var self = this;
            // 点击注册按钮
            $('#submit').on('click', function(ev) {
                self.submit();
            });
            // 点击获取验证码
            $('#getCode').on('click', function(ev) {
                self.getCode();
            });
        },
        // 立即注册
        submit: function() {
            var phone = $('#phone').val();// 获取电话号码
            var phoneReg =/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            var code=$('#code').val(); // 获取验证码
            var codeReg=/^\d{4}$/;
            var pass=$("#password").val(); //获取密码
            var passReg=/^[0-9_a-zA-Z]{6,20}$/;
            //进行验证
            if (!phone) {alert('手机号码不能为空'); return false;}
            if (!phoneReg.test(phone)) {alert('手机号码格式不正确');return false;}
            if(!pass){alert('密码不能为空！');return false;}
            if(!passReg.test(pass)){alert('密码格式不正确！');return false; }
            if(!code){alert('验证码不能为空！');return false;}
            if(!codeReg.test(code)){alert('验证码格式错误！');return false;}
            if(!$("#checkbox").attr('checked')){alert('请选择同意用户注册协议');return false;}
           //ajax请求数据
           //调用公共ajax
            var data = {
                phone: phone,
                password:pass,
                verifyCode:code
            }
            var url = 'http://192.168.5.168:3000/register';
           common.ajax(url,data,function(res){
           	  alert('注册成功');
           	  location.href = 'login.html';
           });
        },
        // 获取验证码
        getCode: function() {
          var phone = $('#phone').val();
          var phoneReg =/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
          if(!phone){alert('手机号码不能为空！');return false;}
          if(!phoneReg.test(phone)){alert('请输入正确格式的手机号码');return false;}
          //倒计时
          var count=5;//倒计时时间数
          var getcode=$("#getCode");//按钮禁用
          getcode.prop('disabled',true);
          var time=setInterval(function(){
          	 getcode.val(--count+'s');
          	 if(count===0){
          	 	getcode.val('重新发送验证码');
          	 	clearInterval(time);
          	 	getcode.prop('disabled',false);
          	 }
          },1000);
          //ajax请求验证码数据
          //调用公共ajax
          var data={phone:phone};
          var url='http://192.168.5.168:3000/getVerifyCode';
          common.ajax(url,data,function(res){
          	alert('验证码已发送到000的手机上');
          });
        }
    };
    register.init();
})();
