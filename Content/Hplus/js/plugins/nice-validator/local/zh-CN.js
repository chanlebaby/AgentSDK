/*********************************
 * Themes, rules, and i18n support
 * Locale: Chinese; 中文
 *********************************/
(function(factory) {
    typeof module === "object" && module.exports ? module.exports = factory( require( "jquery" ) ) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    factory(jQuery);
}(function($) {

    /* Global configuration
     */
    $.validator.config({
        //stopOnError: true,
        //focusCleanup: true,
        //theme: 'yellow_right',
        //timely: 2,

        // Custom rules
        rules: {
            digits: [/^\d+$/, "请填写数字"]
            ,letters: [/^[a-z]+$/i, "请填写字母"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"]
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"]
            ,qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"]
            ,IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"]
            ,tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"]
            ,mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
            ,zipcode: [/^\d{6}$/, "请检查邮政编码格式"]
            ,chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"]
            ,username: [/^\w{3,12}$/, "请填写3-12位数字、字母、下划线"]
            ,password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("只接受{1}后缀的文件", ext.replace(/\|/g, ','));
            }
            //自定义规则
            ,Num: [/^[-+]?\d+$/,"请输入正确的数字"]
            ,NumOrNull: function(element){
                var data = $.trim(element.value);
                if (data == undefined ||  data == null || data.length == 0) {
                    return true;
                }
                return /^[-+]?\d+$/.test(data) || '请输入正确的数字或为空';
            }
            ,Phone:function(element){
            	var data = $.trim(element.value);
            	if ( data == undefined ||  data == null || data.length == 0) {
                    return "请输入电话号码";
                }
                if(CCUI != undefined && CCUI.utils != undefined && CCUI.utils.decipherPhone != undefined)
                {
                	data = CCUI.utils.decipherPhone(data);
                }
                return /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/.test(data)||'请输入正确的电话号码';
            }
            ,PhoneOrNull:function(element){
                var data = $.trim(element.value);
                if (data == undefined ||  data == null || data.length == 0) {
                    return true;
                }
                if(CCUI != undefined && CCUI.utils != undefined && CCUI.utils.decipherPhone != undefined)
                {
                	data = CCUI.utils.decipherPhone(data);
                }
                return /^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/.test(data)||"请输入正确的电话号码";
            }
            ,Mobile:function(element){
            	var data = $.trim(element.value);
            	if ( data == undefined ||  data == null || data.length == 0) {
                    return "请输入手机号";
                }
                if(CCUI != undefined && CCUI.utils != undefined && CCUI.utils.decipherPhone != undefined)
                {
                	data = CCUI.utils.decipherPhone(data);
                }
                return /^(1[1-9])\d{9}$/.test(data)||'请输入正确的手机号';
            }
            ,MobileOrNull:function(element){
               var data = $.trim(element.value);
                if (data == undefined ||  data == null || data.length == 0) {
                    return true;
                }
                if(CCUI != undefined && CCUI.utils != undefined && CCUI.utils.decipherPhone != undefined)
                {
                	data = CCUI.utils.decipherPhone(data);
                }
                return /^(1[1-9])\d{9}$/.test(data)||'请输入正确的手机号';
            }
            ,MobileOrPhone:function(element){
               var data = $.trim(element.value);
               if ( data == undefined ||  data == null || data.length == 0) {
                   return "请输入手机号或电话号码";
               }
               if(CCUI != undefined && CCUI.utils != undefined && CCUI.utils.decipherPhone != undefined)
               {
               		data = CCUI.utils.decipherPhone(data);
               }
               return /^(1[1-9])\d{9}$/.test(data)===true||/^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/.test(data)||'请输入正确的手机号或电话号码';
            }
            ,MobileOrPhoneOrNull:function(element){
               var data = $.trim(element.value);
               if (data == undefined ||  data == null || data.length == 0) {
                    return true;
                }
               if(CCUI != undefined && CCUI.utils != undefined && CCUI.utils.decipherPhone != undefined)
               {
               		data = CCUI.utils.decipherPhone(data);
               }
               return /^(1[1-9])\d{9}$/.test(data)===true||/^((0[0-9]{2,3})|(400))?([1-9][0-9]{6,7})$/.test(data)||'请输入正确的手机号或电话号码';
            }
            ,Email:[/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,'请输入正确的email']
            ,EmailOrNull:function(element){
               var data = $.trim(element.value);
               if (data == undefined ||  data == null || data.length == 0) {
                    return true;
                }
               return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(data)||'请输入正确的email或为空';
            }
            ,IDCard:[/^\d{15}(\d{2}[A-Za-z0-9;])?$/,"请输入正确的身份证号码"]
            ,IDCardOrNull:function(element){
               var data = $.trim(element.value);
               if (data == undefined ||  data == null || data.length == 0) {
                    return true;
                }
               return /^\d{15}(\d{2}[A-Za-z0-9;])?$/.test(data)||'请输入正确的身份证号码或为空';
            }
            ,Double:[/^[-\+]?\d+(\.\d+)?$/,'请输入正确的数字']
            ,DoubleOrNull:function(element){
               var data = $.trim(element.value);
               if (data == undefined ||  data == null || data.length == 0) {
                    return true;
                }
               return /^[-\+]?\d+(\.\d+)?$/.test(data)||'请输入正确的数字或为空';
            }
            ,Zip:[/^\d{6}$/,'请输入正确的邮编']
            ,ZipOrNull:function(element){
               var data = $.trim(element.value);
               if (data == undefined ||  data == null || data.length == 0) {
                    return true;
                }
               return /^\d{6}$/.test(data)||'请输入正确的邮编或为空';
            }
            },

        // Default error messages
        messages: {
            0: "此处",
            fallback: "{0}格式不正确",
            loading: "正在验证...",
            error: "网络异常",
            timeout: "请求超时",
            required: "{0}不能为空",
            remote: "{0}已被使用",
            integer: {
                '*': "请填写整数",
                '+': "请填写正整数",
                '+0': "请填写正整数或0",
                '-': "请填写负整数",
                '-0': "请填写负整数或0"
            },
            match: {
                eq: "{0}与{1}不一致",
                neq: "{0}与{1}不能相同",
                lt: "{0}必须小于{1}",
                gt: "{0}必须大于{1}",
                lte: "{0}不能大于{1}",
                gte: "{0}不能小于{1}"
            },
            range: {
                rg: "请填写{1}到{2}的数",
                gte: "请填写不小于{1}的数",
                lte: "请填写最大{1}的数",
                gtlt: "请填写{1}到{2}之间的数",
                gt: "请填写大于{1}的数",
                lt: "请填写小于{1}的数"
            },
            checked: {
                eq: "请选择{1}项",
                rg: "请选择{1}到{2}项",
                gte: "请至少选择{1}项",
                lte: "请最多选择{1}项"
            },
            length: {
                eq: "请填写{1}个字符",
                rg: "请填写{1}到{2}个字符",
                gte: "请至少填写{1}个字符",
                lte: "请最多填写{1}个字符",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        }
    });

    /* Themes
     */
    var TPL_ARROW = '<span class="n-arrow"><b>◆</b><i>◆</i></span>';
    $.validator.setTheme({
        'simple_right': {
            formClass: 'n-simple',
            msgClass: 'n-right'
        },
        'simple_bottom': {
            formClass: 'n-simple',
            msgClass: 'n-bottom'
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgArrow: TPL_ARROW
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW,
            msgShow: function($msgbox, type){
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({left: '20px', opacity: 0})
                        .delay(100).show().stop()
                        .animate({left: '-4px', opacity: 1}, 150)
                        .animate({left: '3px'}, 80)
                        .animate({left: 0}, 80);
                } else {
                    $el.css({left: 0, opacity: 1}).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
                var $el = $msgbox.children();
                $el.stop().delay(100).show()
                    .animate({left: '20px', opacity: 0}, 300, function(){
                        $msgbox.hide();
                    });
            }
        }
    });
 // Custom theme 自定义
    $.validator.setTheme('bootstrap', {
        validClass: 'has-success',
        invalidClass: 'has-error',
        bindClassTo: '.form-control',
        formClass: 'n-default n-bootstrap',
        msgClass: 'n-bottom',
        timely: 0,
        stopOnError: true,
        debug :0
    });
}));
