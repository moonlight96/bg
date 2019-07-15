$(function () {


    let listPdBox = document.querySelector('.mbshop_listPdBox');
    let pagination = document.querySelector('.pagination');
    let num = 40; //每页40条内容
    let iPage = 1; //获取第一页内容
    var index = 0;
    let paixu = ''; //默认没有排序
    let zhekou = '';
    let xiaoli = '';
    let preVal = 0; //默认没有价格区间
    let nextVal = 100000;
    let discount = 10;
    let searchVal = ''; //默认查询为空

    function init() {
        ajax2({
            type: 'get',
            url: '../api/getdata.php',
            data: 'page=' + iPage + '&num=' + num + '&paixu=' + paixu + '&zhekou=' + zhekou + '&xiaoli=' + xiaoli + '&preVal=' + preVal + '&nextVal=' + nextVal + '&searchVal=' + searchVal,
            //数据渲染，显示每页40个数据
            success: str => {
                let arr = JSON.parse(str);
                let html = arr.dataList.map(item => {
                    let htmlAll = `<li class="mbshop_listPdCon" data-id="${item.gid}" data-site="">
                    <a href="###" class="mbshop_listPdImg"
                        id="mbshop_listPdImg" >
                        <!-- 饰品、鞋类、平铺图，img上加该样式"mbshop_pdList_spHeight" -->
                        <img src="../img/${item.bigImg}"
                            data-original=""
                            alt="潮牌男士暗迷彩速干面料束脚裤" style="display: block;">
                    </a>
                    <span class="mbshop_listPdText fl goodlist_brandname">
                        <a href="###"
                            >${item.storename}</a>
                        <label class="goodlist_discount">${item.discount}折</label>
                    </span>
                    <span class="mbshop_listPdText fl"><a href="###">${item.tittle}</a></span>
                    <span class="mbshop_listPdText">
                        <b>￥${(item.price*item.discount*0.1).toFixed(2)}</b>
                        <del>￥${item.price}</del>
                    </span>
                    <!-- 颜色切换 -->
                    <div class="mbshop_listPdColorFrame" id="mbshop_listPdColorId0">
                        <span class="mbshop_listPdColorBtnLf mbshop_disabled" title="向左"
                            style="display: none;"></span>
                        <div class="mbshop_listPdColorScroll">
                            <div class="mbshop_listPdColor"> 
                            </div>
                        </div>
                        <span class="mbshop_listPdColorBtnRf" title="向右" style="display: none;"></span>
                    </div>
                    <!-- <span class="mbshop_listPdText2">
                                        已售出：<= $v['saleCount']?>件
                            </span> -->

                </li> `;
                    return htmlAll;

                }).join('');
                listPdBox.innerHTML = html;
                var html3 = '';
                let listPdColor = document.querySelectorAll('.mbshop_listPdColor');
                //把图片路径切割出来

                var html5 = arr.dataList.map((item, index) => {
                    var arr1 = item.color.split('&');

                    html3 = arr1.map(item => {
                        return `<a href="javascript:void(0)"><img
                                        src="../img/${item}"
                                        
                                        alt="" style="display: block;"></a>`;
                        return html3;
                    }).join("");

                    listPdColor[index].innerHTML = html3;
                });
                //数据渲染结束
                //分页 点击页码，能够按需加载新一页数据过来渲染；事件委托实现事件绑定 
                let pagesNum = Math.ceil(arr.pages / num);
                let pageBtns = '';
                for (let i = 0; i < pagesNum; i++) {
                    pageBtns += `<li class="pageN"><a href="#">${i + 1}</a></li>`;
                }
                pagination.innerHTML = `<li class="homePage"> <a href="###">首页</a></li>
            <li class="preBtn"><a href="###">前一页</a></li>` + pageBtns + `<li class="next"><a href="#">后一页</a></li>
                <li class="last"><a href="#">尾页</a></li>`;

                $(".pagination .pageN a").eq(iPage - 1).addClass('active');

                $('.pageN a').on('click', (ev) => {
                    iPage = ev.target.innerHTML;
                    //  index = iPage - 1;
                    init();
                });
                $('.preBtn a').on('click', () => {
                    if (iPage >= 0) {
                        iPage--;
                    } else {
                        iPage = 0;
                    }
                    init();
                });
                $('.next a').on('click', () => {
                    if (iPage >= pagesNum) {
                        iPage = pagesNum;
                    } else {
                        iPage++;
                    }
                    init();
                });
                $('.homePage a').on('click', () => {
                    iPage = 1;
                    init();
                });
                $('.last a').on('click', () => {
                    iPage = pagesNum;
                    init();
                });
                $('.mbshop_listPdColorScroll img').on('mouseover', function (ev) {
                    var smallSrc = ev.target.src;
                    ev.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].src = smallSrc;
                })
            }

        });
    }
    init();
    //点击价格排序
    $numC = 0;
    $('.mbPrice').click(function () {
        $('.mbDiscount').removeClass('mbshop_pdFilterUp');
        $('.mbSale').removeClass('mbshop_pdFilterUp');
        xiaoli = '';
        zhekou = '';
        $('.mbPrice').addClass('mbshop_pdFilterUp');
        $numC++;
        if ($numC % 2 != 0) {
            //价格
            paixu = 'asc';
            $('.mbPrice').css('background-position', '58px -142px');
        } else {
            paixu = 'desc';
            $('.mbPrice').css('background-position', '58px -100px');
        }
        init();
    });
    //点击折扣排序
    $numZ = 0;
    $('.mbDiscount').click(function () {
        $('.mbPrice').removeClass('mbshop_pdFilterUp');
        paixu = '';
        xiaoli = '';
        $('.mbDiscount').addClass('mbshop_pdFilterUp');
        $numZ++;
        if ($numZ % 2 != 0) {
            //价格
            zhekou = 'asc';
            $('.mbDiscount').css('background-position', '58px -142px');
        } else {
            zhekou = 'desc';
            $('.mbDiscount').css('background-position', '58px -100px');
        }
        init();
    });
    //点击销量排序
    $numX = 0;
    $('.mbSale').click(function () {
        $('.mbPrice').removeClass('mbshop_pdFilterUp');
        $('.mbDiscount').removeClass('mbshop_pdFilterUp');
        $('.mbSale').removeClass('mbshop_pdFilterUp');
        paixu = '';
        zhekou = '';
        $('.mbSale').addClass('mbshop_pdFilterUp');
        ++$numX;
        if ($numX % 2 == 0) {
            //价格
            xiaoli = 'asc';
            $('.mbSale').addClass('.bgPosition');
            // $('.mbSale').css('background-position', '58px -100px');
        } else {
            xiaoli = 'desc';
            $('.mbSale').removeClass('.bgPosition');
            // $('.mbSale').css('background-position', '58px -142px');
        }
        init();
    });
    //模糊查询

    $('#banggo').on('click', '.inpSearch', () => {
        searchVal = $.trim($('.inpText').val());
        init();
    });
    //分类划过显示
    let num8 = $('.headClassify_ul1 li').size();
    for (let i = 0; i < num8; i++) {
        $('.headClassify_ul1 li').eq(i + 1).hover(
            function () {

                $(".category_hover_wrap").eq(i).css('display', 'block');
            },
            function () {

                $(".category_hover_wrap").eq(i).css('display', 'none');
            }
        )
    };

    //  回到顶部jquery
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
    //左边栏分类点击

    var count = 0;
    $('.mbshop_search_lt_box li em').on('click', function () {
        count++;
        if (count % 2 != 0) {
            $(this).css('background-position', '0 -92px')
                .siblings('dl')
                .css("display", "block")
                .siblings('a')
                .css("text-decoration", "underline");
        } else {
            $(this).css('background-position', '-8px -92px')
                .siblings('dl')
                .css("display", "none")
                .siblings('a')
                .css("text-decoration", "none");
        }
    });
    //查询价格区间
    $('.mbshop_ie_btn_s_f_sure').click(() => {
        preVal = $.trim($('#start_price').val() * discount);
        nextVal = $.trim($('#end_price').val() * discount);
        init();
    });
    //点击跳转详情页
    $('.mbshop_listPdBox').on('click', '.mbshop_listPdCon', ev => {
        if (ev.target.tagName == 'A' || ev.target.tagName == 'IMG') {
            let cid = ev.target.parentNode.parentNode.dataset.id;
            window.location = 'goods.html?gid=' + cid;
        }
    });
    //浏览记录
    $('.mbshop_pdList').on('click', '.mbshop_listPdCon', function (ev) {
        // if(ev.target.className=='mbshop_listPdCon'){
        let id = ev.target.dataset.id;
        console.log(id);
        console.log(id);
        let oldIds = '';
        if (window.localStorage.id) {
            oldIds = window.localStorage.id;
            window.localStorage.id = oldIds + '&' + id;
        } else {
            window.localStorage.id = id;
        }
        // }
    })


});