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

//----------弹窗口相关扩展--------------
if(CCUI.DialogUtil == undefined) CCUI.DialogUtil = {};
if(CCUI.DialogUtil.dialogExtType == undefined) CCUI.DialogUtil.dialogExtType = "layer";
CCUI.DialogUtil.layerDialog = {};
CCUI.DialogUtil.layerDialog.Config = {
	DialogZIndex:10000000
};
//获取Hplus路径
if(CCUI.DialogUtil.layerDialog.ResPath == undefined || CCUI.ResPath == null)
{
	var _thisScript = null;
	//获取Hplus路径
	CCUI.DialogUtil.layerDialog.ResPath = window['_CCUI_DialogUtil_path'] || (function(script, i, me)
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
if(window.layer != undefined) CCUI.DialogUtil.layerDialog.DialogPlugin = window.layer;

/*弹出对话框begin========================================*/

/*关闭对话框*/
CCUI.DialogUtil.layerDialog.closeDialog = function(index) {
    window.setTimeout(function () {
        if(CCUI.DialogUtil.layerDialog.DialogPlugin != undefined)
        {
        	if(index != undefined)
        	{
        		CCUI.DialogUtil.layerDialog.DialogPlugin.close(index);
        	}
        	else
        	{
        		CCUI.DialogUtil.layerDialog.DialogPlugin.closeAll('iframe');
        	}
        }
    }, 10);
    return true;
}
/*关闭自身对话框*/
CCUI.DialogUtil.layerDialog.closeSelfDialog = function() {
    window.setTimeout(function () {
        if(CCUI.DialogUtil.layerDialog.DialogPlugin != undefined)
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
CCUI.DialogUtil.layerDialog.Loading = function(bool, text,time) {
    if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
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
        CCUI.DialogUtil.layerDialog.DialogPlugin.msg(text, msgCfg);
    }
    else
    {
    	CCUI.DialogUtil.layerDialog.DialogPlugin.closeAll('dialog');
    }
}
/*
弹出对话框（带：确认按钮、取消按钮）
*/
CCUI.DialogUtil.layerDialog.openDialog = function(url, _id, _title, _width, _height, callBack,_okVal,closeCallBack,locked) {
    //Loading(true);
	if(_okVal == undefined || _okVal == null || _okVal == '')
	{
		_okVal = "确定";
	}
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	var winW = $(window).width();
	var winH = $(window).height();
	if (_width == null || _width == '' || _width > winW -10) {
		_width = winW -10;
	};
	if (_height == null || _height == '' || _height > winH - 10) {
		_height = winH - 10;
	};
	var shade = [0.3, '#393D49'];
	if(locked != undefined && locked == false)
	{
		shade = 0;
	}
	var artApiIndex = CCUI.DialogUtil.layerDialog.DialogPlugin.open({
        id: _id,
        type:2,
        area: [_width+'px', _height+'px'],
        fix: false, //不固定
        maxmin: true,
        shade: shade,
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        btn: [_okVal, '取消'],
        yes: function(index, layero){
        	    //do something
        	callBack(_id,index, layero);
        	//CCUI.DialogUtil.layerDialog.DialogPlugin.close(index); //如果设定了yes回调，需进行手工关闭
        },
        /*cancel: function(index){ 
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index) === false) {
    			return false;
    		};
        	return true;
        },*/
        end:function(index, layero){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index, layero) === false) {
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
CCUI.DialogUtil.layerDialog.openArtDialog = function(url, _id, _title, _width, _height, _button,closeCallBack,locked) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	var winW = $(window).width();
	var winH = $(window).height();
	if (_width == null || _width == '' || _width > winW -10) {
		_width = winW -10;
	};
	if (_height == null || _height == '' || _height > winH - 10) {
		_height = winH - 10;
	};
	var shade = [0.3, '#393D49'];
	if(locked != undefined && locked == false)
	{
		shade = 0;
	}
	var artConfig = {
	        id: _id,
	        type:2,
	        area: [_width+'px', _height+'px'],
	        fix: false, //不固定
	        maxmin: true,
	        shade: shade,
	        title: _title,
	        resize: true,
	        //zIndex: 1000000,
	        content:url,
	        end:function(index, layero){
	        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index, layero) === false) {
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
	
	var artApiIndex = CCUI.DialogUtil.layerDialog.DialogPlugin.open(artConfig);
	
    return artApiIndex;
}
/*
弹出对话框（带：自定义按钮）
*/
CCUI.DialogUtil.layerDialog.openArtDialog1 = function(url,artConfig) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	artConfig.type=2;
	artConfig.content = url;
    var artApi = CCUI.DialogUtil.layerDialog.DialogPlugin.open(artConfig);
    return artApi;
}

/*
弹出可放大缩小的对话框（带：确认按钮、取消按钮）
*/
CCUI.DialogUtil.layerDialog.openWindowDialog = function(url, _id, _title, _width, _height, callBack,_okVal,closeCallBack,locked) {
    //Loading(true);
	if (_title == null || _title == '') {
		_title=false;
	}
	var winW = $(window).width();
	var winH = $(window).height();
	if (_width == null || _width == '' || _width > winW -10) {
		_width = winW -10;
	};
	if (_height == null || _height == '' || _height > winH - 10) {
		_height = winH - 10;
	};
	if(_okVal == undefined || _okVal == null || _okVal == '')
	{
		_okVal = "确定";
	}
	var shade = [0.3, '#393D49'];
	if(locked != undefined && locked == false)
	{
		shade = 0;
	}
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	var artApiIndex = CCUI.DialogUtil.layerDialog.DialogPlugin.open({
        id: _id,
        type:2,
        area: [_width+'px', _height+'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: true,
        shade: shade,
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        btn: [_okVal, '取消'],
        yes: function(index, layero){
        	    //do something
        	callBack(_id,index, layero);
        	//CCUI.DialogUtil.layerDialog.DialogPlugin.close(index); //如果设定了yes回调，需进行手工关闭
        },
        /*cancel: function(index){ 
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index) === false) {
    			return false;
    		};
        	return true;
        },*/
        end:function(index, layero){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index, layero) === false) {
    			return false;
    		};
        	return true;
        }
    });
	
	return artApiIndex;
}
/*
最大化弹出对话框（带：确认按钮、取消按钮）
*/
CCUI.DialogUtil.layerDialog.FullopenDialog = function(url, _id, _title, callBack,closeCallBack,_maxSize,locked) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	if(_maxSize == undefined || _maxSize == null || _maxSize == '')
	{
		_maxSize = false;
	}
	var shade = [0.3, '#393D49'];
	if(locked != undefined && locked == false)
	{
		shade = 0;
	}
	var artApiIndex = CCUI.DialogUtil.layerDialog.DialogPlugin.open({
        id: _id,
        type:2,
        area: [($(window).width() - 40)+'px', ($('body').height() - 100)+'px'],
        fix: false, //不固定
        maxmin: true,
        shade: shade,
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        btn: ["确定", '取消'],
        yes: function(index, layero){
        	    //do something
        	callBack(_id,index, layero);
        	//CCUI.DialogUtil.layerDialog.DialogPlugin.close(index); //如果设定了yes回调，需进行手工关闭
        },
        /*cancel: function(index){ 
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index) === false) {
    			return false;
    		};
        	return true;
        },*/
        end:function(index, layero){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index, layero) === false) {
    			return false;
    		};
        	return true;
        }
    });
	if(_maxSize) {
		CCUI.DialogUtil.layerDialog.DialogPlugin.full(artApiIndex);
	}
	return artApiIndex;
}
/*
弹出对话框（没按钮）
*/
CCUI.DialogUtil.layerDialog.Dialog = function(url, _id, _title, _width, _height,closeCallBack,locked) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	var winW = $(window).width();
	var winH = $(window).height();
	if (_width == null || _width == '' || _width > winW -10) {
		_width = winW -10;
	};
	if (_height == null || _height == '' || _height > winH - 10) {
		_height = winH - 10;
	};
	var shade = [0.3, '#393D49'];
	if(locked != undefined && locked == false)
	{
		shade = 0;
	}
	var artApiIndex = CCUI.DialogUtil.layerDialog.DialogPlugin.open({
        id: _id,
        type:2,
        area: [_width+'px', _height+'px'],
        fix: false, //不固定
        maxmin: true,
        shade: shade,
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        end:function(index, layero){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index, layero) === false) {
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
CCUI.DialogUtil.layerDialog.FullDialog = function(url, _id, _title,closeCallBack,_maxSize,locked) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	if(_maxSize == undefined || _maxSize == null || _maxSize == '')
	{
		_maxSize = false;
	}
	var shade = [0.3, '#393D49'];
	if(locked != undefined && locked == false)
	{
		shade = 0;
	}
	var artApiIndex = CCUI.DialogUtil.layerDialog.DialogPlugin.open({
        id: _id,
        type:2,
        area: [($(window).width() - 40)+'px', ($('body').height() - 100)+'px'],
        fix: false, //不固定
        maxmin: true,
        shade: shade,
        title: _title,
        resize: true,
        //zIndex: 1000000,
        content:url,
        end:function(index, layero){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id,index, layero) === false) {
    			return false;
    		};
        	return true;
        }
    });
	if(_maxSize) {
		CCUI.DialogUtil.layerDialog.DialogPlugin.full(artApiIndex);
	}
	return artApiIndex;
}

/*打开网页 window.open
/*url:          表示请求路径
/*windowname:   定义页名称
/*width:        宽度
/*height:       高度
---------------------------------------------------*/
CCUI.DialogUtil.layerDialog.OpenWindow = function(url, title, w, h) {
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
CCUI.DialogUtil.layerDialog.tipDialog = function(msg, time, type) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	//padding:20px 25px;
	time = time != undefined ? time : 1;
	//type = type != undefined ? type : 2;
    if (type >= 1) {
    	CCUI.DialogUtil.layerDialog.DialogPlugin.msg(msg, {icon: 1,time:time*1000});
    } else if (type == -1) {
    	CCUI.DialogUtil.layerDialog.DialogPlugin.msg(msg, {icon: 2,time:time*1000});
    } else if (type == 0) {
    	CCUI.DialogUtil.layerDialog.DialogPlugin.msg(msg, {icon: 2,time:time*1000});
    } else {
    	CCUI.DialogUtil.layerDialog.DialogPlugin.msg(msg, {icon: 7,time:time*1000});
    }
}
/*
警告消息
msg: 显示消息
type：类型 >1：成功，<1：失败，其他：警告
*/
CCUI.DialogUtil.layerDialog.alertDialog = function(msg, type) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
    var icon = 7;
    if (type >= 1) {
        icon = 1;
    } else if (type == -1) {
        icon = 2;
    } else {
        icon = 7;
    }
    
    CCUI.DialogUtil.layerDialog.DialogPlugin.alert(msg, {icon: icon}, function(index){
    	  
    	  layer.close(index);
    });
}
/*
确认对话框
*/
CCUI.DialogUtil.layerDialog.confirmDialog = function(_title, msg, callBack) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
    CCUI.DialogUtil.layerDialog.DialogPlugin.confirm(msg, {icon: 3, title:_title}, function(index){
    		callBack(true);
    		CCUI.DialogUtil.layerDialog.DialogPlugin.close(index);
    	},function(index){
    		callBack(false);
    		CCUI.DialogUtil.layerDialog.DialogPlugin.close(index);
      	});
}

/*
内容信息框
msg: 显示消息
type：类型 >1：成功，<1：失败，其他：警告
*/
CCUI.DialogUtil.layerDialog.contentDialog = function(artConfig) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
		return null;
	//artConfig.zIndex = 1000000;
	var artApi = CCUI.DialogUtil.layerDialog.DialogPlugin.msg(artConfig);
    return artApi;
}
/*
 * 右下角滑动通知
 * */
CCUI.DialogUtil.layerDialog.notice = function (options) {
	if(CCUI.DialogUtil.layerDialog.DialogPlugin == undefined)
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
	var artApiIndex = CCUI.DialogUtil.layerDialog.DialogPlugin.open(opt);
    return artApiIndex;
};
/*弹出对话框end========================================*/