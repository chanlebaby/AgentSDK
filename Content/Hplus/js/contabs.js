
$(function () {
    //计算元素集合的总宽度
    function calSumWidth(elements) {
        var width = 0;
        $(elements).each(function () {
            width += $(this).outerWidth(true);
        });
        return width;
    }
    //滚动到指定选项卡
    function scrollToTab(element) {
        var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").outerWidth() < visibleWidth) {
            scrollVal = 0;
        } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
            if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                scrollVal = marginLeftVal;
                var tabElement = element;
                while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                    scrollVal -= $(tabElement).prev().outerWidth();
                    tabElement = $(tabElement).prev();
                }
            }
        } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
            scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
        }
        $('.page-tabs-content').animate({
            marginLeft: 0 - scrollVal + 'px'
        }, "fast");
    }
    //查看左侧隐藏的选项卡
    function scrollTabLeft() {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
            return false;
        } else {
            var tabElement = $(".J_menuTab:first");
            var offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            offsetVal = 0;
            if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).prev();
                }
                scrollVal = calSumWidth($(tabElement).prevAll());
            }
        }
        $('.page-tabs-content').animate({
            marginLeft: 0 - scrollVal + 'px'
        }, "fast");
    }
    //查看右侧隐藏的选项卡
    function scrollTabRight() {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
            return false;
        } else {
            var tabElement = $(".J_menuTab:first");
            var offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            scrollVal = calSumWidth($(tabElement).prevAll());
            if (scrollVal > 0) {
                $('.page-tabs-content').animate({
                    marginLeft: 0 - scrollVal + 'px'
                }, "fast");
            }
        }
    }

    //UUID(Universally Unique IDentifier) 获取全局唯一标识符
    function createUUID() {
    	 var s = [];
    	 var hexDigits = "0123456789abcdef";
    	 for (var i = 0; i < 36; i++) {
    	 s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    	 }
    	 s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    	 s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    	 s[8] = s[13] = s[18] = s[23] = "-";
    	
    	var uuid = s.join("");
    	 return uuid;
    }
    //通过遍历给菜单项加上data-id属性
    $(".J_menuItem").each(function (index) {
        if (!$(this).attr('data-id')) {
            $(this).attr('data-id', createUUID());
        }
    });
    /*//通过遍历给菜单项加上data-index属性
    $(".J_menuItem").each(function (index) {
        if (!$(this).attr('data-index')) {
            $(this).attr('data-index', index);
        }
    });*/
    
    /**
     * 打开页面选项卡
     * menuItem(dataId,dataUrl,menuName,isRefleshPage)
     * 
     * @param dataId 页面选项卡索引ID
     * @param dataUrl 页面URL
     * @param menuName 页面选项卡名称
     * @param isRefleshPage 选项卡存在时是否重新刷新页面
     * */
    function menuItem(dataId,dataUrl,menuName,isRefleshPage) {
        // 获取标识数据
    	
        dataUrl = dataUrl != undefined ? dataUrl : "";
        dataId = dataId != undefined && dataId != null && dataId != "" ? dataId : createUUID();
        menuName = menuName != undefined ? menuName : "新选项卡";
        isRefleshPage = isRefleshPage != undefined ? isRefleshPage : false;
        var flag = true;
        if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;

        // 选项卡菜单已存在
        $('.J_menuTab').each(function () {
            if ($(this).data('id') == dataId) {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                    scrollToTab(this);
                    // 显示tab对应的内容区
                    $('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == dataId) {
                            $(this).show().siblings('.J_iframe').hide();
                            return false;
                        }
                    });
                }
                flag = false;
                return false;
            }
        });

        // 选项卡菜单不存在
        if (flag) {
            var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataId + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
            $('.J_menuTab').removeClass('active');

            // 添加选项卡对应的iframe
            var str1 = '<iframe class="J_iframe" id="iframe_' + dataId + '" name="iframe_' + dataId + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataId + '" seamless></iframe>';
            $('.J_mainContent').find('iframe.J_iframe').hide();
            $('.J_mainContent').append(str1);

            //显示loading提示
//            var loading = layer.load();
//
//            $('.J_mainContent iframe:visible').load(function () {
//                //iframe加载完成后隐藏loading提示
//                layer.close(loading);
//            });
            // 添加选项卡
            $('.J_menuTabs .page-tabs-content').append(str);
            scrollToTab($('.J_menuTab.active'));
        }
        else if(isRefleshPage)
        {
        	// 如果选项卡菜单已存在，则刷新页面
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == dataId) {
                	$(this).attr("src",dataUrl);
                    return false;
                }
            });
        }
        return false;
    }

    $('.J_menuItem').on('click', function(){
    	//如果有自定义打开方式则不处理
    	if($(this).hasClass('J_menuItem_open_custom'))
    	{
    		return true;
    	}
    	var dataUrl = $(this).attr('href');
    	if((!dataUrl || dataUrl == "") && !!$(this).data('url'))
    	{
    		dataUrl = $(this).data('url');
    	}
        var dataId = null;
        if (!$(this).attr('data-id')) {
        	dataId = createUUID();
            $(this).attr('data-id', dataId);
        }
        else
        {
        	dataId = $(this).attr('data-id');
        }
        var menuName = "";
        if(!!$(this).data('title') && $(this).data('title') != "")
    	{
        	menuName = $(this).data('title');
    	}
        else
        {
        	menuName = $.trim($(this).text());
        }
        var isRefleshPage = false;
        menuItem(dataId,dataUrl,menuName,isRefleshPage);
        if(!$(this).data('url') || $(this).data('url') == "")
        	return false;
    });

    // 关闭选项卡菜单
    function closeTab() {
        var closeTabId = $(this).parents('.J_menuTab').data('id');
        var currentWidth = $(this).parents('.J_menuTab').width();

        // 当前元素处于活动状态
        if ($(this).parents('.J_menuTab').hasClass('active')) {

            // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
            if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {

                var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
                $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');

                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                if (marginLeftVal < 0) {
                    $('.page-tabs-content').animate({
                        marginLeft: (marginLeftVal + currentWidth) + 'px'
                    }, "fast");
                }

                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();

                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }

            // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
            if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
                var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
                $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();

                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }
        }
        // 当前元素不处于活动状态
        else {
            //  移除当前选项卡
            $(this).parents('.J_menuTab').remove();

            // 移除相应tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
            scrollToTab($('.J_menuTab.active'));
        }
        return false;
    }

    $('.J_menuTabs').on('click', '.J_menuTab i', closeTab);

    //关闭其他选项卡
    function closeOtherTabs(){
        $('.page-tabs-content').children("[data-id]").not(":first").not(".active").each(function () {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').css("margin-left", "0");
    }
    $('.J_tabCloseOther').on('click', closeOtherTabs);

    //滚动到已激活的选项卡
    function showActiveTab(){
        scrollToTab($('.J_menuTab.active'));
    }
    
    //获取已激活的选项卡data-id
    function getActiveTabId(){
    	var activeTabObj = $('.page-tabs-content').find('.J_menuTab.active');
    	
    	return activeTabObj.size()>0 ? activeTabObj.data('id'):"";
    }
    //获取已激活的选项卡页面iframeid
    function getActiveTabIframeId(){
    	var activeTabObj = $('.page-tabs-content').find('.J_menuTab.active');
    	
    	return activeTabObj.size()>0 ? "iframe_"+activeTabObj.data('id'):"";
    } 
    
    $('.J_tabShowActive').on('click', showActiveTab);


    // 点击选项卡菜单
    function activeTab() {
        if (!$(this).hasClass('active')) {
            var currentId = $(this).data('id');
            // 显示tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == currentId) {
                    $(this).show().siblings('.J_iframe').hide();
                    return false;
                }
            });
            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
            scrollToTab(this);
        }
    }

    $('.J_menuTabs').on('click', '.J_menuTab', activeTab);

    //刷新iframe
    function refreshTab() {
        var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]');
        var url = target.attr('src');
//        //显示loading提示
//        var loading = layer.load();
//        target.attr('src', url).load(function () {
//            //关闭loading提示
//            layer.close(loading);
//        });
    }

    $('.J_menuTabs').on('dblclick', '.J_menuTab', refreshTab);

    // 左移按扭
    $('.J_tabLeft').on('click', scrollTabLeft);

    // 右移按扭
    $('.J_tabRight').on('click', scrollTabRight);

    // 关闭全部
    $('.J_tabCloseAll').on('click', function () {
        $('.page-tabs-content').children("[data-id]").not(":first").each(function () {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').children("[data-id]:first").each(function () {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
            $(this).addClass("active");
        });
        $('.page-tabs-content').css("margin-left", "0");
    });
    
    /**
     * 打开页面选项卡
     * createMenuTab(dataId,dataUrl,menuName,isRefleshPage)
     * 
     * @param dataId 页面选项卡索引ID
     * @param dataUrl 页面URL
     * @param menuName 页面选项卡名称
     * @param isRefleshPage 选项卡存在时是否重新刷新页面
     * */
    if(window.createMenuTab == undefined) window.createMenuTab = menuItem;
    if(window.scrollToTab == undefined) window.scrollToTab = scrollToTab;
    if(window.getActiveTabId == undefined) window.getActiveTabId = getActiveTabId;
    if(window.getActiveTabIframeId == undefined) window.getActiveTabIframeId = getActiveTabIframeId;
    //兼容旧版本的打开tab页面
    if(window.AddTabMenu == undefined) window.AddTabMenu = function(tabid, url, name, img, Isclose, IsReplace, IsVisitorModule,IsShowLoading){
    	menuItem(tabid,url,name,IsReplace);
    };
    //兼容旧版本的获取当前tab页面的data-id
    if(window.tabiframeId == undefined) window.tabiframeId = function(){
    	return getActiveTabIframeId();
    };
    
});
