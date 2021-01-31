// ==UserScript==
// @name                关闭百度百科中的‘秒懂百科’视频以及右侧的‘V百科’
// @namespace           https://greasyfork.org/
// @version             1.0.0
// @description         关闭百度百科页面中的‘秒懂百科’视频以及右侧的‘V百科’;使用比较low的方式,带佬莫笑我 -.-;感谢AC的大力支持@AC
// @author              XingTianyu
// @match               *://baike.baidu.com/item/*
// @icon                https://baike.baidu.com/favicon.ico
// @grant               none
// @note                2021.01.31-V1.0.0 简单粗暴的删除页面元素
// @license             MIT
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 老方法，获取待删除节点的父节点，然后用父节点删除目标节点
     * @param {待删除元素的class名称}
     */
    function removeElementByHimFather(className) {
        //获取待删除元素
        var removeEle = document.querySelector('.' + className);
        if (removeEle !== null) {
            // 获取目标节点的父节点
            var parent = removeEle.parentElement;
            // 用目标节点的父节点删除目标节点
            parent.removeChild(removeEle);
        }
    }

    /**
     * 新方法，给元素添加隐藏属性，页面不再展示该元素
     * @param {待删除元素的class名称}
     */
    var hideElement = function (className) {
        var hideEle = document.querySelector('.' + className);
        hideEle.style.cssText = "display:none";
    }


    /**
     * 进一步封装删除的方法
     * @param {待删除的广告元素class名称数组} classNameArray 
     */
    function removeByLoopArray(classNameArray) {
        for (var className of classNameArray) {
            // 移除元素
            // removeElementByHimFather(className);
            // 隐藏元素
            hideElement(className);
        }
    }


    /**
     * 使用定时器删除
     * @param {待删除的元素class名称数组} classNameArray 
     */
    function timerToRemove(classNameArray) {
        setTimeout(removeByLoopArray, 1000, classNameArray);
    }


    /**
     * 按周期来调用
     * @param {待处理的元素className数组} classNameArray 
     * @param {回调函数} callbackFunc 
     * @param {定时时间} time 
     */
    var safeWaitFunc = function (classNameArray, callbackFunc, time) {
        time = time || 50;
        var id = setInterval(function () {
            clearInterval(id);
            callbackFunc(classNameArray);
        }, time)
    };



    /**
     * 打印脚本信息
     */
    function printInfo() {
        console.log("%c[星田雨-“关闭百度百科中的'秒懂百科'视频以及右侧的'V百科'等”] %c感谢使用，不相关的元素已隐藏～", "font-weight:bold;color:darkorange", "color:0");
    }

    //秒懂百科、v百科、xx、yy、'下载APP'、分享按钮、'TA说'右侧小卡片、'TA说'下面的div
    var classNameArray = ['before-content', 'lemmaWgt-promotion-vbaike', 'lemmaWgt-promotion-slide', 'topA', 'appdownload', 'share-list', 'tashuo-right', 'tashuo-bottom'];
    // timerToRemove(classNameArray);
    safeWaitFunc(classNameArray, removeByLoopArray);

    //打印信息
    printInfo();

})();