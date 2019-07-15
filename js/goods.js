$(function () {
    let a = getCookie('url');
    console.log(a)
    // 回到顶部jquery
    $(window).on('scroll', function () {
        var scrollValuex = parseInt($(document).scrollTop());
        var floopyTopx = parseInt($(window).height());
        if (scrollValuex > floopyTopx) {
            $(".topred").show();
        } else {
            $(".topred").hide();
        }
    });
    $('.topred').click = () => {
        let minHeight = parseInt($(window).height());
        if ($('.topred').scrollTop > minHeight) {
            $('.topred').scrollTop = minHeight;
        }
    }
    //足迹
    function footStep() {
        let data = window.localStorage.id;//1&2&3
        if(data) {
            let idarr = data.split('&');
            let html = idarr.map(item => {
                $.ajax({
                    type:'get',
                    url:'../api/getdata.php',
                    data:'gid='+item,
                    success:str=>{
                        var arr =JSON.parse(str);
                        
                        var htmlfoot = `<li><a class="mbshop_detail_rec_01" href="goods.html?gid=${arr.data1.gid}" target="_blank"><img class="goods_history" src="../img/${arr.data1.bigImg}" alt="基础纯棉男士休闲圆领短袖印花T恤" style="display: block;"></a><a class="mbshop_detail_rec_02" >${arr.data1.tittle}</a><b>￥${((arr.data1.price)*(arr.data1.discount)*0.1).toFixed(2)}</b></li>`;
                        $('#showHistory ul').append(htmlfoot);
                    }
                })
            }).join('');
            
        }
    }
    footStep();
    //接收列表页或首页传过来的参数
    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    //接收URL中的参数booksId
    var id = getUrlParam('gid');
    setCookie('gid',id,1);
    $.ajax({
        type: 'get',
        url: '../api/getdataindex.php',
        dataType: 'json',
        // data : 'gid=' + id,
        success: function (str1) {

            $.each(str1.data6, function (idx, val) {
                //根据gid获取详情数据
                if (id == val.gid) {
                    //渲染图片
                    var strImg = `<span class="mbshop_bigPicMark"></span>
                    <img class="mainPicContent MagTargetImg" src="../img/${val.bigImg}" alt="" />`;
                    //渲染商品名称
                    var strhead = ` <a href="###" target="_blank"> ${val.storename} </a>
                ${val.tittle}`;
                    //渲染商品价格
                    var strPrice = `<b>售价：</b> <strong id="salePriceText"> ￥ ${(val.price*val.discount*0.1).toFixed(2)} </strong>
                <input id="_price" type="hidden" value="29.9"> <i>吊牌价：</i> <em>￥ ${val.price}</em>
                <span>${val.discount}折</span> `;
                    // 渲染销量
                    var strbox = `<div class="first">销量<span>${val.volume}</span></div>
                <div><i>&nbsp;</i>累计评价<span id="saleInfoCommentCount">${val.comment}</span></div>
                <div><i>&nbsp;</i>送邦购积分<span id="salePoint">${val.credit}</span></div>`;
                    //放大镜图片
                    $('.mbZoom').attr('src', '../img/' + val.bigImg);
                    //渲染颜色
                    var arrYanse = val.yanse.split('&');
                    var arrColor = val.color.split('&');
                    var html5 = arrColor.map((item, index) => {
                        return `<a id="color_99" type="color" attr_value="${arrYanse[index]}" goods_attr_sn="A03846"
                        code="99" a_type="0" stock_num="341"><img src="../img/${arrColor[index]}"
                        mid_src="//pic.banggo.com/sources/seller/goods/image/5200494/A03846/A03846_99_06.jpg?x-oss-process=image/resize,m_lfit,w_500"
                        large_src="//pic.banggo.com/sources/seller/goods/image/5200494/A03846/A03846_99_06.jpg?x-oss-process=image/resize,m_lfit,w_1000,h_1000"
                        alt=""> </a>`;
                    });
                    //渲染尺码
                    var arrSize = val.size.split('&');
                    var html6 = arrSize.map(item => {
                        return `<a id="size_388" type="size" attr_value="${item}" goods_attr_sn="${val.code}"
                        code="388" a_type="0" stock_num="217"> ${item} </a>`;
                    });

                }
                $('.size').append(html6);
                $('.color').append(html5);
                $('.mbshop_detail_bigPicZoom').append(strImg);
                $('.mbshop_detail_pdbrand').append(strhead);
                $(".mbshop_detail_price").append(strPrice);
                $(".clipbox").append(strbox);

            });
        }
    })

    //放大镜
    $('.mbshop_detail_bigPicZoom').hover(ev => {
        $('.mbshop_bigPicMark').css('display', 'block');
        $('.mbshop_detail_bigPicPop').css('display', 'block');
    }, ev => {
        $('.mbshop_bigPicMark').css('display', 'none');
        $('.mbshop_detail_bigPicPop').css('display', 'none');
    });
    //鼠标划过小图显示在大盒里面
    $('.mbshop_detail_smallPicList img').mouseover(ev => {
        var srcUl = ev.target.src;
        $('.mainPicContent').attr('src', srcUl);
        $('.mbZoom').attr('src', '' + srcUl);

    });
    $('.mbshop_detail_smallPicList').on('click', 'li', function () {
        $(this).css('border-color', 'red').siblings().css('border-color', '#ccc');
    });
    let leftB = document.querySelector('.mbshop_detail_bigPicZoom');
    let rightB = document.querySelector('.mbshop_detail_bigPicPop');
    let right = document.querySelector('.mbZoom');

    leftB.onmousemove = ev => {
        let x = ev.pageX - 480 + 140;
        let y = ev.pageY - 480 + 140;
        if (x < 0) {
            x = 0;
        } else if (x > 480 - 249) {
            x = 480 - 249;
        }
        if (y < 0) {
            y = 0;
        } else if (y > 480 - 249) {
            y = 480 - 249;
        }
        $('.mbshop_bigPicMark').css('left', x + 'px');
        $('.mbshop_bigPicMark').css('top', y + 'px');
        let scaleX = (right.offsetWidth - rightB.offsetWidth) / (leftB.offsetWidth - 249);
        let scaleY = (right.offsetHeight - rightB.offsetHeight) / (leftB.offsetHeight - 249);
        right.style.left = -scaleX * x + 'px';
        right.style.top = -scaleY * y + 'px';
    };
    //点击颜色图片显示出文字，替换“请选择颜色”

    $('.color').on('click', 'a', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        $(this).css('border-color', 'red').siblings().css('border-color', '#ccc');
        $('#colorSelected').html($(this).attr('attr_value'));
    })

    //点击尺码显示出文字，替换“请选择尺码”
    $('.size').on('click', 'a', function () {
        $(this).addClass('select').siblings().removeClass('select');
        $(this).css('border-color', 'red').siblings().css('border-color', '#ccc');
        $('#sizeSelected').html($(this).attr('attr_value'));
    })
    //数量“+”，“-”功能
    $('.mbshop_detail_buyNum_add').on('click', function () {
        var res = $('.mbshop_detail_buyNum').val();
        res++;
        $('.mbshop_detail_buyNum').val(res);
    });
    $('.mbshop_detail_buyNum_less').on('click', function () {
        var res = $('.mbshop_detail_buyNum').val();
        res--;
        $('.mbshop_detail_buyNum').val(res);
    });
    //点击加入购物车按钮，显示弹窗
    $('.mbshop_detail_btn_addcart').on('click', () => {
        if ($('.size a').hasClass('select') & $('.color a').hasClass('selected')) {
            $('.mbshop_openpop_mask').show();
            $('.mbshop_openpop').animate({
                opacity: 'show'
            }, 500);
            //把数据添加到订单表里
           let uid = getCookie('uid');
           let color =$('#colorSelected').text();
            let size =$('.select').text();          
            let num1 =$.trim($('.mbshop_detail_buyNum').val());
            $.ajax({
                type:'get',
                url:'../api/order.php',
                data:'uid='+uid+'&color='+color+'&size='+size+'&num='+num1+'&gid='+id,
                success:str=>{
                    // console.log(str);
                }
            })
        } else if ($('.size a').hasClass('select')) {
            alert('加入购物袋前，请先选择颜色！');
        } else if ($('.color a').hasClass('selected')) {
            alert('加入购物袋前，请先选择尺码！');
        } else {
            alert('加入购物袋前，请先选择颜色和尺码！');
        }
    })
    //点击按钮、继续购物关闭遮罩
    $('.mbshop_openpop_close').on('click', () => {
        $('.mbshop_openpop_mask').hide();
        $('.mbshop_openpop').hide();
    })
    $('.mbshop_openpop_btnGoShop').on('click', () => {
        $('.mbshop_openpop_mask').hide();
        $('.mbshop_openpop').hide();
    })
    //当滚动到一定高度时，商品头部变动
    let detailsTop = document.querySelector('.mbshop_detail_tabNav');
    let Top = detailsTop.offsetTop;
    window.onscroll = () => {
        var scrollTop = window.scrollY;
        if (scrollTop >= Top) {
            $('.detailFloopyfixed_goods').show();
            $('.mbshop_detail_tabNav_addToCart').show();
            $('.mbshop_detail_tabNav').addClass('detailFloopyfixed');
        } else {
            $('.detailFloopyfixed_goods').hide();
            $('.mbshop_detail_tabNav_addToCart').hide();
            $('.mbshop_detail_tabNav').removeClass('detailFloopyfixed');
        }
    }
    //点击添加购物车时，购物车页面添加新的商品
})