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
	var winApi = {};
	var isIframeWindow = false;
	var artApiIndex = null;
	var artConfig = {
	        id: OcxCore.Utility.IsNull(config.id, OcxCore.GenerateUniqueId()),
	        area: [OcxCore.Utility.IsNull(config.width, 400)+'px', OcxCore.Utility.IsNull(config.height, 300)+'px'],
	        maxmin: OcxCore.Utility.IsNull(config.max, false),
	        shade:OcxCore.Utility.IsNull(config.lock, true) ? [OcxCore.Utility.IsNull(config.opacity, 0.3), '#393D49']:0,
	        title: OcxCore.Utility.IsNull(config.title, ""),
	        resize: OcxCore.Utility.IsNull(config.resize, true),
	        //zIndex: OcxCore.Utility.IsNull(config.zIndex, 1000000),
	        success: function (layero, index) {
	        	winApi.artApiIndex = index;
	        	var iframeWin = OcxCore.main[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象
	        	winApi.iframeWin = iframeWin;
	        	if (typeof config.init === 'function') {
	        		config.init(winApi);
	    		};
	    		winApi.OnLoad.Call(winApi);
	        },
	        end:function(){
	        	if (typeof config.close === 'function' && config.close(winApi) === false) {
	    			return false;
	    		};
	    		winApi.OnClosed.Call(winApi);
	        	return true;
	        }
		};
	
	if(config.top != undefined && config.top != null && config.left != undefined && config.left != null)
	{
		artConfig.offset = [config.top+'px', config.left+'px'];
	}
	if(config.button != undefined && config.button != null && config.button.length>0)
	{
		artConfig.btn = [];
		for(var i=0;i<config.button.length;i++)
		{
			artConfig.btn.push(config.button[i].name);
		}
		artConfig.yes = config.button[0].callback;
		if(config.button.length>1)
		{
			for(var i=1;i<config.button.length;i++)
			{
				artConfig["btn"+(i+1)] = config.button[i].callback;
			}			
		}
	}
		
	
	if(config.url != undefined && config.url != null)
	{
		isIframeWindow = true;
		artApiIndex = OcxCore.DialogUtil.openArtDialog1(config.url,artConfig);
		winApi.artApiIndex = artApiIndex;
	}else
	{
		artConfig.content = OcxCore.Utility.IsNull(config.content, "");
		isIframeWindow = false;
		artApiIndex = OcxCore.DialogUtil.contentDialog(artConfig);
		winApi.artApiIndex = artApiIndex;
	}
	winApi.id = artConfig.id;
	
	winApi.OnLoad = new OcxCore.Delegate();

	winApi.OnClosed = new OcxCore.Delegate();

	winApi.OnHidden = new OcxCore.Delegate();
	
	winApi.OnNotify = new OcxCore.Delegate();

	winApi.Notify = function() { }
	winApi.GetHtmlWindow = function() {
		if(isIframeWindow)
		{
			return winApi.iframeWin;
		}
		else
			return OcxCore.main;
	}
	OcxCore.Session.GetGlobal("WindowManagement").Add(winApi);
	winApi.OnClosed.Attach(function(w) { OcxCore.Session.GetGlobal("WindowManagement").Remove(w); });
	return winApi;
}

//----------弹窗口相关扩展--------------
OcxCore.DialogUtil = {};
if(window.layer != undefined) OcxCore.DialogUtil.DialogPlugin = window.layer;

/*弹出对话框begin========================================*/

/*关闭对话框*/
OcxCore.DialogUtil.closeDialog = function() {
    window.setTimeout(function () {
        if(OcxCore.DialogUtil.DialogPlugin != undefined)
        	OcxCore.DialogUtil.DialogPlugin.closeAll('iframe');
    }, 10);
    return true;
}

/*关闭自身对话框*/
OcxCore.DialogUtil.closeSelfDialog = function() {
	window.setTimeout(function () {
		if(OcxCore.DialogUtil.DialogPlugin != undefined)
		{
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		}
	}, 10);
	return true;
}

/*
中间加载对话窗
*/
OcxCore.DialogUtil.Loading = function(bool, text,time) {
    /*var ajaxbg = $("#ocxcore_loading_background,#ocxcore_loading");
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
    }*/
    if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    if(bool)
    {
    	var msgCfg = {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false, time:2000};
    	text = !!text ? text:"正在加载…";
        //定时关闭
        if(time != undefined && time >0)
        {
        	msgCfg.time = time * 1000;
        }
    	OcxCore.DialogUtil.DialogPlugin.msg(text, msgCfg);
    }
    else
    {
    	OcxCore.DialogUtil.DialogPlugin.closeAll('dialog');
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
	var artApiIndex = OcxCore.DialogUtil.DialogPlugin.open({
        id: _id,
        type:2,
        area: [_width+'px', _height+'px'],
        maxmin: false,
        shade: [0.3, '#393D49'],
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        yes: function(index, layero){
        	    //do something
        	callBack(_id,index);
        	//OcxCore.DialogUtil.DialogPlugin.close(index); //如果设定了yes回调，需进行手工关闭
        },
        /*cancel: function(index){ 
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index) === false) {
    			return false;
    		};
        	return true;
        },*/
        end:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,artApiIndex) === false) {
    			return false;
    		};
        	return true;
        }
    });
	
	return artApiIndex;
}
/*
弹出对话框（带：自定义按钮）
*/
OcxCore.DialogUtil.openArtDialog = function(url, _id, _title, _width, _height, _button,closeCallBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	var artConfig = {
	        id: _id,
	        type:2,
	        area: [_width+'px', _height+'px'],
	        maxmin: false,
	        shade: [0.3, '#393D49'],
	        title: _title,
	        resize: true,
	        //zIndex: 1000000,
	        content:url,
	        end:function(){
	        	if (typeof closeCallBack === 'function' && closeCallBack(_id) === false) {
	    			return false;
	    		};
	        	return true;
	        }
	    };
	
	if(_button != undefined && _button != null && _button.length>0)
	{
		artConfig.btn = [];
		for(var i=0;i<_button.length;i++)
		{
			artConfig.btn.push(_button[i].name);
		}
		artConfig.yes = _button[0].callback;
		if(_button.length>1)
		{
			for(var i=1;i<_button.length;i++)
			{
				artConfig["btn"+(i+1)] = _button[i].callback;
			}
		}
	}
	
	var artApiIndex = OcxCore.DialogUtil.DialogPlugin.open(artConfig);
	
    return artApiIndex;
}
/*
弹出对话框（带：自定义按钮）
*/
OcxCore.DialogUtil.openArtDialog1 = function(url,artConfig) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	artConfig.type=2;
	artConfig.content = url;
    var artApi = OcxCore.DialogUtil.DialogPlugin.open(artConfig);
    return artApi;
}
/*
最大化弹出对话框（带：确认按钮、取消按钮）
*/
OcxCore.DialogUtil.FullopenDialog = function(url, _id, _title, callBack,closeCallBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	var artApiIndex = OcxCore.DialogUtil.DialogPlugin.open({
        id: _id,
        type:2,
        area: [($(window).width() - 40)+'px', ($('body').height() - 100)+'px'],
        maxmin: false,
        shade: [0.3, '#393D49'],
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        yes: function(index, layero){
        	    //do something
        	callBack(_id,index);
        	//OcxCore.DialogUtil.DialogPlugin.close(index); //如果设定了yes回调，需进行手工关闭
        },
        /*cancel: function(index){ 
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index) === false) {
    			return false;
    		};
        	return true;
        },*/
        end:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,artApiIndex) === false) {
    			return false;
    		};
        	return true;
        }
    });
	
	return artApiIndex;
}
/*
弹出对话框（没按钮）
*/
OcxCore.DialogUtil.Dialog = function(url, _id, _title, _width, _height,closeCallBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	var winW = $(window).width();
	var winH = $(window).height();
	if (_width == null || _width == '' || _width > winW -10) {
		_width = winW -10;
	};
	if (_height == null || _height == '' || _height > winH - 10) {
		_height = winH - 10;
	};
	var artApiIndex = OcxCore.DialogUtil.DialogPlugin.open({
        id: _id,
        type:2,
        area: [_width+'px', _height+'px'],
        maxmin: false,
        shade: [0.3, '#393D49'],
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        end:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,artApiIndex) === false) {
    			return false;
    		};
        	return true;
        }
    });
	
	return artApiIndex;
}
/*
最大化弹出对话框（没按钮）
*/
OcxCore.DialogUtil.FullDialog = function(url, _id, _title,closeCallBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	var artApiIndex = OcxCore.DialogUtil.DialogPlugin.open({
        id: _id,
        type:2,
        area: [($(window).width() - 40)+'px', ($('body').height() - 100)+'px'],
        maxmin: false,
        shade: [0.3, '#393D49'],
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        end:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,artApiIndex) === false) {
    			return false;
    		};
        	return true;
        }
    });
	
	return artApiIndex;
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
    if (type >= 1) {
    	OcxCore.DialogUtil.DialogPlugin.msg(msg, {icon: 1,time:time*1000});
    } else if (type == -1) {
    	OcxCore.DialogUtil.DialogPlugin.msg(msg, {icon: 2,time:time*1000});
    } else if (type == 0) {
    	OcxCore.DialogUtil.DialogPlugin.msg(msg, {icon: 2,time:time*1000});
    } else {
    	OcxCore.DialogUtil.DialogPlugin.msg(msg, {icon: 7,time:time*1000});
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
    var icon = 7;
    if (type >= 1) {
        icon = 1;
    } else if (type == -1) {
        icon = 2;
    } else {
        icon = 7;
    }
    
    OcxCore.DialogUtil.DialogPlugin.alert(msg, {icon: icon}, function(index){
    	  
    	  layer.close(index);
    });
}
/*
确认对话框
*/
OcxCore.DialogUtil.confirmDialog = function(_title, msg, callBack) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    OcxCore.DialogUtil.DialogPlugin.confirm(msg, {icon: 3, title:_title}, function(index){
    		callBack(true);
    		OcxCore.DialogUtil.DialogPlugin.close(index);
    	},function(index){
    		callBack(false);
    		OcxCore.DialogUtil.DialogPlugin.close(index);
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
	//artConfig.zIndex = 1000000;
	var artApi = OcxCore.DialogUtil.DialogPlugin.msg(artConfig);
    return artApi;
}
/*
 * 右下角滑动通知
 * */
OcxCore.DialogUtil.notice = function (options) {
	if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	var opt ={
			  type: 1
			  ,offset: 'rb'
			  ,title: options.title
			  ,content: options.content
			  ,shade: 0 //不显示遮罩
			};
	if(options.time != undefined && typeof options.time === "number" && options.time>0)
	{
		opt.time = options.time;
	}
	else
	{
		opt.time = 5;
	}
	//边缘弹出
	var artApiIndex = OcxCore.DialogUtil.DialogPlugin.open(opt);
    return artApiIndex;
};
/*弹出对话框end========================================*/

})();