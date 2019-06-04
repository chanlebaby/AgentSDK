﻿﻿/**
 * jQuery CallCenterUI 4.1
 */
if(window.CCUI == undefined) window.CCUI = {};
if(CCUI.main == undefined) CCUI.main = window;

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
获取动态tab标签当前iframeID
*/
function topTabiframeId() {
	return getActiveTabIframeId();
}
/*
获取动态tab标签当前iframeID
*/
function tabiframeId() {
	
    return top.topTabiframeId();
}

//关闭当前tab
function btn_back() {
    top.ThisCloseTab();
}
//关闭当前tab
function btn_backRefresh(tabid) {
    top.ThisCloseTabRefresh(tabid);
}

//兼容旧版本的打开tab页面
function AddTabMenu(tabid, url, name, img, Isclose, IsReplace, IsVisitorModule,IsShowLoading){
	
	top.createMenuTab(tabid,url,name,IsReplace);
}

/* 
请求Ajax 带返回值（url不会自动加项目名称）
*/
function getAjax(url, postData, callBack,isAsync) {
	if(isAsync == undefined || isAsync == null || isAsync == "")
	{
		isAsync = false;
	}
    $.ajax({
        type: 'post',
        dataType: "text",
        url: url,
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
        	CCUI.DialogUtil.Loading(false);
            var msg = "URL:"+url+" 操作出错！<br/>状态码："+data.readyState
            +"<br/>状态："+data.status+"<br/>状态内容："+data.statusText
            +"<br/>反馈信息："+data.responseText;
            CCUI.Log.error(msg);	  
            //alertDialog(msg, -1);
        }
    });
}
//请求Ajax 带JSON返回值（url不会自动加项目名称）
function AjaxJson(url, postData, callBack,isAsync) {
	if(isAsync == undefined || isAsync == null || isAsync == "")
	{
		isAsync = false;
	}
    $.ajax({
        url: url,
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
        			CCUI.DialogUtil.Loading(false);
        			CCUI.DialogUtil.alertDialog(data.Message, -1);
                } else {
                	CCUI.DialogUtil.Loading(false);
                    callBack(data);
                }
    		}
        },
        error: function (data) {
        	CCUI.DialogUtil.Loading(false);
            var msg = "URL:"+url+" 操作出错！<br/>状态码："+data.readyState
            +"<br/>状态："+data.status+"<br/>状态内容："+data.statusText
            +"<br/>反馈信息："+data.responseText;
            CCUI.Log.error(msg);		  
            //alertDialog(msg, -1);
        }
    });
}
/* 
请求Ajax 带返回值（url不会自动加项目名称）
*/
function getAjax2(url, postData, callBack,isAsync) {
	getAjax(url, postData, callBack,isAsync);
}
//请求Ajax 带JSON返回值（url不会自动加项目名称）
function AjaxJson2(url, postData, callBack,isAsync) {
	AjaxJson(url, postData, callBack,isAsync);
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
	CCUI.DialogUtil.Loading(true);
    $("#" + iframe).attr('src', src);
    $("#" + iframe).load(function () {
    	CCUI.DialogUtil.Loading(false);
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
        KeyValue = rowData != undefined ? rowData[code] : "";
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

/**
*获取当前日期前N天或后N日期(N = day)
*type:1：前；2：后
*/
function GetDate(day, type) {
    var zdate = new Date();
    var edate;
    if (type === 1) {
        edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
    } else {
        edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
    }
    return edate;
}
 
/**
*获取传入的日期前N天或后N日期(N = day)
*type:1：前；2：后
*date：传入的日期
*/
function GetDate2(day, type, date) {
    var zdate;
    if (date === null || date === undefined) {
        zdate = new Date();
    } else {
        zdate = date;
    }
    var edate;
    if (type === 1) {
        edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
    } else {
        edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
    }
    return edate;
}

/**
*获取今日的起始和结束时间
*返回值："起始时间,结束时间"
*/
function TodayStr() {
    var date = new Date();      //当前时间
    var returnStr = formatDate(date,"yyyy-MM-dd 00:00:00")+","+formatDate(date,"yyyy-MM-dd 23:59:59");
    return returnStr;
}
/**
*获取昨日的起始和结束时间
*返回值："起始时间,结束时间"
*/
function YesterdayStr() {
    var date = GetDate(1, 1);       //当前时间前一天
    var returnStr = formatDate(date,"yyyy-MM-dd 00:00:00")+","+formatDate(date,"yyyy-MM-dd 23:59:59");
    return returnStr;
}

/**
*获取本周的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ThisWeekStr() {
    var date = new Date();      //当前时间
    var week = date.getDay();   //获取今天星期几
    var monday = GetDate2(week - 1, 1, date);      //获取星期一
    var sunday = GetDate2(7 - week, 2, date);   //获取星期天
    
    var returnStr = formatDate(monday,"yyyy-MM-dd 00:00:00")+","+formatDate(sunday,"yyyy-MM-dd 23:59:59");
    return returnStr;
}

/**
*获取上周的起始和结束时间
*返回值："起始时间,结束时间"
*/
function LastWeekStr() {
    var date = new Date();      //当前时间
    var week = date.getDay();   //获取今天星期几
    var monday = GetDate2(week + 6, 1, date);      //获取上周星期一
    var sunday = GetDate2(week, 1, date);          //获取上周星期天
 
    var returnStr = formatDate(monday,"yyyy-MM-dd 00:00:00")+","+formatDate(sunday,"yyyy-MM-dd 23:59:59");
    return returnStr;
}
 
/**
*获取本月的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ThisMonthStr() {
    var date = new Date();      //当前时间
    var year = date.getFullYear();
    var month = date.getMonth();
 
    var min = new Date(year, month, 1);                 //本月月初
    var max = new Date(year, month + 1, 0);             //本月月底
 
    var returnStr = formatDate(min,"yyyy-MM-dd 00:00:00")+","+formatDate(max,"yyyy-MM-dd 23:59:59");
    return returnStr;
}

/**
*获取上月的起始和结束时间
*返回值："起始时间,结束时间"
*/
function LastMonthStr() {
    var returnStr = "";
    var date = new Date();      //当前时间
    var year = date.getFullYear();
    var month = date.getMonth();
 
    var min = new Date(year, month-1, 1);                 //上月月初
    var max = new Date(year, month, 0);             //本月月底
 
    var returnStr = formatDate(min,"yyyy-MM-dd 00:00:00")+","+formatDate(max,"yyyy-MM-dd 23:59:59");
    return returnStr;
}

/**
 * 获得本季度的开始月份
 * */
function getQuarterStartMonth() {
	var nowMonth = new Date().getMonth(); //当前月
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
        quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
}
/**
 * 获得某月的天数
 * */
function getMonthDays(myMonth) {
	var date = new Date();      //当前时间
    var year = date.getFullYear();
    var monthStartDate = new Date(year, myMonth, 1);
    var monthEndDate = new Date(year, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}

/**
*获取本季度的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ThisQuarterStr() {
    var date = new Date();      //当前时间
    var year = date.getFullYear();
    var month = date.getMonth();
    
    var quarterStartDate = new Date(year, getQuarterStartMonth(), 1);
    var quarterEndMonth = getQuarterStartMonth() + 2;
    var quarterEndDate = new Date(year, quarterEndMonth,
            getMonthDays(quarterEndMonth));
 
    var returnStr = formatDate(quarterStartDate,"yyyy-MM-dd 00:00:00")+","+formatDate(quarterEndDate,"yyyy-MM-dd 23:59:59");
    return returnStr;
}


function GetWebClassControls(element) {
	var reVal = {};
    $(element).each(function (r) {
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
            	if ($(this).prop("checked")) {
                    reVal[id] = "1";
                } else {
                	reVal[id] = "0";
                }
                break;
            case "radio":
            	if ($(this).prop("checked")) {
                    reVal[id] = "1";
                } else {
                	reVal[id] = "0";
                }
                break;
            case "textarea":
                if (value =="") {
                    value="";
                }
                //var reg = new RegExp("\n","g");
                //value=value.replace(reg,"#br#");
                //value=value != null ? value.replace(reg,"\\n"):value;
                reVal[id] = $.trim(value);
                break;    
            default:
                if (value == "") {
                    value = "";//&nbsp;
                }
	            if(typeof value=='string' && value.constructor==String)
	        	{
	        		//var reg = new RegExp("\n","g");
		        	//value=value.replace(reg,"#br#");
		        	//value=value != null ? value.replace(reg,"\\n"):value;
	        	}
	            reVal[id] = $.trim(value);
                break;
        }
    });
    return reVal;
}

/*
自动获取页面控件值
*/
function GetWebControls(element) {
	var reVal = {};
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
            	if ($(this).prop("checked")) {
                    reVal[id] = "1";
                } else {
                	reVal[id] = "0";
                }
                break;
            case "radio":
            	if ($(this).prop("checked")) {
                    reVal[id] = "1";
                } else {
                	reVal[id] = "0";
                }
                break;
            case "textarea":
                if (value =="") {
                    value="";
                }
                //var reg = new RegExp("\n","g");
                //value=value.replace(reg,"#br#");
                //value=value != null ? value.replace(reg,"\\n"):value;
                reVal[id] = $.trim(value);
                break;    
            default:
                if (value == "") {
                    value = "";//&nbsp;
                }
            	if(typeof value=='string' && value.constructor==String)
            	{
            		//var reg = new RegExp("\n","g");
    	        	//value=value.replace(reg,"#br#");
    	        	//value=value != null ? value.replace(reg,"\\n"):value;
            	}
            	reVal[id] = $.trim(value);
                break;
        }
    });
    return reVal;
}

function checkIndexOfArray(){
	if (!Array.prototype.indexOf)
	{
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
	    var len = this.length >>> 0;
	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
	    if (from < 0)
	      from += len;
	    for (; from < len; from++)
	    {
	      if (from in this &&
	          this[from] === elt)
	        return from;
	    }
	    return -1;
	  };
	}
}


/*
 * 
自动获取页面控件值
*/
function GetWebCheckboxAndRadioControls(element) {
	var reVal = {};
     $(element).each(function (){ 
     	 var checkArr=new Array();//存放类型为checkBox的数组
		     var radioArr=new Array();//存放类型为radio的数组
		    $(this).find('input,select,textarea').each(function (r) {
		        var id = $(this).attr('id');
		        var _name=$(this).attr('name');
		        var value = $(this).val();
		        var type = $(this).attr('type');
		        if(checkIndexOfArray() >0 && checkArr.indexOf(_name) >=0){//如果包含了该ID，说明已经赋值了
		        	return true;
		        }
		        if(checkIndexOfArray() >0 && radioArr.indexOf(_name) >=0){//如果包含了该ID，说明已经赋值了
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
		         	    reVal[_name] = checkLable;
		                break;
		            case "radio":
		            	var checkLable="";
		            	radioArr.push(_name);
		         	    $("input[name='"+_name+"']:checked").each(function(){
		         	    	checkLable+=$.trim($(this).val())+",";
		         	    });
		         	    checkLable = checkLable.length >0 ? checkLable.substr(0, checkLable.length - 1) : checkLable; 
		         	    reVal[_name] = checkLable;
		                break;    
		            default:
		                if (value == "") {
		                    value = "";//&nbsp;
		                }
		            	reVal[id] = $.trim(value);
		                break;
		        }
		    });
     });
     return reVal;
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
                    id.prop("checked", 'checked');
                } else {
                    id.removeProp("checked");
                }
                //$('input').customInput();
                break;
            case "radio":
                if (value == 1) {
                    id.prop("checked", 'checked');
                } else {
                    id.removeProp("checked");
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
        if ($("#" + pk_id).attr('type') == "checkbox") {
        	if ($("#" + pk_id).prop("checked")) {
                pk_value = "1";
            } else {
                pk_value = "0";
            }
        }
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
                    if ($("#" + pk_id).prop("checked")) {
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
                    if ($("#" + pk_id).prop("checked")) {
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
        if ($(this).prop("checked")) {
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
        CCUI.DialogUtil.tipDialog('您没有选中任何项,请您选中后再操作。', 4, 'warning');
    }
    return isOK;
}
function IsChecked(id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        CCUI.DialogUtil.tipDialog('您没有选中任何项,请您选中后再操作。', 4, 'warning');
    } else if (id.split(",").length > 1) {
        isOK = false;
        CCUI.DialogUtil.tipDialog('很抱歉,一次只能选择一条记录。', 4, 'warning');
    }
    return isOK;
}

/*删除数据
/*url:        表示请求路径
/*parm：      条件参数
--------------------------------------------------*/
function delConfirm(url, parm, msg) {
	CCUI.DialogUtil.confirmDialog("系统提示", msg, function (r) {
        if (r) {
        	CCUI.DialogUtil.Loading(true, "正在删除数据...");
            window.setTimeout(function () {
                AjaxJson(url, parm, function (data) {
                	CCUI.DialogUtil.tipDialog(data.Message, 3, data.Code);
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
    CCUI.DialogUtil.confirmDialog("系统提示", "注：您确定要删除 " + count + " 笔记录？", function (r) {
        if (r) {
        	CCUI.DialogUtil.Loading(true, "正在删除数据...");
            window.setTimeout(function () {
                AjaxJson(url, parm, function (data) {
                	CCUI.DialogUtil.tipDialog(data.Message, 3, data.Code);
                    if (data.Code > 0) {
                        windowload();
                    }
                });
            }, 200);
        }
    });
}

/*绑定数据字典下拉框
ControlId:控件ID
Code:分类编码
Memo:默认显示
*/
function BindDropItem(ControlId, Code, Memo,isCompanyId) {
    $(ControlId).html("");
    if (IsNullOrEmpty(Memo)) {
        $(ControlId).append("<option value=''>" + Memo + "</option>");
    }
    getAjax(RootPath()+'/CommonModule/DataDictionary/BinDingItemsJson.do', { Code: Code ,isCompanyId:isCompanyId}, function (data) {
        var itemjson = eval("(" + data + ")");
        $.each(itemjson, function (i) {
            $(ControlId).append($("<option></option>").val(itemjson[i].Code).html(itemjson[i].FullName));
        });
        CCUI.DialogUtil.Loading(false);
    });
}

/*绑定自定义下拉框
ControlId:控件ID
ModuleId:模块ID
Code:分类编码
Memo:默认显示
*/
function BindForItem(ControlId, ModuleId, Code, Memo) {
    $(ControlId).html("");
    if (IsNullOrEmpty(Memo)) {
        $(ControlId).append("<option value=''>" + Memo + "</option>");
    }
    AjaxJson(RootPath()+'/CommonModule/DataDictionary/BindForItem.do', { ModuleId:ModuleId,Code: Code}, function (data) {
        $.each(data, function (i) {
            $(ControlId).append($("<option></option>").val(data[i].key).html(data[i].value));
        });
    });
}

/*获取当前菜单下所有子菜单
ControlId:控件ID
Code:分类编码
Memo:默认显示
*/
function getChildItem(controlId, code, memo,parentId) {
    $(controlId).html("");
    if (IsNullOrEmpty(memo)) {
        $(controlId).append("<option value=''>" + memo + "</option>");
    }
    getAjax(RootPath()+'/CommonModule/DataDictionary/getChildItem.do', { code: code,parentId:parentId}, function (data) {
        var itemjson = eval("(" + data + ")");
        $.each(itemjson, function (i) {
            $(controlId).append($("<option></option>").val(itemjson[i].DataDictionaryDetailId).html(itemjson[i].FullName));
        });
        CCUI.DialogUtil.Loading(false);
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

//关闭当前tab
function ThisCloseTab() {
	var tabs_container = top.$(".page-tabs-content");
    var ContentPannel = top.$(".J_mainContent");
    
    top.RemoveTab(tabs_container.find('.active'));
}
//关闭当前tab并刷新
function ThisCloseTabRefresh(tabid) {
	var tabs_container = top.$(".page-tabs-content");
    var ContentPannel = top.$(".J_mainContent");
    
    top.RemoveTab(tabs_container.find('.active'));
    document.getElementById(tabid).contentWindow.windowload();
}
//全部关闭tab
function AllcloseTab() {
	var tabs_container = top.$(".page-tabs-content");
    var ContentPannel = top.$(".J_mainContent");
    tabs_container.children("[data-id]").not(":first").each(function () {
    	ContentPannel.find('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
        $(this).remove();
    });
    tabs_container.children("[data-id]:first").each(function () {
    	ContentPannel.find('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
        $(this).addClass("active");
    });
    tabs_container.css("margin-left", "0");
}
//关闭除当前之外的tab
function othercloseTab() {
	var tabs_container = top.$(".page-tabs-content");
    var ContentPannel = top.$(".J_mainContent");
    tabs_container.children("[data-id]").not(":first").not(".active").each(function () {
    	ContentPannel.find('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
        $(this).remove();
    });
    tabs_container.css("margin-left", "0");
}
//设置当前tab是否可以关闭
function SetThisTabCloseState(isCanClose) {
	var tabs_container = top.$(".page-tabs-content");
	tabs_container.find('.active').attr("isCanClose",isCanClose);
}
//关闭事件
function RemoveTab(thisTab) {
	var tabs_container = top.$(".page-tabs-content");
    var ContentPannel = top.$(".J_mainContent");
    
	var closeTabId = thisTab.data('id');
    var currentWidth = thisTab.width();

    // 当前元素处于活动状态
    if (thisTab.hasClass('active')) {

        // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
        if (thisTab.next('.J_menuTab').size()) {

            var activeId = thisTab.next('.J_menuTab:eq(0)').data('id');
            thisTab.next('.J_menuTab:eq(0)').addClass('active');

            ContentPannel.find('.J_iframe').each(function () {
                if ($(this).data('id') == activeId) {
                    $(this).show().siblings('.J_iframe').hide();
                    return false;
                }
            });

            var marginLeftVal = parseInt(tabs_container.css('margin-left'));
            if (marginLeftVal < 0) {
            	tabs_container.animate({
                    marginLeft: (marginLeftVal + currentWidth) + 'px'
                }, "fast");
            }

            //  移除当前选项卡
            thisTab.remove();

            // 移除tab对应的内容区
            ContentPannel.find('.J_iframe').each(function () {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
        }

        // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
        if (thisTab.prev('.J_menuTab').size()) {
            var activeId = thisTab.prev('.J_menuTab:last').data('id');
            thisTab.prev('.J_menuTab:last').addClass('active');
            ContentPannel.find('.J_iframe').each(function () {
                if ($(this).data('id') == activeId) {
                    $(this).show().siblings('.J_iframe').hide();
                    return false;
                }
            });

            //  移除当前选项卡
            thisTab.remove();

            // 移除tab对应的内容区
            ContentPannel.find('.J_iframe').each(function () {
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
    	thisTab.remove();

        // 移除相应tab对应的内容区
    	ContentPannel.find('.J_iframe').each(function () {
            if ($(this).data('id') == closeTabId) {
                $(this).remove();
                return false;
            }
        });
    	scrollToTab(tabs_container.find('.active'));
    }
    return false;
}
//访问模块，写入系统菜单Id
function VisitorModule(ModuleId, ModuleName) {
    top.$("#ModuleId").val(ModuleId);
    $.ajax({
        type: 'post',
        dataType: "text",
        url: RootPath() + "/Home/SetModuleId.do",
        data: { ModuleId: ModuleId, ModuleName: ModuleName },
        cache: false,
        async: true
    });
}
//离开模块
function SetLeave(ModuleId, ModuleName) {
    $.ajax({
        type: 'post',
        dataType: "text",
        url: RootPath() + "/Home/SetLeave.do",
        data: { ModuleId: ModuleId, ModuleName: ModuleName },
        cache: false,
        async: true
    });
}
//=================动态菜单tab标签========================
//js获取网站根路径(站点及虚拟目录)
var _CallCenter_rootPath = null;
//获取网站根路径
/*_CallCenter_rootPath = (function(script, i, me)
{
	for (i in script) {
		if (script[i].src && script[i].src.indexOf('Content/Hplus') !== -1)
		{
			me = script[i];
			break;
		}	
	};
	
	var _thisScript = me || script[script.length - 1];
	me = _thisScript.src.replace(/\\/g, '/');
	me = me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
	me = me.lastIndexOf('/Content/Hplus') < 0 ? me : me.substring(0, me.lastIndexOf('/Content/Hplus'));
	
	
	return me;
}(document.getElementsByTagName('script')));*/
//获取网站根路径
_CallCenter_rootPath = (function(script, i, me)
{
	var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    if(postPath != undefined && postPath != null && postPath !="")
    	return (prePath + postPath); //如果发布IIS，有虚假目录用用这句
    else
    	return (prePath);
}());
//js获取网站根路径(站点及虚拟目录)
function RootPath() {
	return _CallCenter_rootPath;
}

var _CallCenter_WebRootPathArr = ["/cctcloud/","/cctadmin/","/cctstatic/","/cctwebim/","/media-server/","http://","https://","ws://"];
//将指定地址转换成网站访问路径，自动判断要不要加网站根路径
function getWebMapPath(url)
{
	if(url == undefined || url == null || url == '')
		return url;
	var hasRoot = false;
	for(var i=0;i<_CallCenter_WebRootPathArr.length;i++)
	{
		if(url.indexOf(_CallCenter_WebRootPathArr[i]) == 0)
		{
			hasRoot = true;
			break;
		}
	}
	if(!hasRoot)
	{
		url = RootPath()+url;
	}
	return url;
}

//UUID(Universally Unique IDentifier) 获取全局唯一标识符
function GetUUID() {
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
//根据字符串获取一串数字，字符串相同获取的数字也相同
function GetRandomNumber(str) {

    var hash = 1315423911;
    for (var i = 0; i < str.length; i++) {
        hash ^= ((hash << 5) + str.charCodeAt(i) + (hash >> 2));
    }
    return (hash & 0x7FFFFFFF);

}
//自定义控制台日志方法
var CustomConsole = {};
CustomConsole.log = function (msg)
{
	try
	{
		console.log(msg);
	}catch(e)
	{
		
	}
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
		{ 
			append: function(message,logLevel) {
				try{
					if(logLevel == undefined)
					{
						console.log(message);
					}
					else if(logLevel == 'ERROR' || logLevel == 'FATAL')
					{
						console.error(message);
					}
					else
					{
						console.log(message);
					}
				}catch(e){
	
				}
			}
		}
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
			CCUI.Log.__appenders[j].append(message,prefix);
		}
		//CCUI.Log.__appenders.each(function(appender) {
		//	appender.append(message);
		//});
	},
	
	addAppender: function(appender) {
		CCUI.Log.__appenders.push(appender);
	}
}


//-----------------------新UI扩展功能----------------------------

//显示列表副菜单
function showJqGridSubbar(selSize)
{
	if (selSize == 0 && $('.ibox-title-subbar').hasClass('subbar-active')) {
		$(".ibox-title-subbar").removeClass("subbar-active");
		$(".ibox-title-subbar").fadeOut(200);
    }
	else if (selSize > 0 && !$('.ibox-title-subbar').hasClass('subbar-active')) {
		$(".ibox-title-subbar").toggleClass("subbar-active");
		$(".ibox-title-subbar").fadeIn(200);
    }
	
	if(selSize > 0)
	{
		$(".subbar-selsize").text(selSize);
	}
	else
	{
		$(".subbar-selsize").text(0);
	}
}

//右侧显示详情
function showRightDetailContent(url,isShow)
{
	if (!isShow && $('.cct-content-detail').hasClass('active')) {
		$(".cct-content-detail").removeClass("active");
		$(".cct-content-detail").fadeOut(500);
    }
	else if (isShow && !$('.cct-content-detail').hasClass('active')) {
		$(".cct-content-detail").toggleClass("active");
		$(".cct-content-loading").show();
		$(".cct-content-detail").fadeIn(500,function(){
			$(".cct-content-loading").fadeOut(500);
		}
		);
    }
	else if(isShow)
	{
		$(".cct-content-loading").show();
		$(".cct-content-loading").fadeOut(1000);
	}
	if(isShow)
	{
		$(".cct-content-iframe").attr("src",url);
		
	}
	else
	{
		$(".cct-content-iframe").attr("src","");
	}
}
