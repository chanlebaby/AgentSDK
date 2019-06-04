if(window.CCUI == undefined) window.CCUI = {};
if(CCUI.main == undefined) CCUI.main = window;
if(CCUI.Utility == undefined) CCUI.Utility = {};

if(CCUI.Utility.IsNull == undefined)
{
	CCUI.Utility.IsNull = function()
	{
		for (var i = 0; i < arguments.length; i++)
		{
			var arg = arguments[i];
			if (arg != undefined && arg != null) return arg;
		}
		return null;
	}
}
//UUID(Universally Unique IDentifier) 获取全局唯一标识符
if(CCUI.Utility.GetUUID == undefined)
{
	CCUI.Utility.GetUUID =function() {
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
}
(function(){
	

/*
 创建窗口
*/
CCUI.CreateWindow = function(config)
{
	var winApi = null;
	var isIframeWindow = false;
	var artConfig = {
	        id: CCUI.Utility.IsNull(config.id, CCUI.Utility.GetUUID()),
	        width: CCUI.Utility.IsNull(config.width, 400),
	        height: CCUI.Utility.IsNull(config.height, 300),
	        max: CCUI.Utility.IsNull(config.max, false),
	        lock: CCUI.Utility.IsNull(config.lock, true),
	        opacity: CCUI.Utility.IsNull(config.opacity, 0.3),
	        title: CCUI.Utility.IsNull(config.title, ""),
	        resize: CCUI.Utility.IsNull(config.resize, true),
	        zIndex: CCUI.Utility.IsNull(config.zIndex, CCUI.DialogUtil.Config.DialogZIndex),
	        init: function () {
	        	if (typeof config.init === 'function') {
	        		config.init(winApi);
	    		};
	        },
	        close:function(){
	        	if (typeof config.close === 'function' && config.close(winApi) === false) {
	    			return false;
	    		};
	        	return true;
	        }
		};
	if(config.left != undefined && config.left != null) artConfig.left = config.left;
	if(config.top != undefined && config.top != null) artConfig.top = config.top;
	if(config.show != undefined && config.show != null) artConfig.show = config.show;
	if(config.button != undefined && config.button != null) artConfig.button = config.button;
	
	if(config.url != undefined && config.url != null)
	{
		isIframeWindow = true;
		winApi = CCUI.DialogUtil.openArtDialog1(config.url,artConfig);
	}else
	{
		artConfig.content = CCUI.Utility.IsNull(config.content, "");
		isIframeWindow = false;
		winApi = CCUI.DialogUtil.contentDialog(artConfig);
	}

	winApi.Notify = function() { }
	winApi.GetHtmlWindow = function() {
		if(isIframeWindow)
			return winApi.iframe.contentWindow;
		else
			return CCUI.main;
	}
	return winApi;
}

//----------弹窗口相关扩展--------------
if(CCUI.DialogUtil == undefined) CCUI.DialogUtil = {};
CCUI.DialogUtil.Config = {
	DialogZIndex:10000000
};
if(CCUI.DialogUtil.dialogType == undefined) CCUI.DialogUtil.dialogType = "art";
//获取Hplus路径
if(CCUI.DialogUtil.ResPath == undefined || CCUI.ResPath == null)
{
	var _thisScript = null;
	//获取Hplus路径
	CCUI.DialogUtil.ResPath = window['_CCUI_DialogUtil_path'] || (function(script, i, me)
	{
		for (i in script) {
			// 如果通过第三方脚本加载器加载本文件，请保证文件名含有"CTIAgentSDK"字符
			if (script[i].src && script[i].src.indexOf('Hplus/js') !== -1) me = script[i];
		};
		
		_thisScript = me || script[script.length - 1];
		me = _thisScript.src.replace(/\\/g, '/');
		me = me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
		me = me.lastIndexOf('/js') < 0 ? me : me.substring(0, me.lastIndexOf('/js'));
		return me;
	}(document.getElementsByTagName('script')));
}
if(window.art != undefined || window.artDialog != undefined) CCUI.DialogUtil.DialogPlugin = window.art != undefined ? window.art:window.artDialog;

/*弹出对话框begin========================================*/

/*关闭对话框*/
CCUI.DialogUtil.closeDialog = function(index) {
    window.setTimeout(function () {
        if(CCUI.DialogUtil.DialogPlugin != undefined)
        	CCUI.DialogUtil.DialogPlugin.dialog.close();
    	//$.dialog.close();
    }, 10);
    return true;
}

/*关闭自身对话框*/
CCUI.DialogUtil.closeSelfDialog = function() {
    window.setTimeout(function () {
        if(CCUI.DialogUtil.DialogPlugin != undefined)
        {
        	CCUI.DialogUtil.DialogPlugin.dialog.close();
        }
    }, 10);
    return true;
}

/*
中间加载对话窗
*/
CCUI.DialogUtil.Loading = function(bool, text,time) {
    var ajaxbg = $("#CCUI_loading_background,#CCUI_loading");
    /*if(ajaxbg.size() == 0)
    {
    	var loadingHtml = "<div id='CCUI_loading_background' class='CCUI_loading_background' style='display: none;'></div>";
    	$("body").append(loadingHtml);
    	
    	loadingHtml = "<div id='CCUI_loading' onclick='CCUI.DialogUtil.Loading(false);' style='display: none;'>"
    				+"  <span>正在加载…</span>"
	 				+"</div>";
    	$("body").append(loadingHtml);
    }*/
    if(ajaxbg.size() == 0)
    {
    	var loadingHtml = "<div id='CCUI_loading_background' class='CCUI_loading_background' style='display: none;cursor:progress; width: 100%; height: 100%; opacity: 0.0; filter: alpha(opacity=00); background:#fff; position: absolute; top: 0; left: 0; z-index: 3000;'></div>";
    	$("body").append(loadingHtml);
    	
    	loadingHtml = "<div id='CCUI_loading' onclick='CCUI.DialogUtil.Loading(false);' style='display: none;color:#000;font-size:12pt;position:absolute;z-index:3001;left:42%;top:40%;border:2px solid #4A5B79;width:auto;padding:10px;background:#fff;cursor:pointer;-moz-border-radius:8px; -webkit-border-radius:8px; border-radius:8px; box-shadow:0 0 10px #ccc;'>"
    				+"  <span style='font-size:12pt;padding:8px 5px 8px 35px;background:url("+CCUI.DialogUtil.ResPath+"/img/loading.gif) no-repeat;'>正在加载…</span>"
	 				+"</div>";
    	$("body").append(loadingHtml);
    }
    if (!!text) {
        $("#CCUI_loading").css("left", ($('body').width() - $("#CCUI_loading").width()) / 2);
        $("#CCUI_loading span").html(text);
    } else {
        $("#CCUI_loading").css("left", "42%");
        $("#CCUI_loading span").html("正在加载…");
    }
    if (bool) {
        ajaxbg.show();
    } else {
        ajaxbg.hide();
    }
    //定时关闭
    if(bool && time != undefined && time >0)
    {
    	setTimeout(function(){ajaxbg.hide();},time * 1000);
    }
}
/*
弹出对话框（带：确认按钮、取消按钮）
*/
CCUI.DialogUtil.openDialog = function(url, _id, _title, _width, _height, callBack,_okVal,closeCallBack,locked) {
    //Loading(true);
	if(_okVal == undefined || _okVal == null || _okVal == '')
	{
		_okVal = "确定";
	}
	var lock = true;
	if(locked != undefined && locked == false)
	{
		lock = false;
	}
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
	var artApi = CCUI.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: lock,
        opacity: 0.3,
        title: _title,
        resize: true,
        zIndex: CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000),
        extendDrag: true,
        //content: 'url:' + RootPath() + url,
        okVal:_okVal,
        ok: function () {
            callBack(_id);
            return false;
        },
        cancel: true,
        close:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id) === false) {
    			return false;
    		};
        	return true;
        }
    });
	
	return artApi;
}
/*
弹出对话框（带：自定义按钮）
*/
CCUI.DialogUtil.openArtDialog = function(url, _id, _title, _width, _height, _button,closeCallBack,locked) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
	var lock = true;
	if(locked != undefined && locked == false)
	{
		lock = false;
	}
	var artConfig = {
		        id: _id,
		        width: _width,
		        height: _height,
		        max: false,
		        lock: lock,
		        opacity: 0.3,
		        title: _title,
		        resize: true,
		        zIndex: CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000),
		        close:function(){
		        	if (typeof closeCallBack === 'function' && closeCallBack(_id) === false) {
		    			return false;
		    		};
		        	return true;
		        }
			};
	if(_button != undefined)
	{
		artConfig.button = _button;
	}
    var artApi = CCUI.DialogUtil.DialogPlugin.dialog.open(url,artConfig);
    
    return artApi;
}
/*
弹出对话框（带：自定义按钮）
*/
CCUI.DialogUtil.openArtDialog1 = function(url,artConfig) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
    var artApi = CCUI.DialogUtil.DialogPlugin.dialog.open(url,artConfig);
    return artApi;
}
/*
最大化弹出对话框（带：确认按钮、取消按钮）
*/
CCUI.DialogUtil.FullopenDialog = function(url, _id, _title, callBack,closeCallBack,locked) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
	var lock = true;
	if(locked != undefined && locked == false)
	{
		lock = false;
	}
    //Loading(true);
	var artApi = CCUI.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        lock: lock,
        title: _title,
        max: false,
        min: false,
        width: $(window).width() - 40,
        height: $('body').height() - 100,
        zIndex: CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000),
        //content: 'url:' + RootPath() + url,
        ok: function () {
            callBack(_id);
            return false;
        },
        cancel: true,
        close:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id) === false) {
    			return false;
    		};
        	return true;
        }
    });
	return artApi;
}
/*
弹出对话框（没按钮）
*/
CCUI.DialogUtil.Dialog = function(url, _id, _title, _width, _height,closeCallBack,locked) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
	var lock = true;
	if(locked != undefined && locked == false)
	{
		lock = false;
	}
    //Loading(true);
    var artApi = CCUI.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: lock,
        title: _title,
        zIndex: CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000),
        close:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id) === false) {
    			return false;
    		};
        	return true;
        }
    });
    return artApi;
}
/*
最大化弹出对话框（没按钮）
*/
CCUI.DialogUtil.FullDialog = function(url, _id, _title,closeCallBack,locked) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
	var lock = true;
	if(locked != undefined && locked == false)
	{
		lock = false;
	}
    //Loading(true);
    var artApi = CCUI.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        lock: lock,
        title: _title,
        max: false,
        min: false,
        zIndex: CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000),
        width: $(window).width() - 40,
        height: $('body').height() - 100,
        close:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id) === false) {
    			return false;
    		};
        	return true;
        }
    });
    return artApi;
}

/*打开网页 window.open
/*url:          表示请求路径
/*windowname:   定义页名称
/*width:        宽度
/*height:       高度
---------------------------------------------------*/
CCUI.DialogUtil.OpenWindow = function(url, title, w, h) {
    var width = w;
    var height = h;
    var left = ($(window).width() - width) / 2;
    var top = ($(window).height() - height) / 2;
    window.open(url, title, 'height=' + height + ', width=' + width + ', top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no, titlebar=yes, alwaysRaised=yes');
}

/**
短暂提示
msg: 显示消息
time：停留时间
type：类型 >1：成功，<1：失败，其他：警告
**/
CCUI.DialogUtil.tipDialog = function(msg, time, type) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
	//padding:20px 25px;
	time = time != undefined ? time : 1;
	//type = type != undefined ? type : 2;
    var msg = "<div class='ui_alert_tip' style='color:#000;font-size:12pt;border:2px solid #4A5B79;width:auto;padding-right:5px;background:#fff; box-shadow:0 0 10px #ccc;'>"
    	+"<img src='"+CCUI.DialogUtil.ResPath+"/js/plugins/artDialog4/skins/icons/{{icon}}.png' style='vertical-align: middle;' />&nbsp;"+ msg + "</div>"
    if (type >= 1) {
        CCUI.DialogUtil.DialogPlugin.dialog.tips2(msg.replace("{{icon}}","succeed"), time, 'succ.png');
    } else if (type == -1) {
        CCUI.DialogUtil.DialogPlugin.dialog.tips2(msg.replace("{{icon}}","error"), time, 'fail.png');
    } else if (type == 0) {
        CCUI.DialogUtil.DialogPlugin.dialog.tips2(msg.replace("{{icon}}","error"), time, 'fail.png');
    } else {
        CCUI.DialogUtil.DialogPlugin.dialog.tips2(msg.replace("{{icon}}","warning"), time, 'i.png');
    }
}
/*
警告消息
msg: 显示消息
type：类型 >1：成功，<1：失败，其他：警告
*/
CCUI.DialogUtil.alertDialog = function(msg, type) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
    var msg = "<div class='ui_alert'>" + msg + "</div>"
    var icon = "";
    if (type >= 1) {
        icon = "succeed";
    } else if (type == -1) {
        icon = "error";
    } else {
        icon = "warning";
    }
    CCUI.DialogUtil.DialogPlugin.dialog({
        id: "alertDialog",
        icon: icon,
        content: msg,
        zIndex: CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000),
        title: "系统提示",
        ok: function () {
            return true;
        }
    });
}
/*
确认对话框
*/
CCUI.DialogUtil.confirmDialog = function(_title, msg, callBack) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
    var msg = "<div class='ui_alert'>" + msg + "</div>"
    CCUI.DialogUtil.DialogPlugin.dialog({
        id: "confirmDialog",
        lock: true,
        icon: "question",
        content: msg,
        title: _title,
        zIndex: CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000),
        ok: function () {
            callBack(true)
            return true;
        },
        cancel: function () {
            callBack(false)
            return true;
        }
    });
}

/*
内容信息框
msg: 显示消息
type：类型 >1：成功，<1：失败，其他：警告
*/
CCUI.DialogUtil.contentDialog = function(artConfig) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
	artConfig.zIndex = CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000);
	var artApi = CCUI.DialogUtil.DialogPlugin.dialog(artConfig);
    return artApi;
}
/*
 * 右下角滑动通知
 * */
CCUI.DialogUtil.notice = function (options) {
	if(CCUI.DialogUtil.DialogPlugin == undefined)
		return null;
    var opt = options || {},
        api, aConfig, hide, wrap, top,
        duration = 800;
        
    var config = {
        id: 'Notice',
        left: '100%',
        top: '100%',
        fixed: true,
        drag: false,
        resize: false,
        follow: null,
        lock: false,
        zIndex: CCUI.Utility.IsNull(CCUI.DialogUtil.Config.DialogZIndex, 10000000),
        init: function(here){
            api = this;
            aConfig = api.config;
            wrap = api.DOM.wrap;
            top = parseInt(wrap[0].style.top);
            hide = top + wrap[0].offsetHeight;
            
            wrap.css('top', hide + 'px')
                .animate({top: top + 'px'}, duration, function () {
                    opt.init && opt.init.call(api, here);
                });
        },
        close: function(here){
            wrap.animate({top: hide + 'px'}, duration, function () {
                opt.close && opt.close.call(this, here);
                aConfig.close = $.noop;
                api.close();
            });
            
            return false;
        }
    };	
    
    for (var i in opt) {
        if (config[i] === undefined) config[i] = opt[i];
    };
    
    return CCUI.DialogUtil.DialogPlugin.dialog(config);
};
/*弹出对话框end========================================*/

})();


function TabMenuChange(id, url,tabone,refresh){	
	if (url == "" || url == "#" || url == RootPath()) { 
	        url = RootPath() + "/Error/Error404.do";
	    } 
	refresh = refresh == undefined || refresh == null || refresh == '' ? false:refresh;
	var isnew = false;
	if (!$("#mainPannels").find("#tabmenus_" + id).length > 0) { // 如果当前id存在直接显示已经打开的tab	 
		isnew = true;
		CCUI.DialogUtil.Loading(true);
		    var show="display: none;";
		    if(tabone){
		    	show="";
		    }
        $("#mainPannels").append("<div id=\"tabmenus_" + id + "\" class=\"tabPanel\" style=\""+show+" width=100%; height:100%;\"><iframe frameborder=0 width=\"100%\" height=\"99%\" name=\"tabmenus_iframe_"+id+"\" id=\"tabmenus_iframe_"+id+ "\"src=\"" + url + "\" frameBorder=\"0\"></iframe></div>");
    } 
    $('.ScrollBar').find('.tabPanel').hide();
    $('.ScrollBar').find("#tabmenus_" + id).show();
    $(".tab_list_top div").removeClass("actived");	   
    $(".tab_list_top").find("#Tab_" + id).addClass("actived"); // 添加选中样式    
    $('iframe#tabmenus_iframe_' + id).load(function () {
    	CCUI.DialogUtil.Loading(false); 
    });
    if(!isnew && refresh)
    {
    	$('iframe#tabmenus_iframe_' + id).attr('src', url);
    }
};