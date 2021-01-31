// ==UserScript==
// @name                126邮箱,163邮箱关闭'网易严选'和'半个电台'广告,去除'vip'和'官方APP'广告,关闭主页广告
// @namespace           https://greasyfork.org/
// @version             0.3.0
// @description         自动关闭网页版网易邮箱'网易严选'和'半个电台'tab页，关闭主页的广告,去除'vip'和'官方APP';火狐和Chrome以及Microsoft Edge浏览器建议使用TamperMonkey插件来使用脚本(AC带佬教我的);使用比较low的方式,带佬莫笑我 -.-
// @author              XingTianyu
// @match               *://*.mail.163.com/js6/main.jsp*
// @match               *://*.mail.126.com/js6/main.jsp*
// @icon                https://mail.163.com/favicon.ico
// @grant               none
// @note                2020.07-19-V0.1.2 使用自带的点击事件关闭广告的方式来关闭“网易严选”和“半个电台”，暂时没解决li元素id变化的问题
// @note                2020.07-25-V0.2.0 实现"官方APP"和"升级VIP"移除;清除无用代码;第一次完整实现所有预设目标,因此升级版本号到0.2.0;
// @note                2020.07-25-V0.2.1 删除左侧栏下方的广告(虽然大部分人使用了AdGuard一类的插件实现了屏蔽广告);已知bug:1.更新之后需要刷新好几下去除主页广告才会生效;2:偶尔出现点击"首页"按钮时主页出现广告但是没有去除的问题;3:如果网速比较慢,主页和左侧栏的广告可能就去不了(因为广告还没加载出来脚本已经运行完了,目前是1秒的延迟,如果你的网速比较慢,可以手动修改timerToRemove()函数中定时器预设的延迟时间)
// @note                2020.08-05-V0.2.2 新增对126邮箱的支持(虽然一行代码都没改...)
// @note                2020.08-22-V0.3.0 重构部分代码，修复偶尔无法去除‘开通邮箱会员’的bug,新增控制台打印信息
// @license             MIT
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 点击自动关闭广告
     */
    function clickToClose(textList_click) {

        if (textList_click !== undefined) {

            for (var text of textList_click) {

                //获取需要去除的广告元素
                var clickEle = document.querySelector("li[title='" + text + "']>a");

                if (clickEle !== null) {
                    //执行点击事件关闭
                    clickEle.click();
                }
            }
        }
    }

    /**
     * 删除"官方APP"和"升级VIP"
     */
    function removeToClose() {

        var removeEle = document.getElementsByClassName('sh0')[1];
        while (removeEle != null) {

            //获取父节点
            var parent = removeEle.parentElement;
            // 删除:
            parent.removeChild(removeEle);

            removeEle = document.getElementsByClassName('sh0')[1];
        }
    }


    /**
     * 移除‘官方app’，‘开通邮箱会员’
     * @param {待删除的广告元素class名称数组} textList_delete 
     */
    function removeMainpageAds(textList_delete) {
        for (var className of textList_delete) {
            //获取待删除元素
            var removeEle = document.querySelector('.' + className);
            if (removeEle !== null) {

                //获取父节点
                var parent = removeEle.parentElement;
                // 删除:
                parent.removeChild(removeEle);
            }
        }
    }


    /**
     * 删除广告
     */
    function removeAds(textList_delete) {

        //移除主页广告
        removeMainpageAds(textList_delete);

        //移除‘官方app’，‘开通邮箱会员’
        removeToClose();
    }

    /**
     * 使用定时器删除主页广告和‘官方app’，‘开通邮箱会员’
     * @param {待删除的广告元素class名称数组} textList_delete 
     */
    function timerToRemove(textList_delete) {
        setTimeout(removeAds, 1000, textList_delete);
    }

    function printInfo() {

        console.log("%c[星田雨-“126邮箱,163邮箱关闭'网易严选'和'半个电台'广告,去除'vip'和'官方APP'广告,关闭主页广告”] %c感谢使用，广告已移除～", "font-weight:bold;color:darkorange", "color:0");
    }


    //使用点击关闭广告
    var textList_click = ['网易严选', '半个电台'];
    clickToClose(textList_click);

    //移除主页和左侧栏的广告
    var textList_delete = ['gWel-bottom', 'nui-closeable'];
    timerToRemove(textList_delete);

    //打印信息
    printInfo();

})();