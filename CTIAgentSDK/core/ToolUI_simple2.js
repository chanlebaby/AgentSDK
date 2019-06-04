$(function(){
	InitCTIToolCustomUI();
});

/**
 * 初始化前端工具条UI函数
 * */
function InitCTIToolCustomUI()
{
	//--------按钮事件绑定过程------------
	
	//示闲 按钮初始化
	OcxBtnInit_SetIdle();
	//示忙 按钮初始化
	OcxBtnInit_SetBusy();
	//置忙 按钮初始化
	OcxBtnInit_SetBusy1();
	//示忙小状态 按钮初始化
	OcxBtnInit_SetBusySubState();
	//示忙申请 按钮初始化
	OcxBtnInit_SetBusyApply();
	//停止事后整理 按钮初始化
	OcxBtnInit_StopEndProc();
	//接听 按钮初始化
	OcxBtnInit_Answer();
	//外呼 按钮初始化
	OcxBtnInit_MakeCall();
	//挂机 按钮初始化
	OcxBtnInit_Hangup();
	//开始事后整理 按钮初始化(此按钮暂时不需要)
	//OcxBtnInit_StartEndProc();
	//开始满意度调查 按钮初始化
	OcxBtnInit_Satisfaction();
	//咨询 按钮初始化
	OcxBtnInit_Consult();
	//转移 按钮初始化
	OcxBtnInit_Transfer();
	//找回 按钮初始化
	OcxBtnInit_Return();
	//保持 按钮初始化
	OcxBtnInit_Keep();
	//三方会议 按钮初始化
	OcxBtnInit_Conference();
	//事后闲 按钮初始化
	OcxBtnInit_SetEndidle();
	//事后忙 按钮初始化
	OcxBtnInit_SetEndbusy();
	//拦截 按钮初始化
	OcxBtnInit_Intercept();
	//监控 按钮初始化
	OcxBtnInit_Monitor();
	//签入 按钮初始化
	OcxBtnInit_Checkin();
	//签出 按钮初始化
	OcxBtnInit_Checkout();
	//坐席配置  按钮初始化
	OcxBtnInit_SetSeatInfo();
	//离开  按钮初始化
	OcxBtnInit_LeaveMode();
	//恢复  按钮初始化
	OcxBtnInit_NormalMode();
	
	//电话工具条的信息显示栏初始化
	OcxLabelInit(); 

	//客户端CTI状态变化响应回调函数
	OcxCore.Session.bind("onCTIStateChange",function(CTIAgentStatus,CTIConnected,data){
		//OcxCore.Log.debug("调用了客户端CTI状态变化响应回调函数   当前状态："+OcxCore.Enums.GetName(OcxCore.Enums.CTIAgentStatusFlag,CTIAgentStatus));
		
	});
	//客户端显示信息和按钮状态变化后回调函数
	OcxCore.Session.bind("onRefleshShowInfo",function(CTIAgentStatus,CTIConnected,data){
		//OcxCore.Log.debug("调用了客户端显示信息和按钮状态变化后回调函数   当前状态："+OcxCore.Enums.GetName(OcxCore.Enums.CTIAgentStatusFlag,CTIAgentStatus));
		if(CTIAgentStatus == undefined) return;
		if(CTIAgentStatus == OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex())
		{
			if(OcxCore.Config.DialNumberVisible == undefined || OcxCore.Config.DialNumberVisible)
				$(".DialNumberContent").show();
			$(".CallInfoContent").hide();
		}else if(CTIAgentStatus == OcxCore.Enums.CTIAgentStatusFlag.STATE_FREE.getIndex())
		{
			if(OcxCore.Config.MakeCallOnIdleState != undefined && OcxCore.Config.MakeCallOnIdleState)
			{
				if(OcxCore.Config.DialNumberVisible == undefined || OcxCore.Config.DialNumberVisible)
					$(".DialNumberContent").show();
				else
					$(".DialNumberContent").hide();
			}
			else
			{
				$(".DialNumberContent").hide();
			}
			$(".CallInfoContent").hide();
		}
		else if(CTIAgentStatus != OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex())  
		{
			$(".DialNumberContent").hide();
			$(".CallInfoContent").show();
		}else
		{
			$(".DialNumberContent").hide();
			$(".CallInfoContent").hide();
		}
		
		if(data.EndProcTime != undefined && data.EndProcTime>0)
		{
			$(".DialNumberContent").hide();
		}
	});
}

/**
 * 按钮初始化(公共)
 * */
function OcxBtnInit_Common(btnControlId,btnId,clickCallback)
{
	var jqObj = $(btnControlId);//按钮jq对象
	var ocxBtn = OcxCore.OcxButtonbar.GetButton(btnId);//按钮实体
	if(clickCallback != undefined && clickCallback != null)
	{
		ocxBtn.OnClick.Attach(clickCallback);
	}
	else
	{
		ocxBtn.OnClick.Attach(function(btn){
			OcxCore.Utility.ShowLoading(true,"处理中...",5);
			OcxCommandFun.CTIAgentButtonClick(btn.GetId(), {},function(data){
				OcxCore.Utility.ShowLoading(false);
			},function(ex){
				OcxCore.Utility.ShowLoading(false);
				if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
			});
		});
	}
	
	//按钮状态改变事件
	ocxBtn.OnStateChange.Attach(function(btn){
		if(btn.GetVisible() && btn.IsCanUsed())
			jqObj.show();
		else
			jqObj.hide();
		if(btn.IsCanUsed())
			jqObj.removeClass("btnHover").removeClass("btnDisable").addClass("btnEnable");
		else
			jqObj.removeClass("btnHover").removeClass("btnEnable").addClass("btnDisable");
	});
	//按钮绑定点击事件
	jqObj.click(function(e){
		ocxBtn.Click(e);
	});
	//鼠标悬浮于按钮时加亮显示
	jqObj.hover(function () {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).addClass("btnHover");
	    }
	},function() {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).removeClass("btnHover");
	    }
	});
}
/**
 * 示闲 按钮初始化
 * */
function OcxBtnInit_SetIdle()
{
	var jqObj = $("#ocxBtnFree");//按钮jq对象
	var ocxBtn = OcxCore.OcxButtonbar.GetButton("SetIdle");//按钮实体
	ocxBtn.OnClick.Attach(function(btn){
		OcxCore.Utility.ShowLoading(true,"处理中...",5);
		OcxCommandFun.CTIAgentButtonClick(btn.GetId(), {},function(data){
			OcxCore.Utility.ShowLoading(false);
		},function(ex){
			OcxCore.Utility.ShowLoading(false);
			if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
		});
	});
	//按钮状态改变事件
	ocxBtn.OnStateChange.Attach(function(btn){
		if(btn.GetVisible() && btn.IsCanUsed())
			jqObj.show();
		else
			jqObj.hide();
		/*if(btn.IsCanUsed())
			jqObj.removeClass("btnHover").removeClass("btnDisable").addClass("btnEnable");
		else
			jqObj.removeClass("btnHover").removeClass("btnEnable").addClass("btnDisable");*/
	});
	//按钮绑定点击事件
	jqObj.click(function(e){
		ocxBtn.Click(e);
	});
	//鼠标悬浮于按钮时加亮显示
	/*jqObj.hover(function () {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).addClass("btnHover");
	    }
	},function() {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).removeClass("btnHover");
	    }
	});*/
}
/**
 * 示忙 按钮初始化
 * */
function OcxBtnInit_SetBusy()
{
	var jqObj = $("#ocxBtnBusy");//按钮jq对象
	var ocxBtn = OcxCore.OcxButtonbar.GetButton("SetBusy");//按钮实体
	ocxBtn.OnClick.Attach(function(btn){
		OcxCore.Utility.ShowLoading(true,"处理中...",5);
		OcxCommandFun.CTIAgentButtonClick(btn.GetId(), {CTIAgentSubStatus:2},function(data){
			OcxCore.Utility.ShowLoading(false);
		},function(ex){
			OcxCore.Utility.ShowLoading(false);
			if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
		});
	});
	//按钮状态改变事件
	ocxBtn.OnStateChange.Attach(function(btn){
		if(btn.GetVisible() && btn.IsCanUsed())
			jqObj.show();
		else
			jqObj.hide();
		/*if(btn.IsCanUsed())
			jqObj.removeClass("btnHover").removeClass("btnDisable").addClass("btnEnable");
		else
			jqObj.removeClass("btnHover").removeClass("btnEnable").addClass("btnDisable");*/
	});
	//按钮绑定点击事件
	jqObj.click(function(e){
		if(ocxBtn.IsCanUsed())
		{
			OcxCore.Utility.ShowLoading(true,"处理中...",5);
			OcxCommandFun.CTIAgentButtonClick(ocxBtn.GetId(), {CTIAgentSubStatus:2},function(data){
				OcxCore.Utility.ShowLoading(false);
			},function(ex){
				OcxCore.Utility.ShowLoading(false);
				if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
			});
		}
		//ocxBtn.Click(e);
	});
	//鼠标悬浮于按钮时加亮显示
	/*jqObj.hover(function () {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).addClass("btnHover");
	    }
	},function() {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).removeClass("btnHover");
	    }
	});*/
}

/**
 * 置忙 按钮初始化
 * */
function OcxBtnInit_SetBusy1()
{
	var jqObj = $("#ocxBtnBusy1");//置忙操作按钮jq对象
	var ocxBtn = OcxCore.OcxButtonbar.GetButton("SetBusy");//按钮实体
	//按钮状态改变事件
	ocxBtn.OnStateChange.Attach(function(btn){
		if(btn.IsCanUsed())
			jqObj.show();
		else
			jqObj.hide();
		
		/* if(btn.IsCanUsed())
			jqObj.prop("disabled",false);
		else
			jqObj.prop("disabled",true); */
	});
	
	//客户端状态  状态改变事件（离线、空闲、 忙碌）
	jqObj.click(function(e){
		e ? e.stopPropagation() : e.cancelBubble = true;
		$(".ocxState-dropdownData").hide();
        var left = $(this).offset().left - 20;
        $('.ocxState-dropdownData').show().css('top', ($(this).offset().top + 33)).css('left', left);
	});
}
/**
 * 示忙小状态 按钮初始化
 * */
function OcxBtnInit_SetBusySubState()
{
	var ocxBtn = OcxCore.OcxButtonbar.GetButton("SetBusy");//按钮实体
	//按钮状态改变事件
	ocxBtn.OnStateChange.Attach(function(btn){
		if(btn.IsCanUsed())
			$(".ocxSubState").show();
		else
			$(".ocxSubState").hide();
	});
	//置忙小状态按钮点击
	if($.fn.live != undefined)
	{
		$(".ocxSubState").live("click", function() {
			var ocxBtn1 = OcxCore.OcxButtonbar.GetButton("SetBusy");//按钮实体
			if(ocxBtn1.IsCanUsed())
			{
				OcxCore.Utility.ShowLoading(true,"处理中...",5);
				var btnKeyId = $(this).attr("keyid");
				var btnSubState = $(this).attr("substate");
				btnKeyId = btnKeyId != undefined && btnKeyId != "" ? btnKeyId:"SetBusy";
				btnSubState = btnSubState != undefined && btnSubState != "" ? parseInt(btnSubState):2;
				OcxCommandFun.CTIAgentButtonClick(btnKeyId, {CTIAgentSubStatus:btnSubState},function(data){
					OcxCore.Utility.ShowLoading(false);
				},function(ex){
					OcxCore.Utility.ShowLoading(false);
					if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
				});
			}
		});
	}
	else
	{
		$("#ocxBtnBusySubState").on("click",".ocxSubState", function() {
			var ocxBtn1 = OcxCore.OcxButtonbar.GetButton("SetBusy");//按钮实体
			if(ocxBtn1.IsCanUsed())
			{
				OcxCore.Utility.ShowLoading(true,"处理中...",5);
				var btnKeyId = $(this).attr("keyid");
				var btnSubState = $(this).attr("substate");
				btnKeyId = btnKeyId != undefined && btnKeyId != "" ? btnKeyId:"SetBusy";
				btnSubState = btnSubState != undefined && btnSubState != "" ? parseInt(btnSubState):2;
				OcxCommandFun.CTIAgentButtonClick(btnKeyId, {CTIAgentSubStatus:btnSubState},function(data){
					OcxCore.Utility.ShowLoading(false);
				},function(ex){
					OcxCore.Utility.ShowLoading(false);
					if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
				});
			}
		});
	}
	
	//鼠标悬浮于按钮时加亮显示
	/*jqObj.hover(function () {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).addClass("btnHover");
	    }
	},function() {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).removeClass("btnHover");
	    }
	});*/
}
/**
 * 示忙申请 按钮初始化
 * */
function OcxBtnInit_SetBusyApply()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnSetBusyApply","SetBusyApply",function(btn){
		
	});
}
/**
 * 停止事后整理 按钮初始化
 * */
function OcxBtnInit_StopEndProc()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnStopEndProc","StopEndProc");
}
/**
 * 接听 按钮初始化
 * */
function OcxBtnInit_Answer()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnAnswer","Answer");
}

/**
 * 外呼 按钮初始化
 * */
function OcxBtnInit_MakeCall()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnOutCall","MakeCall",function(btn){
		var phone = $("#ocxTxtDialNumber").val();
		if(phone == "")
		{
			OcxCore.Utility.ShowTip("请输入电话号码！", 1);
			return;
		}
		$("#ocxTxtDialNumber").val("");
		OcxCommandFun.MakeCall(phone,"");
	});
}
/**
 * 挂机 按钮初始化
 * */
function OcxBtnInit_Hangup()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnHugeUp","Hangup");
}
///**
// * 开始事后整理 按钮初始化(此按钮暂时不需要)
// * */
/*function OcxBtnInit_StartEndProc()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnStartEndProc","StartEndProc");
}*/
/**
 * 开始满意度调查 按钮初始化
 * */
function OcxBtnInit_Satisfaction()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnSatisfaction","Satisfaction");
}
/**
 * 咨询 按钮初始化
 * */
function OcxBtnInit_Consult()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnConsult","Consult",function(btn){
		OcxCore.ConsultForm(function(){
			
		});
	});
}
/**
 * 转移 按钮初始化
 * */
function OcxBtnInit_Transfer()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnTransfer","Transfer");
}
/**
 * 找回 按钮初始化
 * */
function OcxBtnInit_Return()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnGetBack","Return");
}
/**
 * 保持 按钮初始化
 * */
function OcxBtnInit_Keep()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnHold","Keep");
}
/**
 * 三方会议 按钮初始化
 * */
function OcxBtnInit_Conference()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnConf","Conference");
}
/**
 * 事后闲 按钮初始化
 * */
function OcxBtnInit_SetEndidle()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnFreeAfter","SetEndidle");
}
/**
 * 事后忙 按钮初始化
 * */
function OcxBtnInit_SetEndbusy()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnBusyAfter","SetEndbusy");
}
/**
 * 拦截 按钮初始化
 * */
function OcxBtnInit_Intercept()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnIntercept","Intercept");
}
/**
 * 监控 按钮初始化
 * */
function OcxBtnInit_Monitor()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnMonitor","Monitor",function(btn){
		OcxCore.MonitorForm(function(){
			
		});
	});
}
/**
 * 签入 按钮初始化
 * */
function OcxBtnInit_Checkin()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnCheckin","Checkin",function(btn){
		OcxCore.Checkin(false,function(){
			
		});
	});
}
/**
 * 签出 按钮初始化
 * */
function OcxBtnInit_Checkout()
{
	/*//按钮初始化
	OcxBtnInit_Common("#ocxBtnCheckout","Checkout",function(btn){
		OcxCore.Utility.ShowLoading(true, "正在签出...");
		OcxCommandFun.CTIAgentLogin("Checkout",{},function(data){
			OcxCore.Utility.ShowLoading(false);
			OcxCore.Utility.ShowTip("签出成功", 1);
		},function(ex){
			OcxCore.Utility.ShowLoading(false);
			if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
		});
	});*/
	
	var jqObj = $("#ocxBtnCheckout");//按钮jq对象
	var ocxBtn = OcxCore.OcxButtonbar.GetButton("Checkout");//按钮实体
	ocxBtn.OnClick.Attach(function(btn){
		OcxCore.Utility.ShowLoading(true, "正在签出...");
		OcxCommandFun.CTIAgentLogin("Checkout",{},function(data){
			OcxCore.Utility.ShowLoading(false);
			OcxCore.Utility.ShowTip("签出成功", 1);
		},function(ex){
			OcxCore.Utility.ShowLoading(false);
			if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
		});
	});
	//按钮状态改变事件
	ocxBtn.OnStateChange.Attach(function(btn){
		if(btn.GetVisible() && btn.IsCanUsed())
			jqObj.show();
		else
			jqObj.hide();
		/*if(btn.IsCanUsed())
			jqObj.removeClass("btnHover").removeClass("btnDisable").addClass("btnEnable");
		else
			jqObj.removeClass("btnHover").removeClass("btnEnable").addClass("btnDisable");*/
	});
	//按钮绑定点击事件
	jqObj.click(function(e){
		ocxBtn.Click(e);
	});
	//鼠标悬浮于按钮时加亮显示
	/*jqObj.hover(function () {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).addClass("btnHover");
	    }
	},function() {
	    if (ocxBtn.IsCanUsed()) {
	    	$(this).removeClass("btnHover");
	    }
	});*/
}

/**
 * 坐席配置 按钮初始化
 * */
function OcxBtnInit_SetSeatInfo()
{
	$("#ocxBtnSetSeatInfo").click(function(){
		OcxCore.ShowSetSeatInfoForm(function(){
			
		});
	});
}

/**
 * 离开 按钮初始化
 * */
function OcxBtnInit_LeaveMode()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnLeaveMode","LeaveMode",function(btn){
		var phone = OcxCore.Session.getLeavePhoneNumber();
		if(phone == "")
		{
			OcxCore.Utility.ShowTip("离开时的转接号码不能为空！", 1);
			return;
		}
		
		OcxCore.Utility.ShowLoading(true,"处理中...",5);
		OcxCommandFun.CTIAgentButtonClick(btn.GetId(), {PhoneNumber:phone},function(data){
			OcxCore.Utility.ShowLoading(false);
		},function(ex){
			OcxCore.Utility.ShowLoading(false);
			if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
		});
	});
}
/**
 * 恢复 按钮初始化
 * */
function OcxBtnInit_NormalMode()
{
	//按钮初始化
	OcxBtnInit_Common("#ocxBtnNormalMode","NormalMode");
}

/**
 * 标签显示初始化
 * */
function OcxLabelInit()
{
	//用户账号(工号) 状态改变事件
	OcxCore.OcxInfobar.GetLabel("username").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblUserName");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	//姓名 状态改变事件
	OcxCore.OcxInfobar.GetLabel("userRealName").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblUserRealName");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	//分机号  状态改变事件
	OcxCore.OcxInfobar.GetLabel("extnumber").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblExtNumber");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	//CTI连接  状态改变事件
	OcxCore.OcxInfobar.GetLabel("CTIConnectState").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblCTIConnectState");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	//状态  状态改变事件
	OcxCore.OcxInfobar.GetLabel("currentStatus").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblCurrentStatus");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	//状态时长标签 状态改变事件
	OcxCore.OcxInfobar.GetLabel("stateDurationName").OnStateChange.Attach(function(lbl){
		var jqObj = $("#lblStatusName");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	//状态时长 状态改变事件
	OcxCore.OcxInfobar.GetLabel("stateDuration").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblStateDuration");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	//拨号号码  状态改变事件
	OcxCore.OcxInfobar.GetLabel("callNumber").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblCallNumber");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	//主叫  状态改变事件
	OcxCore.OcxInfobar.GetLabel("caller").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblCaller");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	//被叫  状态改变事件
	OcxCore.OcxInfobar.GetLabel("called").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblCalled");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	//呼叫类型  状态改变事件
	OcxCore.OcxInfobar.GetLabel("callType").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblCallType");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	//队列排队数  状态改变事件
	OcxCore.OcxInfobar.GetLabel("waitCount").OnStateChange.Attach(function(lbl){
		var jqObj = $("#ocxlblWaitCount");//按钮jq对象
		if(lbl.GetVisible())
			jqObj.show();
		else
			jqObj.hide();
		jqObj.html(lbl.GetText());
	});
	
	$(".ocxState-dropdownData-item").click(function (e) {
       $(".ocxState-dropdownData").hide();
    });
	$(document).click(function(){
		$(".ocxState-dropdownData").hide();
	});
}