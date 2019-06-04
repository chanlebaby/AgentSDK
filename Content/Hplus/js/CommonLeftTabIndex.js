/**
 * 公共的左边菜单切换面板
 */
$(function() {
	
	// 左侧边栏使用slimscroll  .cctui-side 
    $('.cctui-side-scroll').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });
	
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
		
		/* var childs = this.el.find('.cctui-nav-child li');
		// Evento
		childs.on('click', {el: this.el}, function(e){
			var $el = e.data.el;
				$this = $(this);
			$this.toggleClass('cctui-this');
			$el.find('.cctui-nav-child .cctui-this').not($this).removeClass('cctui-this');
		}); */
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.cctui-nav-child').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), true);
	
	$('.cctui-nav .cctui-nav-child li').on('click', function(){
		//如果有自定义打开方式则不处理
    	/* if($(this).hasClass('J_menuItem_open_custom'))
    	{
    		return true;
    	} */
    	$this = $(this);
    	$thisA = $this.find("a");
    	var hasClickThisBefore = $this.hasClass("cctui-this");//当前菜单之前是否已点选
		$('.cctui-nav-child .cctui-this').removeClass('cctui-this');
		$('.cctui-nav-child2 .cctui-this').removeClass('cctui-this');
		$this.addClass('cctui-this');
		
    	var dataUrl = $thisA.attr('href');
        var dataId = null;
        if (!$thisA.attr('data-id')) {
        	dataId = GetUUID();
        	$thisA.attr('data-id', dataId);
        }
        else
        {
        	dataId = $thisA.attr('data-id');
        }
        var menuName = $.trim($thisA.text());
        var isRefleshPage = false;
        if (!$thisA.attr('data-reflesh')) {
        	isRefleshPage = false;
        }
        else
        {
        	isRefleshPage = "true" == $thisA.attr('data-reflesh');
        }
        navChildItemClickHandler(dataId,dataUrl,menuName,isRefleshPage,hasClickThisBefore);
        if(dataUrl != undefined && $.trim(dataUrl) != "" && $.trim(dataUrl) != "#" && $.trim(dataUrl) != "javascipt:;")
        {
        	return false;
        }
    });
	
	$('.cctui-nav .cctui-nav-child2 li').on('click', function(){
    	//如果有自定义打开方式则不处理
    	/* if($(this).hasClass('J_menuItem_open_custom'))
    	{
    		return true;
    	} */
    	$this = $(this);
    	$thisA = $this.find("a");
    	var hasClickThisBefore = $this.hasClass("cctui-this");//当前菜单之前是否已点选
		$('.cctui-nav-child .cctui-this').removeClass('cctui-this');
		$('.cctui-nav-child2 .cctui-this').removeClass('cctui-this');
		$this.addClass('cctui-this');
		
    	var dataUrl = $thisA.attr('href');
        var dataId = null;
        if (!$thisA.attr('data-id')) {
        	dataId = GetUUID();
        	$thisA.attr('data-id', dataId);
        }
        else
        {
        	dataId = $thisA.attr('data-id');
        }
        var menuName = $.trim($thisA.text());
        var isRefleshPage = false;
        if (!$thisA.attr('data-reflesh')) {
        	isRefleshPage = false;
        }
        else
        {
        	isRefleshPage = "true" == $thisA.attr('data-reflesh');
        }
        navChildItemClickHandler(dataId,dataUrl,menuName,isRefleshPage,hasClickThisBefore);
        if(dataUrl != undefined && $.trim(dataUrl) != "" && $.trim(dataUrl) != "#" && $.trim(dataUrl) != "javascipt:;")
        {
        	return false;
        }
    });
	
	/**
     * 打开页面选项卡
     * menuItem(dataId,dataUrl,menuName,isRefleshPage)
     * 
     * @param dataId 页面选项卡索引ID
     * @param dataUrl 页面URL
     * @param menuName 页面选项卡名称
     * @param isRefleshPage 选项卡存在时是否重新刷新页面
     * @param hasClickThisBefore 当前菜单之前是否已点选
     * */
    function navChildItemClickHandler(dataId,dataUrl,menuName,isRefleshPage,hasClickThisBefore) {
        // 获取标识数据
    	
        dataUrl = dataUrl != undefined ? dataUrl : "";
        dataId = dataId != undefined && dataId != null && dataId != "" ? dataId : createUUID();
        menuName = menuName != undefined ? menuName : "新选项卡";
        isRefleshPage = isRefleshPage != undefined ? isRefleshPage : false;
        var flag = true;
        if (dataUrl == undefined || $.trim(dataUrl).length == 0 ||  $.trim(dataUrl) == "#" || $.trim(dataUrl) == "javascipt:;")return false;

        // 页面已存在
        $('.nav_mainContent .nav_iframe').each(function () {
            if ($(this).data('id') == dataId) {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings('.nav_iframe').removeClass('active');
                    $(this).show().siblings('.nav_iframe').hide();
                }
                flag = false;
                return false;
            }
        });

        // 选项卡菜单不存在
        if (flag) {
        	
            // 添加选项卡对应的iframe
            var str1 = '<iframe class="nav_iframe active" name="iframe_' + dataId + '" width="100%" height="100%" style="margin:0px;padding:0px;height:calc(100% - 3px);" src="' + dataUrl + '" frameborder="0" data-id="' + dataId + '" seamless></iframe>';
            $('.nav_mainContent').find('.nav_iframe').removeClass('active').hide();
            $('.nav_mainContent').append(str1);

            //显示loading提示
//		            var loading = layer.load();
//
//		            $('.J_mainContent iframe:visible').load(function () {
//		                //iframe加载完成后隐藏loading提示
//		                layer.close(loading);
//		            });
        }
        else if(isRefleshPage && !hasClickThisBefore)
        {
        	// 如果选项卡菜单已存在，则刷新页面
            $('.nav_mainContent .nav_iframe').each(function () {
                if ($(this).data('id') == dataId) {
                	$(this).attr("src",dataUrl);
                    return false;
                }
            });
        }
        return false;
    }
    //如果在URL参数中指定默认打开指定菜单，则打开指定菜单
    if(GetQuery != undefined && !!GetQuery("showMenuCode"))
    {
    	var showMenuCode = GetQuery("showMenuCode");
    	var sJqObjs = $('.cctui-nav-item').not('.hide').find('li').not('.hide').find("a[data-id="+showMenuCode+"]");
    	if(sJqObjs.size() == 1)
    	{
    		$('.cctui-nav-child .cctui-this').removeClass('cctui-this');
    		$('.cctui-nav-child2 .cctui-this').removeClass('cctui-this');
    		sJqObjs.parent().addClass('cctui-this');
    	}
    }
    //触发第一个显示的菜单
	if($('.cctui-nav-item').not('.hide').find('.cctui-this').not('.hide').size() == 0)
	{
		$('.cctui-nav-item').not('.hide').find('li').not('.hide').first().trigger("click");
	}
	else
	{
		$('.cctui-nav-item > ul .cctui-this').trigger("click");
	}
	//触发第一个显示的菜单
    //$('.cctui-nav-child .cctui-this').trigger("click");
    //$('.cctui-nav-child2 .cctui-this').trigger("click");
    
    //
    if(window.navChildItemClickHandler == undefined) window.navChildItemClickHandler = navChildItemClickHandler;
    
    //兼容旧版本的打开tab页面
    if(window.AddTabMenu == undefined) window.AddTabMenu = function(tabid, url, name, img, Isclose, IsReplace, IsVisitorModule,IsShowLoading){
    	parent.AddTabMenu(tabid, url, name, img, Isclose, IsReplace, IsVisitorModule,IsShowLoading);
    };
});



