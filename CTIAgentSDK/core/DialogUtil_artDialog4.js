if(window.OcxCore == undefined) window.OcxCore = {};

(function(){
	
//获取CTIAgentSDK路径
if(OcxCore.ResPath == undefined || OcxCore.ResPath == null)
{
	var _thisScript = null;
	//获取CTIAgentSDK路径
	OcxCore.ResPath = window['_OcxCore_path'] || (function(script, i, me)
	{
		for (i in script) {
			// 如果通过第三方脚本加载器加载本文件，请保证文件名含有"CTIAgentSDK"字符
			if (script[i].src && script[i].src.indexOf('CTIAgentSDK') !== -1) me = script[i];
		};
		
		_thisScript = me || script[script.length - 1];
		me = _thisScript.src.replace(/\\/g, '/');
		me = me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
		me = me.lastIndexOf('/core') < 0 ? me : me.substring(0, me.lastIndexOf('/core'));
		return me;
	}(document.getElementsByTagName('script')));
}
/*
 创建窗口
*/
OcxCore.CreateWindow = function(config)
{
	var winApi = null;
	var isIframeWindow = false;
	var artConfig = {
	        id: OcxCore.Utility.IsNull(config.id, OcxCore.GenerateUniqueId()),
	        width: OcxCore.Utility.IsNull(config.width, 400),
	        height: OcxCore.Utility.IsNull(config.height, 300),
	        max: OcxCore.Utility.IsNull(config.max, false),
	        lock: OcxCore.Utility.IsNull(config.lock, true),
	        opacity: OcxCore.Utility.IsNull(config.opacity, 0.3),
	        title: OcxCore.Utility.IsNull(config.title, ""),
	        resize: OcxCore.Utility.IsNull(config.resize, true),
	        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
	        init: function () {
	        	if (typeof config.init === 'function') {
	        		config.init(winApi);
	    		};
	    		winApi.OnLoad.Call(winApi);
	        },
	        close:function(){
	        	if (typeof config.close === 'function' && config.close(winApi) === false) {
	    			return false;
	    		};
	    		winApi.OnClosed.Call(winApi);
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
		winApi = OcxCore.DialogUtil.openArtDialog1(config.url,artConfig);
	}else
	{
		artConfig.content = OcxCore.Utility.IsNull(config.content, "");
		isIframeWindow = false;
		winApi = OcxCore.DialogUtil.contentDialog(artConfig);
	}
	
	winApi.OnLoad = new OcxCore.Delegate();

	winApi.OnClosed = new OcxCore.Delegate();

	winApi.OnHidden = new OcxCore.Delegate();
	
	winApi.OnNotify = new OcxCore.Delegate();

	winApi.Notify = function() { }
	winApi.GetHtmlWindow = function() {
		if(isIframeWindow)
			return winApi.iframe.contentWindow;
		else
			return OcxCore.main;
	}
	OcxCore.Session.GetGlobal("WindowManagement").Add(winApi);
	winApi.OnClosed.Attach(function(w) { OcxCore.Session.GetGlobal("WindowManagement").Remove(w); });
	return winApi;
}

//----------弹窗口相关扩展--------------
OcxCore.DialogUtil = {};
if(window.art != undefined || window.artDialog != undefined) OcxCore.DialogUtil.DialogPlugin = window.art != undefined ? window.art:window.artDialog;

/*弹出对话框begin========================================*/

/*关闭对话框*/
OcxCore.DialogUtil.closeDialog = function() {
    window.setTimeout(function () {
        if(OcxCore.DialogUtil.DialogPlugin != undefined)
        	OcxCore.DialogUtil.DialogPlugin.dialog.close();
    	//$.dialog.close();
    }, 10);
    return true;
}

/*关闭自身对话框*/
OcxCore.DialogUtil.closeSelfDialog = function() {
    window.setTimeout(function () {
        if(OcxCore.DialogUtil.DialogPlugin != undefined)
        {
            OcxCore.DialogUtil.DialogPlugin.dialog.close();
        }
    }, 10);
    return true;
}

/*
中间加载对话窗
*/
OcxCore.DialogUtil.Loading = function(bool, text,time) {
    var ajaxbg = $("#ocxcore_loading_background,#ocxcore_loading");
    /*if(ajaxbg.size() == 0)
    {
    	var loadingHtml = "<div id='ocxcore_loading_background' class='ocxcore_loading_background' style='display: none;'></div>";
    	$("body").append(loadingHtml);
    	
    	loadingHtml = "<div id='ocxcore_loading' onclick='OcxCore.DialogUtil.Loading(false);' style='display: none;'>"
    				+"  <span>正在加载…</span>"
	 				+"</div>";
    	$("body").append(loadingHtml);
    }*/
    if(ajaxbg.size() == 0)
    {
    	var loadingHtml = "<div id='ocxcore_loading_background' class='ocxcore_loading_background' style='display: none;cursor:progress; width: 100%; height: 100%; opacity: 0.0; filter: alpha(opacity=00); background:#fff; position: absolute; top: 0; left: 0; z-index: 3000;'></div>";
    	$("body").append(loadingHtml);
    	
    	loadingHtml = "<div id='ocxcore_loading' onclick='OcxCore.DialogUtil.Loading(false);' style='display: none;color:#000;font-size:12pt;position:absolute;z-index:3001;left:42%;top:40%;border:2px solid #4A5B79;width:auto;padding:10px;background:#fff;cursor:pointer;-moz-border-radius:8px; -webkit-border-radius:8px; border-radius:8px; box-shadow:0 0 10px #ccc;'>"
    				+"  <span style='font-size:12pt;padding:8px 5px 8px 35px;background:url("+OcxCore.ResPath+"/images/loading.gif) no-repeat;'>正在加载…</span>"
	 				+"</div>";
    	$("body").append(loadingHtml);
    }
    if (!!text) {
        $("#ocxcore_loading").css("left", ($('body').width() - $("#ocxcore_loading").width()) / 2);
        $("#ocxcore_loading span").html(text);
    } else {
        $("#ocxcore_loading").css("left", "42%");
        $("#ocxcore_loading span").html("正在加载…");
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
OcxCore.DialogUtil.openDialog = function(url, _id, _title, _width, _height, callBack,_okVal,closeCallBack) {
    //Loading(true);
	if(_okVal == undefined || _okVal == null || _okVal == '')
	{
		_okVal = "确定";
	}
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: true,
        opacity: 0.3,
        title: _title,
        resize: true,
        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
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
OcxCore.DialogUtil.openArtDialog = function(url, _id, _title, _width, _height, _button,closeCallBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	var artConfig = {
		        id: _id,
		        width: _width,
		        height: _height,
		        max: false,
		        lock: true,
		        opacity: 0.3,
		        title: _title,
		        resize: true,
		        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
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
    var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,artConfig);
    
    return artApi;
}
/*
弹出对话框（带：自定义按钮）
*/
OcxCore.DialogUtil.openArtDialog1 = function(url,artConfig) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,artConfig);
    return artApi;
}
/*
最大化弹出对话框（带：确认按钮、取消按钮）
*/
OcxCore.DialogUtil.FullopenDialog = function(url, _id, _title, callBack,closeCallBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    //Loading(true);
	var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        lock: true,
        title: _title,
        max: false,
        min: false,
        width: $(window).width() - 40,
        height: $('body').height() - 100,
        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
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
OcxCore.DialogUtil.Dialog = function(url, _id, _title, _width, _height,closeCallBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    //Loading(true);
    var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: true,
        title: _title,
        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
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
OcxCore.DialogUtil.FullDialog = function(url, _id, _title,closeCallBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    //Loading(true);
    var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        lock: true,
        title: _title,
        max: false,
        min: false,
        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
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
OcxCore.DialogUtil.OpenWindow = function(url, title, w, h) {
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
OcxCore.DialogUtil.tipDialog = function(msg, time, type) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	//padding:20px 25px;
    var msg = "<div class='ui_alert_tip' style='color:#000;font-size:12pt;border:2px solid #4A5B79;width:auto;padding-right:5px;background:#fff; box-shadow:0 0 10px #ccc;'>"
    	+"<img src='"+OcxCore.ResPath+"/plugins/artDialog4/skins/icons/{{icon}}.png' style='vertical-align: middle;' />&nbsp;"+ msg + "</div>"
    if (type >= 1) {
        OcxCore.DialogUtil.DialogPlugin.dialog.tips2(msg.replace("{{icon}}","succeed"), time, 'succ.png');
    } else if (type == -1) {
        OcxCore.DialogUtil.DialogPlugin.dialog.tips2(msg.replace("{{icon}}","error"), time, 'fail.png');
    } else if (type == 0) {
        OcxCore.DialogUtil.DialogPlugin.dialog.tips2(msg.replace("{{icon}}","error"), time, 'fail.png');
    } else {
        OcxCore.DialogUtil.DialogPlugin.dialog.tips2(msg.replace("{{icon}}","warning"), time, 'i.png');
    }
}
/*
警告消息
msg: 显示消息
type：类型 >1：成功，<1：失败，其他：警告
*/
OcxCore.DialogUtil.alertDialog = function(msg, type) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
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
    OcxCore.DialogUtil.DialogPlugin.dialog({
        id: "alertDialog",
        icon: icon,
        content: msg,
        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
        title: "系统提示",
        ok: function () {
            return true;
        }
    });
}
/*
确认对话框
*/
OcxCore.DialogUtil.confirmDialog = function(_title, msg, callBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    var msg = "<div class='ui_alert'>" + msg + "</div>"
    OcxCore.DialogUtil.DialogPlugin.dialog({
        id: "confirmDialog",
        lock: true,
        icon: "question",
        content: msg,
        title: _title,
        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
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
OcxCore.DialogUtil.contentDialog = function(artConfig) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	artConfig.zIndex = OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000);
	var artApi = OcxCore.DialogUtil.DialogPlugin.dialog(artConfig);
    return artApi;
}
/*
 * 右下角滑动通知
 * */
OcxCore.DialogUtil.notice = function (options) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
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
        zIndex: OcxCore.Utility.IsNull(OcxCore.Config.DialogZIndex, 10000000),
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
    
    return OcxCore.DialogUtil.DialogPlugin.dialog(config);
};
/*弹出对话框end========================================*/

})();