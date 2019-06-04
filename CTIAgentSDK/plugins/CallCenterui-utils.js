/**
 * jQuery CallCenterUI 4.1
 *深圳市意科特实业有限公司 Copyright © Eleccomm 2015
 */

if(!CCUI) var CCUI = {};
/* UI框架用的工具js！  */

CCUI.utils = {};
//-----------扩展Map-------------  
  
/**  
 * Simple Map  
 *   
 *   
 * var m = new CCUI.utils.Map();  
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
CCUI.utils.Map = function() {   
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
  
  
/*function testMap(){   
    var m = new Map();   
    m.put('key1','Comtop');   
    m.put('key2','南方电网');   
    m.put('key3','景新花园');   
    alert("init:"+m);   
       
    m.put('key1','康拓普');   
    alert("set key1:"+m);   
       
    m.remove("key2");   
    alert("remove key2: "+m);   
       
    var s ="";   
    m.each(function(key,value,index){   
        s += index+":"+ key+"="+value+"/n";   
    });   
    alert(s);   
}*/
//-------------------扩展方法------------------
/**
 * 删除左右两端的空格
 * 
 * @param str
 * @return
 */
CCUI.utils.trim = function (str) {
    if (str == undefined || str == null  || str.length == 0) {
        return "";
    }
    else
        return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 删除左边的空格
 * 
 * @param str
 * @return
 */
CCUI.utils.ltrim = function (str) {
    if (str == undefined || str == null  || str.length == 0) {
        return "";
    }
    else
        return str.replace(/(^\s*)/g,"");
}
/**
 * 删除右边的空格
 * 
 * @param str
 * @return
 */
CCUI.utils.rtrim = function (str) {
    if (str == undefined || str == null  || str.length == 0) {
        return "";
    }
    else
        return str.replace(/(\s*$)/g,"");
}
/**
 * 验证为空 null
 * 
 * @param obj
 * @return
 */
CCUI.utils.isNull = function (obj) {
    obj = CCUI.utils.trim(obj);
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
CCUI.utils.isNotNull = function (obj) {
    obj = CCUI.utils.trim(obj);
    if (obj == undefined || obj == null  || obj.length == 0) {
        return false;
    }
    else
        return true;
}

/**
 * 返回电话类型
 * 
 * @param Phone
 * @return
 */
CCUI.utils.getPhoneType = function(Phone)
{
	var GTphone = "";
    var PhoneType = "";
    if(!CCUI.utils.isNotNull(Phone))
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
CCUI.utils.isSuffixInPhone = function(suffix)
{
    var sufffix_arr = [ "010", "020", "021", "022", "023", "024", "025", "027", "028", "029" ];
    for (var i=0;i<sufffix_arr.length;i++)
    {
        if (sufffix_arr[i] == suffix)
            return true;
    }
    return false;
}
/**
 * 左填充字符 
 * 
 * @param str 原字符串
 * @param len 总长度
 * @param ch 填充字符
 * @return 新字符串
 */
CCUI.utils.padLeft = function (str,len,ch) {
	str = $.trim(str);
    if (str == undefined || str == null  || str.length == 0) {
    	str="";
    }
    ch=typeof(ch)==='undefined'?' ':ch;
    var s=String(str);
    while(s.length<len)
    s=ch+s;
    return s;
}


CCUI.utils.phoneEncodeMap=null;
CCUI.utils.phoneDecodeMap=null;
CCUI.utils.isHideOrDecipher=function(isHideOrDecipher,Str){
	var f = "";
	var map=null;
	if(isHideOrDecipher==1){
		if(CCUI.utils.phoneEncodeMap == null)
		{
			CCUI.utils.phoneEncodeMap = new CCUI.utils.Map();
			CCUI.utils.phoneEncodeMap.put("A", "A");
			CCUI.utils.phoneEncodeMap.put("B", "B");
			CCUI.utils.phoneEncodeMap.put("C", "C");
			CCUI.utils.phoneEncodeMap.put("D", "D");
			CCUI.utils.phoneEncodeMap.put("E", "E");
			CCUI.utils.phoneEncodeMap.put("F", "F");
    		
			CCUI.utils.phoneEncodeMap.put("0", "K");
			CCUI.utils.phoneEncodeMap.put("1", "R");
			CCUI.utils.phoneEncodeMap.put("2", "Y");
			CCUI.utils.phoneEncodeMap.put("3", "P");
			CCUI.utils.phoneEncodeMap.put("4", "S");
			CCUI.utils.phoneEncodeMap.put("5", "X");
			CCUI.utils.phoneEncodeMap.put("6", "J");
			CCUI.utils.phoneEncodeMap.put("7", "H");
			CCUI.utils.phoneEncodeMap.put("8", "T");
			CCUI.utils.phoneEncodeMap.put("9", "G");
		}
		map = CCUI.utils.phoneEncodeMap;
	}else{
		if(CCUI.utils.phoneDecodeMap == null)
    	{
			CCUI.utils.phoneDecodeMap = new CCUI.utils.Map();
			CCUI.utils.phoneDecodeMap.put("A", "A");
			CCUI.utils.phoneDecodeMap.put("B", "B");
			CCUI.utils.phoneDecodeMap.put("C", "C");
			CCUI.utils.phoneDecodeMap.put("D", "D");
			CCUI.utils.phoneDecodeMap.put("E", "E");
			CCUI.utils.phoneDecodeMap.put("F", "F");
    		
			CCUI.utils.phoneDecodeMap.put("K", "0");
			CCUI.utils.phoneDecodeMap.put("R", "1");
			CCUI.utils.phoneDecodeMap.put("Y", "2");
			CCUI.utils.phoneDecodeMap.put("P", "3");
			CCUI.utils.phoneDecodeMap.put("S", "4");
			CCUI.utils.phoneDecodeMap.put("X", "5");
			CCUI.utils.phoneDecodeMap.put("J", "6");
			CCUI.utils.phoneDecodeMap.put("H", "7");
			CCUI.utils.phoneDecodeMap.put("T", "8");
			CCUI.utils.phoneDecodeMap.put("G", "9");
    	}
		map = CCUI.utils.phoneDecodeMap;
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
CCUI.utils.hiddenPhone=function(Str){
	Str = CCUI.utils.isNotNull(Str) ? CCUI.utils.trim(Str):"";
	if(CCUI.utils.isNotNull(Str) && CCUI.validator.isMobileOrPhone(Str)){//判断是否为空,是否为电话号码
		var ntype=CCUI.utils.getPhoneType(Str);
		if(ntype==1){//判断手机号还是固定电话1手机,2固定电话
				var a = parseInt(Str.substring(3, 7));//截取中间4位
				var c = (a).toString(16).toUpperCase();//转成十六进制
				var d = CCUI.utils.padLeft(c,4,"0");//补位
				var f = CCUI.utils.isHideOrDecipher("1",d);
				Str = Str.substring(0,3)+f+Str.substring(7);//替换中间4位
		}else{
			//判断是否是本地号码 2ABCD8  2ABCD88  2ABCD888   2ABCD8
			if(Str.length>5 && Str.length <9)
			{
				var a = parseInt(Str.substring(1, 5));//截取四位
				var c = (a).toString(16).toUpperCase();//转十六进制
				var d = CCUI.utils.padLeft(c,4,"0");//补位
				var f = CCUI.utils.isHideOrDecipher("1",d);
				Str = Str.substring(0,1)+f+Str.substring(5);//替换中间4位
			}
			else
			{
				var suff = Str.substring(0, 3);//截取前三位
				if(CCUI.utils.isSuffixInPhone(suff)){//判断是否是三位数固定号码例如027
					var a = parseInt(Str.substring(3, 7));//截取中间四位
					var c = (a).toString(16).toUpperCase();//转十六进制
					var d = CCUI.utils.padLeft(c,4,"0");//补位
					var f = CCUI.utils.isHideOrDecipher("1",d);
					Str = Str.substring(0,3)+f+Str.substring(7);//替换中间4位
		
				}else{
					var a = parseInt(Str.substring(4, 8));//截取例如区号0755后四位
					var c = (a).toString(16).toUpperCase();//转十六进制
					var d = CCUI.utils.padLeft(c,4,"0");//补位
					var f = CCUI.utils.isHideOrDecipher("1",d);
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
CCUI.utils.decipherPhone=function(Str){
	var f = Str;
	if(CCUI.utils.isNotNull(Str)){//判断是否为空
		var reg = /^\d{3,4}[A-Za-z]{4}\d{3,4}$/;
		var reg2 = /^\d[A-Za-z]{4}\d{1,3}$/;
		if(reg.test(Str)){
			var charreg = /[A-Za-z]{4}/g;
			
			var r = Str.match(charreg);
			if(r.length >0)
			{
				var a =r[0];//两个*中间的数132*7255*7706  返回  7255
				var g = CCUI.utils.isHideOrDecipher(2,a);
				if(g == null || g == '')
					return f;
				var c = parseInt(g,16);
				var d = CCUI.utils.padLeft(c,4,"0");//补位
				f = Str.replace(a,d);	
			}
		}
		else if(reg2.test(Str)){
			var charreg = /[A-Za-z]{4}/g;
			
			var r = Str.match(charreg);
			if(r.length >0)
			{
				var a =r[0];//两个*中间的数132*7255*7706  返回  7255
				var g = CCUI.utils.isHideOrDecipher(2,a);
				if(g == null || g == '')
					return f;
				var c = parseInt(g,16);
				var d = CCUI.utils.padLeft(c,4,"0");//补位
				f = Str.replace(a,d);	
			}
		}
	}
	return f;
}

//用星号加密
CCUI.utils.hiddenPhoneByStar=function(Str){
	Str = CCUI.utils.isNotNull(Str) ? CCUI.utils.trim(Str):"";
	if(CCUI.utils.isNull(Str)) return Str;
	Str = CCUI.utils.decipherPhone(Str);
	var ntype=CCUI.utils.getPhoneType(Str);
	if(CCUI.utils.isNotNull(ntype)){//判断是否为空,是否为电话号码
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
				if(CCUI.utils.isSuffixInPhone(suff)){//判断是否是三位数固定号码例如027
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
 * 右填充字符 
 * 
 * @param str 原字符串
 * @param len 总长度
 * @param ch 填充字符
 * @return 新字符串
 */
CCUI.utils.padRight = function (str,len,ch) {
	str = $.trim(str);
    if (str == undefined || str == null  || str.length == 0) {
    	str="";
    }
    ch=typeof(ch)==='undefined'?' ':ch;
    var s=String(str);
    while(s.length<len)
    s=s+ch;
    return s;
}

CCUI.utils.timeTransfer = function(seccond) {
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
    
    if(result=="00:00:00"){
    	result="<span style='color:#aaa'>00:00:00</span>";
    }
    return result;
}
/**
 * 呼叫类型转换
 * 
 * @param value 呼叫类型值
 * @return 呼叫类型名称
 */
CCUI.utils.callTypeTransfer = function (value) {
	value = $.trim(value);
	if (value == "0") {
		return "呼入"
    }
    else if (value == "1") {
        return "呼出"
    }
    else if (value == "2") {
        return "预测外呼"
    }
    else if (value == "3") {
        return "自动外呼"
    }
    else if (value == "4") {
        return "手动外呼"
    }
    else if (value == "5") {
        return "下班转外线";
    }
    else if (value == "6") {
        return "IVR转外线";
    }
    else if (value == "7") {
        return "坐席转外线";
    }
    else if (value == "8") {
        return "遇忙转外线";
    }
    return value;
}
/**
 * 日期格式转换(yyyy-MM-dd hh:mm:ss)
 * 
 * @param value 原日期
 * @return 新日期格式
 */
CCUI.utils.dateTransfer = function(value) {
	value = $.trim(value);
	if(value == undefined || value == null || value == "")
		return "";
  	return formatDate(value,"yyyy-MM-dd hh:mm:ss");
}
/**
 * 短日期格式转换(yyyy-MM-dd)
 * 
 * @param value 原日期
 * @return 新日期格式
 */
CCUI.utils.shortDateTransfer = function(value) {
	value = $.trim(value);
	if(value == undefined || value == null || value == "")
		return "";
  	return formatDate(value,"yyyy-MM-dd");
}
/**
 * 时间的减法运算(yyyy-MM-dd hh:mm:ss)
 * 
 * @param dateEnd 结束时间
 * @param dateStart 开始时间
 * @return 分钟差
 */
CCUI.utils.dataMathSub = function(dateRemind,datePlan){
    
    var mend =datePlan.substr(5,2)-0;
    var mstart =dateRemind.substr(5,2)-0;
    
    var dend =datePlan.substr(8,2)-0;
    var dstart =dateRemind.substr(8,2)-0;
    
    var hend =datePlan.substr(11,2)-0;
    var hstart  =dateRemind.substr(11,2)-0;
    
    var miend =datePlan.substr(14,2)-0;
    var mistart =dateRemind.substr(14,2)-0;
    
    var mi=(((dend-dstart)*24)+(hend-hstart))*60; //分钟
    if(mi>0){
   	 var mi=mi+(miend-mistart);
    }else{
        var mi=(hend-hstart)*60+(miend-mistart);
    }
    
    return mi;
}

CCUI.utils.Base64 = function() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

