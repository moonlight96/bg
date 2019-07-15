//用户登录
var validCode = false;
$("#vcode").blur(function () {

    let val = $('#vcode').val();
    if (val) {
        var res = verifyCode.validate(val);
        if (res) {

            $('#id_error_vcode').html('验证已通过').show().css('color', 'green');
            validCode = true;
        } else {
            $('#id_error_vcode').html('验证码错误').show().css('color', 'red');
        }
    } else {
        $('#id_error_vcode').html('验证码不能为空').show().css('color', 'red');
    }

});

$('#log_btn').on('click', () => {
    let val1 = $.trim($('#username').val());
    let val2 = $.trim($('#password').val());

    $.ajax({
        type: 'get',
        url: '../api/checkname.php',
        data: 'name=' + val1 + '&password=' + val2,
        success: function (str) {
            var arr = JSON.parse(str);
            setCookie('uid',arr.data3[0].uid);
            
            if (arr.data2 == 5 & arr.data == 1 & validCode == true) {
                if ($('#rememberUsername:checked')) {
                    setCookie('name', val1, 7);
                    setCookie('pwd', val2, 7);
                    setCookie('loginStatus', true);
                }
                let url = getCookie('url');
                console.log(url);
                let gid = getCookie('gid');
                let name = getCookie('name');
                loginStatus = true;
                if (url) {
                    window.location.href = url;

                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert('登录失败！请重新输入');
            }
        }
    })

});
$('#username').val(getCookie('name'));
$('#password').val(getCookie('pwd'));