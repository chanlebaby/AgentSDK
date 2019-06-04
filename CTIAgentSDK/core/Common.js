if (!this.JSON) { this.JSON = {} } (function() { function f(n) { return n < 10 ? "0" + n : n } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function(key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function(a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key) } if (typeof rep === "function") { value = rep.call(holder, key, value) } switch (typeof value) { case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null" } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null" } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === "string") { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v } } if (typeof JSON.stringify !== "function") { JSON.stringify = function(value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " " } } else { if (typeof space === "string") { indent = space } } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify") } return str("", { "": value }) } } if (typeof JSON.parse !== "function") { JSON.parse = function(text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function(a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse") } } } ());

String.format = function(fmt)
{
	var params = arguments;
	var pattern = /{{|{[1-9][0-9]*}|\x7B0\x7D/g;
	return fmt.replace(
		pattern,
		function(p)
		{
			if (p == "{{") return "{";
			return params[parseInt(p.substr(1, p.length - 2), 10) + 1]
		}
	);
}

String.compareIngoreCase = function(str1, str2)
{
	return str1.toLowerCase() == str2.toLowerCase();
}

Date.prototype.format = function(fmt)
{
	var o = {
		"M+": this.getMonth() + 1,						//月份   
		"d+": this.getDate(),							//日   
		"h+": this.getHours(),							//小时   
		"m+": this.getMinutes(),						//分   
		"s+": this.getSeconds(),						//秒   
		"q+": Math.floor((this.getMonth() + 3) / 3),	//季度   
		"S": this.getMilliseconds()						//毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}  

Date.getMaxDay = function(year, month)
{
	switch(month)
	{
	case 1:
	case 3:
	case 5:
	case 7:
	case 8:
	case 10:
	case 12:
		return 31;
	case 4:
	case 6:
	case 9:
	case 11:
		return 30;
	case 2:
		return (year % 100 == 0) && (year % 4 == 0) ? 29 : 28;
	default:
		return 0;
	}
}

Date.check = function(year, month, day)
{
	if(month < 1 || month > 12) return false;
	if(day < 1 || day > Date.getMaxDay(year, month)) return false;
	return true;
}

if(window.OcxCore == undefined) window.OcxCore = {};
OcxCore.main = window;

(function(){
	
/**
 * ----------验证相关start-------------
 * */
OcxCore.validator = {};
//验证不为空 notnull
OcxCore.validator.isNotNull = function (obj) {
    //obj = OcxCore.utils.trim(obj);
    if ( obj == undefined || obj == null) {
        return false;
    }
    else if(typeof(obj) == "string" && OcxCore.utils.trim(obj).length == 0)
    	return false;
    else
        return true;
}
//验证为空
OcxCore.validator.isNull = function (obj) {
    //obj = OcxCore.utils.trim(obj);
    if ( obj == undefined || obj == null) {
        return true;
    }
    else if(typeof(obj) == "string" && OcxCore.utils.trim(obj).length == 0)
    	return true;
    else
        return false;
}

//验证数字 num
OcxCore.validator.isInt = function (obj) {
    reg = /^[-+]?\d+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证数字 num  或者null,空
OcxCore.validator.isIntOrNull = function (obj) {
    if (!OcxCore.validator.isNotNull(obj)) {
        return true;
    }
    reg = /^[-+]?\d+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否电话号码 phone
OcxCore.validator.isTelephone = function (obj) {
	//reg = /^(0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;
	//reg = /^(\d{3,4}-?)?\d{7,9}$/;
	reg = /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/;
    //reg = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否电话号码 phone或者null,空
OcxCore.validator.isTelephoneOrNull = function (obj) {
	if (!OcxCore.validator.isNotNull(obj)) {
        return true;
    }
    //reg = /^(0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;
	//reg = /^(\d{3,4}-?)?\d{7,9}$/;
	reg = /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/;
    //reg = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号 mobile
OcxCore.validator.isMobile = function (obj)  {
	//reg = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17([0|1|3]|[5-8]))|(16([0-9]))|(18([0-9]))|(19([0-9])))\d{8}$/;
	reg = /^(1[1-9])\d{9}$/;
    //reg = /^(\+\d{2,3}\-)?\d{11}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号 mobile或者null,空
OcxCore.validator.isMobileOrNull = function (obj) {
	if (!OcxCore.validator.isNotNull(obj)) {
        return true;
    }
    //reg = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17([0|1|3]|[5-8]))|(16([0-9]))|(18([0-9]))|(19([0-9])))\d{8}$/;
	reg = /^(1[1-9])\d{9}$/;
    //reg = /^(\+\d{2,3}\-)?\d{11}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号或电话号码 mobile phone 
OcxCore.validator.isMobileOrPhone = function (obj) {
    //reg_mobile = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17([0|1|3]|[5-8]))|(16([0-9]))|(18([0-9]))|(19([0-9])))\d{8}$/;///^(\+\d{2,3}\-)?\d{11}$/;
	reg_mobile = /^(1[1-9])\d{9}$/;
	reg_phone = /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/;///^(\d{3,4}-?)?[1-9]\d{6,7}$/;
    if (!reg_mobile.test(obj) && !reg_phone.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号或电话号码 mobile phone或者null,空
OcxCore.validator.isMobileOrPhoneOrNull = function (obj) {
	if (!OcxCore.validator.isNotNull(obj)) {
        return true;
    }
    //reg_mobile = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17([0|1|3]|[5-8]))|(16([0-9]))|(18([0-9]))|(19([0-9])))\d{8}$/;///^(\+\d{2,3}\-)?\d{11}$/;
	reg_mobile = /^(1[1-9])\d{9}$/;
	reg_phone = /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/;///^(\d{3,4}-?)?[1-9]\d{6,7}$/;
    if (!reg_mobile.test(obj) && !reg_phone.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//判断输入的字符是否为双精度 double
OcxCore.validator.isDouble = function (obj) {
    if (obj.length != 0) {
        reg = /^[-\+]?\d+(\.\d+)?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为双精度 double或者null,空
OcxCore.validator.isDoubleOrNull = function (obj) {
	if (!OcxCore.validator.isNotNull(obj)) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^[-\+]?\d+(\.\d+)?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

OcxCore.utils = {};
/**
*字符串格式化（占位符）
*/
OcxCore.utils.stringFormat = function(fmt)
{
	var params = arguments;
	var pattern = /{{|{[1-9][0-9]*}|\x7B0\x7D/g;
	return fmt.replace(
		pattern,
		function(p)
		{
			if (p == "{{") return "{";
			return params[parseInt(p.substr(1, p.length - 2), 10) + 1]
		}
	);
}
/**
 * 删除左右两端的空格
 * 
 * @param str
 * @return
 */
OcxCore.utils.trim = function (str) {
	if ( str == undefined || str == null) {
        return "";
    }
    else if(typeof(str) == "string" && str.length == 0)
    	return "";
    else
        return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 删除左边的空格
 * 
 * @param str
 * @return
 */
OcxCore.utils.ltrim = function (str) {
	if ( str == undefined || str == null) {
        return "";
    }
    else if(typeof(str) == "string" && str.length == 0)
    	return "";
    else
        return str.replace(/(^\s*)/g,"");
}
/**
 * 删除右边的空格
 * 
 * @param str
 * @return
 */
OcxCore.utils.rtrim = function (str) {
	if ( str == undefined || str == null) {
        return "";
    }
    else if(typeof(str) == "string" && str.length == 0)
    	return "";
    else
        return str.replace(/(\s*$)/g,"");
}
/**
 * 验证为空 null
 * 
 * @param obj
 * @return
 */
OcxCore.utils.isNull = function (obj) {
    obj = OcxCore.utils.trim(obj);
    if (obj == undefined || obj == null  || obj.length == 0) {
        return true;
    }
    else
        return false;
}
/**
 * 验证不为空 notnull
 * 
 * @param obj
 * @return
 */
OcxCore.utils.isNotNull = function (obj) {
    obj = OcxCore.utils.trim(obj);
    if (obj == undefined || obj == null  || obj.length == 0) {
        return false;
    }
    else
        return true;
}
/**
 * 左填充字符 
 * 
 * @param str 原字符串
 * @param len 总长度
 * @param ch 填充字符
 * @return 新字符串
 */
OcxCore.utils.padLeft = function (str,len,ch) {
	str = OcxCore.utils.trim(str);
    if (str == undefined || str == null  || str.length == 0) {
    	str="";
    }
    ch=typeof(ch)==='undefined'?' ':ch;
    var s=String(str);
    while(s.length<len)
    s=ch+s;
    return s;
}
/**
 * 右填充字符 
 * 
 * @param str 原字符串
 * @param len 总长度
 * @param ch 填充字符
 * @return 新字符串
 */
OcxCore.utils.padRight = function (str,len,ch) {
	str = OcxCore.utils.trim(str);
    if (str == undefined || str == null  || str.length == 0) {
    	str="";
    }
    ch=typeof(ch)==='undefined' ? ' ':ch;
    var s=String(str);
    while(s.length<len)
    s=s+ch;
    return s;
}
/**
 * 日期格式化 
 * 
 * @param date 原日期字符串或日期对象
 * @param fmt 日期格式，如 yyyy-MM-dd hh:mm:ss
 * @return 新日期字符串
 */
OcxCore.utils.dateFormat = function(date,fmt)
{
	if(date == undefined || date == null || date == '') return '';
	var date1= null;
	if(typeof date === 'string')
	{
		date1 = new Date(Date.parse(date.replace(/-/g, "/")));  
	}else if(date instanceof Date)
	{
		date1 = date;
	}
	if(date1== null) return date;
	if(fmt == undefined || fmt == null || fmt == '') fmt = 'yyyy-MM-dd hh:mm:ss';
	var o = {
		"M+": date1.getMonth() + 1,						//月份   
		"d+": date1.getDate(),							//日   
		"h+": date1.getHours(),							//小时   
		"m+": date1.getMinutes(),						//分   
		"s+": date1.getSeconds(),						//秒   
		"q+": Math.floor((date1.getMonth() + 3) / 3),	//季度   
		"S": date1.getMilliseconds()						//毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date1.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

/**
 * 将日期字符串转为日期Date对象 
 * 
 * @param date 原日期字符串或日期对象
 * @return 日期Date对象
 */
OcxCore.utils.stringToDate = function(date)
{
	if(date == undefined || date == null || date == '') return null;
	var date1= null;
	if(typeof date === 'string')
	{
		date1 = new Date(Date.parse(date.replace(/-/g, "/")));  
	}else if(date instanceof Date)
	{
		date1 = date;
	}
	return date1;
};

OcxCore.utils.getNowDateFun = (function()
{
	var This = this;
	This.getServerDate = function(){
		try {
			var serverTime = $.ajax({
				async : false
			}).getResponseHeader("Date");
			return new Date(serverTime);
		} catch (e) {
			return new Date();
		}
	};
	This.getServerDate1 = function(){
		var curDate = null;
	    var xhr = null;
	    if(window.XMLHttpRequest){
	      xhr = new window.XMLHttpRequest();
	    }else{ // ie
	      xhr = new ActiveObject("Microsoft")
	    }
	    // 通过get的方式请求当前文件
	    xhr.open("get",OcxCore.RootPath+"/");
	    xhr.send(null);
	    // 监听请求状态变化
	    xhr.onreadystatechange = function(){
	      var time = null;
	      if(xhr.readyState==2){
	        // 获取响应头里的时间戳
	        time = xhr.getResponseHeader("Date");
	        curDate = new Date(time);
	      }
	    }
	    return curDate;
	};
	This.currentMilliseconds = 0;
	This.changeCurrentDate =function()
	{
		if(This.currentMilliseconds <= 0)
		{
			This.currentMilliseconds = (new Date()).getTime();
			try {
				//var serverDate = This.getServerDate1();
				//This.currentMilliseconds = serverDate != undefined
				//		&& serverDate != null ? serverDate.getTime() : (new Date()).getTime();
			} catch (e) {
				This.currentMilliseconds = (new Date()).getTime();
			}
		}
		else
			This.currentMilliseconds = This.currentMilliseconds + 1000;
	}
	This.getNowDate = function()
	{
		if(This.currentMilliseconds <= 0)
		{
			This.currentMilliseconds = (new Date()).getTime();
			try {
				//var serverDate = This.getServerDate1();
				//This.currentMilliseconds = serverDate != undefined
				//		&& serverDate != null ? serverDate.getTime() : (new Date()).getTime();
			} catch (e) {
				This.currentMilliseconds = (new Date()).getTime();
			}
		}
		return new Date(This.currentMilliseconds);
	}
	This.setNowDate = function(date)
	{
		if(date == undefined || date == null || date == '') return;
		var date1= null;
		if(typeof date === 'string')
		{
			date1 = new Date(Date.parse(date.replace(/-/g, "/")));  
		}else if(date instanceof Date)
		{
			date1 = date;
		}
		else if((typeof(date) === "number") && !isNaN(date))
		{
			date1 = new Date(date);
		}
		if(date1== null) return;
		This.currentMilliseconds = date1.getTime();
	}
	This.changeCurrentDateInterval = null;
	if(This.changeCurrentDateInterval ==null)
	{
		This.changeCurrentDateInterval = setInterval(function(){This.changeCurrentDate()}, 1000);//1秒更新一次
	}
	return This;
})();
/**
 * 获取服务器当前时间
 * */
OcxCore.utils.getNowDate = function()
{
	return OcxCore.utils.getNowDateFun.getNowDate();
};
/**
 * 设置服务器当前时间
 * */
OcxCore.utils.setNowDate = function(date)
{
	return OcxCore.utils.getNowDateFun.setNowDate(date);
};
/**
 * 获取服务器当前时间格式化
 * */
OcxCore.utils.getNowDateFormat = function(fmt)
{
	return OcxCore.utils.dateFormat(OcxCore.utils.getNowDate(),fmt);
}


/**
 * 返回电话类型
 * 
 * @param Phone
 * @return
 */
OcxCore.utils.getPhoneType = function(Phone)
{
	var GTphone = "";
    var PhoneType = "";
    if(!OcxCore.utils.isNotNull(Phone))
    	return "";
    //区分本地和外地
    if (Phone.substring(0, 1) == "0")
    {
        GTphone = Phone.substring(1, Phone.length - 1);
    } else {
        GTphone = Phone;
    }
    var reg = /^(1[1-9])$/;
    if (reg.test(GTphone.substring(0, 2)))
    {
        PhoneType = "1";

    } else {

        PhoneType = "2";

    }
    return PhoneType;
}
/**
 * 是否三位数固定号码
 * */
OcxCore.utils.isSuffixInPhone = function(suffix)
{
    var sufffix_arr = [ "010", "020", "021", "022", "023", "024", "025", "027", "028", "029" ];
    for (var i=0;i<sufffix_arr.length;i++)
    {
        if (sufffix_arr[i] == suffix)
            return true;
    }
    return false;
}
OcxCore.utils.phoneEncodeMap=null;
OcxCore.utils.phoneDecodeMap=null;
OcxCore.utils.isHideOrDecipher=function(isHideOrDecipher,Str){
	var f = "";
	var map=null;
	if(isHideOrDecipher==1){
		if(OcxCore.utils.phoneEncodeMap == null)
		{
			OcxCore.utils.phoneEncodeMap = new OcxCore.Map();
			OcxCore.utils.phoneEncodeMap.put("A", "A");
			OcxCore.utils.phoneEncodeMap.put("B", "B");
			OcxCore.utils.phoneEncodeMap.put("C", "C");
			OcxCore.utils.phoneEncodeMap.put("D", "D");
			OcxCore.utils.phoneEncodeMap.put("E", "E");
			OcxCore.utils.phoneEncodeMap.put("F", "F");
    		
			OcxCore.utils.phoneEncodeMap.put("0", "K");
			OcxCore.utils.phoneEncodeMap.put("1", "R");
			OcxCore.utils.phoneEncodeMap.put("2", "Y");
			OcxCore.utils.phoneEncodeMap.put("3", "P");
			OcxCore.utils.phoneEncodeMap.put("4", "S");
			OcxCore.utils.phoneEncodeMap.put("5", "X");
			OcxCore.utils.phoneEncodeMap.put("6", "J");
			OcxCore.utils.phoneEncodeMap.put("7", "H");
			OcxCore.utils.phoneEncodeMap.put("8", "T");
			OcxCore.utils.phoneEncodeMap.put("9", "G");
		}
		map = OcxCore.utils.phoneEncodeMap;
	}else{
		if(OcxCore.utils.phoneDecodeMap == null)
    	{
			OcxCore.utils.phoneDecodeMap = new OcxCore.Map();
			OcxCore.utils.phoneDecodeMap.put("A", "A");
			OcxCore.utils.phoneDecodeMap.put("B", "B");
			OcxCore.utils.phoneDecodeMap.put("C", "C");
			OcxCore.utils.phoneDecodeMap.put("D", "D");
			OcxCore.utils.phoneDecodeMap.put("E", "E");
			OcxCore.utils.phoneDecodeMap.put("F", "F");
    		
			OcxCore.utils.phoneDecodeMap.put("K", "0");
			OcxCore.utils.phoneDecodeMap.put("R", "1");
			OcxCore.utils.phoneDecodeMap.put("Y", "2");
			OcxCore.utils.phoneDecodeMap.put("P", "3");
			OcxCore.utils.phoneDecodeMap.put("S", "4");
			OcxCore.utils.phoneDecodeMap.put("X", "5");
			OcxCore.utils.phoneDecodeMap.put("J", "6");
			OcxCore.utils.phoneDecodeMap.put("H", "7");
			OcxCore.utils.phoneDecodeMap.put("T", "8");
			OcxCore.utils.phoneDecodeMap.put("G", "9");
    	}
		map = OcxCore.utils.phoneDecodeMap;
	}
	for (var i = 0; i < Str.length; i++) {
		if(map.get(Str.substring(i,i+1)) == null)
		{
			return "";
		}
		f += map.get(Str.substring(i,i+1));
	}
	return f;
}
/**
 * 隐藏号码中间四位数字
 * */
OcxCore.utils.hiddenPhone=function(Str){
	Str = OcxCore.utils.isNotNull(Str) ? OcxCore.utils.trim(Str):"";
	if(OcxCore.utils.isNotNull(Str) && OcxCore.validator.isMobileOrPhone(Str)){//判断是否为空,是否为电话号码
		var ntype=OcxCore.utils.getPhoneType(Str);
		if(ntype==1){//判断手机号还是固定电话1手机,2固定电话
				var a = parseInt(Str.substring(3, 7));//截取中间4位
				var c = (a).toString(16).toUpperCase();//转成十六进制
				var d = OcxCore.utils.padLeft(c,4,"0");//补位
				var f = OcxCore.utils.isHideOrDecipher("1",d);
				Str = Str.substring(0,3)+f+Str.substring(7);//替换中间4位
		}else{
			//判断是否是本地号码 2ABCD8  2ABCD88  2ABCD888   2ABCD8
			if(Str.length>5 && Str.length <9)
			{
				var a = parseInt(Str.substring(1, 5));//截取四位
				var c = (a).toString(16).toUpperCase();//转十六进制
				var d = OcxCore.utils.padLeft(c,4,"0");//补位
				var f = OcxCore.utils.isHideOrDecipher("1",d);
				Str = Str.substring(0,1)+f+Str.substring(5);//替换中间4位
			}
			else
			{
				var suff = Str.substring(0, 3);//截取前三位
				if(OcxCore.utils.isSuffixInPhone(suff)){//判断是否是三位数固定号码例如027
					var a = parseInt(Str.substring(3, 7));//截取中间四位
					var c = (a).toString(16).toUpperCase();//转十六进制
					var d = OcxCore.utils.padLeft(c,4,"0");//补位
					var f = OcxCore.utils.isHideOrDecipher("1",d);
					Str = Str.substring(0,3)+f+Str.substring(7);//替换中间4位
		
				}else{
					var a = parseInt(Str.substring(4, 8));//截取例如区号0755后四位
					var c = (a).toString(16).toUpperCase();//转十六进制
					var d = OcxCore.utils.padLeft(c,4,"0");//补位
					var f = OcxCore.utils.isHideOrDecipher("1",d);
					Str = Str.substring(0,4)+f+Str.substring(8);//替换中间4位
				}
			}
		}
	}
	return Str;
}

/**
 * 解密
 * */
OcxCore.utils.decipherPhone=function(Str){
	var f = Str;
	if(OcxCore.utils.isNotNull(Str)){//判断是否为空
		var reg = /^\d{3,4}[A-Za-z]{4}\d{3,4}$/;
		var reg2 = /^\d[A-Za-z]{4}\d{1,3}$/;
		if(reg.test(Str)){
			var charreg = /[A-Za-z]{4}/g;
			
			var r = Str.match(charreg);
			if(r.length >0)
			{
				var a =r[0];//两个*中间的数132*7255*7706  返回  7255
				var g = OcxCore.utils.isHideOrDecipher(2,a);
				if(g == null || g == '')
					return f;
				var c = parseInt(g,16);
				var d = OcxCore.utils.padLeft(c,4,"0");//补位
				f = Str.replace(a,d);	
			}
		}
		else if(reg2.test(Str)){
			var charreg = /[A-Za-z]{4}/g;
			
			var r = Str.match(charreg);
			if(r.length >0)
			{
				var a =r[0];//两个*中间的数132*7255*7706  返回  7255
				var g = OcxCore.utils.isHideOrDecipher(2,a);
				if(g == null || g == '')
					return f;
				var c = parseInt(g,16);
				var d = OcxCore.utils.padLeft(c,4,"0");//补位
				f = Str.replace(a,d);	
			}
		}
	}
	return f;
}

/**
 * 隐藏号码中间四位数字,用星号代替
 * */
OcxCore.utils.hiddenPhoneByStar=function(Str){
	Str = OcxCore.utils.isNotNull(Str) ? OcxCore.utils.trim(Str):"";
	if(OcxCore.utils.isNull(Str)) return Str;
	Str = OcxCore.utils.decipherPhone(Str);
	var ntype=OcxCore.utils.getPhoneType(Str);
	if(OcxCore.utils.isNotNull(ntype)){//判断是否为空,是否为电话号码
		if(ntype==1){//判断手机号还是固定电话1手机,2固定电话
				Str = Str.substring(0,3)+"****"+Str.substring(7);//替换中间4位
		}else{
			//判断是否是本地号码 2ABCD8  2ABCD88  2ABCD888
			if(Str.length>5 && Str.length <9)
			{
				Str = Str.substring(0,1)+"****"+Str.substring(5);//替换中间4位
			}
			else
			{
				var suff = Str.substring(0, 3);//截取前三位
				if(OcxCore.utils.isSuffixInPhone(suff)){//判断是否是三位数固定号码例如027
					Str = Str.substring(0,3)+"****"+Str.substring(7);//替换中间4位
				}else{
					Str = Str.substring(0,4)+"****"+Str.substring(8);//替换中间4位
				}
			}
		}
	}
	return Str;
}

/**
 * ----------验证相关end-------------
 * */



OcxCore.Params = (function()
{
	var search = window.location.search.substr(1, window.location.search.length - 1);
	if (search == "") return {};
	var pairs = search.split("&");
	var params = {};
	for (var i in pairs)
	{
		try{
			if (pairs[i] != undefined && pairs[i] != null && pairs[i] != 'undefined' && typeof(pairs[i]) != "function" ) {
				
				var vs = pairs[i].split("=");
				params[vs[0]] = vs[1];
			}
		}catch(e){
			
		}
	
	}
	return params;
})();

/********
接收地址栏参数
**********/
OcxCore.GetQuery = function (key) {
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
};
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

//获取网站根路径
/*OcxCore.RootPath = window['_OcxCore_rootPath'] || (function(script, i, me)
{
	for (i in script) {
		// 如果通过第三方脚本加载器加载本文件，请保证文件名含有"CTIAgentSDK"字符
		if (script[i].src && script[i].src.indexOf('CTIAgentSDK') !== -1) me = script[i];
	};
	
	_thisScript = me || script[script.length - 1];
	me = _thisScript.src.replace(/\\/g, '/');
	me = me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
	me = me.lastIndexOf('/CTIAgentSDK') < 0 ? me : me.substring(0, me.lastIndexOf('/CTIAgentSDK'));
	return me;
}(document.getElementsByTagName('script')));*/
//获取网站根路径
OcxCore.RootPath = window['_OcxCore_rootPath'] || (function(script, i, me)
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

/**
 * 获取完整URL地址
 * */
OcxCore.GetPageUrl = function(url)
{
	if(url != undefined && url !="" && url.indexOf('/') == 0) url = url.substr(0);
	if (OcxCore.RootPath == "") return url;
	if (OcxCore.RootPath == "/") return "/" + url;
	return OcxCore.RootPath + "/" + url;
}
/**
 * 获取CTIAgentSDK目录完整URL地址
 * */
OcxCore.GetResPageUrl = function(url)
{
	if(url != undefined && url !="" && url.indexOf('/') == 0) url = url.substr(0);
	if (OcxCore.ResPath == "") return url;
	if (OcxCore.ResPath == "/") return "/" + url;
	return OcxCore.ResPath + "/" + url;
}

OcxCore.GetCTIAgentPageUrl = function(url)
{
	if (OcxCore.Config.CTIAgentWebURL == "") return url;
	if (OcxCore.Config.CTIAgentWebURL == "/") return "/" + url;
	return OcxCore.Config.CTIAgentWebURL + "/" + url;
}

/**
 * 将秒数格式化显示00:00:00
 * */
OcxCore.FormatSeconds = function(seccond) {
    var result = "00:00:00";
	    if (seccond != undefined && seccond!=null && seccond != "" && seccond>0) {
	    	try{
	    		var iTotalSeccond = parseInt(seccond);
		        var iHour = 0;
		        var iMinite = 0;
		        var iSeccond = 0;
		
		        if (iTotalSeccond < 60) {
		            iSeccond = iTotalSeccond;
		        }
		        else if (iTotalSeccond < 3600) {
		            iSeccond = iTotalSeccond % 60;
		            iMinite = Math.floor(iTotalSeccond / 60);
		        }
		        else {
		            iSeccond = iTotalSeccond % 60;
		            iMinite = Math.floor((iTotalSeccond % 3600) / 60);
		            iHour = Math.floor(iTotalSeccond / 3600);
		        }
		        result =
		            (iHour >= 10 ? iHour.toString() : "0" + iHour.toString()) + ":"
		            + (iMinite >= 10 ? iMinite.toString() : "0" + iMinite.toString()) + ":"
		            + (iSeccond >= 10 ? iSeccond.toString() : "0" + iSeccond.toString());
	    	}catch(e){
	    		
	    		return "00:00:00";
	    	}
	    }
    return result;
}

var m_Browser = "";

OcxCore.GetBrowser = function()
{
	if(m_Browser == undefined || m_Browser == "")
	{
		m_Browser = "";
		var ua = navigator.userAgent.toLowerCase();
		if (!!window.ActiveXObject || "ActiveXObject" in window) m_Browser = "IE";
		else if ((/msie ([\d.]+)/).test(ua)) m_Browser = "IE";
		else if ((/firefox\/([\d.]+)/).test(ua)) m_Browser = "Firefox";
		else if ((/chrome\/([\d.]+)/).test(ua)) m_Browser = "Chrome";
		else if ((/webkit\/([\d.]+)/).test(ua)) m_Browser = "Chrome";
		else if ((/qt\/([\d.]+)/).test(ua)) m_Browser = "Chrome";
	}
	return m_Browser;
}

OcxCore.Utility = {};

//UUID(Universally Unique IDentifier) 获取全局唯一标识符
OcxCore.Utility.GetUUID =function() {
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

OcxCore.Utility.IsNull = function()
{
	for (var i = 0; i < arguments.length; i++)
	{
		var arg = arguments[i];
		if (arg != undefined && arg != null) return arg;
	}
	return null;
}

OcxCore.Utility.IsNullOrEmpty = function(arg)
{
	if (arg == undefined || arg == null || arg.length == 0) {
        return true;
    }
    else
        return false;
}

OcxCore.Utility.AttachEvent = function(elem, evtName, handler)
{
	if (elem.attachEvent)
	{
		elem.attachEvent("on" + evtName, handler);
	}
	else if (elem.addEventListener)
	{
		elem.addEventListener(evtName, handler, false);
	}
}

OcxCore.Utility.DetachEvent = function(elem, evtName, handler)
{
	if (elem.detachEvent)
	{
		elem.detachEvent("on" + evtName, handler);
	}
	else if (elem.addEventListener)
	{
		elem.removeEventListener(evtName, handler, false);
	}
}

OcxCore.Utility.AttachButtonEvent = function(elem, normal_css, hover_css, press_css)
{
	OcxCore.Utility.AttachEvent(
		elem, "mousedown",
		function(evt)
		{
			if (evt == undefined) evt = window.event;

			if (OcxCore.Utility.GetButton(evt) == "Left")
			{
				elem.className = press_css;
			}
		}
	);
	OcxCore.Utility.AttachEvent(
		elem, "mouseup",
		function(evt)
		{
			if (evt == undefined) evt = window.event;
			elem.className = normal_css;
		}
	);
	OcxCore.Utility.AttachEvent(
		elem, "mouseover",
		function(evt)
		{
			if (evt == undefined) evt = window.event;

			if (elem.className != press_css)
			{
				elem.className = hover_css;
			}
		}
	);
	OcxCore.Utility.AttachEvent(
		elem, "mouseout",
		function(evt)
		{
			elem.className = normal_css;
		}
	);
}

OcxCore.Utility.Clone = function(val)
{
	if (val == null)
	{
		return null
	}
	else if (Object.prototype.toString.apply(val) === "[object Array]")//val.constructor == Array
	{
		var a = new Array()
		for (i in val)
		{
			a[i] = OcxCore.Utility.Clone(val[i])
		}
		return a
	}
	else if (typeof val === "object")//val.constructor == Object
	{
		var a = new Object()
		for (c in val)
		{
			a[c] = OcxCore.Utility.Clone(val[c])
		}
		return a
	}
	else if (typeof val === "number")//val.constructor == Number
	{
		return val
	}
	else if (typeof val === "string")//val.constructor == String
	{
		return val
	}
	else if (val.constructor == Date)
	{
		return val
	}
	else
		return val;
}

OcxCore.Utility.DisableSelect = function(elem, disableChildren)
{
	if (disableChildren == undefined) disableChildren = false;

	if (OcxCore.GetBrowser() == "IE")
	{
		if (elem.setAttribute != undefined) elem.setAttribute("unselectable", "on");

		if (disableChildren)
		{
			for (var i = 0; i < elem.childNodes.length; i++)
			{
				OcxCore.Utility.DisableSelect(elem.childNodes[i], true);
			}
		}
	}
}

OcxCore.Utility.GetButton = function(evt)
{
	if (evt.which != undefined)
	{
		if (evt.which == 1) return "Left";
		else if (evt.which == 3) return "Right";
		else return "";
	}
	else
	{
		if (evt.button == 1) return "Left";
		else if (evt.button == 2) return "Right";
		else return "";
	}
}

OcxCore.Utility.IsTextNode = function(node)
{
	return node.innerHTML == undefined;
}

var m_ScrollTitleInternal = null;
var m_ScrollTitleCount = 0;
var m_Title = "";

OcxCore.Utility.ScrollTitle = function(title)
{
	try
	{
		OcxCore.Utility.StopScrollTitle();
		m_ScrollTitleCount = 1;
		m_Title = title;
		document.title = m_Title;
		m_ScrollTitleInternal = setInterval(
			function()
			{
				try
				{
					m_ScrollTitleCount = (m_ScrollTitleCount + 1) % m_Title.length;
					document.title = m_Title.substr(m_ScrollTitleCount, m_Title.length - m_ScrollTitleCount) + "        " + m_Title.substr(0, m_ScrollTitleCount);
				}
				catch(ex)
				{
				}
			},
			100
		);
	}
	catch(ex)
	{
	}
}

OcxCore.Utility.StopScrollTitle = function()
{
	try
	{
		if (m_ScrollTitleInternal != null)
		{
			clearInterval(m_ScrollTitleInternal);
			m_ScrollTitleCount = 0;

			if (OcxCore.Session != undefined)
			{
				if (OcxCore.Session.getUserId() == null) document.title = "";
				else document.title = OcxCore.utils.stringFormat("\u6B22\u8FCE\u60A8 {0}", OcxCore.Session.getUserInfo().RealName);
			}
		}
	}
	catch(ex)
	{
	}
}

function _ClearHtml(builder, node)
{
	for (var i = 0; i < node.childNodes.length; i++)
	{
		var n = node.childNodes[i];
		if (OcxCore.Utility.IsTextNode(n))
		{
			if (n.textContent) builder.push(n.textContent);
			else if (n.nodeValue) builder.push(n.nodeValue);
		}
		else
		{
			_ClearHtml(builder, n);
		}
	}
}

OcxCore.Utility.ClearHtml = function(node)
{
	var builder = [];
	_ClearHtml(builder, node);
	return builder.join("");
}

OcxCore.Utility.GetInnerHTML = function(nodes)
{
	var builder = [];
	for (var i = 0; i < nodes.length; i++)
	{
		if (!OcxCore.Utility.IsTextNode(nodes[i]))
		{
			builder.push(nodes[i].innerHTML);
		}
		else
		{
			if (nodes[i].textContent) builder.push(nodes[i].textContent.replace(/\</ig, function() { return "&lt;"; }));
			else if (nodes[i].nodeValue) builder.push(nodes[i].nodeValue.replace(/\</ig, function() { return "&lt;"; }));
		}
	}
	return builder.join("");
}

OcxCore.Utility.GetInnerText = function(node)
{
	if (node.innerText != undefined) return node.innerText;
	else if (node.textContent != undefined) return node.textContent;
	else if (node.nodeValue != undefined) return node.nodeValue;
}

OcxCore.Utility.EncodeUrl = function(url)
{
	var temp = [];
	for (var i = 0; i < url.length; i++)
	{
		var ascii = url.charCodeAt(i);
		temp.push("%");
		temp.push(acrii.toString(16));
	}
	return temp.join("");
}

OcxCore.Utility.GetClientCoord = function(obj)
{
	if (obj.getBoundingClientRect != undefined)
	{
		var bodyRect = document.body.getBoundingClientRect();
		var rect = obj.getBoundingClientRect();
		return { X: rect.left - bodyRect.left, Y: rect.top - bodyRect.top };
	}
	else
	{
		if (OcxCore.GetBrowser() == "IE")
		{
			var offsetParent = obj.offsetParent;
			if (offsetParent == null)
			{
				return { X: obj.offsetLeft, Y: obj.offsetTop };
			}
			else
			{
				var offset = OcxCore.Utility.GetClientCoord(offsetParent);
				return { X: obj.offsetLeft + offset.X, Y: obj.offsetTop + offset.Y };
			}
		}
		else
		{
			var offsetParent = obj.offsetParent;
			if (offsetParent == null)
			{
				return { X: obj.offsetLeft, Y: obj.offsetTop };
			}
			else
			{
				var offset = OcxCore.Utility.GetClientCoord(offsetParent);
				var coord = { X: offsetParent.clientLeft + obj.offsetLeft + offset.X, Y: offsetParent.clientTop + obj.offsetTop + offset.Y };
				return coord;
			}
		}
	}
}

OcxCore.Utility.PreventDefault = function(evt)
{
	if (evt.preventDefault != undefined)
	{
		evt.preventDefault();
	}
	else
	{
		evt.returnValue = false;
	}
}

OcxCore.Utility.CancelBubble = function(evt)
{
	if (evt && evt.stopPropagation) evt.stopPropagation();
	else evt.cancelBubble = true;
}

OcxCore.Utility.GetTarget = function(evt)
{
	if (evt.target != undefined) return evt.target;
	if (evt.srcElement != undefined) return evt.srcElement;
	return null;
}

OcxCore.Utility.TransferCharForXML = function(str)
{
	var res = str.replace(
		/&|\x3E|\x3C|\x5E|\x22|\x27|[\x00-\x1F]|\t/g,
		function(s)
		{
			var ascii = s.charCodeAt(0)
			return "&#" + ascii.toString(10) + ";";
		}
	)
	return res;
}

OcxCore.Utility.TransferCharForJavascript = function(s)
{
	var newStr = s.replace(
		/[\x26\x27\x3C\x3E\x0D\x0A\x22\x2C\x5C\x00]/g,
		function(c)
		{
			ascii = c.charCodeAt(0)
			return '\\u00' + (ascii < 16 ? '0' + ascii.toString(16) : ascii.toString(16))
		}
	);
	return newStr;
}

var AllowHtmlTag = {
	"A": "A",
	"I": "I",
	"B": "B",
	"U": "U",
	"P": "P",
	"TH": "TH",
	"TD": "TD",
	"TR": "TR",
	"OL": "OL",
	"UL": "UL",
	"LI": "LI",
	"BR": "BR",
	"H1": "H1",
	"H2": "H2",
	"H3": "H3",
	"H4": "H4",
	"H5": "H5",
	"H6": "H6",
	"H7": "H7",
	"EM": "EM",
	"PRE": "PRE",
	"DIV": "DIV",
	"IMG": "IMG",
	"CITE": "CITE",
	"SPAN": "SPAN",
	"FONT": "FONT",
	"CODE": "CODE",
	"TABLE": "TABLE",
	"TBODY": "TBODY",
	"SMALL": "SMALL",
	"THEAD": "THEAD",
	"CENTER": "CENTER",
	"STRONG": "STRONG",
	"BLOCKQUOTE": "BLOCKQUOTE"
};

var HtmlBeginTagRegex = /<[^<>\/]+>/ig;
var HtmlEndTagRegex = /<\/[^\s<>\/]+>/ig;

OcxCore.Utility.ReplaceHtml = function(text)
{
	var newText = text.toString().replace(
		HtmlBeginTagRegex,
		function(html)
		{
			return html.replace(
				/[^\s<>\/]+/i,
				function(tag)
				{
					if (AllowHtmlTag[tag.toUpperCase()] == undefined) return "_tag";
					else return tag;
				}
			)
			.replace(
				/[^a-zA-Z]expression|[^a-zA-Z]on|[^a-zA-Z]javascript/ig,
				function(str)
				{
					return str.substr(0, 1) + "_" + str.substr(1, str.length - 1);
				}
			);
		}
	)
	.replace(
		HtmlEndTagRegex,
		function(html)
		{
			return html.replace(
				/[^\s<>\/]+/i,
				function(tag)
				{
					if (AllowHtmlTag[tag.toUpperCase()] == undefined) return "_tag";
					else return tag;
				}
			)
		}
	);
	return newText;
}

OcxCore.Utility.FilterHtml = OcxCore.Utility.ReplaceHtml;

OcxCore.Utility.LoadCss = function(href, doc)
{	
	if(doc == undefined) doc = document;
	var e = doc.createElement("link");
	e.rel = "StyleSheet";
	e.type = "text/css";
	e.href = href;
	var hs = doc.getElementsByTagName("head");
	if (hs.length > 0) hs[0].appendChild(e);
	return e;
}

OcxCore.Utility.LoadScript = function(src)
{
	var e = document.createElement("script");
	e.language = "javascript";
	e.type = "text/javascript";
	e.src = src;
	var hs = document.getElementsByTagName("head");
	if (hs.length > 0) hs[0].appendChild(e);
	return e;
}

OcxCore.Event = function(evt, win)
{
	if (win == undefined) win = window;
	if (evt == undefined) evt = win.event;

	this.PreventDefault = function()
	{
		if (evt.preventDefault != undefined)
		{
			evt.preventDefault();
		}
		else
		{
			evt.returnValue = false;
		}
	}

	this.CancelBubble = function()
	{
		if (evt && evt.stopPropagation) evt.stopPropagation();
		else evt.cancelBubble = true;
	}

	this.GetTarget = function()
	{
		if (evt.target != undefined) return evt.target;
		if (evt.srcElement != undefined) return evt.srcElement;
		return null;
	}

	this.GetEvent = function()
	{
		return evt;
	}

	this.GetButton = function()
	{
		if ((evt.which != undefined && evt.which == 1) || evt.button == 1) return "Left";
		else if ((evt.which != undefined && evt.which == 3) || evt.button == 2) return "Right"
		else return "";
	}
}

OcxCore.Exception = function(name, msg)
{
	var This = this;
	//继承Object
	OcxCore.Object.call(This);
	var Base = {
		GetType: This.GetType,
		is: This.is
	}

	This.is = function(type) { return type == this.GetType() ? true : Base.is(type); }
	This.GetType = function() { return "Exception"; }
		
	This.Name = name;
	This.Message = msg;
	This.message = msg;

	This.getName = function(){
		return name;
	}
	This.getMessage = function()
	{
		return msg;
	}
	This.toString = function()
	{
		return name + ":" + msg;
	}
}

OcxCore.Delegate = function()
{
	var all = [];

	var This = this;

	This.Call = function()
	{
		var ret = null;
		for (var i=0;i<all.length;i++)
		{
			ret = all[i].apply(This, arguments);
		}
		/*for (var index in all)
		{
			ret = all[index].apply(This, arguments);
		}*/
		return ret;
	}

	This.Attach = function(func)
	{
		all.push(func);
	}

	This.Detach = function(func)
	{
		var index = 0;
		/*for (index in all)
		{
			if (all[index] == func) break;
		}*/
		for (index = 0;index < all.length;index++)
		{
			if (all[index] == func) break;
		}
		if (index < all.length)
		{
			delete all[index];
			all.splice(index, 1);
		}
	}
	
	This.DetachAll = function()
	{
		all = [];
	}
	
	This.AttachSize = function()
	{
		return all.length;
	}
}

OcxCore.Object = function()
{
	this.GetType = function()
	{
		return "Object";
	}
	this.getType = function()
	{
		return "Object";
	}
	this.is = function(typeName)
	{
		return typeName == this.GetType();
	}
}

OcxCore.CreateObject = function(type)
{
	var obj = {};
	OcxCore[type].call(obj);
	return obj;
}

OcxCore.CallFunc = function(func)
{
	var args = [];
	for(var i = 1; i < arguments.length; i++)
	{
		args.push(arguments[i]);
	}
	return func.apply(window, args);
}

/*OcxCore.Map = function(init_items, get_item_key, update_item)
{
	var obj = this;
	var items_ = [];
	var items_map_ = {};
	
	if(get_item_key == undefined || get_item_key == null)
	{
		get_item_key = function(item)
		{
			if(item.Key != undefined) return item.Key;
			if(item.ID != undefined) return item.ID;
		}
	}
	
	if(update_item == undefined || update_item == null)
	{
		update_item = function(dest, src)
		{
			var update = false;
			for(var k in src)
			{
				if(dest[k] == undefined || dest[k] != src[k])
				{
					dest[k] = src[k];
					update = true;
				}
			}
			return update;
		}
	}
	
	obj.Update = function(item, add)
	{
		if(add == undefined) add = false;
		
		var key = get_item_key(item);
		if(items_map_[key] != undefined)
		{
			return update_item(items_map_[key], item);
		}
		else if(add)
		{
			items_.push(item);
			items_map_[key] = item;
		}
		return false;
	}
	
	obj.Remove = function(item)
	{		
		var key = get_item_key(item);
		if(items_map_[key] != undefined)
		{
			var index = 0;
			for(index = 0; index < items_.length; index++)
			{
				if(get_item_key(items_[index]) == key) break;
			}
			if(index >= 0 && index < items_.length)
			{
				items_.splice(index, 1);
				delete items_map_[key];
			}
		}
	}
	
	obj.All = function()
	{
		return items_;
	}
	
	obj.Get = function(key, by_index)
	{
		if(by_index == true)
		{
			return items_[key] == undefined ? null : items_[key];
		}
		else
		{
			return items_map_[key] == undefined ? null : items_map_[key];
		}
	}
	
	*//**  
     * 获取键值对数量  
     *//*  
	obj.Size = function(){   
        return items_.length;   
    }; 
	
	if(init_items != undefined && init_items != null)
	{
		if(init_items.push != undefined)
		{
			for(var i in init_items) 
			{
				var item = init_items[i];
				var key = get_item_key(item);
				if(items_map_[key] == undefined)
				{
					items_.push(item);
					items_map_[key] = item;
				}
			}
		}
		else
		{
			for(var i in init_items) 
			{
				var item = init_items[i];
				var key = get_item_key(item);
				items_.push(item);
				items_map_[key] = item;
			}
		}
	}
}*/

/**  
 * Simple Map  
 *   
 *   
 * var m = new OcxCore.Map();  
 * m.put('key','value');  
 * ...  
 * var s = "";  
 * m.each(function(key,value,index){  
 *      s += index+":"+ key+"="+value+"/n";  
 * });  
 * alert(s);  
 *   
 * @author dewitt  
 * @date 2008-05-24  
 */  
OcxCore.Map = function() {   
    /** 存放键的数组(遍历用到) */  
    this.keys = new Array();   
    /** 存放数据 */  
    this.data = new Object();   
       
    /**  
     * 放入一个键值对  
     * @param {String} key  
     * @param {Object} value  
     */  
    this.put = function(key, value) {   
        if(this.data[key] == null){   
            this.keys.push(key);   
        }   
        this.data[key] = value;   
    };   
       
    /**  
     * 获取某键对应的值  
     * @param {String} key  
     * @return {Object} value  
     */  
    this.get = function(key) {   
        return this.data[key];   
    };   
       
    /**  
     * 删除一个键值对  
     * @param {String} key  
     */  
    this.remove = function(key) {
    	for (var i = 0; i < this.keys.length; i++) {   
            if (key == this.keys[i])   
                this.keys.splice(i, 1);   
        }   
        this.data[key] = null;   
    };  
    /**  
     * 清空  
     */  
    this.clear = function() { 
        this.keys = new Array();
        this.data = new Object();   
    };
       
    /**  
     * 遍历Map,执行处理函数  
     *   
     * @param {Function} 回调函数 function(key,value,index){..}  
     */  
    this.each = function(fn){   
        if(typeof fn != 'function'){   
            return;   
        }   
        var len = this.keys.length;   
        for(var i=0;i<len;i++){   
            var k = this.keys[i];   
            var res = fn(k,this.data[k],i);
            if(res != undefined && res != null && res == false)
            {
            	break;
            }
        }   
    };   
       
    /**  
     * 获取键值数组(类似Java的entrySet())  
     * @return 键值对象{key,value}的数组  
     */  
    this.entrys = function() {   
        var len = this.keys.length;   
        var entrys = new Array(len);   
        for (var i = 0; i < len; i++) {   
            entrys[i] = {   
                key : this.keys[i],   
                value : this.data[i]   
            };   
        }   
        return entrys;   
    }; 
    /**
	* 获得Map中的所有Key
	*/
	this.keySet=function(){
		var _keys = new Array();
		var len = this.keys.length;    
        for (var i = 0; i < len; i++) {   
        	_keys.push(this.keys[i]);
        }
		return _keys;
	};

    /**  
     * 是否包含指定键  
     * @return true/false 包含/不包含  
     */  
    this.containsKey = function(key) {   
    	if(key == undefined || key == null || key == "")
    		return false;
        var len = this.keys.length;   
        var entrys = new Array(len);   
        for (var i = 0; i < len; i++) {   
        	if(this.keys[i] == key)
        		return true; 
        }   
        return false;   
    };
       
    /**  
     * 判断Map是否为空  
     */  
    this.isEmpty = function() {   
        return this.keys.length == 0;   
    };   
       
    /**  
     * 获取键值对数量  
     */  
    this.size = function(){   
        return this.keys.length;   
    };   
       
    /**  
     * 重写toString   
     */  
    this.toString = function(){   
        var s = "{";   
        for(var i=0;i<this.keys.length;i++,s+=','){   
            var k = this.keys[i];   
            s += k+"="+this.data[k];   
        }   
        s+="}";   
        return s;   
    };   
}

/**
 * js实现list
 * 
 */
OcxCore.List = function() {
    this.value = [];

    /* 添加 */
    this.add = function(obj) {
        return this.value.push(obj);
    };

    /* 大小 */
    this.size = function() {
        return this.value.length;
    };

    /* 返回指定索引的值 */
    this.get = function(index) {
        return this.value[index];
    };

    /* 删除指定索引的值 */
    this.remove = function(index) {
        this.value.splice(index,1);
        return this.value;
    };

    /* 删除全部值 */
    this.removeAll = function() {
        return this.value = [];
    };

    /* 是否包含某个对象 */
    this.contains = function(obj) {
        for ( var i in this.value) {
            if (obj == this.value[i]) {
                return true;
            } else {
                continue;
            }
        }
        return false;
    };
    
    /* 是否包含某个对象 */
    this.getAll = function() {
        var allInfos = '';
        for ( var i in this.value) {
            if(i != (value.length-1)){
                allInfos += this.value[i]+",";
            }else{
                allInfos += this.value[i];
            }
        }
        return allInfos += this.value[i]+",";;
    };
    
}

OcxCore.Utility.Extend = function()
{
	// copy reference to target object
    var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;
    // 深拷贝情况，第一个参数为 boolean 类型，那么，表示深拷贝，第二个参数为目标对象
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    // 如果目标不是对象也不是函数
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }
    // 如果只有一个参数就是扩展自己
    if (length === i) {
        target = this;
        --i;
    }
    // 遍历所有的参考对象，扩展到目标对象上
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && (jQuery.isPlainObject(copy) || jQuery.isArray(copy))) {
                    var clone = src && (jQuery.isPlainObject(src) || jQuery.isArray(src)) ? src
                        : jQuery.isArray(copy) ? [] : {};
                    target[name] = jQuery.extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    // Return the modified object
    return target;
}

var m_Count = 100000000;

OcxCore.GenerateUniqueId = function()
{
	m_Count++;
	return 'ID' + m_Count;
}

OcxCore.Post = function(url, data, type, timeout, handler,isHeartBeat)
{
	try
	{
		var request = null;

		if (window.XMLHttpRequest)
		{
			request = new XMLHttpRequest();
		}
		else if (window.ActiveXObject)
		{
			request = new ActiveXObject("Microsoft.XMLHttp");
		}

		request.onreadystatechange = function()
		{
			if (request.readyState == 4)
			{
				try
				{
					switch (request.status)
					{
						case 200:
							{
								if(isHeartBeat == undefined || request.responseText != '{"IsSucceed":true,"Responses":[]}')
									OcxCore.Log.trace(OcxCore.utils.stringFormat("Post Success: Url = {1}, status = {0}, ResponseText = '{2}'", request.status, url, request.responseText));
								if (request.responseText != "")
									handler.onsuccess(request.status, request.responseText);
								else
									handler.onerror("服务器反馈错误", "服务器可能已经重启或关闭了!");
								break;
							}
						default:
							{
								handler.onerror(request.status, request.statusText);
								OcxCore.Log.trace(OcxCore.utils.stringFormat("Post Error : status = {0}, statusText = {1},ResponseText = '{2}', Url = {3}", request.status, request.statusText, request.responseText, url));
								break;
							}
					}
				}
				catch (ex)
				{
					handler.onerror(ex.mame, ex.message);
				}
				if (timer != null) clearTimeout(timer);
				request = null;
				timer = null;
			}
		}
		var timer = null;
		if (timeout > 0)
		{
			timer = setTimeout(
				function()
				{
					if (request != null)
					{
						request.onreadystatechange = function() { };
						request.abort();
						request = null;
						handler.onabort();
					}
				},
				timeout
			);
		}

		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", type);
		request.send(data);
		if(isHeartBeat == undefined)
			OcxCore.Log.trace(OcxCore.utils.stringFormat("Post To Server Data: Url = {0}, type = '{1}', data = '{2}'", url, type, data));
		return {
			Abort: function()
			{
				if (timer != null) clearTimeout(timer);
				if (request != null)
				{
					OcxCore.Log.trace(OcxCore.utils.stringFormat("Post Abort: Url = {0}", url));
					request.onreadystatechange = function() { };
					request.abort();
					request = null;
					handler.onabort();
				}
				timer = null;
			}
		}
	}
	catch (ex)
	{
		handler.onerror(new OcxCore.Exception(ex.name, ex.message));
	}
}
OcxCore.PostJsonP = function(url, data, type, timeout, handler)
{
	try
	{
		var request = {};
		request.onreadystatechange = function()
		{
			if (request.readyState == 4)
			{
				try
				{
					switch (request.status)
					{
						case 200:
							{
								OcxCore.Log.trace(OcxCore.utils.stringFormat("Post Success: Url = {1}, status = {0}, ResponseText = '{2}'", request.status, url, request.responseText));
								if (request.responseText != "")
									handler.onsuccess(request.status, request.responseText);
								else
									handler.onerror("服务器反馈错误", "服务器可能已经重启或关闭了!");
								break;
							}
						default:
							{
								handler.onerror(request.status, request.statusText);
								OcxCore.Log.trace(OcxCore.utils.stringFormat("Post Error : status = {0}, statusText = {1}, Url = {2}", request.status, request.statusText, url));
								break;
							}
					}
				}
				catch (ex)
				{
					handler.onerror(ex.mame, ex.message);
				}
				//if (timer != null) clearTimeout(timer);
				request = null;
				//timer = null;
			}
		}
//		var timer = null;
//		if (timeout > 0)
//		{
//			timer = setTimeout(
//				function()
//				{
//					if (request != null)
//					{
//						request.onreadystatechange = function() { };
//						//request.abort();
//						request = null;
//						handler.onabort();
//					}
//				},
//				timeout
//			);
//		}

		//request.open("POST", url, true);
		//request.setRequestHeader("Content-Type", type);
		//request.send(data);
		
		$.jsonp({
		    url: url,
		    data: data,
		    callback: "callbackAction",
		    callbackParameter: "callbackAction",
		    cache:false,
		    pageCache:false,
		    timeout:timeout,
		    success: function (jsonData, textStatus, xOptions) {
		    	
		    	request.readyState = 4;
		    	request.status = 200;
		    	request.responseText = JSON.stringify(jsonData);
		    	request.onreadystatechange();
		    },
		    error: function (xOptions, textStatus) {
		    	if(textStatus == "timeout")
		    	{
		    		if (request != null)
					{
						request.onreadystatechange = function() { };
						//request.abort();
						request = null;
						handler.onabort();
					}
		    	}else
		    	{
		    		request.readyState = 5;
			    	request.status = 500;
			    	request.responseText = null;
			    	request.statusText = "error";
		    		request.onreadystatechange();
		    	}
		    	
		    }
		});
		
		OcxCore.Log.trace(OcxCore.utils.stringFormat("Post To Server Data: Url = {0}, type = '{1}', data = '{2}'", url, type, data));
		return {
			Abort: function()
			{
				//if (timer != null) clearTimeout(timer);
				if (request != null)
				{
					OcxCore.Log.trace(OcxCore.utils.stringFormat("Post Abort: Url = {0}", url));
					request.onreadystatechange = function() { };
					//request.abort();
					request = null;
					handler.onabort();
				}
				//timer = null;
			}
		}
	}
	catch (ex)
	{
		handler.onerror(new OcxCore.Exception(ex.name, ex.message));
	}
}
/** 
请求Ajax 带返回值
*/
OcxCore.getAjax =function(url, postData, callBack,isAsync) {
	if(isAsync == undefined || isAsync == null || isAsync == "")
	{
		isAsync = false;
	}
    $.ajax({
        type: 'post',
        dataType: "text",
        url: url,
        data: postData,
        cache: false,
        async: isAsync,
        success: function (data) {
            callBack(data);
        },
        error: function (data) {
        	OcxCore.Utility.ShowLoading(false);
            var msg = "操作出错！<br/>状态码："+data.readyState
            +"<br/>状态："+data.status+"<br/>状态内容："+data.statusText
            +"<br/>反馈信息："+data.responseText;
            OcxCore.Utility.ShowError(msg);
        }
    });
}
OcxCore.AjaxJson = function(url, postData, callBack,isAsync) {
	if(isAsync == undefined || isAsync == null || isAsync == "")
	{
		isAsync = false;
	}
    $.ajax({
        url: url,
        type: "post",
        data: postData,
        dataType: "text",
        cache: false,
        async: isAsync,
        success: function (data) {
        	if(data != undefined && data != null)
    		{
        		if (typeof data === 'string') {
        			if(data == "") return;
        			data = eval("("+data+")");
        	    }
        		if (data.Code == "-1") {
        			OcxCore.Utility.ShowLoading(false);
        			OcxCore.Utility.ShowError(data.Message);
                } else {
                	OcxCore.Utility.ShowLoading(false);
                    callBack(data);
                }
    		}
        },
        error: function (data) {
        	OcxCore.Utility.ShowLoading(false);
            var msg = "操作出错！<br/>状态码："+data.readyState
            +"<br/>状态："+data.status+"<br/>状态内容："+data.statusText
            +"<br/>反馈信息："+data.responseText;
            OcxCore.Utility.ShowError(msg);
        }
    });
}

var m_ParseBaseDate = new Date(1970, 0, 1, 0, 0, 0);

var ParseContructors = {
	Date: function(value)
	{
		var val = new Date();
		val.setTime(value + m_ParseBaseDate.getTime());
		return val;
	},
	Exception: function(value)
	{
		return new OcxCore.Exception(value.Name, value.Message);
	}
};

OcxCore.Utility.ParseJson = function(str, contructors)
{
	try
	{
		var val = JSON.parse(
			str,
			function(key, value)
			{
				if (value != null && typeof value == "object" && value.__DataType != undefined)
				{
					if (ParseContructors[value.__DataType] != undefined)
					{
						return ParseContructors[value.__DataType](value.__Value);
					}
					else if (contructors != undefined && contructors[value.__DataType] != undefined)
					{
						return contructors[value.__DataType](value.__Value);
					}
					else
					{
						return value;
					}
				}
				else
				{
					return value;
				}
			}
		);
	}
	catch (ex)
	{
		throw ex;
	}
	return val;
}

OcxCore.Utility.RenderJson = function(val)
{
	if (val == null)
	{
		return null
	}
	else if (Object.prototype.toString.apply(val) === "[object Array]")//val.constructor == Array
	{
		var builder = [];
		builder.push("[");
		for (var index in val)
		{
			if (index > 0) builder.push(",");
			builder.push(OcxCore.Utility.RenderJson(val[index]));
		}
		builder.push("]");
		return builder.join("");
	}
	else if (typeof val === "object")//val.constructor == Object
	{
		var builder = [];
		builder.push("{");
		var index = 0;
		for (var key in val)
		{
			if (index > 0) builder.push(",");
			builder.push(OcxCore.utils.stringFormat("\"{0}\":{1}", key, OcxCore.Utility.RenderJson(val[key])));
			index++;
		}
		builder.push("}");
		return builder.join("");
	}
	else if (typeof val === "boolean")//val.constructor == Boolean
	{
		return val.toString();
	}
	else if (typeof val === "number")//val.constructor == Number
	{
		return val.toString();
	}
	else if (typeof val === "string")//val.constructor == String
	{
		return OcxCore.utils.stringFormat('"{0}"', OcxCore.Utility.TransferCharForJavascript(val));
	}
	else if (val.constructor == Date)
	{
		return OcxCore.utils.stringFormat('{"__DataType":"Date","__Value":{0}}', val.getTime() - m_ParseBaseDate.getTime());
	}
	else if (val.RenderJson != undefined)
	{
		return val.RenderJson();
	}
}

OcxCore.Utility.ModifyCss = function(obj)
{
	var pre_css = (obj.className == "" ? [] : obj.className.split(/\s+/));
	var pre_css_table = {};
	for(var i in pre_css) pre_css_table[pre_css[i]] = pre_css[i];
	var del_css_table = {};
	for(var i = 1; i < arguments.length; i++)
	{
		var css = arguments[i];
		if(css == "") continue;
		if(css.substr(0, 1) == "-")
		{
			var css = css.substr(1, css.length - 1);
			del_css_table[css] = css;
		}
		else
		{ 
			if(pre_css_table[css] == undefined)
			{
				pre_css.push(css);
				pre_css_table[css] = css;
			}
			if(del_css_table[css] != undefined) 
			{
				delete del_css_table[css];
			}
		}
	}
	var new_css = [];
	for(var i in pre_css)
	{
		var css = pre_css[i];
		if(css != "" && del_css_table[css] == undefined)
		{
			new_css.push(css);
		}
	}
	obj.className = new_css.join(" ");
}

OcxCore.Utility.ContainsCss = function(a, css)
{
	var class_name = (a.className == undefined ? a : a.className);
	var nodes = class_name.split(/\s+/);
	for(var i in nodes)
	{
		if(nodes[i] == css) return true;
	}
	return false;
}

OcxCore.Utility.GetCurrentStyle = function(obj)
{
	if(obj.currentStyle != undefined)
	{
		return obj.currentStyle;
	}
	else if(document.defaultView != undefined  && document.defaultView.getComputedStyle != undefined)
	{
		return document.defaultView.getComputedStyle(obj);
	}
	return null;
}

OcxCore.Utility.GetCurrentStyleValue = function(obj, key)
{
	var current_style = OcxCore.Utility.GetCurrentStyle(obj);
	return current_style == null ? "" : current_style[key]
}

OcxCore.Utility.ParseInt = function(str)
{
	if(str == undefined) return 0;
	var val = parseInt(str);
	return (val == undefined || val == null || isNaN(val) ? 0 : val);
}

//-----路径相关start-------

OcxCore.Path = function()
{
}

OcxCore.Path.GetFullPath = function(path)
{
	return OcxCore.utils.stringFormat("/{0}/{1}", OcxCore.Session.getUserName(), path);
}

OcxCore.Path.GetRelativePath = function(parent, sub)
{
	if (parent.length > sub.length) return null;

	parentPath = parent.toUpperCase();
	subPath = sub.toUpperCase();

	if (parentPath == subPath) return "";
	var index = subPath.indexOf(parentPath);
	if (index == 0 && subPath.charAt(parentPath.length) == '/')
	{
		return sub.substr(parentPath.length + 1, subPath.length - parentPath.length);
	}
	else
	{
		return null;
	}

}

OcxCore.Path.GetFileName = function(fullName)
{
	var index = fullName.lastIndexOf("/")
	var name = (index == -1 ? fullName : fullName.substring(index + 1, fullName.length));
	return name;
}

OcxCore.Path.GetFileExtension = function(fullName)
{
	var index = fullName.lastIndexOf(".")
	var ext = (index == -1 ? "" : fullName.substring(index, fullName.length));
	return ext;
}

OcxCore.Path.GetDirectoryName = function(fullName)
{
	var index = fullName.lastIndexOf("/")
	switch (index)
	{
		case -1:
			return null;
		case 0:
			return "/";
		default:
			return fullName.substring(0, index);
	}
}

OcxCore.Path.GetFileNameNoExtention = function(fullName)
{
	var index = fullName.lastIndexOf("/")
	var name = (index == -1 ? fullName : fullName.substring(index + 1, fullName.length));
	index = name.lastIndexOf(".");
	return index == -1 ? name : name.substring(0, index);
}

OcxCore.Path.Join = function()
{
	var path = "";
	for (var i = 0; i < arguments.length; i++)
	{
		var pn = arguments[i];
		if (pn != undefined && pn != null && pn != "")
		{
			if (path != "" && pn.charAt(0) != '/' && path.charAt(path.length - 1) != '/') path += '/';
			path += pn;
		}
	}
	return path;
}
//-----路径相关end-------

//--------枚举类扩展 start--------
OcxCore.Enums = {};

OcxCore.Enums.EnumConstructor = function(name,index,code)
{
	var This = this;
	// 成员变量
    var _name = name;
    var _index = index;
	var _code = code || "";

    // get set 方法
    This.getName = function() {
        return _name;
    }

    This.getIndex = function() {
        return _index;
    }
	
	This.getCode = function() {
        return _code;
    }
    
    This.toString = function() {
        return This.getIndex() +"";
    }
}
OcxCore.Enums.Convert = function(enumObj,index)
{
	for(var i in enumObj)
	{
		if(enumObj[i].getIndex() == index)
		{
			return enumObj[i];
		}
	}
	return null;
}
OcxCore.Enums.ConvertByCode = function(enumObj,code)
{
	for(var i in enumObj)
	{
		if(enumObj[i].getCode() == code)
		{
			return enumObj[i];
		}
	}
	return null;
}
OcxCore.Enums.GetName = function(enumObj,index)
{
	for(var i in enumObj)
	{
		if(enumObj[i].getIndex() == index)
		{
			return enumObj[i].getName();
		}
	}
	return "";
}
OcxCore.Enums.GetIndex = function(enumObj,name)
{
	for(var i in enumObj)
	{
		if(enumObj[i].getName() == name)
		{
			return enumObj[i].getIndex();
		}
	}
	return "";
}
OcxCore.Enums.GetCode = function(enumObj,index)
{
	for(var i in enumObj)
	{
		if(enumObj[i].getIndex() == index)
		{
			return enumObj[i].getCode();
		}
	}
	return "";
}
/**
 * 客户端状态
 */
OcxCore.Enums.ClientStatusFlag = {
		/**
		    * 离线
		    * */
		OFFLINE:new OcxCore.Enums.EnumConstructor("离线",0),
		    /**
		    * 在线
		    * */
		ONLINE:new OcxCore.Enums.EnumConstructor("在线",1),
			/**
		    * 忙碌
		    * */
		BUSY:new OcxCore.Enums.EnumConstructor("忙碌",2),
		/**
		    * 离开
		    * */
		AWAY:new OcxCore.Enums.EnumConstructor("离开",3)
};
/**
 * 用户类型
 * */
OcxCore.Enums.UserTypeFlag ={
	/**
    * 非坐席 0
    * */
    CommonUser:new OcxCore.Enums.EnumConstructor("非坐席",0),
    /**
    * 坐席 1
    * */
	Seat:new OcxCore.Enums.EnumConstructor("坐席",1),
	/**
    * 微信用户 2
    * */
	WeiXin:new OcxCore.Enums.EnumConstructor("微信用户",2),
	/**
    * 桌面网站 3
    * */
	Web:new OcxCore.Enums.EnumConstructor("桌面网站",3),
	/**
    * 移动网站 4
    * */
	MobileWeb:new OcxCore.Enums.EnumConstructor("移动网站",4),
	/**
    * 微博 5
    * */
	WeiBo:new OcxCore.Enums.EnumConstructor("微博",5),
	/**
    * App 6
    * */
	App:new OcxCore.Enums.EnumConstructor("App",6),
	/**
    * 消息Api 7
    * */
	Api:new OcxCore.Enums.EnumConstructor("消息Api",7),
	/**
    * 其他 8
    * */
	Other:new OcxCore.Enums.EnumConstructor("其他",8),
	/**
    * 群组 9
    * */
	ChatGroup:new OcxCore.Enums.EnumConstructor("群组",9)
}

/**
 * 坐席CTI状态
 * */
OcxCore.Enums.CTIAgentStatusFlag = {
		/**
	    * 离线 0
	    * */
		STATE_OFFLINE:new OcxCore.Enums.EnumConstructor("离线",0),
		/**
	    * 空闲 1
	    * */
		STATE_FREE:new OcxCore.Enums.EnumConstructor("空闲",1),
	    /**
	    * 示忙 2
	    * */
		STATE_BUSY:new OcxCore.Enums.EnumConstructor("示忙",2),
		/**
	    * 呼入 3
	    * */
		STATE_CALLIN:new OcxCore.Enums.EnumConstructor("呼入",3),
	    /**
	    * 呼出 4
	    * */
		STATE_CALLOUT:new OcxCore.Enums.EnumConstructor("呼出",4),
		/**
	    * 通话 5
	    * */
		STATE_CALLING:new OcxCore.Enums.EnumConstructor("通话",5),
		/**
	    * 咨询 6
	    * */
		STATE_CONSULT:new OcxCore.Enums.EnumConstructor("咨询",6),
		/**
	    * 会议 7
	    * */
		STATE_CONF:new OcxCore.Enums.EnumConstructor("会议",7),
		/**
	    * 其他 8
	    * */
		STATE_OTHER:new OcxCore.Enums.EnumConstructor("其他",8),
		/**
	    * 事后整理 9
	    * */
		STATE_ENDPROC:new OcxCore.Enums.EnumConstructor("事后整理",9),
		/**
	    * 保持 10
	    * */
		STATE_KEEP:new OcxCore.Enums.EnumConstructor("保持",10)
};
//--------枚举类扩展 end--------

//--------日志记录扩展 start--------
/**
 * The OcxCore.Log logger.
 * OcxCore.Log.debug("日志内容");
 * OcxCore.Log.debug("日志内容{0}内容{1}内容",arg0,arg1);
 */
//OcxCore constants.
var OcxCore_LOGLEVEL = 5;
OcxCore.Log = {

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

	trace: function() {
		OcxCore_LOGLEVEL = OcxCore.Config != undefined && !!OcxCore.Config.LogLevel ? OcxCore.Enums.GetIndex(OcxCore.Log.Level,OcxCore.Config.LogLevel): OcxCore.Log.Level.TRACE.getIndex();
		if(OcxCore_LOGLEVEL >= OcxCore.Log.Level.TRACE.getIndex())
			OcxCore.Log.__log('TRACE', arguments); },
	debug: function() {
		OcxCore_LOGLEVEL = OcxCore.Config != undefined && !!OcxCore.Config.LogLevel ? OcxCore.Enums.GetIndex(OcxCore.Log.Level,OcxCore.Config.LogLevel): OcxCore.Log.Level.TRACE.getIndex();
		if(OcxCore_LOGLEVEL >= OcxCore.Log.Level.DEBUG.getIndex())
			OcxCore.Log.__log('DEBUG', arguments); },
	info: function() {
		OcxCore_LOGLEVEL = OcxCore.Config != undefined && !!OcxCore.Config.LogLevel ? OcxCore.Enums.GetIndex(OcxCore.Log.Level,OcxCore.Config.LogLevel): OcxCore.Log.Level.TRACE.getIndex();
		if(OcxCore_LOGLEVEL >= OcxCore.Log.Level.INFO.getIndex())
			OcxCore.Log.__log('INFO', arguments); },
	warn: function() {
		OcxCore_LOGLEVEL = OcxCore.Config != undefined && !!OcxCore.Config.LogLevel ? OcxCore.Enums.GetIndex(OcxCore.Log.Level,OcxCore.Config.LogLevel): OcxCore.Log.Level.TRACE.getIndex();
		if(OcxCore_LOGLEVEL >= OcxCore.Log.Level.WARN.getIndex())
			OcxCore.Log.__log('WARN', arguments); },
	error: function() {
		OcxCore_LOGLEVEL = OcxCore.Config != undefined && !!OcxCore.Config.LogLevel ? OcxCore.Enums.GetIndex(OcxCore.Log.Level,OcxCore.Config.LogLevel): OcxCore.Log.Level.TRACE.getIndex();
		if(OcxCore_LOGLEVEL >= OcxCore.Log.Level.ERROR.getIndex())
			OcxCore.Log.__log('ERROR', arguments); },
	fatal: function() {
		OcxCore_LOGLEVEL = OcxCore.Config != undefined && !!OcxCore.Config.LogLevel ? OcxCore.Enums.GetIndex(OcxCore.Log.Level,OcxCore.Config.LogLevel): OcxCore.Log.Level.TRACE.getIndex();
		if(OcxCore_LOGLEVEL >= OcxCore.Log.Level.FATAL.getIndex())
			OcxCore.Log.__log('FATAL', arguments); },
	
	__log: function(prefix, messageParts) {
		var clientVersion = OcxCore.Config != undefined && OcxCore.Config.ClientVersion  != undefined ? "[v"+OcxCore.Config.ClientVersion+"]":"";
		messageParts[0] = "["+prefix+"] [" + OcxCore.utils.dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss') + "] [CTIAgentSDK] " +clientVersion + "  " + messageParts[0];
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
		for(var j=0;j<OcxCore.Log.__appenders.length;j++){
			OcxCore.Log.__appenders[j].append(message,prefix);
		}
	},
	
	addAppender: function(appender) {
		OcxCore.Log.__appenders.push(appender);
	},
	Level:{
		FATAL:new OcxCore.Enums.EnumConstructor("FATAL",0),
		ERROR:new OcxCore.Enums.EnumConstructor("ERROR",1),
		WARN:new OcxCore.Enums.EnumConstructor("WARN",2),
		INFO:new OcxCore.Enums.EnumConstructor("INFO",3),
		DEBUG:new OcxCore.Enums.EnumConstructor("DEBUG",4),
		TRACE:new OcxCore.Enums.EnumConstructor("TRACE",5)
	}
}
//--------日志记录扩展 end--------

//----------弹窗口相关扩展--------------
OcxCore.DialogUtil = {};
//if(window.art != undefined || window.artDialog != undefined) OcxCore.DialogUtil.DialogPlugin = window.art != undefined ? window.art:window.artDialog;

/*弹出对话框begin========================================*/

/*关闭对话框*/
OcxCore.DialogUtil.closeDialog = function() {
    /*window.setTimeout(function () {
        if(OcxCore.DialogUtil.DialogPlugin != undefined)
        	OcxCore.DialogUtil.DialogPlugin.dialog.close();
    }, 10);*/
    return true;
}

/*
中间加载对话窗
*/
OcxCore.DialogUtil.Loading = function(bool, text,time) {
    /*var ajaxbg = $("#ocxcore_loading_background,#ocxcore_loading");
    if(ajaxbg.size() == 0)
    {
    	var loadingHtml = "<div id='ocxcore_loading_background' class='ocxcore_loading_background' style='display: none;'></div>";
    	$("body").append(loadingHtml);
    	
    	loadingHtml = "<div id='ocxcore_loading' onclick='OcxCore.DialogUtil.Loading(false);' style='display: none;'>"
    				+"  <span>正在加载…</span>"
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
}
/*
弹出对话框（带：确认按钮、取消按钮）
*/
OcxCore.DialogUtil.openDialog = function(url, _id, _title, _width, _height, callBack,_okVal,closeCallBack) {
    /*//Loading(true);
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
        zIndex: 1000000,
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
	
	return artApi;*/
}
/*
弹出对话框（带：自定义按钮）
*/
OcxCore.DialogUtil.openArtDialog = function(url, _id, _title, _width, _height, _button,closeCallBack) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
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
		        zIndex: 1000000,
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
    
    return artApi;*/
}
/*
弹出对话框（带：自定义按钮）
*/
OcxCore.DialogUtil.openArtDialog1 = function(url,artConfig) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	artConfig.zIndex = 1000000;
    var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,artConfig);
    return artApi;*/
}
/*
最大化弹出对话框（带：确认按钮、取消按钮）
*/
OcxCore.DialogUtil.FullopenDialog = function(url, _id, _title, callBack,closeCallBack) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
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
        zIndex: 1000000,
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
	return artApi;*/
}
/*
弹出对话框（没按钮）
*/
OcxCore.DialogUtil.Dialog = function(url, _id, _title, _width, _height,closeCallBack) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    //Loading(true);
    var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: true,
        title: _title,
        zIndex: 1000000,
        close:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id) === false) {
    			return false;
    		};
        	return true;
        }
    });
    return artApi;*/
}
/*
最大化弹出对话框（没按钮）
*/
OcxCore.DialogUtil.FullDialog = function(url, _id, _title,closeCallBack) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    //Loading(true);
    var artApi = OcxCore.DialogUtil.DialogPlugin.dialog.open(url,{
        id: _id,
        lock: true,
        title: _title,
        max: false,
        min: false,
        zIndex: 1000000,
        width: $(window).width() - 40,
        height: $('body').height() - 100,
        close:function(){
        	if (typeof closeCallBack === 'function' && closeCallBack(_id) === false) {
    			return false;
    		};
        	return true;
        }
    });
    return artApi;*/
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
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
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
    }*/
}
/*
警告消息
msg: 显示消息
type：类型 >1：成功，<1：失败，其他：警告
*/
OcxCore.DialogUtil.alertDialog = function(msg, type) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
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
        zIndex: 1000000,
        title: "系统提示",
        ok: function () {
            return true;
        }
    });*/
}
/*
确认对话框
*/
OcxCore.DialogUtil.confirmDialog = function(_title, msg, callBack) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
    var msg = "<div class='ui_alert'>" + msg + "</div>"
    OcxCore.DialogUtil.DialogPlugin.dialog({
        id: "confirmDialog",
        lock: true,
        icon: "question",
        content: msg,
        title: _title,
        zIndex: 1000000,
        ok: function () {
            callBack(true)
            return true;
        },
        cancel: function () {
            callBack(false)
            return true;
        }
    });*/
}

/*
内容信息框
msg: 显示消息
type：类型 >1：成功，<1：失败，其他：警告
*/
OcxCore.DialogUtil.contentDialog = function(artConfig) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
		return null;
	artConfig.zIndex = 1000000;
	var artApi = OcxCore.DialogUtil.DialogPlugin.dialog(artConfig);
    return artApi;*/
}
/*
 * 右下角滑动通知
 * */
OcxCore.DialogUtil.notice = function (options) {
	/*if(OcxCore.DialogUtil.DialogPlugin == undefined)
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
        zIndex: 1000000,
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
    
    return OcxCore.DialogUtil.DialogPlugin.dialog(config);*/
};
/*弹出对话框end========================================*/

OcxCore.IWindow = function()
{

	this.ShowDialog = function(parent) { }

	this.Show = function() { }

	this.Hide = function() { }

	this.Minimum = function() { }

	this.Close = function() { }

	this.Move = function() { }

	this.MoveEx = function() { }

	this.Resize = function() { }

	this.GetTag = function() { }

	this.SetTag = function() { }

	this.GetTitle = function() { }

	this.SetTitle = function() { }

	this.IsTop = function() { }

	this.IsVisible = function() { }

	this.BringToTop = function() { }

	this.Load = function(url, callback) { }

	this.GetHtmlWindow = function() { }

	this.OnLoad = new OcxCore.Delegate();

	this.OnResize = new OcxCore.Delegate();

	this.OnClosed = new OcxCore.Delegate();

	this.OnHidden = new OcxCore.Delegate();

	this.OnNotify = new OcxCore.Delegate();

	this.OnActivated = new OcxCore.Delegate();

	this.GetClientWidth = function() { };

	this.GetClientHeight = function() { };

	this.GetClientCoord = function() { };

	this.Notify = function() { }

	this.Waiting = function() { }

	this.Completed = function() { }

	this.CompleteAll = function() { }
}

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
	        zIndex: OcxCore.Utility.IsNull(config.zIndex, 1000000),
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


/**
 * 提示警告信息
 * */
OcxCore.Utility.ShowWarning = function(text)
{
	if(OcxCore.DialogUtil != undefined) OcxCore.DialogUtil.alertDialog(text);
	else alert(text);
}
/**
 * 提示错误信息
 * */
OcxCore.Utility.ShowError = function(text)
{
	if (OcxCore.DialogUtil != undefined) OcxCore.DialogUtil.alertDialog(text,-1);
	else alert(text);
}
/**
 * 自动关闭的提示信息
 * */
OcxCore.Utility.ShowTip = function(text,time,type)
{
	if (OcxCore.DialogUtil != undefined) OcxCore.DialogUtil.tipDialog(text, time, type);
	else alert(text);
}
/**
 * 显示或关闭加载信息
 * */
OcxCore.Utility.ShowLoading = function(bool,text,time)
{
	if (OcxCore.DialogUtil != undefined) OcxCore.DialogUtil.Loading(bool, text,time);
	//else alert(text);
}

OcxCore.Utility.ShowFloatForm = function(text, type,time1)
{
	if (OcxCore.DialogUtil != undefined){
		var icon = "";
		if(type == undefined || type == null || type == "")
		{
			icon = "warning";
		}
		else if (type >= 1) {
	        icon = "succeed";
	    } else if (type == -1) {
	        icon = "error";
	    } else {
	        icon = "warning";
	    }
		time1 = time1 != undefined && typeof time1 === "number" && time1>0 ? time1:5;
		OcxCore.DialogUtil.notice({
		    title: '消息',
		    width: 250,
		    content: text,
		    icon: icon,
		    time: time1
		});
	} 
	else alert(text);
}

/**
 * 向服务器端发送命令
 * */
OcxCore.SendCommand = function(callback, errorCallback, data, handler, isAysn,action)
{
	if (isAysn == undefined) isAysn = false;
	action = action != undefined && action != null ? action:"";

	if (isAysn)
	{
		OcxCore.Session.ResponsesCache.Start();
	}

	var postData = '<?xml version="1.0" encoding="utf-8" ?>\r\n';
	var id = OcxCore.GenerateUniqueId() + "-" + Math.round(1000000000 + Math.random() * 100000000);
	postData += OcxCore.utils.stringFormat(
		'<Command Cmd_ID="{0}" Cmd_SessionID=\"{1}" Cmd_Handler=\"{3}\" Cmd_IsAsyn=\"{4}\" Cmd_User=\"{5}\" Cmd_UserId=\"{6}\" Cmd_CompanyId=\"{7}\" Cmd_Action=\"{8}\">{2}</Command>\r\n',
		id, OcxCore.Session.getSessionID(), OcxCore.Utility.TransferCharForXML(data), handler, isAysn, OcxCore.Session.getUserName(), OcxCore.Session.getUserId(), OcxCore.Session.getCompanyId(),action
	);

	if (isAysn)
	{
		OcxCore.Session.ResponsesCache.NewCommandHandler(id, callback, errorCallback);
	}

	var post_handler = {
		onsuccess: function(status, responseText)
		{
			try
			{
				var ret = OcxCore.Utility.ParseJson(responseText);

				if (ret.IsSucceed)
				{
					if (!isAysn) callback(ret.Data);
				}
				else
				{
					if (isAysn) OcxCore.Session.ResponsesCache.InvokeErrorCallback(id);
					else errorCallback(ret.Exception);
				}
			}
			finally
			{
			}
		},
		onerror: function(status, msg)
		{
			if (isAysn) OcxCore.Session.ResponsesCache.InvokeErrorCallback(id, new OcxCore.Exception("Server Error", msg == "" ? "服务器错误!" : msg));
			else errorCallback(new OcxCore.Exception("Server Error", msg == "" ? "服务器错误!" : msg));
		},
		onabort: function()
		{
		}
	}

	OcxCore.Post(OcxCore.GetPageUrl(OcxCore.Config.CommandUrl), postData, 'text/xml', -1, post_handler);
}

/**
 * 向服务器端发送命令
 * */
OcxCore.SendCommandJsonP = function(CommandURL,action,subAction, data, handler, isAysn,callback, errorCallback)
{
	if (isAysn == undefined) isAysn = false;

	if (isAysn)
	{
		OcxCore.Session.ResponsesCache.Start();
	}

//	var postData = '<?xml version="1.0" encoding="utf-8" ?>\r\n';
	var id = OcxCore.GenerateUniqueId() + "-" + Math.round(1000000000 + Math.random() * 100000000);
//	postData += OcxCore.utils.stringFormat(
//		'<Command ID="{0}" SessionID=\"{1}" Handler=\"{3}\" IsAsyn=\"{4}\" User=\"{5}\">{2}</Command>\r\n',
//		id, OcxCore.Session.getSessionID(), OcxCore.Utility.TransferCharForXML(data), handler, isAysn, OcxCore.Session.getUserName()
//	);
	
	var postData = {
			Cmd_ID : id,
			Cmd_SessionID : OcxCore.Session.getSessionID(),
			Cmd_Handler : handler,
			Cmd_IsAsyn : isAysn,
			Cmd_User : OcxCore.Session.getUserName(),
			Cmd_UserId : OcxCore.Session.getUserId(),
			Cmd_CompanyId : OcxCore.Session.getCompanyId(),
			Cmd_CrossDomain : OcxCore.Config.CrossDomain,
			Cmd_Action : action,
			Cmd_Data : data
	}

	if (isAysn)
	{
		if (ClientMode) OcxCore.Session.ResponsesCache.NewCommandHandler(id, new CommandHandler(id, callback, errorCallback));
		else OcxCore.Session.ResponsesCache.NewCommandHandler(id, callback, errorCallback);
	}

	var post_handler = {
		onsuccess: function(status, responseText)
		{
			try
			{
				var ret = OcxCore.Utility.ParseJson(responseText);

				if (ret.IsSucceed)
				{
					if (!isAysn) callback(ret.Data);
				}
				else
				{
					if (isAysn) OcxCore.Session.ResponsesCache.InvokeErrorCallback(id);
					else errorCallback(ret.Exception);
				}
			}
			finally
			{
			}
		},
		onerror: function(status, msg)
		{
			if (isAysn) OcxCore.Session.ResponsesCache.InvokeErrorCallback(id, new OcxCore.Exception("Server Error", msg == "" ? "服务器错误!" : msg));
			else errorCallback(new OcxCore.Exception("Server Error", msg == "" ? "服务器错误!" : msg));
		},
		onabort: function()
		{
		}
	}

	OcxCore.PostJsonP(OcxCore.GetCTIAgentPageUrl(CommandURL+"/"+action+"/"+subAction), postData, 'text/json', -1, post_handler);
}

/**
 * 向WebSocket服务器端发送命令
 * */
OcxCore.SendCommandWS = function(data, handler, isAysn,callback, errorCallback ,action)
{
	isAysn = true;
	action = action != undefined && action != null ? action:"";
	/* var id = OcxCore.GenerateUniqueId() + "-" + Math.round(1000000000 + Math.random() * 100000000);
	
	var postData = {
			Cmd_ID : id,
			Cmd_SessionID : OcxCore.Session.getSessionID(),
			Cmd_Handler : handler,
			Cmd_IsAsyn : isAysn,
			Cmd_User : OcxCore.Session.getUserName(),
			Cmd_CrossDomain : OcxCore.Config.CrossDomain,
			Cmd_Data : data
	}  */
	var postData = '<?xml version="1.0" encoding="utf-8" ?>\r\n';
	var id = OcxCore.GenerateUniqueId() + "-" + Math.round(1000000000 + Math.random() * 100000000);
	postData += OcxCore.utils.stringFormat(
		'<Command Cmd_ID="{0}" Cmd_SessionID=\"{1}" Cmd_Handler=\"{3}\" Cmd_IsAsyn=\"{4}\" Cmd_User=\"{5}\" Cmd_UserId=\"{6}\" Cmd_CompanyId=\"{7}\" Cmd_Action=\"{8}\">{2}</Command>\r\n',
		id, OcxCore.Session.getSessionID(), OcxCore.Utility.TransferCharForXML(data), handler, isAysn, OcxCore.Session.getUserName(), OcxCore.Session.getUserId(), OcxCore.Session.getCompanyId(),action
	);
	var post_handler = null;
	if(callback != undefined && errorCallback != undefined && callback != null && errorCallback != null)
	{
		OcxCore.Session.ResponsesCache.NewCommandHandler(id, callback, errorCallback);
		post_handler = {
			onsuccess: function(responseText)
			{
				try
				{
					var ret = OcxCore.Utility.ParseJson(responseText);

					if (ret.IsSucceed)
					{
						if (!isAysn) callback(ret.Data);
					}
					else
					{
						OcxCore.Session.ResponsesCache.InvokeErrorCallback(id,ret.Exception);
					}
				}
				finally
				{
				}
			},
			onerror: function(msg)
			{
				OcxCore.Session.ResponsesCache.InvokeErrorCallback(id, new OcxCore.Exception("Server Error", msg == "" ? "服务器错误!" : msg));
			},
			onabort: function()
			{
			}
		}
	}
	
	OcxCore.Session.ResponsesCache.SendSocket(postData,post_handler);
}

/**
 * 命令回调函数
 * */
function CommandHandler(id, callback, errorCallback)
{
	//成功回调函数
	this.Callback = function(data, type)
	{
		if (type == "json") data = OcxCore.Utility.ParseJson(data);
		callback(data);
	}
	//失败回调函数
	this.ErrorCallback = function(data, type)
	{
		if (type == "json") data = OcxCore.Utility.ParseJson(data);
		errorCallback(data);
	}
}

/**
 * Session会话构造器
 * */
OcxCore.SessionConstructor =function()
{

	//var obj = this;

	var This = this;
	/**
	 * 业务系统客户端版本
	 * */
    This.ClientVersion ="1.0";
    /**
     * 业务系统类型AppId
     * */
    This.ClientAppId = "callcenter";
    
    This.SessionId = null;//会话ID
    This.ClientStatus=OcxCore.Enums.ClientStatusFlag.OFFLINE.getIndex();//客户端登录状态 ( 0 离线 1在线 2忙碌 3离开)
    This.CTIAgentStatus=OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex();//CTI会话状态
	This.CTIAgentSubStatus=0;//CTI会话副状态 0无小状态 2忙碌 （201到299之间为自定义小状态，如201小休。。。）
	
	var m_Cookie = null;//Cookie
	var m_IsInited = false;//是否初始化完成
    
	/**
	 * 用户主键
	 * */
    This.UserId=null;
    /**
     * 用户账号
    * */
    This.UserName=null;
    /**
     * 用户工号
    * */
    This.UserCode=null;
    
    /**
     * 用户姓名
    * */
    This.RealName=null;
    /**
     * 用户昵称
    * */
    This.NickName=null;
    /**
     * 性别
    * */
    This.Gender=null;
    /**
     * 公司Id
    * */
    This.CompanyId=null;
    /**
     * 公司编号
    * */
    This.CompanyCode=null;
    /**
     * 部门Id
    * */
    This.DepartmentId=null;
    /**
     * 用户头像
    * */
    This.Photograph=null;
    /**
     * 登录IP地址
    * */
    This.IPAddress=null;
    /**
     * 登录时间
     * */
    This.LoginDate=null;
    
    //-----------坐席相关资料-------------
    /**
     * 用户类型 0非坐席 1坐席 2微信用户 3网站游客 4群组 5其他
     * */
    This.UserType=0;
    /**
     * 坐席类型(0普通坐席 1班长坐席)
     * */
    This.SeatType=0;
    /**
     * 座席工作模式（0：呼入呼出：1：仅呼入 2：自选）
     * */
    This.WorkMode=0;
    /**
     * 座席分机(1:固定分机 2：座席自选 3：自适应)
     * */
    This.ExtMode=1;
    /**
     * 分机号码
     * */
    This.ExtNumber=null;
    /**
     * 分机的主叫号码
     * */
    This.ExtCallerNumber=null;
    /**
     * 分机的主叫号码对应中继组标识编码
     * */
    This.ExtCallerRelayGrpNo=null;
    /**
     * 接续等级
     * */
    This.Continuation=null;
    /**
     * Mac地址;
     * */
    This.MacAddress=null;
    /**
     * 超过此队列排队数量不允许置忙，设置数量大于0才生效
     * */
    This.CanSetBusyWaitCount=0;
    /**
     * 电话工具条按钮权限配置
     * */
    This.ButtonPermission=null;
    
    //----------配置相关---------------
    /**
     * CTI服务器IP
     * */
    This.CTIServerIP=null;
    /**
     * CTI服务器端口
     * */
    This.CTIServerPort=null;
    /**
     * 自动外呼地址
     * */
    This.AutoCallServer=null;
    /**
     * 显示日志级别TRACE,DEBUG,INFO,WARN,ERROR,FATAL
     * */
    This.LogLevel="TRACE";
    /**
     * 断开连接后是否自动重新签入 true 是 false 否
     * */
    This.AutoReCheckin=false;
    /**
     * 是否加密电话号码中间数字 true 是 false 否
     * */
    This.HideMiddlePhone=false;
    /**
     * 呼入时是否接通电话后才弹屏，默认fase  true 是 false 否
     * */
	This.ShowCallInPopOnTalking = false;
	/**
     * 呼出时是否接通电话后才弹屏，默认fase  true 是 false 否
     * */
	This.ShowCallOutPopOnTalking = false;
	
	//-----坐席配置信息相关（新）-------
	/**
	 * 事后整理模式，0禁用 1呼入 2呼出 3呼入呼出，默认0
	 * */
	This.EndProcMode = 0;
	/**
	 * 事后整理时长(秒)
	 * */
	This.EndProcTime = 0;
	/**
	 * 满意度调查模式，0关闭 1手动开启 2自动开启，默认0
	 * */
	This.SatisfactionMode = 0;
	/**
	 * 满意度调查失效时间,如20:00
	 * */
	This.SatisfactionEndTime = null;
	/**
	 * 签入时默认状态，1空闲 2置忙，默认2
	 * */
	This.DefaultStatus = 2;
	/**
	 * 签入时默认事后忙闲状态：0事后闲  1事后忙，默认1
	 * */
	This.DefaultEndFlag = 1;
	
	/**
	 * 最后一通电话呼叫ID
	 * */
	This.LastCallId = null;
	
	/**
	 * 离开模式转接号码
	 * */
	This.LeavePhoneNumber = null;
    
	
	//---------------属性get set方法----------------
	
    /**
	 * 业务系统客户端版本
	 * */
    This.getClientVersion=function() {
		return This.ClientVersion;
	}
    /**
	 * 业务系统客户端版本
	 * */
	This.setClientVersion=function(clientVersion) {
		This.ClientVersion = clientVersion;
	}
    /**
     * 业务系统类型AppId
     * */
    This.getClientAppId=function() {
		return This.ClientAppId;
	}
    /**
     * 业务系统类型AppId
     * */
	This.setClientAppId=function(clientAppId) {
		This.ClientAppId = clientAppId;
	}
	
	//获取会话ID
	This.getSessionID = function()
	{
		return This.SessionId;
	}
	//获取会话ID
	This.getSessionId = function()
	{
		return This.SessionId;
	}
	//获取会话ID
	This.setSessionId = function(sessionId)
	{
		This.SessionId = sessionId;
	}
	//客户端状态
	This.getClientStatus = function()
	{
		return This.ClientStatus != null ? This.ClientStatus:OcxCore.Enums.ClientStatusFlag.OFFLINE.getIndex();
	}
	//客户端状态
	This.setClientStatus = function(clientStatus)
	{
		This.ClientStatus = clientStatus;
	}
	//CTIAgent状态
	This.getCTIAgentStatus = function()
	{
		return This.CTIAgentStatus != null ? This.CTIAgentStatus:OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex();
	}
	//CTIAgent状态
	This.setCTIAgentStatus = function(cTIAgentStatus)
	{
		This.CTIAgentStatus = cTIAgentStatus;
	}
	//CTI会话副状态（ 小休。。。）
	This.getCTIAgentSubStatus = function()
	{
		return This.CTIAgentSubStatus;
	}
	//CTI会话副状态 （ 小休。。。）
	This.setCTIAgentSubStatus = function(cTIAgentSubStatus)
	{
		This.CTIAgentSubStatus = cTIAgentSubStatus;
	}
	//获取Cookie
	This.getCookie = function()
	{
		return m_Cookie;
	}
	//获取Cookie
	This.setCookie = function(cookie)
	{
		m_Cookie = cookie;
	}
	
	This.getUserId=function() {
		return This.UserId;
	}
	This.setUserId=function(userId) {
		This.UserId = userId;
	}

	/**
     * 用户姓名
    * */
    This.getRealName=function() {
		return This.RealName;
	}
	This.setRealName=function(realName) {
		This.RealName = realName;
	}
	//用户姓名
	This.getUserRealName = function()
	{
		return This.RealName;
	}
	/**
     * 用户昵称
    * */
    This.getNickName=function() {
		return This.NickName;
	}
	This.setNickName=function(nickName) {
		This.NickName = nickName;
	}
    
	/**
	 * 用户账号
	 * */
	This.getUserName=function() {
		return This.UserName;
	}
	This.setUserName=function(userName) {
		This.UserName = userName;
	}
	/**
     * 用户工号
    * */
	This.getUserCode=function() {
		return This.UserCode;
	}
	This.setUserCode=function(userCode) {
		This.UserCode = userCode;
	}

	This.getGender=function() {
		return This.Gender;
	}
	This.setGender=function(gender) {
		This.Gender = gender;
	}
	This.getCompanyId=function() {
		return This.CompanyId;
	}
	This.setCompanyId=function(companyId) {
		This.CompanyId = companyId;
	}
	This.getCompanyCode=function() {
		return This.CompanyCode;
	}
	This.setCompanyCode=function(companyCode) {
		This.CompanyCode = companyCode;
	}
	This.getDepartmentId=function() {
		return This.DepartmentId;
	}
	This.setDepartmentId=function(departmentId) {
		This.DepartmentId = departmentId;
	}
	/**
     * 用户头像
    * */
	This.getPhotograph=function() {
		return This.Photograph;
	}
	This.setPhotograph=function(photograph) {
		This.Photograph = photograph;
	}
	This.getIPAddress=function() {
		return This.IPAddress;
	}
	This.setIPAddress=function(iPAddress) {
		This.IPAddress = iPAddress;
	}
	/**
     * 登录时间
     * */
	This.getLoginDate=function() {
		return This.LoginDate;
	}
	/**
     * 登录时间
     * */
	This.setLoginDate=function(loginDate) {
		This.LoginDate = loginDate;
	}
	/**
	 * 用户类型 0非坐席 1坐席 2微信用户 3网站游客 4群组 5其他
	 * */
	This.getUserType=function() {
		return This.UserType;
	}
	This.setUserType=function(userType) {
		This.UserType = userType;
	}
	This.getSeatType=function() {
		return This.SeatType;
	}
	This.setSeatType=function(seatType) {
		This.SeatType = seatType;
	}
	
	This.getWorkMode=function() {
		return This.WorkMode;
	}
	This.setWorkMode=function(workMode) {
		This.WorkMode = workMode;
	}
	This.getExtNumber=function() {
		return This.ExtNumber;
	}
	This.setExtNumber=function(extNumber) {
		This.ExtNumber = extNumber;
	}
	/**
     * 分机选择模式(1:固定分机 2：座席自选 3：自适应)
     * */
	This.getExtMode=function() {
		return This.ExtMode;
	}
	/**
     * 分机选择模式(1:固定分机 2：座席自选 3：自适应)
     * */
	This.setExtMode=function(extMode) {
		This.ExtMode = extMode;
	}
	
	/**
     * 分机的主叫号码
     * */
	This.getExtCallerNumber=function() {
		return This.ExtCallerNumber;
	}
	This.setExtCallerNumber=function(extCallerNumber) {
		This.ExtCallerNumber = extCallerNumber;
	}
	/**
     * 分机的主叫号码对应中继组标识编码
     * */
	This.getExtCallerRelayGrpNo=function() {
		return This.ExtCallerRelayGrpNo;
	}
	This.setExtCallerRelayGrpNo=function(extCallerRelayGrpNo) {
		This.ExtCallerRelayGrpNo = extCallerRelayGrpNo;
	}
	This.getContinuation=function() {
		return This.Continuation;
	}
	This.setContinuation=function(continuation) {
		This.Continuation = continuation;
	}
	This.getMacAddress=function() {
		return This.MacAddress;
	}
	This.setMacAddress=function(macAddress) {
		This.MacAddress = macAddress;
	}
	/**
     * 超过此队列排队数量不允许置忙，设置数量大于0才生效
     * */
	This.getCanSetBusyWaitCount=function() {
		return This.CanSetBusyWaitCount;
	}
	/**
     * 超过此队列排队数量不允许置忙，设置数量大于0才生效
     * */
	This.setCanSetBusyWaitCount=function(canSetBusyWaitCount) {
		This.CanSetBusyWaitCount = canSetBusyWaitCount;
	}
	/**
     * 电话工具条按钮权限配置
     * */
	This.getButtonPermission=function() {
		return This.ButtonPermission;
	}
	/**
     * 电话工具条按钮权限配置
     * */
	This.setButtonPermission=function(buttonPermission) {
		This.ButtonPermission = buttonPermission;
	}
	
	//----------配置相关---------------
    /**
     * CTI服务器IP
     * */
	This.getCTIServerIP=function() {
		return This.CTIServerIP;
	}
	/**
     * CTI服务器IP
     * */
	This.setCTIServerIP=function(CTIServerIP) {
		This.CTIServerIP = CTIServerIP;
	}
    /**
     * CTI服务器端口
     * */
	This.getCTIServerPort=function() {
		return This.CTIServerPort;
	}
	/**
     * CTI服务器端口
     * */
	This.setCTIServerPort=function(CTIServerPort) {
		This.CTIServerPort = CTIServerPort;
	}
	
    /**
     * 自动外呼地址
     * */
	This.getAutoCallServer=function() {
		return This.AutoCallServer;
	}
	/**
     * 自动外呼地址
     * */
	This.setAutoCallServer=function(AutoCallServer) {
		This.AutoCallServer = AutoCallServer;
	}
	
    /**
     * 显示日志级别TRACE,DEBUG,INFO,WARN,ERROR,FATAL
     * */
	This.getLogLevel=function() {
		return This.LogLevel;
	}
	/**
     * 显示日志级别TRACE,DEBUG,INFO,WARN,ERROR,FATAL
     * */
	This.setLogLevel=function(LogLevel) {
		This.LogLevel = LogLevel;
		
		OcxCore.Config.LogLevel = LogLevel;
	}
	/**
     * 断开连接后是否自动重新签入 true 是 false 否
     * */
	This.getAutoReCheckin=function() {
		return This.AutoReCheckin;
	}
	/**
     * 断开连接后是否自动重新签入 true 是 false 否
     * */
	This.setAutoReCheckin=function(AutoReCheckin) {
		This.AutoReCheckin = AutoReCheckin;
	}
	/**
     * 是否加密电话号码中间数字 true 是 false 否
     * */
	This.getHideMiddlePhone=function() {
		return This.HideMiddlePhone;
	}
	/**
     * 是否加密电话号码中间数字 true 是 false 否
     * */
	This.setHideMiddlePhone=function(hideMiddlePhone) {
		This.HideMiddlePhone = hideMiddlePhone;
	}
	/**
     * 呼入时是否接通电话后才弹屏，默认fase  true 是 false 否
     * */
	This.getShowCallInPopOnTalking=function() {
		return This.ShowCallInPopOnTalking;
	}
	/**
     * 呼入时是否接通电话后才弹屏，默认fase  true 是 false 否
     * */
	This.setShowCallInPopOnTalking=function(showCallInPopOnTalking) {
		This.ShowCallInPopOnTalking = showCallInPopOnTalking;
	}
	/**
     * 呼出时是否接通电话后才弹屏，默认fase  true 是 false 否
     * */
	This.getShowCallOutPopOnTalking=function() {
		return This.ShowCallOutPopOnTalking;
	}
	/**
     * 呼出时是否接通电话后才弹屏，默认fase  true 是 false 否
     * */
	This.setShowCallOutPopOnTalking=function(showCallOutPopOnTalking) {
		This.ShowCallOutPopOnTalking = showCallOutPopOnTalking;
	}
	/**
     * CTI服务器类型 cti CTI服务器真实环境   ctiAgent cti中转网站
     * */
	This.getCTIServerType=function() {
		return OcxCore.Config.CTIServerType;
	}
	/**
     * CTI服务器类型 cti CTI服务器真实环境   ctiAgent cti中转网站
     * */
	This.setCTIServerType=function(CTIServerType) {
		
		OcxCore.Config.CTIServerType = CTIServerType;
	}
	/**
     * 拨号前缀，如号码前加9
     * */
	This.getCTIDialPrefix=function() {
		return OcxCore.Config.CTIDialPrefix;
	}
	/**
     * 拨号前缀，如号码前加9
     * */
	This.setCTIDialPrefix=function(CTIDialPrefix) {
		
		OcxCore.Config.CTIDialPrefix = CTIDialPrefix;
	}
	/**
     * 同步服务器当前时间
     * */
	This.setNowDate=function(nowDate) {
		if(OcxCore.utils.getNowDateFun != undefined)
			OcxCore.utils.getNowDateFun.setNowDate(nowDate);
	}
	
	//------坐席配置信息相关（新）-------
	/**
     * 事后整理模式，0禁用 1呼入 2呼出 3呼入呼出，默认0
     * */
	This.setEndProcMode=function(endProcMode) {
		This.EndProcMode = endProcMode;
	}
	/**
     * 事后整理模式，0禁用 1呼入 2呼出 3呼入呼出，默认0
     * */
	This.getEndProcMode=function() {
		return This.EndProcMode;
	}
	/**
     * 事后整理时长(秒)
     * */
	This.setEndProcTime=function(endProcTime) {
		This.EndProcTime = endProcTime;
	}
	/**
     * 事后整理时长(秒)
     * */
	This.getEndProcTime=function() {
		return This.EndProcTime;
	}
	/**
     * 满意度调查模式，0关闭 1手动开启 2自动开启，默认0
     * */
	This.setSatisfactionMode=function(satisfactionMode) {
		This.SatisfactionMode = satisfactionMode;
	}
	/**
     * 满意度调查模式，0关闭 1手动开启 2自动开启，默认0
     * */
	This.getSatisfactionMode=function() {
		return This.SatisfactionMode;
	}
	/**
     * 满意度调查失效时间,如20:00
     * */
	This.setSatisfactionEndTime=function(satisfactionEndTime) {
		This.SatisfactionEndTime = satisfactionEndTime;
	}
	/**
     * 满意度调查失效时间,如20:00
     * */
	This.getSatisfactionEndTime=function() {
		return This.SatisfactionEndTime;
	}
	/**
     * 签入时默认状态，1空闲 2置忙，默认2
     * */
	This.setDefaultStatus=function(defaultStatus) {
		This.DefaultStatus = defaultStatus;
	}
	/**
     * 签入时默认状态，1空闲 2置忙，默认2
     * */
	This.getDefaultStatus=function() {
		return This.DefaultStatus;
	}
	/**
     * 签入时默认事后忙闲状态：0事后闲  1事后忙，默认1
     * */
	This.setDefaultEndFlag=function(defaultEndFlag) {
		This.DefaultEndFlag = defaultEndFlag;
	}
	/**
     * 签入时默认事后忙闲状态：0事后闲  1事后忙，默认1
     * */
	This.getDefaultEndFlag=function() {
		return This.DefaultEndFlag;
	}
	
	/**
     * 最后一通电话呼叫ID
     * */
	This.setLastCallId=function(lastCallId) {
		This.LastCallId = lastCallId;
	}
	/**
     * 最后一通电话呼叫ID
     * */
	This.getLastCallId=function() {
		return This.LastCallId;
	}
	
	/**
     * 离开模式转接号码
     * */
	This.setLeavePhoneNumber=function(leavePhoneNumber) {
		This.LeavePhoneNumber = leavePhoneNumber;
	}
	/**
     * 离开模式转接号码
     * */
	This.getLeavePhoneNumber=function() {
		return This.LeavePhoneNumber;
	}
	
	
    
	/**
     * 获取坐席所属的技能组列表
     * */
	This.getGroupList=function() {
		if(This.GetGlobal("SeatGroupList") ==undefined || This.GetGlobal("SeatGroupList") == null)
			This.RegisterGlobal("SeatGroupList",new OcxCore.List());
		return This.GetGlobal("SeatGroupList");
	}
	/**
     * 添加坐席所属的技能组
     * */
	This.addGroup=function(groupId,groupName,level,sort) {
		if(This.GetGlobal("SeatGroupList") ==undefined || This.GetGlobal("SeatGroupList") == null)
			This.RegisterGlobal("SeatGroupList",new OcxCore.List());
		level = level != undefined ? level:1;
		sort = sort != undefined ? sort:1;
		This.GetGlobal("SeatGroupList").add({GroupId:groupId,GroupName:groupName,Level:level,Sort:sort});
	}
	/**
     * 清空技能组列表
     * */
	This.clearGroupList = function()
	{
		if(This.GetGlobal("SeatGroupList") ==undefined || This.GetGlobal("SeatGroupList") == null)
			This.RegisterGlobal("SeatGroupList",new OcxCore.List());
		This.GetGlobal("SeatGroupList").removeAll();
		
		if(This.getCTIAgentData() != null)
		{
			This.getCTIAgentData().getSeatGroups().clear();
		}
	}
	
	/**
     * 获取所属公司的分机号列表
     * */
	This.getExtNumberList=function() {
		if(This.GetGlobal("ExtNumberList") ==undefined || This.GetGlobal("ExtNumberList") == null)
			This.RegisterGlobal("ExtNumberList",new OcxCore.List());
		return This.GetGlobal("ExtNumberList");
	}
	/**
     * 添加所属公司的分机号
     * 
     * @param extNumber 分机号
     * @param extCaller 分机主叫号码
     * @param extCallcerRelayGrpNo 分机主叫号码对应的中继编号
     * @param extUserName 分机的使用者姓名
     * @param extCallersArr 分机的主叫号码列表
     * */
	This.addExtNumber=function(extNumber,extCaller,extCallerRelayGrpNo,extUserRealName,extCallersArr) {
		if(This.GetGlobal("ExtNumberList") ==undefined || This.GetGlobal("ExtNumberList") == null)
			This.RegisterGlobal("ExtNumberList",new OcxCore.List());
		extUserRealName = OcxCore.validator.isNotNull(extUserRealName) ? extUserRealName : "";
		extCallersArr = extCallersArr != undefined && extCallersArr.length >0 ? extCallersArr : new Array();
		var newCallers = new Array();
		for(var i=0;i<extCallersArr.length;i++)
		{
			newCallers.push({Caller:extCallersArr[i].Caller,RelayGrpNo:extCallersArr[i].RelayGrpNo,IsDefault:extCallersArr[i].IsDefault});
		}
		This.GetGlobal("ExtNumberList").add({
			ExtNumber:extNumber,
			ExtCaller:extCaller,
			ExtCallerRelayGrpNo:extCallerRelayGrpNo,
			ExtUserRealName:extUserRealName,
			ExtCallers:newCallers
		});
	}
	/**
     * 清空分机号列表
     * */
	This.clearExtNumberList = function()
	{
		if(This.GetGlobal("ExtNumberList") ==undefined || This.GetGlobal("ExtNumberList") == null)
			This.RegisterGlobal("ExtNumberList",new OcxCore.List());
		This.GetGlobal("ExtNumberList").removeAll();
	}
	
	/**
     * 获取所属公司的置忙小状态列表
     * */
	This.getBusySubStateList=function() {
		if(This.GetGlobal("BusySubStateList") ==undefined || This.GetGlobal("BusySubStateList") == null)
			This.RegisterGlobal("BusySubStateList",new OcxCore.List());
		return This.GetGlobal("BusySubStateList");
	}
	/**
     * 获取指定置忙小状态信息
     * */
	This.getBusySubStateById=function(subState) {
		var busySubStateList = This.getBusySubStateList();
		for(var i=0;i<busySubStateList.size();i++)
		{
			if(busySubStateList.get(i).getSubState() == subState)
				return busySubStateList.get(i);
		}
		return null;
	}
	/**
     * 添加所属公司的置忙小状态
     * 
     * @param subState 小状态值，只能为201~299之间的整形数字
     * @param subStateName 小状态名称，如小休、开会、培训
     * @param companyId 公司ID
     * @param enabled 是否启用
     * @param icon 小状态图标
     * */
	This.addBusySubState=function(subState,subStateName,companyId,enabled,icon) {
		subStateName = OcxCore.validator.isNotNull(subStateName) ? subStateName : "";
		This.getBusySubStateList().add(new OcxCore.Model.BusySubStateModel(subState,subStateName,companyId,enabled,icon));
	}
	/**
     * 清空置忙小状态列表
     * */
	This.clearBusySubStateList = function()
	{
		if(This.GetGlobal("BusySubStateList") ==undefined || This.GetGlobal("BusySubStateList") == null)
			This.RegisterGlobal("BusySubStateList",new OcxCore.List());
		else
			This.GetGlobal("BusySubStateList").removeAll();
	}
	
	/**
     * 获取所使用的分机主叫号码列表
     * */
	This.getCallerNumberList=function() {
		if(This.GetGlobal("CallerNumberList") ==undefined || This.GetGlobal("CallerNumberList") == null)
			This.RegisterGlobal("CallerNumberList",new OcxCore.List());
		return This.GetGlobal("CallerNumberList");
	}
	/**
     * 添加所使用的分机主叫号码
     * 
     * @param extCaller 分机主叫号码
     * @param extCallcerRelayGrpNo 分机主叫号码对应的中继编号
     * @param isDefault 是否是默认主叫号码
     * */
	This.addCallerNumber=function(extCaller,extCallerRelayGrpNo,isDefault) {
		if(This.GetGlobal("CallerNumberList") ==undefined || This.GetGlobal("CallerNumberList") == null)
			This.RegisterGlobal("CallerNumberList",new OcxCore.List());
		if(OcxCore.validator.isNull(extCaller) || OcxCore.validator.isNull(extCallerRelayGrpNo) || OcxCore.validator.isNull(isDefault))
		{
			return;
		}
		isDefault = isDefault == 1 || isDefault == true ? 1:0;
		This.GetGlobal("CallerNumberList").add({Caller:extCaller,RelayGrpNo:extCallerRelayGrpNo,IsDefault:isDefault});
	}
	/**
     * 清空所使用的分机主叫号码列表
     * */
	This.clearCallerNumberList = function()
	{
		if(This.GetGlobal("CallerNumberList") ==undefined || This.GetGlobal("CallerNumberList") == null)
			This.RegisterGlobal("CallerNumberList",new OcxCore.List());
		This.GetGlobal("CallerNumberList").removeAll();
	}
    
//	/**
//	 * 重置信息
//	 * 
//	 * */
//	This.Reset = function( userId, userName, realName,
//			 gender, userType, seatType, companyId, departmentId, photograph,
//			 IP, extNumber, continuation, macAddress, workMode, canSetBusyWaitCount, ClientVersion, ClientAppId, userInfo)
//	{
//		this.UserId = userId;
//		this.UserName = userName;
//		this.RealName = realName;
//		this.Gender = gender;
//		this.UserType = userType;
//		this.SeatType = seatType;
//		this.CompanyId = companyId;
//		this.DepartmentId = departmentId;
//		this.Photograph = photograph;
//		this.IPAddress = IP;
//		this.WorkMode = workMode;
//		this.ExtNumber = extNumber;
//		this.Continuation = continuation;
//		this.MacAddress = macAddress;
//		this.CanSetBusyWaitCount = canSetBusyWaitCount;
//		this.ClientVersion =ClientVersion;//业务系统客户端版本
//		this.ClientAppId = ClientAppId;//业务系统类型AppId
//		
//		//this.CTIAgentSessionID = _CTIAgentSessionID;
//		if(userInfo != null)
//		{
//			if(userInfo.customerid != undefined)
//			{
//				this.CustomerId = userInfo.customerid;
//			}
//		}
//			
//	}
	
	
	var m_AgentData = null;
	var m_GroupManagement = null;
	var GlobalHandler = {};
	
	var is_online_ = false;//是否客户端是否在线（如果与服务器断开连接则不在线）
	var err_count_ = 1;
	
	
	This.AfterInitService = new OcxCore.Delegate();
	This.onAfterInitService = function(fun)
	{
		if(fun != undefined && fun != null)
			This.AfterInitService.Attach(fun);
	}
	
	//初始化会话服务
	This.InitService = function()
	{
		try
		{
			//属性默认值处理
		    This.Gender= OcxCore.validator.isNotNull(This.Gender) ? This.Gender:"男";//性别
		    //头像
		    if(OcxCore.validator.isNull(This.Photograph))
		    {
		    	if (This.Gender == "男") {
		    		This.Photograph = OcxCore.GetResPageUrl("images/headPhoto/male.png");
		        }else
		        {
		        	This.Photograph = OcxCore.GetResPageUrl("images/headPhoto/female.png");
		        }
		    }
		    This.SessionId = OcxCore.validator.isNotNull(This.SessionId) ? This.SessionId :OcxCore.Utility.GetUUID().toUpperCase();
		    This.UserType= This.UserType != undefined ? This.UserType : 1;//用户类型 0非坐席 1坐席 2微信用户 3网站游客 4群组 5其他
		    This.Continuation= OcxCore.validator.isNotNull(This.Continuation) ? This.Continuation : 1;//接续等级
		    //工号
		    if(OcxCore.validator.isNull(This.UserCode))
		    {
		    	This.UserCode = This.UserName;
		    }
		    //用户账号
		    if(OcxCore.validator.isNull(This.UserName))
		    {
		    	This.UserName = This.UserCode;
		    }
		    //用户昵称
		    if(OcxCore.validator.isNull(This.NickName))
		    {
		    	This.NickName = This.RealName;
		    }
		    
		    //电话工具条按钮权限配置
		    This.ButtonPermission= OcxCore.validator.isNotNull(This.ButtonPermission) ? This.ButtonPermission : "Checkin,Checkout,SetIdle,SetBusy,Answer,Hangup,StartEndProc,Satisfaction,Return,SetEndidle,SetEndbusy,MakeCall,Consult,Transfer,Keep,Conference,Monitor,Listen,ForceEnter,ForceRemove,ForceSetIdle,ForceSetBusy,MoniterConf,SendTipMsg,ForceCheckOut,LeaveMode";//
		    This.LogLevel= OcxCore.validator.isNotNull(This.LogLevel) ? This.LogLevel : "TRACE";//显示日志级别
		    OcxCore.Config.CTIServerType = OcxCore.validator.isNotNull(OcxCore.Config.CTIServerType) && OcxCore.Config.CTIServerType == "ctiAgent" ? OcxCore.Config.CTIServerType : "cti";//CTI服务器类型 cti CTI服务器真实环境   ctiAgent cti模拟器
			
		    if(!m_IsInited && OcxCore.Model != undefined && OcxCore.Model.CTIAgentDataModel != undefined)
		    {
		    	m_AgentData = new OcxCore.Model.CTIAgentDataModel(This.getSessionId());
		    }
		    if(!m_IsInited && OcxCore.Model != undefined && OcxCore.Model.GroupManagement != undefined)
		    {
		    	m_GroupManagement = new OcxCore.Model.GroupManagement();
		    }
			
			This.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex());
			if(m_AgentData != null) m_AgentData.InitDefault();
			This.setClientStatus(OcxCore.Enums.ClientStatusFlag.ONLINE.getIndex());
			
			if(!m_IsInited)
			{
				This.AfterInitService.Call();
			}
			else
			{
				//服务开始后回调函数
				if (OcxCore.Session.GetGlobal("StartServiceCallback") != null) 
				{
					OcxCore.Session.GetGlobal("StartServiceCallback").Call();
				}
			}
			m_IsInited = true;
			
			OcxCore.Session.WriteLog("客户端初始化服务完成！客户端版本号："+OcxCore.Config.ClientVersion+"     m_UserName："+This.UserName+"  m_UserCode："+This.UserCode+" m_UserId："
					+This.UserId+" ClientStatus:"+This.getClientStatus()+"   m_SessionID："+This.SessionId);
			
			OcxCore.Log.trace("CTI服务器IP："+This.getCTIServerIP()+",端口："+This.getCTIServerPort() +",  CTI服务器类型："+(This.getCTIServerType() == 'cti' ? "CTI服务器":"CTI中转网站"));
			
			return true;
		}catch(e)
		{
			OcxCore.Log.error("初始化会话服务失败："+e.message);
			
			OcxCore.DialogUtil.tipDialog("初始化会话服务失败："+e.message, 3);
			return false;
		}
	}
	/**
	 * 启动心跳连接
	 * */
	This.StartHeartBeat = function()
	{
		OcxCore.Session.ResponsesCache.Start();
	}
	/**
	 * 停止心跳连接
	 * */
	This.StopHeartBeat = function()
	{
		OcxCore.Session.ResponsesCache.Stop();
	}
	/**
	 * 获取CTIAgent会话数据
	 * */
	This.getCTIAgentData = function()
	{
		return m_AgentData;
	}
	/**
	 * 获取CTIAgent会话数据
	 * */
	This.setCTIAgentData = function( agentData)
	{
		 m_AgentData = agentData;
	}
	/**
	 * 获取技能组管理类
	 * */
	This.getGroupManagement = function()
	{
		return m_GroupManagement;
	}
	/**
	 * 获取技能组管理类
	 * */
	This.setGroupManagement = function(groupManagement)
	{
		m_GroupManagement = groupManagement;
	}
	//是否在线（隐身）
	This.IsOnline = function()
	{
		return This.ClientStatus != null && This.ClientStatus > OcxCore.Enums.ClientStatusFlag.OFFLINE.getIndex() ? true:false;
	}
	//是否已签入CTI服务器
	This.IsCheckin = function()
	{
		return This.CTIAgentStatus != null && This.CTIAgentStatus != OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex() ? true:false;
	}
	
	//CTI连接状态 true正常 false 断开
	This.IsCTIConnected = function()
	{
		if(OcxCore.cti != undefined && OcxCore.cti.CTIServerImpl != undefined)
			return OcxCore.cti.CTIServerImpl.IsConnected();
		else
			return false;
		//return m_CTIConnected != null ? m_CTIConnected:false;
	}
	//是否初始化完成
	This.IsInited = function()
	{
		return m_IsInited;
	}
//	//重新设置用户信息
//	This.ResetUserInfo = function(info)
//	{
//		m_UserInfo = info;
////		m_UserId = info != null && info.UserId !=null ? info.UserId : null;//用户ID
////		m_CompanyId = info != null && info.CompanyId !=null ? info.CompanyId : null;//公司ID
////		m_SessionID = info != null && info.CTIAgentSessionID !=null ? info.CTIAgentSessionID : null;//会话ID
//		
//		OcxCore.Session.GetGlobal("WindowManagement").Notify("CurrentUserStateChanged", info);
//	}
	
	//重置会话
	This.Reset = function()
	{
//		m_UserName = null;
//		m_UserRealName = null;
//		m_UserId = null;//用户ID
//		m_CompanyId = null;//公司ID
//		
//		m_UserInfo = null;
//		m_CTIAgentInfo = null;
//		m_SessionID = null;
//		m_Cookie = null;
	}
	//记录日志
	This.WriteLog = function(log)
	{
		try
		{
			OcxCore.Log.debug(log);
			//OcxCore.OutputPanel.GetHtmlWindow().Write(log);
		}
		catch (ex)
		{
			
		}
	}

	var m_GlobalObject = {};
	//注册全局变量
	This.RegisterGlobal = function(key, value)
	{
		m_GlobalObject[key.toUpperCase()] = value;
	}
	//删除全局变量
	This.RemoveGlobal = function(key)
	{
		delete m_GlobalObject[key.toUpperCase()];
	}
	//获取全局变量
	This.GetGlobal = function(key)
	{
		return m_GlobalObject[key.toUpperCase()] == undefined ? null : m_GlobalObject[key.toUpperCase()];
	}
	//绑定事件
	/**
	 * 解绑事件
	 * 
	 * @param evt 事件名
	 * @param fun 回调函数
	 * */
	This.bind = function(evt,fun)
	{
		var evtCallbak = This.GetGlobal(evt);
		if(evtCallbak !=undefined && evtCallbak != null)
			evtCallbak.Attach(fun);
	}
	/**
	 * 解绑事件
	 * 
	 * @param evt 事件名
	 * @param fun 回调函数，如果为空则解绑此事件所有回调函数
	 * */
	This.unbind = function(evt,fun)
	{
		var evtCallbak = This.GetGlobal(evt);
		if(evtCallbak !=undefined && evtCallbak != null)
		{
			if(fun !=undefined && fun != null)
			{
				evtCallbak.Detach(fun);
			}
			else
			{
				evtCallbak.DetachAll();
			}
		}	
	}
	
	//重新设置Config参数
	This.ResetConfig = function(confKey,confValue)
	{
		if(OcxCore.Config[confKey] !=undefined)
			OcxCore.Config[confKey] = confValue;
	}
	//获取Config参数
	This.getConfig = function(confKey)
	{
		if(OcxCore.Config[confKey] !=undefined)
			return OcxCore.Config[confKey];
		else
			return null;
	}
	//处理信息
	This.Send = function(commandID,data)
	{
		var ret = {
				IsSucceed:true,
				Responses:[{
					CommandID:commandID,
					Data:data
				}]
		};
		
		try
		{
			OcxCore.Session.GetGlobal("ReponsesProcess").Process(ret);
		}
		catch (ex)
		{
		}
	}
	
	//响应缓存类
	This.ResponsesCache = (function()
	{
		var CommandCallbackCache = {};//命令回调函数缓存集

		var obj = {};

		var baseTime = new Date(2009, 0, 1);

		var m_Controler = null;
		var m_Stop = false;
		var m_IsRunning = false;
		var m_websocketController = null;//WebSocket连接对象
		//WebSocket连接对象
		obj.getWebsocketController = function(){
			return m_websocketController;
		}
		//新建命令回调函数
		obj.NewCommandHandler = function(id, callback, errorCallback)
		{
			var handler = new CommandHandler(id, callback, errorCallback)
			CommandCallbackCache[id] = handler;
		}
		//获取命令ID调用成功回调函数
		obj.InvokeCallback = function(cmdid, data)
		{
			if (CommandCallbackCache[cmdid] != undefined)
			{
				CommandCallbackCache[cmdid].Callback(data);
				delete CommandCallbackCache[cmdid];
			}
		}
		//获取命令ID调用失败回调函数
		obj.InvokeErrorCallback = function(cmdid, data)
		{
			if (cmdid == "all")
			{
				var callbacks = CommandCallbackCache;

				CommandCallbackCache = {};

				for (var key in callbacks)
				{
					try
					{
						callbacks[key].ErrorCallback(data);
					}
					catch (ex)
					{
					}
				}
			}
			else
			{
				if (CommandCallbackCache[cmdid] != undefined)
				{
					CommandCallbackCache[cmdid].ErrorCallback(data);
					delete CommandCallbackCache[cmdid];
				}
			}
		}
		//判断会话是否还在连接
		obj.IsRunning = function()
		{
			return m_IsRunning;
		}
		//启动“心跳”连接，接收服务器信息
		obj.Start = function()
		{
			if (!m_IsRunning)
			{
				m_IsRunning = true;
				m_Stop = false;
				if(OcxCore.Config.WebConnectMode != undefined && OcxCore.Config.WebConnectMode == "socket")
				{
					obj.getWebsocketController().init();
					OcxCore.Session.WriteLog("启动网站客户端websocket心跳连接...");
				}
				else
				{
					Send();//http方式连接
					OcxCore.Session.WriteLog("启动网站客户端http心跳连接...");
				}
			}
		}
		//停止“心跳”连接，停止接收服务器信息
		obj.Stop = function()
		{
			m_Stop = true;
			if(OcxCore.Config.WebConnectMode != undefined && OcxCore.Config.WebConnectMode == "socket")
			{
				obj.getWebsocketController().closeSocketConnect();
				OcxCore.Session.WriteLog("停止网站客户端websocket心跳连接...");
			}
			else
			{
				if (m_Controler != null) m_Controler.Abort();
				OcxCore.Session.WriteLog("停止网站客户端http心跳连接...");
			}
		}
		//发送“心跳”请求，接收服务器信息
		function Send()
		{
			if (m_Stop)
			{
				m_IsRunning = false;
				return;
			}

			var RequestID = OcxCore.GenerateUniqueId();

			var data = OcxCore.utils.stringFormat('RequestID={0}&SessionID={1}&User={2}&UserId={3}&CompanyId={4}&ClientMode=false&ServerVersion={5}&ClientVersion={6}', RequestID, OcxCore.Session.getSessionId(), OcxCore.Session.getUserName(), OcxCore.Session.getUserId(), OcxCore.Session.getCompanyId(), OcxCore.Config.ServerVersion, OcxCore.Config.ClientVersion);

			var post_handler = {
				onsuccess: function(status, responseText)
				{
					if(err_count_ > 0)
					{
						err_count_ = 0;
						is_online_ = true;
					}
					try
					{
						OcxCore.Session.GetGlobal("ReponsesProcess").Process(responseText);
					}
					catch (ex)
					{
					}
					setTimeout(Send, 10);
				},
				onerror: function(status, msg)
				{
					err_count_ ++;
					if(err_count_ == 3)
					{
						is_online_ = false;
						if(msg !=undefined && msg != null && msg != "")
						{
							var ex = new OcxCore.Exception("服务器反馈错误", msg);
							OcxCore.Utility.ShowFloatForm(ex.toString(), "text");
						}
					}
					try
					{
						if(msg !=undefined && msg != null && msg != "")
						{
							var ex = new OcxCore.Exception("服务器反馈错误", msg);
							OcxCore.Session.ResponsesCache.InvokeErrorCallback("all", ex);
						}
					}
					catch (ex)
					{
					}
					setTimeout(Send, 5000);
				},
				onabort: function()
				{
					OcxCore.Session.WriteLog("Abort");
					setTimeout(Send, 10);
				}
			};
			
			var heartbeatResponseUrl = "";
			if(OcxCore.Config.ResponseUrl.indexOf("http://") >=0 || OcxCore.Config.ResponseUrl.indexOf("https://") >=0)
			{
				heartbeatResponseUrl = OcxCore.Config.ResponseUrl;
			}
			else
			{
				heartbeatResponseUrl = OcxCore.GetPageUrl(OcxCore.Config.ResponseUrl);
			}
			
			m_Controler = OcxCore.Post(heartbeatResponseUrl + "?ID=" + RequestID,
				data, 'application/x-www-form-urlencoded', 2 * 60 * 1000,
				post_handler,true
			);
		}
		
		
		//发送“心跳”请求，接收服务器信息(WebSocket)
		obj.SendSocket = function(postData,post_handler)
		{
			if (!m_IsRunning)
			{
				m_IsRunning = true;
				m_Stop = false;
			}
			try
			{
				var sendResult = obj.getWebsocketController().sendMessage(postData);
				//OcxCore.Log.trace("websocket发送消息到Web服务器："+postData);
				if(!sendResult)
				{
					if(post_handler != undefined && post_handler.onerror != undefined) post_handler.onerror("无法连接到服务器");
				}
			}
			catch(e)
			{
				if(post_handler != undefined && post_handler.onerror != undefined) post_handler.onerror("无法连接到服务器："+e.message);
			}
		}
		//WebsocketController控制器
		obj.getWebsocketController = function()
		{
			if(m_websocketController == undefined || m_websocketController == null)// || m_Stop || !is_online_
			{
				m_websocketController = new obj.initWebSocket();
			}
			return m_websocketController;
		}
		/**
		 * 初始话WebSocket
		 * */
		obj.initWebSocket=function() {
			var wsObj = this;
			var _websocket = null;
			var _initStatus = -1;// -2 不支持WebSocket -1未初始化 0连接关闭  1初始化中 2 连接成功
			var _sendMsgCache = new OcxCore.Map();
			//websocket对象
			wsObj.getWebSocket = function(){
				return _websocket;
			}
			//连接成功
			wsObj.onopen = function(){
				_sendMsgCache.each(function(key,value,index){
					_websocket.send(value);
				});
				_sendMsgCache.clear();
				
				//停止断开自动重连
				wsObj.hearCheck.stopReconnect();
				//启动心跳检测
				wsObj.hearCheck.startHeartBeat();
				OcxCore.Log.trace("Web网站客户端websocket心跳检测已启动...");
				
				//心跳连接状态变化回调函数
				if(OcxCore.Session.GetGlobal("onConnectStateChange") != undefined)
					OcxCore.Session.GetGlobal("onConnectStateChange").Call(wsObj.hearCheck.connectState,wsObj);
			};
			wsObj.onNoSupport = new OcxCore.Delegate();//不支持WebSocket
			
			wsObj.init = function(){
				//连接关闭
				if((is_online_ || _initStatus == 2) && _websocket != null && _websocket.readyState > 1)
				{
					is_online_ = false;
					_initStatus = 0;
				}
				if(is_online_ || _initStatus == 1 || (_websocket != null && _websocket.readyState == 1)) return true;
				if (window.WebSocket) {
					var socketRootPath = OcxCore.RootPath != undefined && OcxCore.RootPath != null ? OcxCore.RootPath.replace("http://","").replace("https://",""):"";
					var RequestID = OcxCore.GenerateUniqueId();
					var socketURL = "";
					if(OcxCore.Config.WebConnectUrl != undefined && OcxCore.Config.WebConnectUrl != "")
					{
						if(OcxCore.Config.WebConnectUrl.indexOf("ws://") >=0 || OcxCore.Config.WebConnectUrl.indexOf("wss://") >=0)
						{
							socketURL = OcxCore.Config.WebConnectUrl;
						}
						else
						{
							socketURL = "ws://"+socketRootPath+(OcxCore.Config.WebConnectUrl.indexOf("/")==0 ? "":"/")+OcxCore.Config.WebConnectUrl;
						}
					}
					else
					{
						socketURL = "ws://"+socketRootPath+"/wsSrv";
					}
					socketURL = socketURL+(socketURL.indexOf("?")>=0 ? "&":"?")+"RequestID="+RequestID+"&SessionID="+OcxCore.Session.getSessionId()+"&User="+OcxCore.Session.getUserName()+"&UserId="+OcxCore.Session.getUserId()+"&CompanyId="+OcxCore.Session.getCompanyId()+"&ClientMode=false&ServerVersion="+OcxCore.Config.ServerVersion+"&ClientVersion="+OcxCore.Config.ClientVersion;
					_initStatus = 1;
					_websocket = new WebSocket(encodeURI(socketURL));
					_websocket.onopen = function() {
						if(err_count_ > 0)
						{
							err_count_ = 0;
						}
						is_online_ = true;
						_initStatus = 2;
						wsObj.hearCheck.connectState = 1;
						OcxCore.Log.trace("websocket连接Web服务器成功！");
						wsObj.onopen();
					}
					_websocket.onerror = function(e) {
						is_online_ = false;
						_initStatus = 0;
						OcxCore.Log.trace("websocket连接Web服务器发生错误！");
					}
					_websocket.onclose = function(e) {
						is_online_ = false;
						_initStatus = 0;
						//连接断开
						OcxCore.Log.trace("websocket与Web服务器断开连接！相关信息：code:"+e.code+",reason:"+e.reason+",wasClean:"+e.wasClean);
						//停止心跳检测
						wsObj.hearCheck.stopHeartBeat();
						//重连超过50次停止重连
						if(wsObj.hearCheck.reconnectCount <wsObj.hearCheck.maxReconnectCount && !m_Stop)
						{
							//启动断开自动重连
							wsObj.hearCheck.startReconnect();
						}
						else
						{
							//停止断开自动重连
							wsObj.hearCheck.stopReconnect();
						}
						
						err_count_ ++;
						if(err_count_ == 3)
						{
							err_count_ = 0;
							var ex = new OcxCore.Exception("服务器反馈错误", "无法连接到服务器");
							OcxCore.Utility.ShowFloatForm(ex.toString(), "text");
						}
						//心跳连接状态变化回调函数
						if(OcxCore.Session.GetGlobal("onConnectStateChange") != undefined)
							OcxCore.Session.GetGlobal("onConnectStateChange").Call(wsObj.hearCheck.connectState,wsObj);
					}
					//消息接收
					_websocket.onmessage = function(message) {
						try
						{
							if(message != undefined && message != null && message !='')
							{
								OcxCore.Log.trace("websocket接收到的Web服务器消息："+message.data);
								var dat = JSON.parse(message.data) || {};
								OcxCore.Session.GetGlobal("ReponsesProcess").Process(dat,true);
								//wsObj.onmessage.Call(message.data);
							}
						}
						catch(e)
						{
							
						}
					}
					
					return true;
				}
				else
				{
					is_online_ = false;
					_initStatus = -2;
					OcxCore.Log.trace("浏览器客户端不支持WebSocket连接！");
					wsObj.onNoSupport.Call();
					return false;
				}
			}
			//心跳检测
			wsObj.hearCheck = {
				hearBeatTimeout:20 * 1000,//心跳超时时长
				hearBeatTimeoutObj:null,
				heatBeatCmdHandler:"com.callcenter.core.cct.web WebApp_CH",//心跳检测处理类
				reconnectTimeout:20 * 1000,//重连超时时长
				reconnectCount:0,//重连次数，重连超过maxReconnectCount次数停止重连
				maxReconnectCount:2160,//最大重连次数，超过后停止重连（最大2160次12小时）
				connectState:0,//0 连接关闭 1已连接 2重连中
				reconnectTimeoutObj:null,
				getHeartbeatTimeout:function(){
					return OcxCore.Config.WebHeartbeatTimeout != undefined ? OcxCore.Config.WebHeartbeatTimeout * 1000 : wsObj.hearCheck.hearBeatTimeout;
				},//心跳超时时长
				//启动心跳检测
				startHeartBeat:function(){
					if(wsObj.hearCheck.hearBeatTimeoutObj != null)
						clearTimeout(wsObj.hearCheck.hearBeatTimeoutObj);
					setTimeout(function(){
						wsObj.sendSocketHeartBeat();
					}, 100);
					wsObj.hearCheck.hearBeatTimeoutObj=setTimeout(function(){
						wsObj.hearCheck.startHeartBeat();
					}, wsObj.hearCheck.getHeartbeatTimeout());
				},
				//停止心跳检测
				stopHeartBeat:function(){
					if(wsObj.hearCheck.hearBeatTimeoutObj != null)
					{
						clearTimeout(wsObj.hearCheck.hearBeatTimeoutObj);
						wsObj.hearCheck.hearBeatTimeoutObj = null;
						OcxCore.Log.trace("Web网站客户端websocket心跳检测已停止...");
					}
				},
				//启动断开自动重连
				startReconnect:function(){
					if(wsObj.hearCheck.reconnectTimeoutObj != null)
						clearTimeout(wsObj.hearCheck.reconnectTimeoutObj);
					if(wsObj.hearCheck.connectState !=2 || wsObj.hearCheck.reconnectCount == wsObj.hearCheck.maxReconnectCount)
					{
						wsObj.hearCheck.reconnectCount = 0;
					}
					wsObj.hearCheck.connectState = 2;//0 连接关闭 1已连接 2重连中
					wsObj.hearCheck.reconnectCount++;
					OcxCore.Log.trace("Web网站客户端websocket断开自动重连中..."+wsObj.hearCheck.reconnectCount);
					if(wsObj.hearCheck.reconnectCount == 1)
					{
						setTimeout(function(){
							wsObj.init();
						}, 500);
					}
					else
					{
						wsObj.hearCheck.reconnectTimeoutObj=setTimeout(function(){
							wsObj.init();
						}, wsObj.hearCheck.reconnectTimeout);
					}
					
				},
				//停止断开自动重连
				stopReconnect:function(){
					if(wsObj.hearCheck.reconnectTimeoutObj != null)
					{
						clearTimeout(wsObj.hearCheck.reconnectTimeoutObj);
						wsObj.hearCheck.reconnectTimeoutObj = null;
					}
					if(wsObj.hearCheck.connectState == 2)
					{
						wsObj.hearCheck.connectState = 0;
						OcxCore.Log.trace("Web网站客户端websocket断开自动重连已停止...");
					}	
					wsObj.hearCheck.reconnectCount = 0;
				}
			}
			//发送心跳消息
			wsObj.sendSocketHeartBeat = function(){
				try{
					if(_initStatus == -2 || _initStatus == 1 || !is_online_ || m_Stop)
					{
						return;
					}
					//连接关闭
					if((is_online_ || _initStatus == 2) && _websocket != null && _websocket.readyState > 1)
					{
						is_online_ = false;
						_initStatus = 0;
						return;
					}
					var data = {
						Action:"HeartBeat",
						SessionID:OcxCore.Session.getSessionId(),
						User:OcxCore.Session.getUserName(),
						UserId:OcxCore.Session.getUserId(),
						CompanyId:OcxCore.Session.getCompanyId(),
						ClientMode:false,
						ServerVersion:OcxCore.Config.ServerVersion,
						ClientVersion:OcxCore.Config.ClientVersion
					};
					
					var postData = '<?xml version="1.0" encoding="utf-8" ?>\r\n';
					var id = OcxCore.GenerateUniqueId() + "-" + Math.round(1000000000 + Math.random() * 100000000);
					postData += OcxCore.utils.stringFormat(
						'<Command Cmd_ID="{0}" Cmd_SessionID=\"{1}" Cmd_Handler=\"{3}\" Cmd_IsAsyn=\"{4}\" Cmd_User=\"{5}\" Cmd_UserId=\"{6}\" Cmd_CompanyId=\"{7}\" Cmd_Action=\"{8}\">{2}</Command>\r\n',
						id, OcxCore.Session.getSessionID(), OcxCore.Utility.RenderJson(data), wsObj.hearCheck.heatBeatCmdHandler, true, OcxCore.Session.getUserName(), OcxCore.Session.getUserId(), OcxCore.Session.getCompanyId(),"HeartBeat"
					);
					
					if((is_online_ || _initStatus == 2) && _websocket != null && _websocket.readyState == 1)
					{
						_websocket.send(postData);
					}
					//OcxCore.Log.trace("websocket发送心跳消息到Web服务器："+OcxCore.Utility.RenderJson(data));
				}
				catch(e)
				{
					
				}
			}
			//发送消息
			wsObj.sendMessage = function(msg)
			{
				if(_initStatus == -2 || m_Stop)
				{
					return false;
				}
				//连接关闭
				if((is_online_ || _initStatus == 2) && _websocket != null && _websocket.readyState > 1)
				{
					is_online_ = false;
					_initStatus = 0;
				}
				if(is_online_ || _initStatus == 2)
				{
					_websocket.send(msg);
					return true;
				}
				else if(_initStatus == 1)
				{
					_sendMsgCache.put(OcxCore.Utility.GetUUID(),msg);
					return true;
				}
				else
				{
					_sendMsgCache.put(OcxCore.Utility.GetUUID(),msg);
					return wsObj.init();
				}
			}
			//关闭websocket连接
			wsObj.closeSocketConnect = function()
			{
				try
				{
					//停止断开自动重连
					wsObj.hearCheck.stopReconnect();
					wsObj.hearCheck.connectState = 0;
					//停止心跳检测
					wsObj.hearCheck.stopHeartBeat();
					if(_websocket != undefined && _websocket != null && (is_online_ || _initStatus == 2))
					{
						_initStatus = 0;
						is_online_ = false;
						if( _websocket.readyState == 1)
						{
							_websocket.close(1000,"客户端主动关闭连接");
						}
					}
					
				}
				catch(e)
				{
					
				}
				_websocket = null;
			};
			
			return wsObj;
		};

		return obj;

	})();
}


OcxCore.Session = new OcxCore.SessionConstructor();

var WindowManagement = (function()
{
	var m_All = [];
	
	var obj = {};
	
	obj.Add = function(win)
	{
		m_All.push(win);
	}
	
	obj.Remove = function(win)
	{
		var i = 0;
		for(;i<m_All.length && m_All[i] != win;i++);
		if(i<m_All.length) m_All.splice(i,1);
	}
	
	obj.Notify = function(cmd, data)
	{
		for(var i in m_All)
		{
			try
			{
				m_All[i].OnNotify.Call(cmd,data);
			}
			catch(ex)
			{
			}
		}
	}
	
	return obj;
})();

OcxCore.Session.RegisterGlobal("WindowManagement",WindowManagement);

var ReponsesProcess = (function()
{

	var obj = {};

	function Msg_Cort(m1, m2)
	{
		if (m1.CreatedTime > m2.CreatedTime) return 1;
		if (m1.CreatedTime < m2.CreatedTime) return -1;
		return 0;
	}

	var m_GlobalHandler = {
		"UserStateChanged":function(data)//其他用户状态改变
		{
			try {
				OcxCore.Session.GetGlobal("WindowManagement").Notify("UserStateChanged", data);
			} catch (e) {
				OcxCore.Log.error("UserStateChanged处理出错："+e.message);
			}
		},
		"GLOBAL:REFRESH_SEATUSERS": function(data)
		{
			//OcxCore.Session.GetGlobal("SeatUsersInfoCache").Refresh();
		},
		"GLOBAL:SHOW_TIP_NOTIFY":function(data)//显示右下角提示信息（全局）
		{
			try {
				if(data.Message != undefined)
				{
					var time = data.Time != undefined ? data.Time : 10;
					OcxCore.Utility.ShowFloatForm(data.Message, data.Code,time);
				}
			} catch (e) {
				OcxCore.Log.error("GLOBAL:SHOW_TIP_NOTIFY处理出错："+e.message);
			}	
		},
		"GLOBAL:COMMON_NOTIFY":function(data)//通用通知（全局）
		{
			try {
				OcxCore.Session.GetGlobal("WindowManagement").Notify(data.CommandID, data);
			} catch (e) {
				OcxCore.Log.error("GLOBAL:COMMON_NOTIFY处理出错："+e.message);
			}
		},
		"CurrentUserStateChanged":function(data)//当前用户状态改变
		{
			try {
				OcxCore.Utility.ShowLoading(false);
				//重新设置用户信息
				//if(data.UserInfo != undefined) OcxCore.Session.ResetUserInfo(data.UserInfo);
				
				if(data.Result == false)
				{
					if(data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
				}else
				{
					OcxCore.Session.GetGlobal("WindowManagement").Notify("CurrentUserStateChanged", data);
					if(data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1,1);
				}
				
				if(data.ClientStatus != undefined)
				{
					if(OcxCore.Session.GetGlobal("StateChangeCallback") != undefined)
						OcxCore.Session.GetGlobal("StateChangeCallback").Call(data.ClientStatus,data);
						
					if(OcxCore.Session.GetGlobal("onStateChange") != undefined)
						OcxCore.Session.GetGlobal("onStateChange").Call(data.ClientStatus,data);
				}
			} catch (e) {
				OcxCore.Log.error("CurrentUserStateChanged处理出错："+e.message);
			}
		}
	}
	
	obj.GlobalHandler = m_GlobalHandler;

	obj.Process = function(responseText,isWebSrvMsg)
	{
		var ret = null;
		if(typeof responseText=='string' && responseText.constructor==String)
		{
			try
			{
				ret = OcxCore.Utility.ParseJson(responseText);
				if(responseText != '{"IsSucceed":true,"Responses":[]}')
					OcxCore.Session.WriteLog(responseText);
			}
			catch(e)
			{
				OcxCore.Log.error("ReponsesProcess.Process()处理出错："+e.message);
			}
		}else
		{
			ret = responseText;
			if(ret != undefined && ret != null)
			{
				if(ret.Responses != undefined && ret.Responses.length>0 && (ret.Responses[0].CommandID == "RefleshUserInfoAndButton" || ret.Responses[0].CommandID == "CurrentUserCTIStateChanged"))
				{
					var printData = {
							IsSucceed:true,
							Responses:[{
								CommandID:ret.Responses[0].CommandID,
								Data:{
									Result:ret.Responses[0].Data.Result,
									Code:ret.Responses[0].Data.Code,
									ErrorCode:ret.Responses[0].Data.ErrorCode,
									Message:ret.Responses[0].Data.Message,
									ActionCode:ret.Responses[0].Data.ActionCode,
									LabelsInfo:{},
									ButtonsInfo:{}
								}
							}]
					};
					OcxCore.Session.WriteLog(OcxCore.Utility.RenderJson(printData));
				}
				else
				{
					OcxCore.Session.WriteLog(OcxCore.Utility.RenderJson(responseText));
				}
			}
				
		}
		if (ret != null && ret.IsSucceed)
		{
			var responses = ret.Responses;

			for (var i in responses)
			{
				try
				{
					var cr = responses[i];
					
					try
					{
						//客户端接收到网站服务端发送的信息回调函数
						if(isWebSrvMsg != undefined &&  isWebSrvMsg && OcxCore.Session.GetGlobal("onReceiveMessage") != undefined)
							OcxCore.Session.GetGlobal("onReceiveMessage").Call(cr);
					}
					catch(e)
					{
						OcxCore.Log.error("ReponsesProcess.Process() onReceiveMessage处理出错："+e.message);
					}
					
					if(cr.CommandID == undefined && cr.Exception != undefined)
					{
						if(cr.Exception.Name == "UnauthorizedException")
						{
							if(OcxCore.Session.ResponsesCache.IsRunning())
							{
								OcxCore.Session.ResponsesCache.Stop();
								OcxCore.Utility.ShowFloatForm("系统登录超时，请重新登录", "-1");
							}
							var stopCallback = OcxCore.Session.GetGlobal("StopServiceCallback");
							if(stopCallback != undefined)
							{
								stopCallback.Call("LoginExpired",null);
							}
							stopCallback = OcxCore.Session.GetGlobal("onStopService");
							if(stopCallback != undefined)
							{
								stopCallback.Call("LoginExpired",null);
							}
						}
						else if(cr.Exception.Name == "IncompatibleException")
						{
							/* if(OcxCore.Session.ResponsesCache.IsRunning())
							{
								OcxCore.Session.ResponsesCache.Stop();
								OcxCore.Utility.ShowFloatForm("服务器已升级，请刷新页面", "-1");
							} */
							
							//var stopCallbak = OcxCore.Session.GetGlobal("StopServiceCallback");
							//if(stopCallbak != undefined)
							//{
							//	stopCallbak("LoginExpired",cr.Data);
							//}
						}
						
						break;
					}
					if (cr.CommandID == "GLOBAL:SessionReset")
					{
						OcxCore.Session.ResponsesCache.InvokeErrorCallback("all", new OcxCore.Exception("服务器反馈错误", "服务器错误!"));
						break;
					}
					if (cr.CommandID == "GLOBAL:LoginExpired")//登录过期，停止服务及操作
					{
						if(OcxCore.Session.ResponsesCache.IsRunning())
						{
							OcxCore.Session.ResponsesCache.Stop();
							OcxCore.Utility.ShowFloatForm("系统登录超时，请重新登录", "-1");
						}
						var stopCallback = OcxCore.Session.GetGlobal("StopServiceCallback");
						if(stopCallback != undefined)
						{
							stopCallback.Call("LoginExpired",cr.Data);
						}
						stopCallback = OcxCore.Session.GetGlobal("onStopService");
						if(stopCallback != undefined)
						{
							stopCallback.Call("LoginExpired",cr.Data);
						}
						break;
					}
					if (obj.GlobalHandler[cr.CommandID] != undefined)
					{
						obj.GlobalHandler[cr.CommandID](cr.Data);
					}
					else
					{
						OcxCore.Session.ResponsesCache.InvokeCallback(cr.CommandID, cr.Data);
					}
				}
				catch(e)
				{
					OcxCore.Log.error("ReponsesProcess.Process()处理出错："+e.message);
				}
			}
		}
		else if (ret != null)
		{
			if(ret.Exception.Name == "UnauthorizedException")
			{
				if(OcxCore.Session.ResponsesCache.IsRunning())
				{
					OcxCore.Session.ResponsesCache.Stop();
					OcxCore.Utility.ShowFloatForm("系统登录超时，请重新登录", "-1");
				}
				var stopCallback = OcxCore.Session.GetGlobal("StopServiceCallback");
				if(stopCallback != undefined)
				{
					stopCallback.Call("LoginExpired",null);
				}
				stopCallback = OcxCore.Session.GetGlobal("onStopService");
				if(stopCallback != undefined)
				{
					stopCallback.Call("LoginExpired",null);
				}
			}
			else if(ret.Exception.Name == "IncompatibleException")
			{
				/* if(OcxCore.Session.ResponsesCache.IsRunning())
				{
					OcxCore.Session.ResponsesCache.Stop();
					OcxCore.Utility.ShowFloatForm("服务器已升级，请刷新页面", "-1");
				} */
				
				//var stopCallbak = OcxCore.Session.GetGlobal("StopServiceCallback");
				//if(stopCallbak != undefined)
				//{
				//	stopCallbak("LoginExpired",cr.Data);
				//}
			}
		}
	}

	return obj;
})();

OcxCore.Session.RegisterGlobal("ReponsesProcess", ReponsesProcess);

OcxCore.Session.RegisterGlobal("StartServiceCallback", new OcxCore.Delegate());//服务开始后回调函数
OcxCore.Session.RegisterGlobal("StopServiceCallback", new OcxCore.Delegate());//服务停止后回调函数
OcxCore.Session.RegisterGlobal("StateChangeCallback", new OcxCore.Delegate());//客户端状态变化回调函数
OcxCore.Session.RegisterGlobal("ConnectStateChangeCallback", new OcxCore.Delegate());//心跳连接状态变化回调函数
//OcxCore.Session.RegisterGlobal("CurrentUserStateChangedCallback", new OcxCore.Delegate());//当前客户端状态变化回调函数

OcxCore.Session.RegisterGlobal("onReceiveMessage", new OcxCore.Delegate());//客户端接收到网站服务端发送的信息回调函数

OcxCore.Session.RegisterGlobal("onStartService", new OcxCore.Delegate());//服务开始后回调函数
OcxCore.Session.RegisterGlobal("onStopService", new OcxCore.Delegate());//服务停止后回调函数
OcxCore.Session.RegisterGlobal("onStateChange", new OcxCore.Delegate());//客户端状态变化回调函数
OcxCore.Session.RegisterGlobal("onConnectStateChange", new OcxCore.Delegate());//心跳连接状态变化回调函数
//OcxCore.Session.RegisterGlobal("onCurrentUserStateChanged", new OcxCore.Delegate());//当前客户端状态变化回调函数

})();