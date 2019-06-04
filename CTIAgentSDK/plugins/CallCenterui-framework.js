﻿﻿/**
 * jQuery CallCenterUI 4.1
 */
if(!CCUI) var CCUI = {};
/**
加载布局
**/
function Loadlayout() {
    if ($('.layout').length > 0) {
        $("#layout").splitter({
            type: "v",
            outline: true,
            minLeft: 150, sizeLeft: 200, maxLeft: 350,
            anchorToWindow: true,
            accessKey: "L"
        });
    }
}

/********
 接收地址栏参数
 **********/
function GetQuery(key) {
    var search = location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == key) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
    /*//或者如下处理方式：
    var url = window.location.href;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {};
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
	}
	var returnValue = paraObj[key.toLowerCase()];
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}*/

}

/*
刷新当前页面
*/
function Replace() {
    location.reload();
    return false;
}
/*
href跳转页面
*/
function Urlhref(url) {
    location.href = url;
    return false;
}
/*
iframe同步连接
*/
function iframe_src(iframe, src) {
    Loading(true);
    $("#" + iframe).attr('src', RootPath() + src);
    $("#" + iframe).load(function () {
        Loading(false);
    });
}

/* 
请求Ajax 带返回值
*/
function getAjax(url, postData, callBack,isAsync) {
	if(isAsync == undefined || isAsync == null || isAsync == "")
	{
		isAsync = false;
	}
    $.ajax({
        type: 'post',
        dataType: "text",
        url: RootPath() + url,
        data: postData,
        //data: JSON.stringify(postData),
        cache: false,
        async: isAsync,
        success: function (data) {
            callBack(data);
            //Loading(false);
        },
        error: function (data) {
            //alert("error:" + JSON.stringify(data));
            Loading(false);
            var msg = "操作出错！<br/>状态码："+data.readyState
            +"<br/>状态："+data.status+"<br/>状态内容："+data.statusText
            +"<br/>反馈信息："+data.responseText;
            CCUI.Log.error(msg);	  
            //alertDialog(msg, -1);
        }
    });
}
function AjaxJson(url, postData, callBack,isAsync) {
	if(isAsync == undefined || isAsync == null || isAsync == "")
	{
		isAsync = false;
	}
    $.ajax({
        url: RootPath() + url,
        type: "post",
        data: postData,
        //data: JSON.stringify(postData),
        dataType: "text",
        //contentType:'application/json;charset=UTF-8',
        async: isAsync,
        success: function (data) {
        	if(data != undefined && data != null && data != "")
    		{
        		data = eval("("+data+")");
        		if (data.Code == "-1") {
                    Loading(false);
                    alertDialog(data.Message, -1);
                } else {
                    Loading(false);
                    callBack(data);
                }
    		}
        },
        error: function (data) {
            Loading(false);
            var msg = "操作出错！<br/>状态码："+data.readyState
            +"<br/>状态："+data.status+"<br/>状态内容："+data.statusText
            +"<br/>反馈信息："+data.responseText;
            CCUI.Log.error(msg);		  
            //alertDialog(msg, -1);
        }
    });
}
/*
grid表格扩展Begin
*/

/**获取表格选择行
**/
function GetJqGridRowIndx(jgrid) {
    return $(jgrid).jqGrid('getGridParam', 'selrow')
}
/**获取JqGrid表格列值
jgrid：ID，code：列字段
**/
function GetJqGridRowValue(jgrid, code) {
    var KeyValue = "";
    var selectedRowIds = $(jgrid).jqGrid("getGridParam", "selarrrow");
    if (selectedRowIds != "") {
        var len = selectedRowIds.length;
        for (var i = 0; i < len ; i++) {
            var rowData = $(jgrid).jqGrid('getRowData', selectedRowIds[i]);
            KeyValue += rowData[code] + ",";
        }
        KeyValue = KeyValue.substr(0, KeyValue.length - 1);
    } else {
        var rowData = $(jgrid).jqGrid('getRowData', $(jgrid).jqGrid('getGridParam', 'selrow'));
        KeyValue = rowData[code];
    }
    return KeyValue;
}
/**获取JqGrid表格列值
jgrid：ID，RowIndx:行ID,code：列字段
**/
function GetJqGridValue(jgrid, RowIndx, code) {
    var rowData = $(jgrid).jqGrid('getRowData', RowIndx);
    return rowData[code];
}

/**grid表格扩展end**/


/**
格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
*/
formatDate = function (v, format) {
	
	if(typeof(format) !=undefined && format !=null){
		format.replace(/H/g,"h");
	}
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
function formatNumber(num,length)
{
	var s=num.toString();
	var zero="";
	for(var i=0;i<length-s.length;i++) zero+="0";
	return zero+s;
}

function formatSeconds(value) { 
	var theTime = parseInt(value);// 秒 
	var theTime1 = 0;// 分 
	var theTime2 = 0;// 小时 
	if(theTime > 60) { 
		theTime1 = parseInt(theTime/60); 
		theTime = parseInt(theTime%60); 
		if(theTime1 > 60) { 
			theTime2 = parseInt(theTime1/60); 
			theTime1 = parseInt(theTime1%60); 
		}
	}
	var result = formatNumber(parseInt(theTime2),2)+":"+formatNumber(parseInt(theTime1),2)+":"+formatNumber(parseInt(theTime),2);
	return result; 
}
/**
当前时间
*/
function CurrentTime() {
    var date = new Date();
    var year = formatNumber(date.getFullYear(),4);
    var month = formatNumber(date.getMonth()+1,2);
    var day = formatNumber(date.getDate(),2);
    var hour = formatNumber(date.getHours(),2);
    var minute = formatNumber(date.getMinutes(),2);
    var second = formatNumber(date.getSeconds(),2);
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ":"+second;
}
/*
自动获取页面控件值
*/
function GetWebControls(element) {
    var reVal = "";
    $(element).find('input,select,textarea').each(function (r) {
        var id = $(this).attr('id');
        if(id==undefined){
        	return ;
        }
        var value = $(this).val();
        var type = $(this).attr('type');
        if(type == "button" || type == "submit" || type == "reset")
        	return;
        switch (type) {
            case "checkbox":
                if ($(this).attr("checked")) {
                    reVal += '"' + id + '"' + ':' + '"1",'
                } else {
                    reVal += '"' + id + '"' + ':' + '"0",'
                }
                break;
            case "radio":
                if ($(this).attr("checked")) {
                    reVal += '"' + id + '"' + ':' + '"1",'
                } else {
                    reVal += '"' + id + '"' + ':' + '"0",'
                }
                break;
            case "textarea":
                if (value =="") {
                    value="";
                }
                var reg = new RegExp("\n","g");
                //value=value.replace(reg,"#br#");
                value=value != null ? value.replace(reg,"\\n"):value;
                reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                break;    
            default:
                if (value == "") {
                    value = "";//&nbsp;
                }
            	if(typeof value=='string' && value.constructor==String)
            	{
            		var reg = new RegExp("\n","g");
    	        	//value=value.replace(reg,"#br#");
    	        	value=value != null ? value.replace(reg,"\\n"):value;
            	}
                reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",';
                break;
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    return jQuery.parseJSON('{' + reVal + '}');
}

/*
自动获取页面控件值
*/
function GetWebCheckboxAndRadioControls(element) {
	var reVal = "";
     $(element).each(function (){ 
     	 var checkArr=new Array();//存放类型为checkBox的数组
		     var radioArr=new Array();//存放类型为radio的数组
		    $(this).find('input,select,textarea').each(function (r) {
		        var id = $(this).attr('id');
		        var _name=$(this).attr('name');
		        var value = $(this).val();
		        var type = $(this).attr('type');
		        if(checkArr.indexOf(_name) >=0){//如果包含了该ID，说明已经赋值了
		        	return true;
		        }
		        if(radioArr.indexOf(_name) >=0){//如果包含了该ID，说明已经赋值了
		        	return true;
		        }
		        switch (type) {
		            case "checkbox":
		            	var checkLable="";
		            	checkArr.push(_name);
		         	    $("input[name='"+_name+"']:checked").each(function(){
		         	    	checkLable+=$.trim($(this).val())+",";
		         	    });
		         	    checkLable = checkLable.length >0 ? checkLable.substr(0, checkLable.length - 1) : checkLable; 
		         	    reVal += '"' + _name + '"' + ':' + '"'+checkLable+'",'
		                break;
		            case "radio":
		            	var checkLable="";
		            	radioArr.push(_name);
		         	    $("input[name='"+_name+"']:checked").each(function(){
		         	    	checkLable+=$.trim($(this).val())+",";
		         	    });
		         	    checkLable = checkLable.length >0 ? checkLable.substr(0, checkLable.length - 1) : checkLable; 
		         	    reVal += '"' + _name + '"' + ':' + '"'+checkLable+'",'
		                break;    
		            default:
		                if (value == "") {
		                    value = "";//&nbsp;
		                }
		                reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
		                break;
		        }
		    });
     });
     reVal = reVal.substr(0, reVal.length - 1);
	 return jQuery.parseJSON('{' + reVal + '}');
}
/*
自动给控件赋值(指定范围)
*/
function SetWebControls(data,element) {
    for (var key in data) {
        var id = element != undefined && element != null ? $(element).find('#' + key) : $('#' + key);
        var value = $.trim(data[key]).replace("&nbsp;", "");
        var type = id.attr('type');
        switch (type) {
            case "checkbox":
                if (value == 1) {
                    id.attr("checked", 'checked');
                } else {
                    id.removeAttr("checked");
                }
                //$('input').customInput();
                break;
            case "radio":
                if (value == 1) {
                    id.attr("checked", 'checked');
                } else {
                    id.removeAttr("checked");
                }
                //$('input').customInput();
            break;   
            case "textarea":
                var reg = new RegExp("#br#","g");
                value=value.replace(reg,"\n");
                id.val(value);
            break;    
            default:
                id.val(value);
                break;
        }
    }
}
/*
自动给控件赋值、对Lable
*/
function SetWebLable(data) {
    for (var key in data) {
        var id = $('#' + key);
        var value = $.trim(data[key]).replace("&nbsp;", "");
        id.text(value);
    }
}
/*
自动给控件赋值、对Lable
*/
function SetWebLableDemo(data) {
    for (var key in data) {
        var id = $('#' + key);
        id.parent().html("&nbsp;"+data[key]);
    }
}
/**
* 获取搜索条件：返回JSON
* var parameter = GetParameterJson("搜索区域table的ID");
*/
function GetParameterJson(tableId) {
    var parameter = "";
    $("#" + tableId + " tr").find('td').find('input,select').each(function () {
        var pk_id = $(this).attr('id');
        var pk_value = $("#" + pk_id).val();
        parameter += '"' + pk_id + '"' + ':' + '"' + $.trim(pk_value) + '",'
    });
    parameter = parameter.substr(0, parameter.length - 1);
    return '{' + parameter + '}';
}
/**
* 获取动态table：键、值，返回JSON
* var GetTableData = GetTableDataJson("table的ID");
*/
function GetTableDataJson(tableId) {
    var item_Key_Value = "";
    var index = 1;
    var trjson = "";
    if ($(tableId + " tbody tr").length > 0) {
        $(tableId + " tbody tr").each(function () {
            var tdjson = "";
            $(this).find('td').find('input,select,textarea').each(function () {
                var pk_id = $(this).attr('id');
                var pk_value = "";
                if ($("#" + pk_id).attr('type') == "checkbox") {
                    if ($("#" + pk_id).attr("checked")) {
                        pk_value = "1";
                    } else {
                        pk_value = "0";
                    }
                } else {
                    pk_value = $("#" + pk_id).val();
                }
                var array = new Array();
                array = pk_id.split("➩"); //字符分割
                tdjson += '"' + array[0] + '"' + ':' + '"' + $.trim(pk_value) + '",'
            })
            tdjson = tdjson.substr(0, tdjson.length - 1);
            trjson += '{' + tdjson + '},';
        });
    } else {
        $(tableId + " tr").each(function () {
            var tdjson = "";
            $(this).find('td').find('input,select,textarea').each(function () {
                var pk_id = $(this).attr('id');
                var pk_value = "";
                if ($("#" + pk_id).attr('type') == "checkbox") {
                    if ($("#" + pk_id).attr("checked")) {
                        pk_value = "1";
                    } else {
                        pk_value = "0";
                    }
                } else {
                    pk_value = $("#" + pk_id).val();
                }
                var array = new Array();
                array = pk_id.split("➩"); //字符分割
                tdjson += '"' + array[0] + '"' + ':' + '"' + $.trim(pk_value) + '",'
            })
            tdjson = tdjson.substr(0, tdjson.length - 1);
            trjson += '{' + tdjson + '},';
        });
    }
    trjson = trjson.substr(0, trjson.length - 1);
    if (trjson == '{}') {
        trjson = "";
    }
    return '[' + trjson + ']';
}
/**
获取选中复选框值
值：1,2,3,4
**/
function CheckboxValue() {
    var reVal = '';
    $('[type = checkbox]').each(function () {
        if ($(this).attr("checked")) {
            reVal += $(this).val() + ",";
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    return reVal;
}
/**
文本框只允许输入数字
**/
function IsNumber(obj) {
    $("#" + obj).bind("contextmenu", function () {
        return false;
    });
    $("#" + obj).css('ime-mode', 'disabled');
    $("#" + obj).keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
}
/**
只能输入数字和小数点
**/
function IsMoney(obj) {
    $("#" + obj).bind("contextmenu", function () {
        return false;
    });
    $("#" + obj).css('ime-mode', 'disabled');
    $("#" + obj).bind("keydown", function (e) {
        var key = window.event ? e.keyCode : e.which;
        if (isFullStop(key)) {
            return $(this).val().indexOf('.') < 0;
        }
        return (isSpecialKey(key)) || ((isNumber(key) && !e.shiftKey));
    });
    function isNumber(key) {
        return key >= 48 && key <= 57
    }
    function isSpecialKey(key) {
        return key == 8 || key == 46 || (key >= 37 && key <= 40) || key == 35 || key == 36 || key == 9 || key == 13
    }
    function isFullStop(key) {
        return key == 190 || key == 110;
    }
}
/**
* 金额格式(保留2位小数)后格式化成金额形式
*/
function FormatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '' +
                num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
//保留两位小数    
//功能：将浮点数四舍五入，取小数点后2位   
function ToDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return 0;
    }
    f = Math.round(x * 100) / 100;
    return f;
}
/**
查找数组中是否存在某个值
arr:数组
val:对象值
**/
function ArrayExists(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val)
            return true;
    }
    return false;
}


/*
验证是否为空
*/
function IsNullOrEmpty(str) {
    var isOK = true;
    if (str == undefined || str == null || str == "" || str == 'null') {
        isOK = false;
    }
    return isOK;
}
function IsDelData(id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        OcxCore.DialogUtil.tipDialog('您没有选中任何项,请您选中后再操作。', 4, 'warning');
    }
    return isOK;
}
function IsChecked(id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        OcxCore.DialogUtil.tipDialog('您没有选中任何项,请您选中后再操作。', 4, 'warning');
    } else if (id.split(",").length > 1) {
        isOK = false;
        OcxCore.DialogUtil.tipDialog('很抱歉,一次只能选择一条记录。', 4, 'warning');
    }
    return isOK;
}

/**
树下拉框
Objkey:          ID
width：          宽度
height：         高度
data：           数据
**/
function comboBoxTree(Objkey, height) {
    $(".ui_state_highlight").focus();
    var width = $("#" + Objkey).width();
    $("#" + Objkey).css('ime-mode', 'disabled');
    $("#" + Objkey).bind("contextmenu", function () { return false; });
    $("#" + Objkey).keypress(function (e) { return false; });
    if ($('#' + Objkey).attr('readonly') == 'readonly') { return false; }
    if ($('#' + Objkey).attr('disabled') == 'disabled') { return false; }
    var X = $("#" + Objkey).offset().top - 1;
    var Y = $("#" + Objkey).offset().left - 1;
    var comboBoxTree = "comboBoxTree" + Objkey;
    if ($("#" + comboBoxTree).attr("id") == undefined) {
        $('body').append('<div id="' + comboBoxTree + '" style="overflow: auto;border: 1px solid #ccc;border-top:none;width:' + width + 'px;height:' + height + ';position: absolute; background-color: #fff; display: none;"></div>');
    }
    $("#" + comboBoxTree).css("left", Y).css("top", X + $("#" + Objkey).height() + 2).css("z-index", "99").slideDown(100);
    //任意键关闭
    document.onclick = function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != '' + comboBoxTree + '') {
            if ($(tar).hasClass("bbit-tree-ec-icon")) {
                return false;
            }
            if ($(tar).attr("id") == Objkey) {
                return false;
            } else {
                $("#" + comboBoxTree).slideUp(100);
            }
        }
    }
}
/*删除数据
/*url:        表示请求路径
/*parm：      条件参数
--------------------------------------------------*/
function delConfirm(url, parm, msg) {
    confirmDialog("系统提示", msg, function (r) {
        if (r) {
            Loading(true, "正在删除数据...");
            window.setTimeout(function () {
                AjaxJson(url, parm, function (data) {
                    tipDialog(data.Message, 3, data.Code);
                    if (data.Code > 0) {
                        windowload();
                    }
                });
            }, 200);
        }
    });
}
function delConfig(url, parm, count) {
    if (count == undefined) {
        count = 1;
    }
    confirmDialog("系统提示", "注：您确定要删除 " + count + " 笔记录？", function (r) {
        if (r) {
            Loading(true, "正在删除数据...");
            window.setTimeout(function () {
                AjaxJson(url, parm, function (data) {
                    tipDialog(data.Message, 3, data.Code);
                    if (data.Code > 0) {
                        windowload();
                    }
                });
            }, 200);
        }
    });
}
/*绑定下拉框
ControlId:控件ID
Memo:默认显示
*/
function JsonBindDrop(ControlId, Memo, DataJson) {
    $(ControlId).html("");
    if (IsNullOrEmpty(Memo)) {
        $(ControlId).append("<option value=''>" + Memo + "</option>");
    }
    var DataJson = eval("(" + DataJson + ")");
    $.each(DataJson, function (i) {
        $(ControlId).append($("<option></option>").val(DataJson[i].Code).html(DataJson[i].FullName));
    });
}

//Tab标签切换
function Tabchange(id) {
    $('.ScrollBar').find('.tabPanel').hide();
    $('.ScrollBar').find("#" + id).show();
    $(".tab_list_top div").removeClass("actived");
    $(".tab_list_top").find("#Tab" + id).addClass("actived"); //添加选中样式  
}
//Tab标签切换(在有多个选项卡组的情况下使用)
function Tabchange2(id,mainId) {
    $('#'+mainId+' .ScrollBar').find('.tabPanel').hide();
    $('#'+mainId+' .ScrollBar').find("#" + id).show();
    $('#'+mainId+' .tab_list_top div').removeClass("actived");
    $('#'+mainId+' .tab_list_top').find("#Tab" + id).addClass("actived"); //添加选中样式  
}
/*关闭对话框*/
function closeDialog() {
    window.setTimeout(function () {
        //var api = frameElement.api, W = api.opener;
    	art.dialog.close();
        //api.close();
    }, 10);
    return true;
}

/**
 * The CCUI.Log logger.
 * CCUI.Log.debug("日志内容");
 * CCUI.Log.debug("日志内容{0}内容{1}内容",arg0,arg1);
 */
//CCUI constants.
var CCUI_LOGLEVEL_TRACE = 5;
var CCUI_LOGLEVEL_DEBUG = 4;
var CCUI_LOGLEVEL_INFO = 3;
var CCUI_LOGLEVEL_WARN = 2;
var CCUI_LOGLEVEL_ERROR = 1;
var CCUI_LOGLEVEL_FATAL = 0;
var CCUI_LOGLEVEL = 5;
CCUI.Log = {

	__appenders: [
		{ append: function(message) {
			try{console.log(message);}catch(e){}
		}}
	],

	trace: function() {	if(CCUI_LOGLEVEL >= CCUI_LOGLEVEL_TRACE)
		CCUI.Log.__log('TRACE', arguments); },
	debug: function() { if(CCUI_LOGLEVEL >= CCUI_LOGLEVEL_DEBUG)
		CCUI.Log.__log('DEBUG', arguments); },
	info: function() { if(CCUI_LOGLEVEL >= CCUI_LOGLEVEL_INFO)
		CCUI.Log.__log('INFO', arguments); },
	warn: function() { if(CCUI_LOGLEVEL >= CCUI_LOGLEVEL_WARN)
		CCUI.Log.__log('WARN', arguments); },
	error: function() { if(CCUI_LOGLEVEL >= CCUI_LOGLEVEL_ERROR)
		CCUI.Log.__log('ERROR', arguments); },
	fatal: function() { if(CCUI_LOGLEVEL >= CCUI_LOGLEVEL_FATAL)
		CCUI.Log.__log('FATAL', arguments); },
	
	__log: function(prefix, messageParts) {
		
		messageParts[0] = CurrentTime() + " "
			+ prefix + " " + messageParts[0];
		var message = messageParts[0];
		if(messageParts.length >1)
		{
			var pattern = /{{|{[1-9][0-9]*}|\x7B0\x7D/g;
			return message.replace(
				pattern,
				function(p)
				{
					if (p == "{{") return "{";
					return messageParts[parseInt(p.substr(1, p.length - 2), 10) + 1]
				}
			);
		}
		
		for(var j=0;j<CCUI.Log.__appenders.length;j++){
			CCUI.Log.__appenders[j].append(message);
		}
		//CCUI.Log.__appenders.each(function(appender) {
		//	appender.append(message);
		//});
	},
	
	addAppender: function(appender) {
		CCUI.Log.__appenders.push(appender);
	}
}