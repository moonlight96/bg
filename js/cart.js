$(function () {
    let elem = document.querySelector('.mbshop_cart_1127_single_warp_box');
    //登录存cookie
    $('.loginBtn').on('click', () => {
        setCookie('url', location.href, 1);
        window.location.href = 'login.html';
    })
    $('.regBtn').on('click', () => {
        window.location.href = 'reg.html';
    })

    let loginStatus = getCookie('loginStatus');
    let nameCook = getCookie('name');

    if (loginStatus) {
        $('.loginBtn').html('[' + nameCook + ']');
        $('.regBtn').html('退出');
        $('.regBtn').on('click', function () {
            window.location.href = 'list.html';
            removeCookie('loginStatus');
            $('.loginBtn').html('登录');
            $('.regBtn').html('注册');
        });
    } else {
        $('.regBtn').on('click', () => {
            let url = getCookie('url');
            window.location.href = 'reg.html';
        })
    }

    function refresh() {
        let uid = getCookie('uid');
        $.ajax({
            type: 'get',
            url: '../api/order.php',
            data: 'uid=' + uid,
            success: str => {
                let arr = JSON.parse(str);
                // console.log(arr.data2[0]);
                var arr2 = arr.data2;

                arr.data1.map((item) => {
                    $.ajax({
                        type: 'get',
                        url: '../api/order.php',
                        data: 'gid=' + item.gid,
                        success: str => {
                            let arr = JSON.parse(str);
                            var htmlCart = `<ul list-tag="list" id="2ed78904-7959-4472-90c4-6edd45a4bb28" data-tip-goods="${item.gid}" name="5100"
                    storeid="HQ01S116" class="mbshop_cart_1127_single_goods ">
                    <!-- 选中按钮 -->
                    <li class="mbshop_cart_1127_single_01">
                        <p> <label class="mbshop_checkbox mbshop_cart_allSelect_list">
                                <input type="checkbox" name="status" class="mbshop_cart_1127_single_goods_checkbox"
                                    checked="true">
                                <i class="iconfont iconfontselect"></i> </label> </p>
                    </li> <!-- 商品信息 -->
                    <li class="mbshop_cart_1127_single_02">
                        <dl>
                            <dt><a href="###">
                                    <img src="../img/${arr.data2[0].bigImg}" data-original="" alt="" style="display: block;"></a></dt>
                            <dd> <a href="###">
                                    <p title="">${arr.data2[0].tittle}</p>
                                </a> <i>商品编号：${arr.data2[0].code}</i>
                                <div class="mbshop_cart_1127_b"> <b class="icon_grey"><i
                                            class="iconfont"></i>不可用红包</b> <b class="tips"> <i
                                            class="iconfont downtrend_icon"></i>比加入时优惠￥30.36 </b> </div>
                            </dd>
                        </dl>
                    </li> <!-- 颜色尺码 -->
                    <li class="mbshop_cart_1127_single_03">
                        <p class ="color3">颜色：${item.color}</p>
                        <p class ="size3">尺码：${item.size}</p>
                    </li> <!-- 单价 -->
                    <li class="mbshop_cart_1127_single_04"> <i>￥${arr.data2[0].price}</i> <em>￥${((arr.data2[0].price)*(arr.data2[0].discount*0.1)).toFixed(2)}</em>
                        <ul id="main_box">
                            <li class="select_box">
                                <div>修改优惠</div>
                                <ul class="son_ul" style="display: none;">
                                    <li selected="" version="1" value="满1件总价6.5折,满2件总价6.0折"
                                        title="满1件总价6.5折,满2件总价6.0折" class="mbshop_cart_1127_single_06_chose"> <label
                                            class="mbshop_radio"> <input value="" checked="" type="radio"> <i
                                                class="iconfont iconfontselect"></i> <b>满1件总价6.5折,满2件总价6.0折</b>
                                        </label> </li>
                                    <li version="-1" value="不使用活动优惠" title="不使用活动优惠"
                                        class="mbshop_cart_1127_single_06_chose"> <label class="mbshop_radio">
                                            <input type="radio"> <i class="iconfont"></i> <b>不使用活动优惠</b> </label>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li> <!-- 数量 -->
                    <li class="mbshop_cart_1127_single_05"> <span name="num-edit-cut"
                            class="mbshop_cart_1127_single_label_left">-</span> <input type="text" value="${item.num}"
                            name="numEdit" class="mbshop_cart_1127_single_goods_num"> <span name="num-edit-add"
                            class="mbshop_cart_1127_single_label_right">+</span>
                        <p> </p>
                    </li> <!-- 优惠 -->
                    <!-- 成交价 -->
                    <li class="mbshop_cart_1127_single_07">￥${((arr.data2[0].price)*(arr.data2[0].discount*0.1)).toFixed(2)}</li> <!-- 状态 -->
                    <!-- 操作 -->
                    <li class="mbshop_cart_1127_single_09"> <a href="javascript:void(0);" class="in_favorites"
                            name="603946">移入收藏夹</a> <a href="javascript:void(0);" class="delete_goods">删除</a> </li>
                </ul>`;
                            elem.innerHTML += htmlCart;
                        }
                    })

                });

            }
        })

        //X按钮点击关闭
        $('.mbshop_top_tips').on('click', 'b', function () {
            $('.mbshop_top_tips').hide();
        });
        //数量减
        $('.mbshop_cart_1127_single_warp_box').on('click', '.mbshop_cart_1127_single_label_left', function () {
            let num = $(this).next().val();

            num--;
            if (num <= 1) {
                num = 1;
            }
            $(this).next().val(num);
            goodTotal($(this));
            changeInto($(this), num);
        })

        function changeInto(now, num1) {
            let color1 = $(now).parent().parent().find('.color3').text().substring(3);
            let size1 = $(now).parent().parent().find('.size3').text().substring(3);
            let gid1 = $(now).parent().parent().attr('data-tip-goods');
            $.ajax({
                type: 'get',
                url: '../api/cart.php',
                data: 'num=' + num1 + '&gid=' + gid1 + '&color=' + color1 + '&size=' + size1,
                success: str => {}
            })
        }
        //数量加
        $('.mbshop_cart_1127_single_warp_box').on('click', '.mbshop_cart_1127_single_label_right', function () {
            let num = $(this).prev().val();
            num++;
            if (num >= 999) {
                num = 999;
            }
            $(this).prev().val(num);
            goodTotal($(this));
            changeInto($(this), num);
        })
        //手动输入数量的变化
        $('.mbshop_cart_1127_single_warp_box').on('input', '.mbshop_cart_1127_single_goods_num', function () {
            let num = $(this).val();
            if (num <= 1) {
                num = 1;
            } else if (num >= 999) {
                num = 999;
            }
            $(this).val(num);
            goodTotal($(this));
            changeInto($(this), num);
        });
        //2.小计=单价*数量
        function goodTotal(now) {
            //单价
            let price = $(now).parent().prev().find('em').text().slice(1); //获取到单价是有单位，去掉多余的单位
            let price2 = $(now).parent().prev().find('i').html().slice(1); //获取到单价是有单位，去掉多余的单位
            // console.log(price2);
            // 数量
            let num = $(now).parent().find('input').val();

            let total = (price * num).toFixed(2); //保留两位小数

            // let total2 = (price2 * num).toFixed(2);//原价总和，保留两位小数
            $(now).parent().next().html('￥&nbsp;' + total);

            numAndToal(); //总数量和总价变化
            // console.log(price,num,total);
        }
        //3.删除当行商品；
        $('.mbshop_cart_1127_single_warp_box').on('click', '.delete_goods', function () {
            //要删除的节点.remove()
            let res = confirm('您确定要删除该商品吗？');
            if (res) {
                $(this).parent().parent().remove();
            }
            changeInto($(this), );
            numAndToal();
        });
        //全选
        $('.mbshop_cart_1127_warp_box').on('click', '.checkAllBtn', function () {
            let now = $(this).prop('checked');
            $('.mbshop_cart_1127_single_goods_checkbox,.checkAllBtn2,.checkAllBtn1,.checkBb').prop('checked', now);
            numAndToal();
        });
        $('.mbshop_cart_1127_warp_box').on('click', '.checkBb', function () {
            let now = $(this).prop('checked');
            $('.mbshop_cart_1127_single_goods_checkbox,.checkAllBtn2,.checkAllBtn1,.checkBb').prop('checked', now);
            numAndToal();
        });
        //全删
        $('#deleteCheckbox').on('click', function () {
            let arr = checkedRows(); //被勾选的行对应的下标
            let res = confirm('您要删除我们吗？');
            if (res) {
                arr.forEach(function (item) {
                    let gid1 = $('.mbshop_cart_1127_single_goods').eq(item).attr('data-tip-goods');
                    let size1 = $('.mbshop_cart_1127_single_goods').eq(item).find('.size3').text().substring(3);
                    let color1 = $('.mbshop_cart_1127_single_goods').eq(item).find('.color3').text().substring(3);
                    $.ajax({
                        type: 'get',
                        url: '../api/cart.php',
                        data: 'gid=' + gid1 + '&color=' + color1 + '&size=' + size1,
                        success: str => {}
                    })
                    $('.mbshop_cart_1127_single_goods ').eq(item).remove();
                });
            }

            numAndToal(); //总数量和总价跟着变
        });

        //总数量和总价格的变化
        function checkedRows() {
            let arr = []; //存被勾选的下标
            $('.mbshop_cart_1127_single_goods_checkbox').each(function (i, item) {
                if ($(item).prop('checked')) {
                    //被勾选的复选框把他的下标存起来
                    arr.unshift(i);
                }
            });
            //降序
            arr.sort(function (a, b) {
                return b - a;
            });
            return arr;
        }

        //计算总价格
        function numAndToal() {
            //判断哪一行是被勾选的
            let arr = checkedRows();

            //计算总数量和总价格
            let sum = 0; //总数量
            let priceAll = 0;
            let sumPrice = 0;
            let chajia = 0;
            arr.forEach(function (item) {
                sum += $('.mbshop_cart_1127_single_goods_num').eq(item).val() * 1;
                priceAll += $('.mbshop_cart_1127_single_07').eq(item).text().slice(1) * 1;
                sumPrice += $('.mbshop_cart_1127_single_04>i').eq(item).text().slice(1) * $('.mbshop_cart_1127_single_goods_num').eq(item).val() * 1;
                chajia += (sumPrice - priceAll);
            });

            $('.go_to_balance_left_have em').html(sum);
            $('.go_to_balance_left_total i').html('￥' + priceAll.toFixed(2));
            $('.go_to_balance_left_alg i').html('￥' + sumPrice.toFixed(2));
            $('.go_to_balance_left_alg em').html('￥' + chajia.toFixed(2));

        }
        //点击每一行复选框反过来控制全选按钮
        $('#banggo').on('click', '.mbshop_cart_1127_single_goods_checkbox', function () {
            //被勾选的个数==本来集合的个数  全选
            let checkedNum = $('.mbshop_cart_1127_single_goods_checkbox:checked').size();
            let num = $('.mbshop_cart_1127_single_goods_checkbox').size();
            if (checkedNum == num) {
                $('.checkAllBtn').prop('checked', true);
                $('.checkBb').prop('checked', true);
            } else {
                $('.checkAllBtn').prop('checked', false);
                $('.checkBb').prop('checked', false);
            }
            numAndToal(); //总数量和总价跟着变

        });
    }
    refresh();
    //点击结算
    $('.go_to_balance_right').on('click',()=>{
        let loginStatus =getCookie('loginStatus');
        if(loginStatus){
            alert('跳转中...');
        }else{
            alert('请先登录');
        }
    })
})