$(function () {
    /*轮播图部分*/
    var banner_pic = $(".banner_top img");

    function imgScroll() {
        var now = 0;
        let banner_top = document.querySelector('.banner_top img');
        let banner_bottom = document.querySelector('.banner_bottom');
        let topImg = banner_bottom.querySelectorAll('li');
        var imglist = ['img/Shouye/PCZLB626-1-4.jpg', 'img/Shouye/PCZLB626-1-2.jpg', 'img/Shouye/PCZLB626-1-5.jpg', 'img/Shouye/PCZLB626-1-1.jpg', 'img/Shouye/lbtemaipc-1.jpg'];
        let timer = null;
        next();
        timer = setInterval(next, 2000);

        function next() {
            for (let i = 0; i < topImg.length; i++) {
                topImg[i].className = '';
            }
            topImg[now].className = 'active';
            banner_top.src = imglist[now];
            now++;
            if (now >= 5) {
                now = 0;
            }
        }
        banner_bottom.onmouseover = function (ev) {
            if (ev.target.tagName == 'LI') {
                for (let i = 0; i < topImg.length; i++) {
                    topImg[i].index = i;
                }
                now = ev.target.index;
                clearInterval(timer);
                next();
            }
        }
        banner_bottom.onmouseout = (ev) => {
            if (ev.target.tagName == 'LI') {
                timer = setInterval(next, 2000);
            }
        }
        banner_top.onmouseover = () => {
            clearInterval(timer);
        }
        banner_top.onmouseout = () => {
            timer = setInterval(next, 2000);
        }
    }
    imgScroll();


    // 首页分类划过显示
    let num = $('.headClassify_ul1 li').size();
    for (let i = 0; i < num; i++) {
        $('.headClassify_ul1 li').eq(i + 1).hover(
            function () {
                $(".category_hover_wrap").eq(i).css('display', 'block');
            },
            function () {
                $(".category_hover_wrap").eq(i).css('display', 'none');
            }
        )
    };


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

});