/**
 * jQuery CallCenterUI 4.1
 */

if(window.CCUI == undefined) window.CCUI = {};
if(CCUI.main == undefined) CCUI.main = window;
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



//加密
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

//解密
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
		
		/*if(reg.test(Str)){	
			var a =Str.substring(Str.indexOf("*")+1,Str.lastIndexOf("*"));//两个*中间的数132*7255*7706  返回  7255
			var b =parseInt(Str.substring( Str.lastIndexOf("*")+1));//第二个*后面的数
			var c = parseInt(a,16)-b;
			var d = CCUI.utils.padLeft(c,4,"0");//补位
			var e = Str.substring(Str.indexOf("*"),Str.lastIndexOf("*")+1);//返回包括两个*    例如132*7255*7706  返回 *7255*
			var f = Str.replace(e,d);		
			return f;
		}*/
		/*var type=CCUI.utils.getPhoneType(Str);
		if(type==1){//判断手机号还是固定电话1手机,2固定电话
			var a = Str.substring(3, 7);//截取中间4位
			var b = parseInt(Str.substring(7,11));//截取后四位
			var c = parseInt(a,16)-b;
			
		}else{
			var suff = Str.substring(0, 3);//截取前三位
			if(CCUI.utils.isSuffixInPhone(suff)){//判断是否是三位数固定号码例如027
				var a = Str.substring(3, 7);//截取中间4位
				var b = parseInt(Str.substring(7, 10));//截取后三位
				var c = parseInt(a,16)-b;
				
			}else{
				var a = Str.substring(4, 8);//截取例如区号0755后四位
				var b = parseInt(Str.substring(8, 11));//截取后四位
				var c = parseInt(a,16)-b;
			}
		}	
		return c;
		
	}else{
		return "";
	}*/

	}
	return f;
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
格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
*/
CCUI.utils.formatDate = function (v, format) {
	
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
  	return CCUI.utils.formatDate(value,"yyyy-MM-dd hh:mm:ss");
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
  	return CCUI.utils.formatDate(value,"yyyy-MM-dd");
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

CCUI.utils.zhcnTimeTransfer = function(seccond) {
    var result = "";
	    if (seccond != undefined && seccond!=null && seccond != "" && seccond>0) {
	    	try{
	    		var iTotalSeccond = parseInt(seccond);
	    		var iDay = 0;
		        var iHour = 0;
		        var iMinite = 0;
		        var iSeccond = 0;
		
		        if (iTotalSeccond < 60) {//秒
		            iSeccond = iTotalSeccond;
		            result = iSeccond+"秒";
		        }
		        else if (iTotalSeccond < 3600) {//分秒
		            iSeccond = iTotalSeccond % 60;
		            iMinite = Math.floor(iTotalSeccond / 60);
		            result = iMinite+"分";
		            if(iSeccond>0)
		            	result += iSeccond+"秒";
		        }
		        else if (iTotalSeccond < 86400){//小时分秒
		            iSeccond = iTotalSeccond % 60;
		            iMinite = Math.floor((iTotalSeccond % 3600) / 60);
		            iHour = Math.floor(iTotalSeccond / 3600);
		            result = iHour+"小时";
		            if(iMinite>0 || iSeccond>0)
		            	result += iMinite+"分";
		            if(iSeccond>0)
		            	result += iSeccond+"秒";
		        }
		        else {//天小时分秒
		            iSeccond = iTotalSeccond % 60;
		            iMinite = Math.floor((iTotalSeccond % 3600) / 60);
		            iHour = Math.floor(iTotalSeccond / 3600);
		            iDay = Math.floor(iTotalSeccond / 86400);
		            result = iDay+"天";
		            if(iHour>0 || iMinite>0 || iSeccond>0)
		            	result += iHour+"小时";
		            if(iMinite>0 || iSeccond>0)
		            	result += iMinite+"分";
		            if(iSeccond>0)
		            	result += iSeccond+"秒";
		        }
	    	}catch(e){
	    		
	    		return "";
	    	}
	    }
    return result;
}

CCUI.utils.getDateDiff=function(dateTime){
	if (!dateTime) return "";
	try{
	    var d = dateTime;
	    if (typeof dateTime === 'string') {
	        if (dateTime.indexOf("/Date(") > -1)
	            d = new Date(parseInt(dateTime.replace("/Date(", "").replace(")/", ""), 10));
	        else
	            d = new Date(Date.parse(dateTime.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
	    }
	    var dateTimeStamp = d.getTime();
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if(diffValue < 0){return "";}
		var monthC =diffValue/month;
		var weekC =diffValue/(7*day);
		var dayC =diffValue/day;
		var hourC =diffValue/hour;
		var minC =diffValue/minute;
		if(monthC>=1){
			result="" + parseInt(monthC) + "月前";
		}
		else if(weekC>=1){
			result="" + parseInt(weekC) + "周前";
		}
		else if(dayC>=1){
			result=""+ parseInt(dayC) +"天前";
		}
		else if(hourC>=1){
			result=""+ parseInt(hourC) +"小时前";
		}
		else if(minC>=1){
			result=""+ parseInt(minC) +"分钟前";
		}else
			result="刚刚";
		return result;
	}catch(e){
		
		return "";
	}
}



/* 表单验证使用实例！  */
if(!CCUI.validator) CCUI.validator = {};

//验证不为空 notnull
CCUI.validator.isNotNull = function (obj) {
    if ( obj == undefined || obj == null) {
        return false;
    }
    else if(typeof(obj) == "string" && $.trim(obj).length == 0)
    	return false;
    else
        return true;
}
//验证为空
CCUI.validator.isNull = function (obj) {
    if ( obj == undefined || obj == null) {
        return true;
    }
    else if(typeof(obj) == "string" && $.trim(obj).length == 0)
    	return true;
    else
        return false;
}

//验证整型数字 num
CCUI.validator.isInt = function (obj) {
	if (CCUI.validator.isNull(obj)) {
	  return false;
	}
	reg = /^[-+]?\d+$/;
	if (!reg.test(obj)) {
	  return false;
	} else {
	  return true;
	}
}

	//验证整型数字 num  或者null,空
CCUI.validator.isIntOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
	  return true;
	}
	reg = /^[-+]?\d+$/;
	if (!reg.test(obj)) {
	  return false;
	} else {
	  return true;
	}
}
//验证是否是数字 num
CCUI.validator.isNumber = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
		}
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(obj) || regNeg.test(obj)){
        return true;
    }else{
        return false;
    }
}

//验证是否是数字 num 或者null,空
CCUI.validator.isNumberOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return true;
		}
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(obj) || regNeg.test(obj)){
        return true;
    }else{
        return false;
    }
}

//Email验证 email
CCUI.validator.isEmail = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	}
  //reg = /^\w{3,}@\w+(\.\w+)+$/;
  //reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
  reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//Email验证 email   或者null,空
CCUI.validator.isEmailOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
	  return true;
	}
  //reg = /^\w{3,}@\w+(\.\w+)+$/;
  //reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
  reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证只能输入英文字符串 echar
CCUI.validator.isEnglishStr = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	}
  reg = /^[a-z,A-Z]+$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证只能输入英文字符串 echar 或者null,空
CCUI.validator.isEnglishStrOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return true;
	}
  reg = /^[a-z,A-Z]+$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证是否是n位数字字符串编号 nnum
CCUI.validator.isLenNum = function (obj, n) {
  if (CCUI.validator.isNull(obj)) {
	  return false;
  }
  reg = /^[0-9]+$/;
  obj = $.trim(obj);
  if (obj.length > n)
      return false;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证是否是n位数字字符串编号 nnum或者null,空
CCUI.validator.isLenNumOrNull = function (obj, n) {
	if (CCUI.validator.isNull(obj)) {
		  return true;
	}
  reg = /^[0-9]+$/;
  obj = $.trim(obj);
  if (obj.length > n)
      return false;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证是否小于等于n位数的字符串 nchar
CCUI.validator.isLenStr = function (obj, n) {
  if (CCUI.validator.isNull(obj)) {
	  return false;
  }
  obj = $.trim(obj);
  if (obj.length == 0 || obj.length > n)
      return false;
  else
      return true;
}

//验证是否小于等于n位数的字符串 nchar或者null,空
CCUI.validator.isLenStrOrNull = function (obj, n) {
	if (CCUI.validator.isNull(obj)) {
		  return true;
	}
  obj = $.trim(obj);
  if (obj.length > n)
      return false;
  else
      return true;
}

//验证是否电话号码 phone
CCUI.validator.isTelephone = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	  }
	obj = CCUI.utils.decipherPhone(obj);
	reg = /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/;
    if (!reg.test(obj)) {
       return false;
    } else {
       return true;
    }
}

//验证是否电话号码 phone或者null,空
CCUI.validator.isTelephoneOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return true;
	}
  obj = CCUI.utils.decipherPhone(obj);
	reg = /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证是否手机号 mobile
CCUI.validator.isMobile = function (obj)  {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	  }
	obj = CCUI.utils.decipherPhone(obj);
	reg = /^(1[1-9])\d{9}$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证是否手机号 mobile或者null,空
CCUI.validator.isMobileOrnull = function (obj) {
  if (CCUI.validator.isNull(obj)) {
	return true;
  }
  obj = CCUI.utils.decipherPhone(obj);
  reg = /^(1[1-9])\d{9}$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证是否手机号或电话号码 mobile phone 
CCUI.validator.isMobileOrPhone = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	}
	obj = CCUI.utils.decipherPhone(obj);
	reg_mobile = /^(1[1-9])\d{9}$/;
	reg_phone = /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/;
  if (!reg_mobile.test(obj) && !reg_phone.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证是否手机号或电话号码 mobile phone或者null,空
CCUI.validator.isMobileOrPhoneOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  obj = CCUI.utils.decipherPhone(obj);
  //reg_mobile = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17([0|1|3]|[5-8]))|(16([0-9]))|(18([0-9]))|(19([0-9])))\d{8}$/;///^(\+\d{2,3}\-)?\d{11}$/;
  //reg_phone = /^(0[0-9]{2,3})?([1-9][0-9]{6,7})$/;///^(\d{3,4}-?)?[1-9]\d{6,7}$/;
  reg_mobile = /^(1[1-9])\d{9}$/;
  reg_phone = /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/;
  if (!reg_mobile.test(obj) && !reg_phone.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证网址 uri
CCUI.validator.isUri = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	}
  reg = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证网址 uri或者null,空
CCUI.validator.isUriOrnull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  reg = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
  if (!reg.test(obj)) {
      return false;
  } else {
      return true;
  }
}

//验证两个值是否相等 equals
CCUI.validator.isEqual = function (obj1, controlObj) {
	if (obj1 == null && controlObj == null) {
		  return true;
	}
	else if(obj1 == null)
	{
		return false;
	}
	else if(controlObj == null)
	{
		return false;
	}
  if (obj1.length != 0 && controlObj.length != 0) {
      if (obj1 == controlObj)
          return true;
      else
          return false;
  }
  else
      return false;
}

//判断日期类型是否为YYYY-MM-DD格式的类型 date
CCUI.validator.isDate = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	}
  if (obj.length != 0) {
      reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断日期类型是否为YYYY-MM-DD格式的类型 date或者null,空
CCUI.validator.isDateOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  if (obj.length != 0) {
      reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime
CCUI.validator.isDateTime = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	}
  if (obj.length != 0) {
      reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime或者null,空
CCUI.validator.isDateTimeOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  if (obj.length != 0) {
      reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断日期类型是否为hh:mm:ss格式的类型 time
CCUI.validator.isTime = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		  return false;
	}
  if (obj.length != 0) {
      reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断日期类型是否为hh:mm:ss格式的类型 time或者null,空
CCUI.validator.isTimeOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  if (obj.length != 0) {
      reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断输入的字符是否为中文 cchar 
CCUI.validator.isChinese = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return false;
	  }
  if (obj.length != 0) {
      reg = /^[\u0391-\uFFE5]+$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断输入的字符是否为中文 cchar或者null,空
CCUI.validator.isChineseOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  if (obj.length != 0) {
      reg = /^[\u0391-\uFFE5]+$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断输入的邮编(只能为六位)是否正确 zip
CCUI.validator.isZip = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return false;
	  }
  if (obj.length != 0) {
      reg = /^\d{6}$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断输入的邮编(只能为六位)是否正确 zip或者null,空
CCUI.validator.isZipOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  if (obj.length != 0) {
      reg = /^\d{6}$/;
      if (!reg.test(obj)) {
          return false;
      }
      else {
          return true;
      }
  }
}

//判断输入的字符是否为双精度 double
CCUI.validator.isDouble = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return false;
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

//判断输入的字符是否为双精度 double或者null,空
CCUI.validator.isDoubleOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
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

//判断是否为身份证 idcard
CCUI.validator.isIDCard = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return false;
	  }
  if (obj.length != 0) {
      reg = /^\d{15}(\d{2}[A-Za-z0-9;])?$/;
      if (!reg.test(obj))
          return false;
      else
          return true;
  }
}

//判断是否为身份证 idcard或者null,空
CCUI.validator.isIDCardOrNull = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  if (obj.length != 0) {
      reg = /^\d{15}(\d{2}[A-Za-z0-9;])?$/;
      if (!reg.test(obj))
          return false;
      else
          return true;
  }
}
//判断是否为IP地址格式
CCUI.validator.isIP = function (obj) {
	if (CCUI.validator.isNull(obj)) {
		return false;
	  }
  var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
  if (re.test(obj)) {
      if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
  }
  return false;
}
//判断是否为IP地址格式 或者null,空
CCUI.validator.isIPOrNull = function (obj) {
  if (CCUI.validator.isNull(obj)) {
		return true;
  }
  var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
  if (re.test(obj)) {
      if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
  }
  return false;
}
//判断是否为指定正则表达式格式
CCUI.validator.isRegex = function (obj,regex) {
	var re=new RegExp(regex,"g");//匹配正则表达式  
  if (re.test(obj)) {
       return true;
  }
  return false;
}
//判断是否为IP地址格式 或者null,空
CCUI.validator.isRegexOrNull = function (obj,regex) {
	if (CCUI.validator.isNull(obj)) {
		return true;
	  }
  var re=new RegExp(regex,"g");//匹配正则表达式   
  if (re.test(obj)) {
      return true;
  }
  return false;
}