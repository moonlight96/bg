(function () {
    /*--------- 第一个步骤-------------*/
    //用户名验证
    var userCheck = false;
    $('#mobileusername').blur(function () {
        var a = /^([A-Za-z0-9]{4,20})|([\u4e00-\u9fa5]{2,10})|([\u4e00-\u9fa5][\w\W]{2})$/i;
        let val = $.trim($('#mobileusername').val());
        if (val) {

            if (a.test(val)) {
                $.ajax({
                    type: 'get',
                    url: '../api/checkname.php',
                    data: 'name=' + val,
                    success: function (str) {
                        var arr = JSON.parse(str);
                        if (arr.data == 2) {
                            $('#mobile_user_message').html('用户名可用').show().css('color', '#58bc58');
                            $('#user_id').val(val);
                            userCheck = true;
                        } else {
                            $('#mobile_user_message').html('该用户名已经存在!').show().css('color', 'red');
                        }
                    }
                })
            } else {
                $('#mobile_user_message').html('用户名不合法').show();
            }
        } else {
            $('#mobile_user_message').show().html('用户名不能为空！').css('color', 'red');
        }

    });
    //手机号码验证
    var mobileCheck = false;
    $('#mobileNumber').blur(function () {
        var b = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let val1 = $.trim($('#mobileNumber').val());
        if (val1) {
            if (b.test(val1)) {
                $.ajax({
                    type: 'get',
                    url: '../api/checkname.php',
                    data: 'tel=' + val1,
                    success: function (str) {
                        console.log(str);
                        var arr = JSON.parse(str);
                        if (arr.data1 == 4) {
                            $('#mobileNumber_message').html('手机可以注册').show().css('color', '#58bc58');
                            $('#mobile2').val(val1);
                            mobileCheck = true;
                        } else {
                            $('#mobileNumber_message').html('手机号码不能重复注册').show().css('color:red', 'display:block');
                        }
                    }
                })

            } else {
                $('#mobileNumber_message ').html('手机号码不合法').show().css('color', 'red');
            }
        } else {
            $('#mobileNumber_message').html('手机号码不能为空').css('display', 'block');
        }
    });
    //验证码验证
    var validCode = false;
    var verifyCode = new GVerify("img2");
    $("#img2Code").blur(function () {
        let val = $('#img2Code').val();
        if (val) {
            var res = verifyCode.validate(val);
            if (res) {
                $('#img2_message').html('验证通过').show().css('color', 'green');
                validCode = true;
            } else {
                $('#img2_message').html('验证码错误').show().css('color', 'red');
                validCode = false;
            }
        } else {
            $('#img2_message').html('验证码不能为空').css('display', 'block');
        }

    });
    //点击切换验证码
    var cliBtn = document.getElementById('cliBtn');
    cliBtn.onclick = function () {
        $('#img2_message').html('');
        $('#img2Code').val('');
        verifyCode.refresh();
    };
    //点击发送激活码
    $('.btn_sendmessage').click(function () {
        if (validCode & mobileCheck & userCheck) {
            alert('success');
            $('#mobile_div').hide();
            $('#mobile2_div').show();
        } else {
            alert('请正确输入表单');
        }
    });
    /**-------------第二个步骤-------- */
    //密码验证
    var pwdCheck = false;

    $('#pwd_mobile2_form').blur(() => {
        var c = /^[a-zA-Z]\w{5,15}$/;
        let val3 = $.trim($('#pwd_mobile2_form').val());
        // let val4 =$.trim($('#rpwd_mobile2_form').val());
        var pwdRes = c.test(val3);
        if (pwdRes) {
            $('.span3').html('✔').css('color', 'green');
            pwdCheck = true;
        } else {
            $('.span3').html('X').css('color', 'red');
        }
        // if(val3==val4){
        //     $('.span3').html('✔').css('color','green');
        // }else{
        //     $('.span3').html('').css('color','red');
        // }
    })
    //再次密码验证
    var rpwdCheck = false;
    $('#rpwd_mobile2_form').blur(() => {
        let val3 = $.trim($('#pwd_mobile2_form').val());
        let val4 = $.trim($('#rpwd_mobile2_form').val());
        if (val4 == val3) {
            $('.span4').html('✔').css('color', 'green');
            rpwdCheck = true;
        } else {
            $('.span4').html('X').css('color', 'red');
        }

    })
    //点击注册按钮
    $('.btn_acceptAndRegister').on('click', () => {
        let name = $.trim($('#mobileusername').val());
        let pwd =$.trim($('#pwd_mobile2_form').val());
        let tel = $.trim($('#mobileNumber').val());
        if (rpwdCheck & pwdCheck) {
            //写入数据库
            $.ajax({
                type: 'get',
                url: '../api/reg.php',
                data:'name='+name+'&tel='+tel+'&pwd='+pwd,
                success:function(str){
                    alert('注册成功！');
                    window.location.href='login.html';
                }
            })
        }
    })
})();