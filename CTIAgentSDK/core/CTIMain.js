var CallInNoticeShow = false;
var changeDurationInterval = null;
//默认配置
OcxCore.Config = {
	ClientVersion: "2.1.7",//客户端版本
	ServerVersion: "1.0",//服务端版本
	AppTypeId: "callcenter",
	ConnectMode: "socket",//连接CTI模式 socket flash http
	MaxCTIReconnectCount: 10,//CTI最大重连次数
	CTIHeartbeatTimeout: 20,//心跳超时时长（秒）,默认20秒
	ShowCTIHeartbeatLog: false,//是否显示CTI心跳检测日志 默认false不显示   true/false
	CTIServerType: "cti",//CTI服务器类型 cti CTI服务器真实环境   ctiAgent cti模拟器  ctiJsDemo cti模拟器Js版本
	CTIDialPrefix: "",//拨号前缀，如号码前加9
	CTISrvDemoRootPath: "/CTIServerDemo",//CTI模拟器根目录
	EnableCallIdNotify: true,//是否启用CALLID_NOTIFY通知，默认启用
	EnableConsultExtNum: false,//是否启用咨询分机功能，默认禁用    true启用 false禁用
	EnableConsultContact: false,//是否启用咨询通讯录功能，默认禁用    true启用 false禁用
	DialNumberVisible: true,//是否显示拨号框和拨号按钮
	MakeCallOnIdleState: false,//是否允许示闲状态下拨打电话，默认不允许    true允许 false不允许
	SetBusyApproval: false,//坐席置忙状态是否需要审批，默认不需要审批    true需要审批 false不需要审批
	HideMiddlePhoneMode: 1,//加密号码模式 1字母加密 2星号加密
	CanShowRealPhone: true,//是否显示不带0的真实手机号码 true是 false否，默认false不去掉0
	DialogZIndex: 10000000,//弹框层zIndex值
	WebConnectMode: "http",//连接网站模式 socket flash http
	WebConnectUrl: "",//网站客户端连接地址 如果连接网站模式是websocket则指定ws地址，如果是http则指定http心跳连接地址
	WebHeartbeatTimeout: 20,//网站心跳超时时长（秒）,默认20秒
	CommandUrl: "CTIAgent/command.svt",//发送命令到服务端的地址
	ResponseUrl: "CTIAgent/response.svt",//心跳连接地址
	CTICheckinUrl: "web/CTICheckIn.html",//签入页面地址
	CTIConsultUrl: "web/Consult.html",//咨询页面地址
	CTIConsultContactUrl: "/cctadmin/Home/ContactView.do",//咨询通讯录页面地址
	CTIMonitorUrl: "web/Monitor.html",//监控页面地址
	CTISetSeatInfoUrl: "web/SetSeatInfo.html",//坐席配置页面地址
    OperationInCallUrl: "web/OperationInCall.html",//转IVR确认页面
	LogLevel: "TRACE",//显示日志级别TRACE,DEBUG,INFO,WARN,ERROR,FATAL
	SeatGroupList: [],//当前用户所属的技能组列表，如[{GroupId:1,GroupName:"客服组"},{GroupId:2,GroupName:"外呼营销组"}]
	ExtNumberList: [],//当前公司所有分机号列表，如[{ExtNumber:8001,ExtCaller:"2888888",ExtCallerRelayGrpNo:0},{ExtNumber:8002,ExtCaller:"2888888",ExtCallerRelayGrpNo:0}]
	OcxButtons: {//电话工具条按钮控件ID绑定
		SetIdle: { Id: "SetIdle", Text: "示闲", Enabled: false, Visible: true, HasPermission: false },
		SetBusy: { Id: "SetBusy", Text: "示忙", Enabled: false, Visible: false, HasPermission: false },
		SetBusyApply: { Id: "SetBusyApply", Text: "示忙申请", Enabled: false, Visible: false, HasPermission: false },
		StopEndProc: { Id: "StopEndProc", Text: "停止整理", Enabled: false, Visible: false, HasPermission: false },
		Answer: { Id: "Answer", Text: "接听", Enabled: false, Visible: true, HasPermission: false },
		MakeCall: { Id: "MakeCall", Text: "外呼", Enabled: false, Visible: true, HasPermission: false },
		Hangup: { Id: "Hangup", Text: "挂机", Enabled: false, Visible: true, HasPermission: false },
		StartEndProc: { Id: "StartEndProc", Text: "开始整理", Enabled: false, Visible: false, HasPermission: false },
		Satisfaction: { Id: "Satisfaction", Text: "满意度调查", Enabled: false, Visible: false, HasPermission: false },
		LeaveMode: { Id: "LeaveMode", Text: "离开", Enabled: false, Visible: false, HasPermission: false },
		NormalMode: { Id: "NormalMode", Text: "恢复", Enabled: false, Visible: false, HasPermission: false },
		Consult: { Id: "Consult", Text: "咨询", Enabled: false, Visible: true, HasPermission: false },
		Transfer: { Id: "Transfer", Text: "转移", Enabled: false, Visible: true, HasPermission: false },
		Return: { Id: "Return", Text: "找回", Enabled: false, Visible: true, HasPermission: false },
		Keep: { Id: "Keep", Text: "保持", Enabled: false, Visible: true, HasPermission: false },
		Conference: { Id: "Conference", Text: "三方会议", Enabled: false, Visible: true, HasPermission: false },
		SetEndidle: { Id: "SetEndidle", Text: "事后闲", Enabled: false, Visible: true, HasPermission: false },
		SetEndbusy: { Id: "SetEndbusy", Text: "事后忙", Enabled: false, Visible: false, HasPermission: false },
		Intercept: { Id: "Intercept", Text: "拦截", Enabled: false, Visible: true, HasPermission: false },
		Monitor: { Id: "Monitor", Text: "监控", Enabled: false, Visible: true, HasPermission: false },
		Checkin: { Id: "Checkin", Text: "签入", Enabled: true, Visible: true, HasPermission: true },
		Checkout: { Id: "Checkout", Text: "签出", Enabled: false, Visible: false, HasPermission: true },
		OperationInCall:{Id:"OperationInCall",Text:"转IVR",Enabled:false,Visible:false,HasPermission:true}
	},
	OcxLabels: {//电话工具条标签显示控件ID绑定
		//usercode:{Id:"usercode",Label:"工号",Text:"",Visible:true},
		username: { Id: "username", Label: "用户账号", Text: "", Visible: true },
		userRealName: { Id: "userRealName", Label: "姓名", Text: "", Visible: true },
		extnumber: { Id: "extnumber", Label: "分机号", Text: "", Visible: true },
		CTIConnectState: { Id: "CTIConnectState", Label: "CTI连接", Text: "", Visible: true },
		currentStatus: { Id: "currentStatus", Label: "状态", Text: "", Visible: true, Attr: "state", AttrValue: "" },
		stateDurationName: { Id: "stateDurationName", Label: "状态", Text: "状态", Visible: true },
		stateDuration: { Id: "stateDuration", Label: "状态时长", Text: "", Visible: true, Attr: "duration", AttrValue: "" },
		callNumber: { Id: "callNumber", Label: "拨号号码", Text: "", Visible: true },
		caller: { Id: "caller", Label: "主叫", Text: "", Visible: true },
		called: { Id: "called", Label: "被叫", Text: "", Visible: true },
		callType: { Id: "callType", Label: "呼叫类型", Text: "", Visible: true },
		waitCount: { Id: "waitCount", Label: "队列排队数", Text: "", Visible: true },
		callsNum: { Id: "callsNum", Label: "通话次数", Text: "", Visible: true },
		callDuration: { Id: "callDuration", Label: "通话时长", Text: "", Visible: true },
		busyNum: { Id: "busyNum", Label: "示忙次数", Text: "", Visible: true },
		transferNum: { Id: "transferNum", Label: "转移次数", Text: "", Visible: true },
		timeoutNum: { Id: "timeoutNum", Label: "超时次数", Text: "", Visible: true }
	},
	OcxTextBoxs: {//拨号文本框控件ID绑定
		dialNumber: { Id: "dialNumber", Label: "拨号", Text: "", Visible: true }
	},
	//服务开始后
	StartServiceCallback: function () {
		try {
			if (OcxCore.Session != undefined && OcxCore.Session != null && OcxCore.Session.getUserName() != null) {
				/*setTimeout(function(){*/
				//重新设置CTI客户端相关登录信息
				OcxCommandFun.CTIAgentLogin("ReloadLoginInfo", {}, function (ret) {
					if (ret.Result == false) {
						if (ret.Message != undefined && ret.Message != "") OcxCore.Utility.ShowTip(ret.Message, 1);
					}
				}, function (ret) {
					if (ret.Message != undefined && ret.Message != "") OcxCore.Utility.ShowTip(ret.Message, 1);
				});
				/*},50);*/
			}
		} catch (e) {
			OcxCore.Log.error("StartServiceCallback处理出错：" + e.message);
		}
	},
	//服务停止后
	StopServiceCallback: function (stopType, data) {
		try {
			if (changeDurationInterval != null) {
				clearInterval(changeDurationInterval);
				changeDurationInterval = null;
			}
		} catch (e) {
			OcxCore.Log.error("StopServiceCallback处理出错：" + e.message);
		}
	},
	//客户端状态变化回调
	StateChangeCallback: function (ClientStatus, data) {

	},
	//客户端CTI状态变化回调
	CTIStateChangeCallback: function (CTIAgentStatus, CTIConnected, data) {

	},
	//刷新当前用户显示信息和按钮状态
	RefleshUserInfoAndButtonCallback: function (CTIAgentStatus, CTIConnected, data) {
		try {
			if (CTIAgentStatus == undefined) return;
			if (data.EndProcTime != undefined && data.EndProcTime > 0) {
				OcxCore.OcxInfobar.GetLabel("stateDuration").AddAttr("duration", data.EndProcTime + "").AddAttr("countType", "0");
				OcxCore.OcxInfobar.GetLabel("currentStatus").SetText("事后整理").StateChange();
				OcxCore.OcxInfobar.GetLabel("stateDurationName").SetText("整理剩余").StateChange();
			} else {
				OcxCore.OcxInfobar.GetLabel("stateDuration").AddAttr("countType", "1");
				var statusText = OcxCore.OcxInfobar.GetLabel("currentStatus").GetText();
				var stateDurationName = OcxCore.OcxInfobar.GetLabel("stateDurationName");
				if (stateDurationName.GetText() != statusText) {
					statusText = statusText == "正在呼叫" ? "呼叫" : statusText;
					stateDurationName.SetText(statusText).StateChange();
				}
			}

			if (CTIAgentStatus != OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex()) {
				if (changeDurationInterval == null) {
					changeDurationInterval = setInterval("changeCTIStateDuration()", 1000);//1秒更新一次
				}
			} else {
				/*if(changeDurationInterval !=null) 
				{
					clearInterval(changeDurationInterval);
					changeDurationInterval = null;
				}*/
			}
			//隐藏来电提醒
			if (CallInNoticeShow && CTIAgentStatus != OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLIN.getIndex()) {
				CallInNoticeShow = false;
				OcxCore.Session.GetGlobal("onHideCallInNotice").Call();
			}
		} catch (e) {
			OcxCore.Log.error("RefleshUserInfoAndButtonCallback处理出错：" + e.message);
		}
	},
	//签入响应后
	CheckInCallback: function (Result, Message, data) {
		try {
			if (Result == true && data.Code == 1)//签入成功
			{
				if (changeDurationInterval == null) {
					changeDurationInterval = setInterval("changeCTIStateDuration()", 1000);//1秒更新一次
				}
			} else {
				if (Message != undefined && Message != "") OcxCore.Utility.ShowTip(Message, 1);
			}
		} catch (e) {
			OcxCore.Log.error("CheckInCallback处理出错：" + e.message);
		}
	},
	//签出响应后
	CheckOutCallback: function (Result, Message, data) {
		try {
			if (Result == true && data.Code == 1)//签出成功
			{
				/*if(changeDurationInterval !=null) 
				{
					clearInterval(changeDurationInterval);
					changeDurationInterval = null;
				}*/
			} else {
				if (Message != undefined && Message != "") OcxCore.Utility.ShowTip(Message, 1);
			}
		} catch (e) {
			OcxCore.Log.error("CheckOutCallback处理出错：" + e.message);
		}
	},
	//呼入通知（呼入弹屏）
	CallAlertingCallback: function (Caller, Called, CallId, CustomId, GroupId, CallTime, PopTabId, isShowNotice, callData) {

	},
	//呼出通知(呼出弹屏)
	OutCallingCallback: function (Caller, Called, CallId, CustomId, CallTime, OtherParams, PopTabId, callData) {

	},
	//挂机响应
	HangupCallback: function (Caller, Called, CallId, CustomId, GroupId, CallTime, ReceiveStartTime, CallEndTime, CallType, OtherParams, AudioFile, PopTabId, callData) {

	},
	//客户端拨号之前回调函数
	BeforeMakeCallCallback: function (data) {
		return data;
	},
	//保存坐席操作动作回调函数
	SaveCtiOptionCallback: function (UserCode, ExtNumber, ExecutionState, ExecutionTime, EndTime, CompanyId, Remark, Channel) {
		//工号："+UserCode+" 分机号："+ExtNumber+" 操作：
	}
};

//默认配置(备用)
OcxCore.defaults = {
	OcxButtons: {//电话工具条按钮控件ID绑定
		SetIdle: { Id: "SetIdle", Text: "示闲", Enabled: false, Visible: true, HasPermission: false },
		SetBusy: { Id: "SetBusy", Text: "示忙", Enabled: false, Visible: false, HasPermission: false },
		SetBusyApply: { Id: "SetBusyApply", Text: "示忙申请", Enabled: false, Visible: false, HasPermission: false },
		StopEndProc: { Id: "StopEndProc", Text: "停止整理", Enabled: false, Visible: false, HasPermission: false },
		Answer: { Id: "Answer", Text: "接听", Enabled: false, Visible: true, HasPermission: false },
		MakeCall: { Id: "MakeCall", Text: "外呼", Enabled: false, Visible: true, HasPermission: false },
		Hangup: { Id: "Hangup", Text: "挂机", Enabled: false, Visible: true, HasPermission: false },
		StartEndProc: { Id: "StartEndProc", Text: "开始整理", Enabled: false, Visible: false, HasPermission: false },
		Satisfaction: { Id: "Satisfaction", Text: "满意度调查", Enabled: false, Visible: false, HasPermission: false },
		LeaveMode: { Id: "LeaveMode", Text: "离开", Enabled: false, Visible: false, HasPermission: false },
		NormalMode: { Id: "NormalMode", Text: "恢复", Enabled: false, Visible: false, HasPermission: false },
		Consult: { Id: "Consult", Text: "咨询", Enabled: false, Visible: true, HasPermission: false },
		Transfer: { Id: "Transfer", Text: "转移", Enabled: false, Visible: true, HasPermission: false },
		Return: { Id: "Return", Text: "找回", Enabled: false, Visible: true, HasPermission: false },
		Keep: { Id: "Keep", Text: "保持", Enabled: false, Visible: true, HasPermission: false },
		Conference: { Id: "Conference", Text: "三方会议", Enabled: false, Visible: true, HasPermission: false },
		SetEndidle: { Id: "SetEndidle", Text: "事后闲", Enabled: false, Visible: true, HasPermission: false },
		SetEndbusy: { Id: "SetEndbusy", Text: "事后忙", Enabled: false, Visible: false, HasPermission: false },
		Intercept: { Id: "Intercept", Text: "拦截", Enabled: false, Visible: true, HasPermission: false },
		Monitor: { Id: "Monitor", Text: "监控", Enabled: false, Visible: true, HasPermission: false },
		Checkin: { Id: "Checkin", Text: "签入", Enabled: true, Visible: true, HasPermission: true },
		Checkout: { Id: "Checkout", Text: "签出", Enabled: false, Visible: false, HasPermission: true },
		OperationInCall: { Id: "OperationInCall", Text: "转IVR", Enabled: false, Visible: false, HasPermission: true }
	},
	OcxLabels: {//电话工具条标签显示控件ID绑定
		//usercode:{Id:"usercode",Label:"工号",Text:"",Visible:true},
		username: { Id: "username", Label: "用户账号", Text: "", Visible: true },
		userRealName: { Id: "userRealName", Label: "姓名", Text: "", Visible: true },
		extnumber: { Id: "extnumber", Label: "分机号", Text: "", Visible: true },
		CTIConnectState: { Id: "CTIConnectState", Label: "CTI连接", Text: "", Visible: true },
		currentStatus: { Id: "currentStatus", Label: "状态", Text: "", Visible: true, Attr: "state", AttrValue: "" },
		stateDurationName: { Id: "stateDurationName", Label: "状态", Text: "状态", Visible: true },
		stateDuration: { Id: "stateDuration", Label: "状态时长", Text: "", Visible: true, Attr: "duration", AttrValue: "" },
		callNumber: { Id: "callNumber", Label: "拨号号码", Text: "", Visible: true },
		caller: { Id: "caller", Label: "主叫", Text: "", Visible: true },
		called: { Id: "called", Label: "被叫", Text: "", Visible: true },
		callType: { Id: "callType", Label: "呼叫类型", Text: "", Visible: true },
		waitCount: { Id: "waitCount", Label: "队列排队数", Text: "", Visible: true },
		callsNum: { Id: "callsNum", Label: "通话次数", Text: "", Visible: true },
		callDuration: { Id: "callDuration", Label: "通话时长", Text: "", Visible: true },
		busyNum: { Id: "busyNum", Label: "示忙次数", Text: "", Visible: true },
		transferNum: { Id: "transferNum", Label: "转移次数", Text: "", Visible: true },
		timeoutNum: { Id: "timeoutNum", Label: "超时次数", Text: "", Visible: true }
	},
	OcxTextBoxs: {//拨号文本框控件ID绑定
		dialNumber: { Id: "dialNumber", Label: "拨号", Text: "", Visible: true }
	}
};
/**
 * 显示状态时长
 * */
function changeCTIStateDuration() {
	var stateDuration = OcxCore.OcxInfobar.GetLabel("stateDuration");
	var stateDurationName = OcxCore.OcxInfobar.GetLabel("stateDurationName");
	if (stateDuration.GetAttrValue("duration") != "") {
		var dseconds = stateDuration.GetAttrValue("countType") == "1" ? parseInt(stateDuration.GetAttrValue("duration")) + 1 : parseInt(stateDuration.GetAttrValue("duration")) - 1;
		if (dseconds < 0)
			dseconds = 0;
		stateDuration.AddAttr("duration", dseconds + "").SetText(OcxCore.FormatSeconds(dseconds)).StateChange();
	} else {
		stateDuration.SetText("--:--:--").StateChange();
		if (stateDurationName.GetText() != "") {
			stateDurationName.SetText("").StateChange();
		}
	}
	if (stateDuration.GetAttrValue("countType") == "1") {
		var statusText = OcxCore.OcxInfobar.GetLabel("currentStatus").GetText();
		if (stateDurationName.GetText() != statusText) {
			statusText = statusText == "正在呼叫" ? "呼叫" : statusText;
			stateDurationName.SetText(statusText).StateChange();
		}
	}
}


(function () {
	var OcxControl = {};

	OcxControl.Button = function (config) {
		var This = this;
		var _visible = true;//是否显示
		var _id = "";//ID

		var _enabled = false;//是否启用
		var _hasPermission = false;//是否有操作权限

		This.OnClick = new OcxCore.Delegate();
		This.OnNotify = new OcxCore.Delegate();
		This.OnStateChange = new OcxCore.Delegate();

		This.Click = function () {
			if (This.IsCanUsed())
				This.OnClick.Call(This);
		}
		This.Notify = function (cmd, data) {
			This.OnNotify.Call(cmd, data);
		}
		This.StateChange = function () {
			This.OnStateChange.Call(This);
		}

		//ID
		This.GetId = function () {
			return _id;
		}
		This.SetId = function (value) {
			_id = value;
			return This;
		}
		//显示控制
		This.GetVisible = function () {
			return _visible;
		}
		This.SetVisible = function (value) {
			_visible = value;
			return This;
		}

		var _text = "";
		This.GetText = function () { return _text; }
		This.SetText = function (value) { _text = value; return This; }

		//是否可用
		This.IsEnabled = function () {
			return _enabled;
		}
		This.SetEnabled = function (value) {
			_enabled = value;
			return This;
		}
		//是否有权限操作
		This.HasPermission = function () {
			return _hasPermission;
		}
		This.SetPermission = function (value) {
			_hasPermission = value;
			return This;
		}
		/**
		 * 检测按钮点击事件是否有效
		 * 注：如果按钮不可用则点击无效
		 * */
		This.IsCanUsed = function () {
			return _enabled && _hasPermission;
		}

		//恢复默认
		This.initDefault = function () {
			This.SetEnabled(false);
			This.SetVisible(false);
			This.SetPermission(false);
		}
		//重新设置按钮状态
		This.Reset = function (_config) {
			This.SetEnabled(OcxCore.Utility.IsNull(_config.Enabled, _enabled));
			This.SetVisible(OcxCore.Utility.IsNull(_config.Visible, This.GetVisible()));
			This.SetPermission(OcxCore.Utility.IsNull(_config.HasPermission, _haspermission));
		}

		//初始化
		This.SetId(OcxCore.Utility.IsNull(config.Id, ""));
		This.SetText(OcxCore.Utility.IsNull(config.Text, ""));
		This.SetEnabled(OcxCore.Utility.IsNull(config.Enabled, false));
		This.SetVisible(OcxCore.Utility.IsNull(config.Visible, true));
		This.SetPermission(OcxCore.Utility.IsNull(config.HasPermission, false));
		/*if(config.click != undefined)
		{
			This.OnClick.Attach(config.click);
		}*/
		This.OnNotify.Attach(function (cmd, data) {
			This.SetEnabled(OcxCore.Utility.IsNull(data[This.GetId()].Enabled, _enabled));
			This.SetVisible(OcxCore.Utility.IsNull(data[This.GetId()].Visible, This.GetVisible()));
			This.SetPermission(OcxCore.Utility.IsNull(data[This.GetId()].HasPermission, _hasPermission));

			This.StateChange();
		});
	}

	OcxControl.Label = function (config) {
		var This = this;
		var _visible = true;//是否显示
		var _id = "";//ID
		var _attributes = {};//属性

		This.OnNotify = new OcxCore.Delegate();
		This.OnStateChange = new OcxCore.Delegate();

		This.StateChange = function () {
			This.OnStateChange.Call(This);
		}
		//ID
		This.GetId = function () {
			return _id;
		}
		This.SetId = function (value) {
			_id = value;
			return This;
		}
		//显示控制
		This.GetVisible = function () {
			return _visible;
		}
		This.SetVisible = function (value) {
			_visible = value;
			return This;
		}
		//添加属性
		This.AddAttr = function (key, value) {
			if (key != undefined && key != "")
				_attributes[key] = value != undefined && value != null ? value + "" : "";
			return This;
		}
		//删除属性
		This.RemoveAttr = function (key) {
			if (key != undefined && key != "")
				delete _attributes[key];
			return This;
		}
		//获取属性值
		This.GetAttrValue = function (key) {
			if (key != undefined && key != "")
				return _attributes[key];
			else
				return "";
		}
		var _text = "";
		This.SetText = function (value) {
			_text = value;
			return This;
		}

		This.GetText = function (value) {
			return _text;
		}
		This.Notify = function (cmd, data) {
			This.OnNotify.Call(cmd, data);
		}
		//重新设置
		This.Reset = function (_config) {
			This.SetText(OcxCore.Utility.IsNull(_config.Text, ""));
			This.SetVisible(OcxCore.Utility.IsNull(_config.Visible, This.GetVisible()));
			This.AddAttr(OcxCore.Utility.IsNull(_config.Attr, ""), OcxCore.Utility.IsNull(_config.AttrValue, ""));
		}
		//初始化
		This.SetId(OcxCore.Utility.IsNull(config.Id, ""));
		This.SetText(OcxCore.Utility.IsNull(config.Text, ""));

		This.AddAttr(OcxCore.Utility.IsNull(config.Attr, ""), OcxCore.Utility.IsNull(config.AttrValue, ""));

		This.OnNotify.Attach(function (cmd, data) {
			This.SetText(OcxCore.Utility.IsNull(data[This.GetId()].Text, ""));
			This.AddAttr(OcxCore.Utility.IsNull(data[This.GetId()].Attr, ""), OcxCore.Utility.IsNull(data[This.GetId()].AttrValue, ""));

			This.StateChange();
		});
	}

	OcxControl.TextBox = function (config) {
		var This = this;
		var _enabled = false;//是否启用
		var _visible = true;//是否显示
		var _id = "";//ID

		//ID
		This.GetId = function () {
			return _id;
		}
		This.SetId = function (value) {
			_id = value;
		}
		//显示控制
		This.GetVisible = function () {
			return _visible;
		}
		This.SetVisible = function (value) {
			_visible = value;
		}
		var _text = "";
		This.SetText = function (value) {
			_text = value;
		}

		This.GetText = function (value) {
			return _text;
		}

		//是否可用
		This.IsEnabled = function () {
			return _enabled;
		}
		This.SetEnabled = function (value) {
			_enabled = value;
		}
		//重新设置
		This.Reset = function (_config) {
			This.SetText(OcxCore.Utility.IsNull(_config.Text, ""));
			This.SetEnabled(OcxCore.Utility.IsNull(_config.Enabled, _enabled));
			This.SetVisible(OcxCore.Utility.IsNull(_config.Visible, This.GetVisible()));
		}
		//初始化
		This.SetId(OcxCore.Utility.IsNull(config.Id, ""));
		This.SetText(OcxCore.Utility.IsNull(config.Text, ""));
		This.SetEnabled(OcxCore.Utility.IsNull(config.Enabled, true));
	}

	//电话工具条的操作按钮栏
	OcxCore.OcxButtonbar = (function () {

		var obj = {};

		obj.OnCommand = new OcxCore.Delegate();

		var _buttons = {};
		obj.AddButtons = function (config) {
			if (config == undefined || config == null) return _buttons;
			for (var itemCfg in config) {
				var button = new OcxControl.Button(config[itemCfg]);

				_buttons[config[itemCfg].Id] = button;
			}
			return _buttons;
		}
		obj.GetButton = function (id) {
			return _buttons[id];
		}

		obj.ResetAllButtons = function (config) {
			if (config == undefined || config == null) return _buttons;
			for (var itemCfg in config) {
				if (_buttons[config[itemCfg].Id] != undefined) {
					_buttons[config[itemCfg].Id].Reset(config[itemCfg]);
				}
			}
			return _buttons;
		}
		obj.OnCommand.Attach(function () {


		});

		obj.Notify = function (cmd, data) {
			if (cmd == "UserInfoChanged") {

			}
			else if (cmd == "UserStateChanged") {

			} else if (cmd == "CurrentUserCTIStateChanged") {
				for (var i in _buttons) {
					try {
						_buttons[i].OnNotify.Call(cmd, data);
					}
					catch (ex) {
					}
				}
			} else if (cmd == "initDefault") {
				for (var i in _buttons) {
					_buttons[i].initDefault();
				}
			}
		}
		return obj;
	})();

	//电话工具条的信息显示栏
	OcxCore.OcxInfobar = (function () {
		var obj = {};

		obj.OnCommand = new OcxCore.Delegate();
		obj.OnNotify = new OcxCore.Delegate();

		var _labels = {};
		obj.AddLabels = function (config) {
			if (config == undefined || config == null) return _labels;
			for (var itemCfg in config) {
				var label = new OcxControl.Label(config[itemCfg]);

				_labels[config[itemCfg].Id] = label;
			}
			return _labels;
		}
		obj.GetLabel = function (id) {
			return _labels[id];
		}
		obj.ResetAllLabels = function (config) {
			if (config == undefined || config == null) return _labels;
			for (var itemCfg in config) {
				if (_labels[config[itemCfg].Id] != undefined) {
					_labels[config[itemCfg].Id].Reset(config[itemCfg]);
				}
			}
			return _labels;
		}
		obj.OnCommand.Attach(function () {


		});

		obj.Notify = function (cmd, data) {
			if (cmd == "UserInfoChanged") {

			}
			else if (cmd == "UserStateChanged") {

			} else if (cmd == "CurrentUserCTIStateChanged") {
				for (var i in _labels) {
					try {
						_labels[i].OnNotify.Call(cmd, data);
					}
					catch (ex) {
					}
				}
			} else if (cmd == "initDefault") {
				for (var i in _labels) {
					_labels[i].SetText("");
				}
			}
		}
		return obj;
	})();
	//电话工具条的文本框栏
	OcxCore.OcxTextBoxbar = (function () {
		var obj = {};

		obj.OnCommand = new OcxCore.Delegate();
		obj.OnNotify = new OcxCore.Delegate();

		var _textboexs = {};
		obj.AddTextBoxs = function (config) {
			if (config == undefined || config == null) return _textboexs;
			for (var itemCfg in config) {
				var textbox = new OcxControl.TextBox(config[itemCfg]);

				_textboexs[config[itemCfg].Id] = textbox;
			}
			return _textboexs;
		}
		obj.GetTextBox = function (id) {
			return _textboexs[id];
		}
		obj.ResetAllTextBoxs = function (config) {
			if (config == undefined || config == null) return _textboexs;
			for (var itemCfg in config) {
				if (_textboexs[config[itemCfg].Id] != undefined) {
					_textboexs[config[itemCfg].Id].Reset(config[itemCfg]);
				}
			}
			return _textboexs;
		}
		obj.OnCommand.Attach(function () {


		});

		obj.OnNotify.Attach(function (command, data) {
			if (command == "UserInfoChanged") {

			}
			else if (command == "UserStateChanged") {
				//	            if (config.Peer.ID == data.User)
				//	            {
				//	                m_UserInfoCtrl.ResetUserInfo(data.Details);
				//	            }
			}
		});
		return obj;
	})();

	var ReponsesProcess = OcxCore.Session.GetGlobal("ReponsesProcess");
	ReponsesProcess = (function (obj) {
		obj = obj != undefined && obj != null ? obj : {};
		var m_GlobalHandler = {
			"CurrentUserCTIStateChanged": function (data)//当前用户CTI状态改变
			{
				try {
					OcxCore.Utility.ShowLoading(false);

					if (data.Result == false) {
						if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
					} else {
						OcxCore.Session.GetGlobal("WindowManagement").Notify("CurrentUserCTIStateChanged", data);
						if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1, 1);
					}
					OcxCore.Session.GetGlobal("CTIStateChangeCallback").Call(OcxCore.Session.getCTIAgentStatus(), OcxCore.Session.IsCTIConnected(), data);
					OcxCore.Session.GetGlobal("onCTIStateChange").Call(OcxCore.Session.getCTIAgentStatus(), OcxCore.Session.IsCTIConnected(), data);
				} catch (e) {
					OcxCore.Log.error("CurrentUserCTIStateChanged处理出错：" + e.message);
				}
			},
			"RefleshUserInfoAndButton": function (data)//刷新当前用户显示信息和按钮状态
			{
				try {
					OcxCore.Utility.ShowLoading(false);
					//重新设置按钮状态信息
					if (data.ButtonsInfo != undefined && OcxCore.OcxButtonbar != undefined)
						OcxCore.OcxButtonbar.Notify("CurrentUserCTIStateChanged", data.ButtonsInfo);//电话工具条按钮栏
					//重新设置标签信息
					if (data.LabelsInfo != undefined && OcxCore.OcxInfobar != undefined)
						OcxCore.OcxInfobar.Notify("CurrentUserCTIStateChanged", data.LabelsInfo);//电话工具条按钮栏

					if (data.Result == false) {
						if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
					} else {
						if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1, 1);
					}
					OcxCore.Session.GetGlobal("RefleshUserInfoAndButtonCallback").Call(OcxCore.Session.getCTIAgentStatus(), OcxCore.Session.IsCTIConnected(), data);
					//客户端显示信息和按钮状态变化后回调函数
					OcxCore.Session.GetGlobal("onRefleshShowInfo").Call(OcxCore.Session.getCTIAgentStatus(), OcxCore.Session.IsCTIConnected(), data);
				} catch (e) {
					OcxCore.Log.error("RefleshUserInfoAndButton处理出错：" + e.message);
				}
			},
			"CHECKIN_RES": function (data)//签入结果反馈
			{
				try {
					OcxCore.Utility.ShowLoading(false);
					
					if(data.Result == false)
					{
	   					//if(data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
						//签入错误提示更改时长为5s
	   					if(data.Message != undefined && data.Message != "") OcxCore.Utility.ShowWarning(data.Message);
					}else
					{
						if(data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
						OcxCore.Session.GetGlobal("CheckInCallback").Call(data.Result,data.Message,data);//签入响应回调函数
					}
					OcxCore.Session.GetGlobal("onCheckIn").Call(data.Result, data.ErrorCode, data.Message, data);//签入响应回调函数
					//OcxCore.Session.RegisterGlobal("CurrentCallDataCache", null);//当前呼入呼出电话数据缓存
				} catch (e) {
					OcxCore.Log.error("CHECKIN_RES处理出错：" + e.message);
				}
			},
			"CHECKOUT_RES": function (data)//签出结果反馈
			{
				try {
					OcxCore.Utility.ShowLoading(false);
					if (data.Result == false) {
						if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
					} else {
						if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
						OcxCore.Session.GetGlobal("CheckOutCallback").Call(data.Result, data.Message, data);//签出响应后回调函数
					}
					OcxCore.Session.GetGlobal("onCheckOut").Call(data.Result, data.ErrorCode, data.Message, data);//签出响应后回调函数
					OcxCore.Session.RegisterGlobal("CurrentCallDataCache", null);//当前呼入呼出电话数据缓存
				} catch (e) {
					OcxCore.Log.error("CHECKOUT_RES处理出错：" + e.message);
				}
			},
			"CALLALERTING_NOTIFY": function (data)//呼入通知（呼入弹屏）
			{
				OcxCore.Utility.ShowLoading(false);
				if (data.Result == true) {
					var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
					if (CallDataCache != undefined)//只缓存最近100个通话
					{
						if (CallDataCache.size() >= 100) {
							CallDataCache.remove(CallDataCache.keySet()[0]);
						}
						CallDataCache.put(data.PopTabId, data);
					}
					OcxCore.Session.RegisterGlobal("CurrentCallDataCache", data);//当前呼入呼出电话数据缓存
					OcxCore.Session.GetGlobal("CallAlertingCallback").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, true, data);//呼入通知（呼入弹屏）回调函数

					OcxCore.Session.GetGlobal("onCallAlerting").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, true, data);//呼入通知（呼入弹屏）回调函数
				} else {
					if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
				}
			},
			"CALLOUT_NOTIFY": function (data)//呼出通知(呼出弹屏)
			{
				OcxCore.Utility.ShowLoading(false);
				if (data.Result == true) {
					var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
					if (CallDataCache != undefined)//只缓存最近100个通话
					{
						if (CallDataCache.size() >= 100) {
							CallDataCache.remove(CallDataCache.keySet()[0]);
						}
						CallDataCache.put(data.PopTabId, data);
					}
					OcxCore.Session.RegisterGlobal("CurrentCallDataCache", data);//当前呼入呼出电话数据缓存
					OcxCore.Session.GetGlobal("OutCallingCallback").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.CallTime, data.OtherParams, data.PopTabId, data);//呼出通知(呼出弹屏)回调函数

					OcxCore.Session.GetGlobal("onOutCalling").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.CallTime, data.OtherParams, data.PopTabId, data);//呼出通知(呼出弹屏)回调函数

				} else {
					if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
				}
			},
			"TALKING_NOTIFY": function (data)//通话通知(不弹屏)
			{
				OcxCore.Utility.ShowLoading(false);
				if (data.Result == true) {
					var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
					if (CallDataCache != undefined)//只缓存最近100个通话
					{
						var callData = CallDataCache.get(data.PopTabId);
						if (callData != undefined && callData != null) {
							callData.AudioFile = data.AudioFile != undefined ? data.AudioFile : callData.AudioFile;
							callData.ReceiveStartTime = data.ReceiveStartTime != undefined ? data.ReceiveStartTime : callData.ReceiveStartTime;
						}
						else {
							if (CallDataCache.size() >= 100) {
								CallDataCache.remove(CallDataCache.keySet()[0]);
							}
							CallDataCache.put(data.PopTabId, data);
						}
					}

					var CurrentCallDataCache = OcxCore.Session.GetGlobal("CurrentCallDataCache");//当前呼入呼出电话数据缓存
					if (CurrentCallDataCache != undefined && CurrentCallDataCache != null)//只缓存最近100个通话
					{
						CurrentCallDataCache.AudioFile = data.AudioFile != undefined ? data.AudioFile : CurrentCallDataCache.AudioFile;
						CurrentCallDataCache.ReceiveStartTime = data.ReceiveStartTime != undefined ? data.ReceiveStartTime : CurrentCallDataCache.ReceiveStartTime;
					}
					else {
						OcxCore.Session.RegisterGlobal("CurrentCallDataCache", data);//当前呼入呼出电话数据缓存
					}

					//通话通知回调函数
					OcxCore.Session.GetGlobal("onTalking").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.ReceiveStartTime, data.AudioFile, data.PopTabId, data);//通话通知回调函数
				} else {
					if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
				}
			},
			"TRANSFERSEAT_NOTIFY": function (data)//内线被转移通知（弹屏）
			{
				OcxCore.Utility.ShowLoading(false);
				if (data.Result == true) {
					var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
					if (CallDataCache != undefined)//只缓存最近100个通话
					{
						if (CallDataCache.size() >= 100) {
							CallDataCache.remove(CallDataCache.keySet()[0]);
						}
						CallDataCache.put(data.PopTabId, data);
					}
					OcxCore.Session.RegisterGlobal("CurrentCallDataCache", data);//当前呼入呼出电话数据缓存
					OcxCore.Session.GetGlobal("CallAlertingCallback").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, false, data);//内线被转移通知（呼入弹屏）回调函数

					//内线被转移通知（弹屏）回调函数
					if (OcxCore.Session.GetGlobal("onTransferAlerting") != undefined && OcxCore.Session.GetGlobal("onTransferAlerting") != null && OcxCore.Session.GetGlobal("onTransferAlerting").AttachSize() > 0) {
						OcxCore.Session.GetGlobal("onTransferAlerting").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, false, data);//内线被转移通知（呼入弹屏）回调函数
					}
					else {
						OcxCore.Session.GetGlobal("onCallAlerting").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, false, data);//内线被转移通知（呼入弹屏）回调函数
					}
				} else {
					if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
				}
			},
			"SEATCALLSEAT_NOTIFY": function (data)//坐席呼坐席通知(不弹屏)
			{
				OcxCore.Utility.ShowLoading(false);
				if (data.Result == true) {
					var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
					if (CallDataCache != undefined)//只缓存最近100个通话
					{
						if (CallDataCache.size() >= 100) {
							CallDataCache.remove(CallDataCache.keySet()[0]);
						}
						CallDataCache.put(data.PopTabId, data);
					}
					OcxCore.Session.RegisterGlobal("CurrentCallDataCache", data);//当前呼入呼出电话数据缓存

					OcxCore.Session.GetGlobal("CallAlertingCallback").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, true, data);//坐席呼坐席通知 回调函数

					//坐席呼坐席内线通知（内线呼入弹屏）回调函数
					if (OcxCore.Session.GetGlobal("onInternalCallAlerting") != undefined && OcxCore.Session.GetGlobal("onInternalCallAlerting") != null && OcxCore.Session.GetGlobal("onInternalCallAlerting").AttachSize() > 0) {
						OcxCore.Session.GetGlobal("onInternalCallAlerting").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, true, data);//坐席呼坐席内线通知（内线呼入弹屏）回调函数
					}
					else {
						OcxCore.Session.GetGlobal("onCallAlerting").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, true, data);//坐席呼坐席通知 回调函数
					}
				} else {
					if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
				}
			},
			"HANGUP_RES": function (data)//挂机响应
			{
				OcxCore.Utility.ShowLoading(false);
				if (data.Result == true) {
					var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
					if (CallDataCache != undefined)//只缓存最近100个通话
					{
						var callData = CallDataCache.get(data.PopTabId);
						if (callData != undefined && callData != null) {
							callData.AudioFile = data.AudioFile != undefined ? data.AudioFile : callData.AudioFile;
							callData.ReceiveStartTime = data.ReceiveStartTime != undefined ? data.ReceiveStartTime : callData.ReceiveStartTime;
							callData.ReceiveEndTime = data.ReceiveEndTime != undefined ? data.ReceiveEndTime : callData.ReceiveEndTime;
							callData.CallEndTime = data.CallEndTime != undefined ? data.CallEndTime : callData.CallEndTime;
						}
					}

					OcxCore.Session.RegisterGlobal("CurrentCallDataCache", null);//当前呼入呼出电话数据缓存
					OcxCore.Session.GetGlobal("HangupCallback").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.ReceiveStartTime, data.CallEndTime, data.CallType, data.OtherParams, data.AudioFile, data.PopTabId, data);//挂机响应回调函数

					OcxCore.Session.GetGlobal("onHangup").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.ReceiveStartTime, data.CallEndTime, data.CallType, data.OtherParams, data.AudioFile, data.PopTabId, data);//挂机响应回调函数
				} else {
					if (data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
				}
			},
			"ShowCallInNotice": function (data)//显示来电提醒回调函数
			{
				OcxCore.Utility.ShowLoading(false);
				if (data.Result == true) {
					CallInNoticeShow = true;
					OcxCore.Session.GetGlobal("onShowCallInNotice").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, true, data);//显示来电提醒回调函数
				}
			}
		}

		obj.GlobalHandler = obj.GlobalHandler != undefined && obj.GlobalHandler != null ? obj.GlobalHandler : {};
		OcxCore.Utility.Extend(obj.GlobalHandler, m_GlobalHandler);
		return obj;
	})(ReponsesProcess);

	OcxCore.Session.RegisterGlobal("CallDataCache", new OcxCore.Map());//所有呼入呼出电话数据缓存
	OcxCore.Session.RegisterGlobal("CurrentCallDataCache", null);//当前呼入呼出电话数据缓存

	OcxCore.Session.RegisterGlobal("CTIStateChangeCallback", new OcxCore.Delegate());//客户端CTI状态变化响应回调函数
	OcxCore.Session.RegisterGlobal("RefleshUserInfoAndButtonCallback", new OcxCore.Delegate());//刷新当前用户显示信息和按钮状态回调函数
	OcxCore.Session.RegisterGlobal("CheckInCallback", new OcxCore.Delegate());//签入响应回调函数
	OcxCore.Session.RegisterGlobal("CheckOutCallback", new OcxCore.Delegate());//签出响应后回调函数
	OcxCore.Session.RegisterGlobal("CallAlertingCallback", new OcxCore.Delegate());//呼入通知（呼入弹屏）回调函数
	OcxCore.Session.RegisterGlobal("OutCallingCallback", new OcxCore.Delegate());//呼出通知(呼出弹屏)回调函数
	OcxCore.Session.RegisterGlobal("HangupCallback", new OcxCore.Delegate());//挂机响应回调函数
	OcxCore.Session.RegisterGlobal("BeforeMakeCallCallback", new OcxCore.Delegate());//客户端拨号之前回调函数
	OcxCore.Session.RegisterGlobal("SaveCtiOptionCallback", new OcxCore.Delegate());//保存坐席操作动作回调函数

	OcxCore.Session.RegisterGlobal("onReceiveCTIMessage", new OcxCore.Delegate());//客户端接收到CTI发送的信息回调函数

	OcxCore.Session.RegisterGlobal("onCTIStateChange", new OcxCore.Delegate());//客户端CTI状态变化响应回调函数
	OcxCore.Session.RegisterGlobal("onRefleshShowInfo", new OcxCore.Delegate());//客户端显示信息和按钮状态变化后回调函数

	OcxCore.Session.RegisterGlobal("onBeforeCheckIn", new OcxCore.Delegate());//客户端签入之前回调函数

	OcxCore.Session.RegisterGlobal("onBeforeCTIConnect", new OcxCore.Delegate());//客户端与CTI连接之前回调函数
	OcxCore.Session.RegisterGlobal("onCTIConnectStateChange", new OcxCore.Delegate());//客户端与CTI连接状态变化回调函数
	OcxCore.Session.RegisterGlobal("onCallAlerting", new OcxCore.Delegate());//呼入通知（呼入弹屏）回调函数
	OcxCore.Session.RegisterGlobal("onOutCalling", new OcxCore.Delegate());//呼出通知(呼出弹屏)回调函数
	OcxCore.Session.RegisterGlobal("onTalking", new OcxCore.Delegate());//通话通知回调函数
	OcxCore.Session.RegisterGlobal("onHangup", new OcxCore.Delegate());//挂机响应回调函数
	OcxCore.Session.RegisterGlobal("onBeforeMakeCall", new OcxCore.Delegate());//客户端拨号之前回调函数
	OcxCore.Session.RegisterGlobal("onSaveCtiOption", new OcxCore.Delegate());//保存坐席操作动作回调函数
	OcxCore.Session.RegisterGlobal("onSaveSeatSettings", new OcxCore.Delegate());//保存坐席配置信息回调函数

	OcxCore.Session.RegisterGlobal("onShowCallInNotice", new OcxCore.Delegate());//显示来电提醒回调函数
	OcxCore.Session.RegisterGlobal("onHideCallInNotice", new OcxCore.Delegate());//显示来电提醒回调函数
	OcxCore.Session.RegisterGlobal("OnOperationInCallComplete", new OcxCore.Delegate());//转IVR结果通知事件
	
	//操作事件响应回调函数

	OcxCore.Session.RegisterGlobal("onCheckIn", new OcxCore.Delegate());//签入响应回调函数
	OcxCore.Session.RegisterGlobal("onCheckOut", new OcxCore.Delegate());//签出响应后回调函数
	OcxCore.Session.RegisterGlobal("onReloadInfoRes", new OcxCore.Delegate());//断开自动重新加载登录信息响应回调函数
	OcxCore.Session.RegisterGlobal("onSetIdleRes", new OcxCore.Delegate());//示闲响应回调函数
	OcxCore.Session.RegisterGlobal("onSetBusyRes", new OcxCore.Delegate());//示忙响应回调函数
	OcxCore.Session.RegisterGlobal("onAnswerRes", new OcxCore.Delegate());//接听响应回调函数
	OcxCore.Session.RegisterGlobal("onMakeCallRes", new OcxCore.Delegate());//外呼响应回调函数
	OcxCore.Session.RegisterGlobal("onHangupRes", new OcxCore.Delegate());//挂机响应回调函数
	OcxCore.Session.RegisterGlobal("onKeepRes", new OcxCore.Delegate());//保持响应回调函数
	OcxCore.Session.RegisterGlobal("onGetBackRes", new OcxCore.Delegate());//找回响应回调函数
	OcxCore.Session.RegisterGlobal("onConsultRes", new OcxCore.Delegate());//咨询响应回调函数
	OcxCore.Session.RegisterGlobal("onTransferRes", new OcxCore.Delegate());//转移响应回调函数
	OcxCore.Session.RegisterGlobal("onConferenceRes", new OcxCore.Delegate());//会议响应回调函数
	OcxCore.Session.RegisterGlobal("onListenRes", new OcxCore.Delegate());//监听响应回调函数
	OcxCore.Session.RegisterGlobal("onStopListenRes", new OcxCore.Delegate());//停止监听响应回调函数
	OcxCore.Session.RegisterGlobal("onForceEnterRes", new OcxCore.Delegate());//强插响应回调函数
	OcxCore.Session.RegisterGlobal("onForceRemoveRes", new OcxCore.Delegate());//强拆响应回调函数
	OcxCore.Session.RegisterGlobal("onForceSetIdleRes", new OcxCore.Delegate());//强制示闲响应回调函数
	OcxCore.Session.RegisterGlobal("onForceSetBusyRes", new OcxCore.Delegate());//强制示忙响应回调函数
	OcxCore.Session.RegisterGlobal("onStopMonitorConfRes", new OcxCore.Delegate());//停止监控会议响应回调函数
	OcxCore.Session.RegisterGlobal("onStopConferenceRes", new OcxCore.Delegate());//退出会议响应回调函数
	OcxCore.Session.RegisterGlobal("onEndBusyRes", new OcxCore.Delegate());//事后忙响应回调函数
	OcxCore.Session.RegisterGlobal("onEndIdleRes", new OcxCore.Delegate());//事后闲响应回调函数
	OcxCore.Session.RegisterGlobal("onBeginMonitorRes", new OcxCore.Delegate());//开始监控响应回调函数
	OcxCore.Session.RegisterGlobal("onStopMonitorRes", new OcxCore.Delegate());//停止监控响应回调函数
	OcxCore.Session.RegisterGlobal("onSetSeatInfoRes", new OcxCore.Delegate());//设置坐席配置信息响应回调函数
	OcxCore.Session.RegisterGlobal("onLeaveModeRes", new OcxCore.Delegate());//离开响应回调函数
	OcxCore.Session.RegisterGlobal("onNormalModeRes", new OcxCore.Delegate());//恢复响应回调函数
	OcxCore.Session.RegisterGlobal("onOperationInCallRes", new OcxCore.Delegate());//转IVR响应回调函数

	//通知
	OcxCore.Session.RegisterGlobal("onTransferAlerting", new OcxCore.Delegate());//转移坐席通知（转移弹屏）回调函数
	OcxCore.Session.RegisterGlobal("onCallInlineAlerting", new OcxCore.Delegate());//坐席呼坐席内线通知（内线呼入弹屏）回调函数



	//初始化电话工具条按钮
	if (OcxCore.Config.OcxButtons != undefined && OcxCore.Config.OcxButtons != null) {
		OcxCore.OcxButtonbar.AddButtons(OcxCore.Config.OcxButtons);
	}
	//电话工具条的信息显示栏
	if (OcxCore.Config.OcxLabels != undefined && OcxCore.Config.OcxLabels != null) {
		OcxCore.OcxInfobar.AddLabels(OcxCore.Config.OcxLabels);
		OcxCore.OcxInfobar.GetLabel("stateDuration").AddAttr("countType", "1");
	}
})();

var OcxCommandFun = {};
OcxCore.OcxCommandFun = OcxCommandFun;

/**
 * CTIAgent CTI相关操作命令
 * */
OcxCommandFun.CTIAgentCommand = function (action, subAction, data, callback, errorCallback) {
	if (data == undefined || data == null) data = {};
	if (action == undefined || action == null) {
		OcxCore.Utility.ShowTip("action不能为空！", 1);
		return false;
	}
	if (subAction == undefined || subAction == null) {
		OcxCore.Utility.ShowTip("subAction不能为空！", 1);
		return false;
	}

	data.Action = subAction;
	OcxCore.Log.trace(OcxCore.utils.stringFormat("CTIAgentCommand：'{0}'", OcxCore.Utility.RenderJson(data)));

	var procResult = false;
	var resultData = OcxCore.cti.Command_CH.Process(OcxCore.Utility.GetUUID(), subAction, OcxCore.Config.AppTypeId, OcxCore.Config.ClientVersion, data);
	if (resultData != undefined && resultData != null) {
		if (resultData.Result == true) {
			procResult = true;
			callback(resultData);
		} else {
			procResult = false;
			errorCallback(resultData);
		}
	}

	return procResult;
	/*data.Action = action;
	data.SubAction = subAction;
	data.User = OcxCore.Session.getUserName();
	OcxCore.Log.trace(OcxCore.utils.stringFormat("CTIAgentCommand：'{0}'", OcxCore.Utility.RenderJson(data)));
	OcxCore.SendCommand(
		function(ret)
		{
			callback(ret);
		},
		function(ex)
		{
			if(ex.Name == "UnauthorizedException")
			{
				if(OcxCore.Session.ResponsesCache.IsRunning())
				{
					OcxCore.Session.ResponsesCache.Stop();
					OcxCore.Utility.ShowFloatForm("服务器验证您的身份时发生错误，请重新登录", "-1");
				}
				var stopCallbak = OcxCore.Session.GetGlobal("StopServiceCallback");
				if(stopCallbak != undefined)
				{
					stopCallbak.Call("LoginExpired",null);
				}
			}
			errorCallback(ex);
		},
		OcxCore.Utility.RenderJson(data),"com.callcenter.CTIAgent.Core Common_CH",false
	);*/
}
/**
 * CTIAgent登录相关 
 * Login 登录并创建会话
 * Checkin 签入
 * Checkout 签出
 * */
OcxCommandFun.CTIAgentLogin = function (action, data, callback, errorCallback) {
	if (data == undefined || data == null) data = {};
	//未登录不允许签入
	/*if(action == "Checkin" && OcxCore.Session.getUserInfo() == null)
	{
		OcxCore.Utility.ShowTip("请先登录再签入！", 1);
		return;
	}*/
	//未登录不允许签出
	/*if(action == "Checkout" && OcxCore.Session.getUserInfo() == null)
	{
		OcxCore.Utility.ShowTip("请先登录再签出！", 1);
		return;
	}*/
	if (action == "Checkin") {
		//客户端签入之前回调函数
		if (OcxCore.Session.GetGlobal("onBeforeCheckIn") != undefined && OcxCore.Session.GetGlobal("onBeforeCheckIn") != null && OcxCore.Session.GetGlobal("onBeforeCheckIn").AttachSize() > 0) {
			var callbackResult = OcxCore.Session.GetGlobal("onBeforeCheckIn").Call(data);
			if (callbackResult != undefined && callbackResult != null && callbackResult == false) {
				OcxCore.Utility.ShowLoading(false);
				return false;
			}
		}
	}

	return OcxCommandFun.CTIAgentCommand("CTILogin", action, data, callback, errorCallback);
}
/**
 * CTIAgent电话工具条按钮操作相关 
 * */
OcxCommandFun.CTIAgentButtonClick = function (buttonId, data, callback, errorCallback) {
	if (data == undefined || data == null) data = {};
	return OcxCommandFun.CTIAgentCommand("ButtonClick", buttonId, data, callback, errorCallback);
}
/**
 * CTIAgent电话工具条操作命令相关 
 * */
OcxCommandFun.CTIAgentCommonAction = function (Command, data, callback, errorCallback) {
	if (data == undefined || data == null) data = {};
	return OcxCommandFun.CTIAgentCommand("CommonAction", Command, data, callback, errorCallback);
}
/**
 * 外呼函数
 * 
 * @param called 被叫号码
 * @param customId 外呼任务清单ID
 * @param caller 主叫号码
 * @param calltype 呼叫类型 1普通外呼
 * @param relayGrpNo 中继组标识编码
 * @param isPopNow 是否立即弹屏 1是 0否
 * @param otherParams 其他参数字符串
 * @param taskId 外呼任务ID
 * @param batchId 外呼任务批次ID
 * @param customerId 客户ID
 * 
 * @return 外呼前验证结果 true验证成功 false验证失败
 * */
OcxCommandFun.MakeCall = function (called, customId, caller, calltype, relayGrpNo, isPopNow, otherParams, taskId, batchId, customerId,data) {
	if (called == undefined || called == null || called == "" || called == "#") {
		OcxCore.Utility.ShowTip("拨号号码不能为空！", 1);
		return false;
	}

	customId = customId == undefined || customId == null || customId == "" ? "" : customId;
	caller = caller == undefined || caller == null || caller == "" ? "" : caller;
	calltype = calltype == undefined || calltype == null || calltype == "" ? "1" : calltype;
	relayGrpNo = relayGrpNo == undefined || relayGrpNo == null || relayGrpNo == "" ? "" : relayGrpNo;
	isPopNow = isPopNow == undefined || isPopNow == null || isPopNow == "" ? "0" : isPopNow + "";
	otherParams = otherParams == undefined || otherParams == null || otherParams == "" ? "" : otherParams;
	taskId = taskId == undefined || taskId == null || taskId == "" ? "" : taskId;
	batchId = batchId == undefined || batchId == null || batchId == "" ? "" : batchId;
	customerId = customerId == undefined || customerId == null || customerId == "" ? "" : customerId;
	//未登录或未签入的不允许咨询
	if (OcxCore.Session.IsCheckin() == false) {
		OcxCore.Utility.ShowTip("未签入,不允许外呼!", 1);
		return false;
	}
	if (!OcxCore.OcxButtonbar.GetButton("MakeCall").IsCanUsed()) {
		OcxCore.Utility.ShowTip("操作无效!", 1);
		return false;
	}
	var Flag = "";
	var reg1 = /^[#]\d{3,11}$/;//3到11位的数字,加#表示打内线
	//加#表示打内线
	if (reg1.test(called)) {
		called = called.substr(1);
		Flag = "2";
	}

	//如果呼外线未指定主叫号码时用分机的主叫号码
	caller = caller != null && caller.length > 0 ? caller : OcxCore.Session.getExtCallerNumber();

	var postData = {
		Called: called,
		CustomId: customId,
		Caller: caller,
		CallType: calltype,
		RelayGrpNo: relayGrpNo,
		IsPopNow: isPopNow,
		OtherParams: otherParams,
		Flag: Flag,
		TaskId: taskId,
		BatchId: batchId,
		CustomerId: customerId,
		Data:data
	};
	//客户端拨号之前回调函数
	if (OcxCore.Session.GetGlobal("BeforeMakeCallCallback") != undefined && OcxCore.Session.GetGlobal("BeforeMakeCallCallback") != null) {
		postData = OcxCore.Session.GetGlobal("BeforeMakeCallCallback").Call(postData);
	}
	//客户端拨号之前回调函数
	if (OcxCore.Session.GetGlobal("onBeforeMakeCall") != undefined && OcxCore.Session.GetGlobal("onBeforeMakeCall") != null && OcxCore.Session.GetGlobal("onBeforeMakeCall").AttachSize() > 0) {
		postData = OcxCore.Session.GetGlobal("onBeforeMakeCall").Call(postData);
	}
	if (postData == undefined || postData == null || postData == "") {
		return false;
	}
	var reg4 = /^\d{3,30}$/;//3到30位的数字
	if (postData.Called == undefined || postData.Called == null || postData.Called == "" || !reg4.test(postData.Called)) {
		OcxCore.Utility.ShowTip("请输入不超过30位数字的拨号号码！", 1);
		return false;
	}
	OcxCore.Utility.ShowLoading(true, "正在呼叫...", 5);
	var procResult = OcxCommandFun.CTIAgentButtonClick("MakeCall", postData, function (data) {
		OcxCore.Utility.ShowLoading(false);
	}, function (ex) {
		OcxCore.Utility.ShowLoading(false);
		if (ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
	});

	return procResult;
}

/**
 * 获取所有缓存的呼叫记录
 *
 * */
OcxCore.Session.GetCallDataListFromCache = function () {
    var callDataList = new Array();
    var callDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
	if(callDataCache != undefined && callDataCache.size() > 0){
        callDataCache.each(function (key,value,index) {
            if(value != undefined && value != null)
                callDataList.push(value);
        });
	}
    return callDataList;
}
/**
 * 获取当前通话CallId(将弃用)
 * 
 * */
OcxCore.Session.GetCurrentCallId = function () {
	var callData = OcxCore.Session.GetCurrentCallData();
	return callData != null ? callData.CallId : null;
}
/**
 * 获取当前通话数据
 * 
 * */
OcxCore.Session.GetCurrentCallData = function () {
	if (OcxCore.Session == undefined || OcxCore.Session == null) return null;
	var CurrentCallDataCache = OcxCore.Session.GetGlobal("CurrentCallDataCache");//当前呼入呼出电话数据缓存
	if (CurrentCallDataCache != undefined && CurrentCallDataCache != null) {
		return CurrentCallDataCache;
	}
	return null;
}

/**
 * 获取当前通话录音路径(相对路径)(将弃用)
 * 
 * */
OcxCore.Session.GetCurrentAudioFile = function () {
	var callData = OcxCore.Session.GetCurrentCallData();
	return callData != null && callData.AudioFile != undefined ? callData.AudioFile : "";
}


/**
 * 获取最后一次电话的通话数据
 * 
 * */
OcxCore.Session.getLastCallData = function () {
	if (OcxCore.Session == undefined || OcxCore.Session == null) return null;
	return OcxCore.Session.getCallDataByCallId(OcxCore.Session.getLastCallId());
}

/**
 * 获取最后一次电话的录音路径(相对路径)
 * 
 * */
OcxCore.Session.getLastCallAudioFile = function () {
	var callData = OcxCore.Session.getLastCallData();
	return callData != null && callData.AudioFile != undefined ? callData.AudioFile : "";
}

/**
 * 通过弹屏ID获取通话数据(将弃用)
 * 
 * */
OcxCore.Session.GetCallDataByPopId = function (popId) {
	if (popId == undefined || popId == null || popId == "") return null;
	if (OcxCore.Session == undefined || OcxCore.Session == null) return null;
	var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
	if (CallDataCache != undefined && CallDataCache.containsKey(popId));
	{
		return CallDataCache.get(popId);
	}
	return null;
}
/**
 * 通过呼叫ID获取通话数据
 * 
 * */
OcxCore.Session.getCallDataByCallId = function (callId) {
	if (callId == undefined || callId == null || callId == "") return null;
	if (OcxCore.Session == undefined || OcxCore.Session == null) return null;
	var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
	if (CallDataCache != undefined && CallDataCache.containsKey(callId));
	{
		return CallDataCache.get(callId);
	}
	return null;
}

/**
 * 通过呼叫ID获取通话录音路径(相对路径)
 * 
 * */
OcxCore.Session.getAudioFileByCallId = function (callId) {
	var callData = OcxCore.Session.getCallDataByCallId(callId);
	return callData != null && callData.AudioFile != undefined ? callData.AudioFile : "";
}


/**
 * 通过弹屏ID获取通话ID(将弃用)
 * 
 * */
OcxCore.Session.GetCallIdByPopId = function (popId) {
	var callData = OcxCore.Session.GetCallDataByPopId(popId);
	return callData != null ? callData.CallId : null;
}

/**
 * 通过弹屏ID获取通话ID(将弃用)
 * 
 * */
OcxCore.Session.GetCallGuidByPopId = function (popId) {
	return OcxCore.Session.GetCallIdByPopId(popId);
}

/**
 * 重新弹出当前通话的来去电弹屏
 * 
 * */
OcxCore.Session.ReOpenCurrentCallPopScreen = function () {
	var data = OcxCore.Session.GetCurrentCallData();//当前呼入呼出电话数据缓存
	if (data != undefined && data != null) {
		if (data.CallType == 0) {
			OcxCore.Session.GetGlobal("CallAlertingCallback").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, false, data);//呼入通知（呼入弹屏）回调函数

			OcxCore.Session.GetGlobal("onCallAlerting").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.GrpId, data.CallTime, data.PopTabId, false, data);//呼入通知（呼入弹屏）回调函数
		}
		else {
			OcxCore.Session.GetGlobal("OutCallingCallback").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.CallTime, data.OtherParams, data.PopTabId, data);//呼出通知(呼出弹屏)回调函数

			OcxCore.Session.GetGlobal("onOutCalling").Call(data.Caller, data.Called, data.CallId, data.CustomId, data.CallTime, data.OtherParams, data.PopTabId, data);//呼出通知(呼出弹屏)回调函数
		}
	} else {
		OcxCore.Utility.ShowTip("当前不在通话状态，无弹屏信息！", 1);
	}
}

/**
 * 保存坐席操作动作
 * 
 * */
OcxCommandFun.SaveCtiOption = function (UserCode, ExtNumber, ExecutionState, ExecutionTime, EndTime, CompanyId, Remark, Channel, Caller, Called, CallId) {
	if (ExecutionState == undefined || ExecutionState == null)
		return;
	if (ExecutionTime == undefined || ExecutionTime == null)
		return;
	var ExecutionTimeStr = ExecutionTime != undefined && ExecutionTime != null ? OcxCore.utils.dateFormat(ExecutionTime, 'yyyy-MM-dd hh:mm:ss') : "";
	var EndTimeStr = EndTime != undefined && EndTime != null ? OcxCore.utils.dateFormat(EndTime, 'yyyy-MM-dd hh:mm:ss') : "";
	var Caller = Caller != undefined && Caller != null ? Caller : "";
	var Called = Called != undefined && Called != null ? Called : "";
	var CallId = CallId != undefined && CallId != null ? CallId : "";

	//OcxCore.Log.debug("保存坐席操作动作: "+OcxCore.Enums.GetName(OcxCore.Enums.CTIAgentOptionFlag,ExecutionState)
	//		+"    开始时间："+ExecutionTimeStr+" 结束时间："+EndTimeStr +" 备注："+Remark);

	var SaveCtiOptionCallback = OcxCore.Session.GetGlobal("SaveCtiOptionCallback");
	if (SaveCtiOptionCallback != undefined) {
		try {
			OcxCore.Session.GetGlobal("SaveCtiOptionCallback").Call(UserCode, ExtNumber, ExecutionState, ExecutionTimeStr, EndTimeStr, CompanyId, Remark, Channel, Caller, Called, CallId);
		} catch (e) {

		}
	}

	var SaveCtiOptionCallback2 = OcxCore.Session.GetGlobal("onSaveCtiOption");
	if (SaveCtiOptionCallback2 != undefined) {
		try {
			OcxCore.Session.GetGlobal("onSaveCtiOption").Call(UserCode, ExtNumber, ExecutionState, ExecutionTimeStr, EndTimeStr, CompanyId, Remark, Channel, Caller, Called, CallId);
		} catch (e) {

		}
	}
}

/**
 * 模拟呼入（只对CTI模拟器起作用，只是用来做模拟呼入测试）
 * 
 * 
 * @param StartCaller 主叫号码开始段
 * @param EndCaller 主叫号码结束段
 * @param Called 被叫号码（服务号码）
 * @param GroupId 队列ID
 * @param CustomId 外呼任务清单ID
 * @param Flag 呼叫标记（1：外线呼入 2：呼内线）
 * @param ExtNumber 座席分机号
 * @param CompanyId 公司ID
 * @param IVRPath 最后一层IVR节点号
 * @return 发送结果  true/false    发送成功/失败  
 */
OcxCommandFun.CallIn = function (StartCaller, EndCaller, Called, GroupId, CustomId, Flag, ExtNumber, CompanyId, IVRPath) {

	StartCaller = StartCaller == undefined || StartCaller == null || StartCaller == "" ? "" : StartCaller;
	EndCaller = EndCaller == undefined || EndCaller == null || EndCaller == "" ? "" : EndCaller;
	Called = Called == undefined || Called == null || Called == "" ? "" : Called;

	GroupId = GroupId == undefined || GroupId == null || GroupId == "" ? "" : GroupId;
	CustomId = CustomId == undefined || CustomId == null || CustomId == "" ? "" : CustomId;
	Flag = Flag == undefined || Flag == null || Flag == "" ? 1 : Flag;
	ExtNumber = ExtNumber == undefined || ExtNumber == null || ExtNumber == "" ? "" : ExtNumber;
	CompanyId = CompanyId == undefined || CompanyId == null || CompanyId == "" ? "" : CompanyId;
	IVRPath = IVRPath == undefined || IVRPath == null || IVRPath == "" ? "" : IVRPath;
	//未登录或未签入的不允许咨询
	if (OcxCore.Session.IsCheckin() == false) {
		OcxCore.Utility.ShowTip("未签入,不允许模拟呼入!", 1);
		return false;
	}

	OcxCore.Utility.ShowLoading(true, "正在模拟呼入...", 2);
	var procResult = OcxCore.cti.CTIServerImpl.CallIn(StartCaller, EndCaller, Called, GroupId, CustomId, Flag, ExtNumber, CompanyId, IVRPath);
	if (procResult) {
		OcxCore.Utility.ShowLoading(false);
	}
	else {
		OcxCore.Utility.ShowTip("模拟呼入失败！", 1);
	}

	return procResult;
}

//签入窗口
var __CheckinForm = null;
var __CheckinCallback = null;
OcxCore.Checkin = function (auto, CheckinCallback) {
	//未登录或已签入的将不允许再签入
	if (OcxCore.Session.getUserName() == null || OcxCore.Session.IsCheckin() == true) {
		OcxCore.Utility.ShowWarning("未登录或已签入的不允许再签入!");
		OcxCore.Session.GetGlobal("onCheckIn").Call(false, 999, "未登录或已签入的不允许再签入!", null);//签入响应回调函数
		return false;
	}
	if (OcxCore.cti.CTIServerImpl.getConnectState() == 2) {
		OcxCore.DialogUtil.tipDialog("正在重新连接CTI服务器，请稍后再操作！", 3);
		OcxCore.Session.GetGlobal("onCheckIn").Call(false, 999, "正在重新连接CTI服务器，请稍后再操作！", null);//签入响应回调函数
		return false;
	}
	//分机选择模式(1:固定分机 2：座席自选 3：自适应),如果是固定分机或自适应则自动签入不弹出签入窗口
	if (OcxCore.Session.getExtMode() == 1 || OcxCore.Session.getExtMode() == 3) {
		//自动签入
		return OcxCore.Session.Checkin();
	}

	if (__CheckinForm != null) return;
	__CheckinCallback = CheckinCallback;

	var url = OcxCore.utils.stringFormat(OcxCore.Config.CTICheckinUrl + "?auto={0}", auto ? "true" : "false");

	if (OcxCore.Session.getUserName() != null && OcxCore.Session.getUserName() != "") {
		url += "&name=" + OcxCore.Session.getUserName();
	}
	url = OcxCore.ResPath + "/" + url;
	__CheckinForm = OcxCore.CreateWindow(
		{
			width: 490, height: 385,
			resize: true,
			title: "座席签入",
			url: url
		}
	);

	__CheckinForm.OnClosed.Attach(
		function (f) {
			__CheckinForm = null;
			if (OcxCore.Session.IsCheckin()) {
				if (__CheckinCallback != undefined && __CheckinCallback != null) {
					__CheckinCallback();
					__CheckinCallback = null;
				}
			}
		}
	);

	//OcxCore.Session.Reset();
}

//咨询窗口
var __ConsultForm = null;
var __ConsultCallback = null;
OcxCore.ConsultForm = function (ConsultCallback) {
	if (__ConsultForm != null) return;
	//未登录或未签入的不允许咨询
	if (OcxCore.Session.getUserName() == null || OcxCore.Session.IsCheckin() == false) {
		OcxCore.Utility.ShowWarning("未登录或未签入的不允许咨询!");
		return false;
	}
	if (OcxCore.cti.CTIServerImpl.getConnectState() == 2) {
		OcxCore.DialogUtil.tipDialog("正在重新连接CTI服务器，请稍后再操作！", 3);
		return false;
	}
	__ConsultCallback = ConsultCallback;

	var url = OcxCore.utils.stringFormat(OcxCore.Config.CTIConsultUrl + "?auto={0}", "false");

	if (OcxCore.Session.getUserName() != null && OcxCore.Session.getUserName() != "") {
		url += "&name=" + OcxCore.Session.getUserName();
	}
	url = OcxCore.ResPath + "/" + url;
	__ConsultForm = OcxCore.CreateWindow(
		{
			width: 782, height: 535,
			resize: true,
			title: "咨询",
			url: url
		}
	);
	__ConsultForm.OnLoad.Attach(
		function (winApi) {
			/*    			//咨询窗口加载完成后发送开始咨询命令
							OcxCommandFun.CTIAgentCommonAction(OcxCore.Session.GetUserName(),"BeginConsult", {},function(data){
								
							},function(ex){
								OcxCore.Utility.ShowLoading(false);
								if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
							});*/
		}
	);
	__ConsultForm.OnNotify.Attach(
		function (cmd, data) {
			__ConsultForm.GetHtmlWindow().Notify(cmd, data);
		}
	);
	__ConsultForm.OnClosed.Attach(
		function (f) {
			__ConsultForm = null;
			if (OcxCore.Session.IsCheckin()) {
				if (__ConsultCallback != undefined && __ConsultCallback != null) {
					__ConsultCallback();
					__ConsultCallback = null;
				}
			}
		}
	);
}
//监控窗口
var __MonitorForm = null;
var __MonitorCallback = null;
OcxCore.MonitorForm = function (MonitorCallback) {
	if (__MonitorForm != null) return;
	//未登录或未签入的不允许监控
	if (OcxCore.Session.getUserName() == null || OcxCore.Session.IsCheckin() == false) {
		OcxCore.Utility.ShowWarning("未登录或未签入的不允许监控!");
		return false;
	}
	if (OcxCore.cti.CTIServerImpl.getConnectState() == 2) {
		OcxCore.DialogUtil.tipDialog("正在重新连接CTI服务器，请稍后再操作！", 3);
		return false;
	}
	__MonitorCallback = MonitorCallback;

	var url = OcxCore.utils.stringFormat(OcxCore.Config.CTIMonitorUrl + "?auto={0}", "false");

	if (OcxCore.Session.getUserName() != null && OcxCore.Session.getUserName() != "") {
		url += "&name=" + OcxCore.Session.getUserName();
	}
	url = OcxCore.ResPath + "/" + url;
	__MonitorForm = OcxCore.CreateWindow(
		{
			width: $(OcxCore.main).width() - 40,
			height: $(OcxCore.main).height() - 110,
			resize: false,
			title: "坐席监控",
			zIndex: 1000000,
			url: url
		}
	);
	__MonitorForm.OnLoad.Attach(
		function (winApi) {
			/*//监控窗口加载完成后发送开始监控命令
			OcxCommandFun.CTIAgentCommonAction(OcxCore.Session.getUserName(),"BeginMonitor", {},function(data){
				
			},function(ex){
				OcxCore.Utility.ShowLoading(false);
				if(ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
			});*/
		}
	);
	__MonitorForm.OnNotify.Attach(
		function (cmd, data) {
			__MonitorForm.GetHtmlWindow().Notify(cmd, data);
		}
	);
	__MonitorForm.OnClosed.Attach(
		function (f) {
			__MonitorForm = null;
			//监控窗口关闭后发送停止监控命令
			OcxCommandFun.CTIAgentCommonAction("StopMonitor", {}, function (data) {

			}, function (ex) {
				OcxCore.Utility.ShowLoading(false);
				if (ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
			});
			if (OcxCore.Session.IsCheckin()) {
				if (__MonitorCallback != undefined && __MonitorCallback != null) {
					__MonitorCallback();
					__MonitorCallback = null;
				}
			}
		}
	);
}

//坐席配置窗口
var __SetSeatInfoForm = null;
var __SetSeatInfoCallback = null;
OcxCore.ShowSetSeatInfoForm = function (SetSeatInfoCallback) {
	//未登录或已签入的将不允许再签入
	if (OcxCore.Session.getUserName() == null) {
		OcxCore.Utility.ShowWarning("电话工具条未初始化!");
		return false;
	}
	/*if(OcxCore.cti.CTIServerImpl.getConnectState() == 2)
	{
		OcxCore.DialogUtil.tipDialog("正在重新连接CTI服务器，请稍后再操作！", 3);
		return false;
	}*/

	if (__SetSeatInfoForm != null) return;
	__SetSeatInfoCallback = SetSeatInfoCallback;

	var url = OcxCore.Config.CTISetSeatInfoUrl;

	url = OcxCore.ResPath + "/" + url;
	__SetSeatInfoForm = OcxCore.CreateWindow(
		{
			width: 550, height: 300,
			resize: true,
			title: "坐席配置",
			url: url
		}
	);

	__SetSeatInfoForm.OnClosed.Attach(
		function (f) {
			__SetSeatInfoForm = null;
			if (__SetSeatInfoCallback != undefined && __SetSeatInfoCallback != null) {
				__SetSeatInfoCallback();
				__SetSeatInfoCallback = null;
			}
		}
	);
}

/**
 * 启动服务函数
 * */
function StartCTIService() {
	//if(OcxCore.Config == undefined) OcxCore.Config = {};

	//OcxCore.Utility.Extend(OcxCore.Config,OcxCore.defaults);
	//OcxCore.Utility.Extend(OcxCore.Config,config);

	var config = OcxCore.Config;

	//服务开始后回调函数
	if (config != undefined && config.StartServiceCallback != undefined && config.StartServiceCallback != null)
		OcxCore.Session.GetGlobal("StartServiceCallback").Attach(config.StartServiceCallback);
	//服务停止后回调函数
	if (config != undefined && config.StopServiceCallback != undefined && config.StopServiceCallback != null)
		OcxCore.Session.GetGlobal("StopServiceCallback").Attach(config.StopServiceCallback);
	//客户端状态变化回调函数
	if (config != undefined && config.StateChangeCallback != undefined && config.StateChangeCallback != null)
		OcxCore.Session.GetGlobal("StateChangeCallback").Attach(config.StateChangeCallback);
	//客户端CTI状态变化响应回调函数
	if (config != undefined && config.CTIStateChangeCallback != undefined && config.CTIStateChangeCallback != null)
		OcxCore.Session.GetGlobal("CTIStateChangeCallback").Attach(config.CTIStateChangeCallback);
	//刷新当前用户显示信息和按钮状态回调函数
	if (config != undefined && config.RefleshUserInfoAndButtonCallback != undefined && config.RefleshUserInfoAndButtonCallback != null)
		OcxCore.Session.GetGlobal("RefleshUserInfoAndButtonCallback").Attach(config.RefleshUserInfoAndButtonCallback);
	//签入响应回调函数
	if (config != undefined && config.CheckInCallback != undefined && config.CheckInCallback != null)
		OcxCore.Session.GetGlobal("CheckInCallback").Attach(config.CheckInCallback);
	//签出响应后回调函数
	if (config != undefined && config.CheckOutCallback != undefined && config.CheckOutCallback != null)
		OcxCore.Session.GetGlobal("CheckOutCallback").Attach(config.CheckOutCallback);
	//呼入通知（呼入弹屏）回调函数
	if (config != undefined && config.CallAlertingCallback != undefined && config.CallAlertingCallback != null)
		OcxCore.Session.GetGlobal("CallAlertingCallback").Attach(config.CallAlertingCallback);
	//呼出通知(呼出弹屏)回调函数
	if (config != undefined && config.OutCallingCallback != undefined && config.OutCallingCallback != null)
		OcxCore.Session.GetGlobal("OutCallingCallback").Attach(config.OutCallingCallback);
	//挂机响应回调函数
	if (config != undefined && config.HangupCallback != undefined && config.HangupCallback != null)
		OcxCore.Session.GetGlobal("HangupCallback").Attach(config.HangupCallback);
	//客户端拨号之前回调函数
	if (config != undefined && config.BeforeMakeCallCallback != undefined && config.BeforeMakeCallCallback != null)
		OcxCore.Session.GetGlobal("BeforeMakeCallCallback").Attach(config.BeforeMakeCallCallback);
	//保存坐席操作动作回调函数
	if (config != undefined && config.SaveCtiOptionCallback != undefined && config.SaveCtiOptionCallback != null)
		OcxCore.Session.GetGlobal("SaveCtiOptionCallback").Attach(config.SaveCtiOptionCallback);

	//初始化相关处理函数
	OcxCore.cti.CTIServerImpl.Initialize();

	//服务开始后回调函数
	if (OcxCore.Session.GetGlobal("StartServiceCallback") != null) {
		OcxCore.Session.GetGlobal("StartServiceCallback").Call();
	}
	//	//服务开始后回调函数
	//	if(config !=undefined &&  config.StartServiceCallback != undefined && config.StartServiceCallback != null)
	//		config.StartServiceCallback();
}

//Session功能扩展
/**
 * 签入函数
 * 
 * @param ForceLogin 是否强制签入 1是 0否
 * */
OcxCore.Session.Checkin = function (ForceLogin) {
	//未登录或已签入的将不允许再签入
	if (OcxCore.Session.getUserName() == null || OcxCore.Session.IsCheckin() == true) {
        OcxCore.DialogUtil.alertDialog("未登录或已签入的不允许再签入!");
		OcxCore.Session.GetGlobal("onCheckIn").Call(false, 999, "未登录或已签入的不允许再签入!", null);//签入响应回调函数
		return false;
	}
	if (OcxCore.Session.getExtNumber() == null) {
        OcxCore.DialogUtil.alertDialog("未绑定分机号，请联系管理员！");
		OcxCore.Session.GetGlobal("onCheckIn").Call(false, 999, "未绑定分机号，请联系管理员！", null);//签入响应回调函数
		return false;
	}
	if (OcxCore.Session.getGroupList().size() == 0) {
        OcxCore.DialogUtil.alertDialog("未设置要签入的技能组，请联系管理员！");
		OcxCore.Session.GetGlobal("onCheckIn").Call(false, 999, "未设置要签入的技能组，请联系管理员！", null);//签入响应回调函数
		return false;
	}

	var AgentData = OcxCore.Session.getCTIAgentData();

	if (AgentData == null) {
		OcxCore.DialogUtil.tipDialog("会话未初始化", 3);
		OcxCore.Session.GetGlobal("onCheckIn").Call(false, 999, "会话未初始化", null);//签入响应回调函数
		return false;
	}
	if (OcxCore.cti.CTIServerImpl.getConnectState() == 2) {
		OcxCore.DialogUtil.tipDialog("正在重新连接CTI服务器，请稍后再操作！", 3);
		OcxCore.Session.GetGlobal("onCheckIn").Call(false, 999, "正在重新连接CTI服务器，请稍后再操作！", null);//签入响应回调函数
		return false;
	}

	ForceLogin = ForceLogin != undefined && (ForceLogin == 0 || ForceLogin == 1) ? ForceLogin : 0;//是否强制签入 1是 0否

	if (AgentData.getSeatGroups().size() == 0) {
		var SeatGroups = new OcxCore.Map();
		for (var i = 0; i < OcxCore.Session.getGroupList().size(); i++) {
			//SeatGroups.put(parseInt(OcxCore.Session.getGroupList().get(i).GroupId), OcxCore.Session.getGroupList().get(i).GroupName);
			var groupItem = OcxCore.Session.getGroupList().get(i);
			var Level = groupItem.Level != undefined ? groupItem.Level : 1;
			var Sort = groupItem.Sort != undefined ? groupItem.Sort : 1;

			SeatGroups.put(parseInt(groupItem.GroupId), {
				GroupId: parseInt(groupItem.GroupId),
				GroupName: groupItem.GroupName,
				Level: Level,
				Sort: Sort
			});
		}
		AgentData.setSeatGroups(SeatGroups);
	}

	/*if (AgentData.getBtnMonitor().getHasPermission() == true && AgentData.getSeatGroups().size() >1)
	{
		OcxCore.DialogUtil.tipDialog("有坐席监控权限时只能签入一个技能组", 3);
		return false;
	}*/
	OcxCore.Utility.ShowLoading(true, "正在签入...");

	var SeatGroups = new Array();

	AgentData.getSeatGroups().each(function (key, value, index) {
		key = parseInt(OcxCore.Utility.IsNull(key, 0));
		SeatGroups.push({
			GroupId: key,
			GroupName: value.GroupName,
			Level: value.Level,
			Sort: value.Sort
		});
	});
	var postData = {
		Groups: SeatGroups,
		ForceLogin: ForceLogin
	};
	var procResult = OcxCommandFun.CTIAgentLogin("Checkin", postData, function (ret) {
		if (ret.Result == true) {
			OcxCore.Utility.ShowLoading(true, "正在签入...", 30);
		} else {
			OcxCore.Utility.ShowLoading(false);
			if (ret.Message != undefined && ret.Message != "") OcxCore.DialogUtil.tipDialog(ret.Message, 5);
			var errMsg = ret.Message != undefined && ret.Message != "" ? ret.Message : "签入失败!";
			var errCode = ret.ErrorCode != undefined && ret.ErrorCode != "" ? ret.ErrorCode : 999;
			OcxCore.Session.GetGlobal("onCheckIn").Call(false, errCode, errMsg, null);//签入响应回调函数
		}
	}, function (ret) {
		OcxCore.Utility.ShowLoading(false);
		if (ret.Message != undefined && ret.Message != "") OcxCore.DialogUtil.tipDialog(ret.Message, 5);
		var errMsg = ret.Message != undefined && ret.Message != "" ? ret.Message : "签入失败!";
		var errCode = ret.ErrorCode != undefined && ret.ErrorCode != "" ? ret.ErrorCode : 999;
		OcxCore.Session.GetGlobal("onCheckIn").Call(false, errCode, errMsg, null);//签入响应回调函数
	});

	return procResult;
}

/**
 * 询问是否强制签入函数
 * 
 * @param ForceLogin 是否强制签入 1是 0否
 * */
OcxCore.Session.AskIfForceCheckin = function () {
	OcxCore.Utility.ShowLoading(false);
	//未登录或已签入的将不允许再签入
	if (OcxCore.Session.getUserName() == null || OcxCore.Session.IsCheckin() == true) {
		return false;
	}
	if (OcxCore.Session.getExtNumber() == null) {
		return false;
	}
	if (OcxCore.Session.getGroupList().size() == 0) {
		return false;
	}

	var AgentData = OcxCore.Session.getCTIAgentData();

	if (AgentData == null) {
		return false;
	}
	if (OcxCore.cti.CTIServerImpl.getConnectState() == 2) {
		return false;
	}

	OcxCore.DialogUtil.confirmDialog("系统提示", "<div class='ui_alert'>此工号已签入其他分机,确定要强制签入吗？</div>", function (data) {
		if (data) {
			window.setTimeout(function () {
				OcxCore.Session.Checkin(1);
			}, 200);
		}
		else {
			if (OcxCore.Session.getCTIAgentData() != null) {
				OcxCore.Session.getCTIAgentData().InitDefault();
				var jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(OcxCore.Session, "");
				OcxCore.Session.Send("RefleshUserInfoAndButton", jsonMsg);

				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", 1, "", null);
				OcxCore.Session.Send("CHECKIN_RES", jsonMsg);
			}
		}
	});

	return true;
}

/**
 * 重新同步CTI登录信息函数
 * 
 * */
OcxCore.Session.ReloadCtiInfo = function () {
	//未登录或已签出的将不允许重新同步
	if (OcxCore.Session.getUserName() == null || OcxCore.Session.getExtNumber() == null || OcxCore.Session.IsCheckin() == false) {
		return false;
	}

	if (OcxCore.Session.getGroupList().size() == 0) {
		return false;
	}

	var AgentData = OcxCore.Session.getCTIAgentData();

	if (AgentData == null) {
		return false;
	}

	OcxCore.Utility.ShowLoading(true, "正在重新同步CTI登录信息...");

	var postData = {};
	var procResult = OcxCommandFun.CTIAgentLogin("ReloadInfo", postData, function (ret) {
		if (ret.Result == true) {
			OcxCore.Utility.ShowLoading(true, "正在重新同步CTI登录信息...", 10);
		} else {
			OcxCore.Utility.ShowLoading(false);
			if (ret.Message != undefined && ret.Message != "") OcxCore.DialogUtil.tipDialog(ret.Message, 3);
		}
	}, function (ret) {
		OcxCore.Utility.ShowLoading(false);
		if (ret.Message != undefined && ret.Message != "") OcxCore.DialogUtil.tipDialog(ret.Message, 3);
	});

	return procResult;
}

/**
 * 签出函数
 * 
 * */
OcxCore.Session.Checkout = function () {
	//未登录或未签入则跳过
	if (OcxCore.Session.getUserName() == null || OcxCore.Session.IsCheckin() == false) {
		return false;
	}

	OcxCore.Utility.ShowLoading(true, "正在签出...");
	OcxCommandFun.CTIAgentLogin("Checkout", {}, function (data) {
		OcxCore.Utility.ShowLoading(false);
		OcxCore.Utility.ShowTip("签出成功", 1);
	}, function (ex) {
		OcxCore.Utility.ShowLoading(false);
		if (ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
	});
}

/**
 * 签出指定分机函数
 * 
 * */
OcxCore.Session.CheckoutExtNumber = function (extNumber) {
	//未登录或已签入的将不允许再签入
	if (extNumber == undefined || extNumber == null || isNaN(extNumber)) {
		OcxCore.DialogUtil.tipDialog("分机号无效", 3);
		return false;
	}
	//未登录或已签入的将不允许再签入
	if (OcxCore.Session.getUserName() == null) {
		OcxCore.Utility.ShowWarning("未登录不允许此操作!");
		return false;
	}

	//签出CTI服务器
	var result = OcxCore.cti.CTIServerImpl.Checkout(extNumber, OcxCore.Session.getCompanyId(), "0");
	if (!result) {

		return false;
	} else {
		return true;
	}
}
/**
 * 外呼函数
 * 
 * */
OcxCore.Session.MakeCall = OcxCommandFun.MakeCall;//外呼函数

/**
 * 示忙
 * 
 * */
OcxCore.Session.SetBusy = function () {
	OcxCommandFun.CTIAgentButtonClick("SetBusy", { CTIAgentSubStatus: 2 }, function (data) {
		OcxCore.Utility.ShowLoading(false);
	}, function (ex) {
		OcxCore.Utility.ShowLoading(false);
		if (ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
	});
}

/**
 * 示闲
 * 
 * */
OcxCore.Session.SetIdle = function () {
	OcxCommandFun.CTIAgentButtonClick("SetIdle", {}, function (data) {
		OcxCore.Utility.ShowLoading(false);
	}, function (ex) {
		OcxCore.Utility.ShowLoading(false);
		if (ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
	});
}
/**
 * 挂机
 * 
 * */
OcxCore.Session.Hangup = function () {
	OcxCommandFun.CTIAgentButtonClick("Hangup", {}, function (data) {
		OcxCore.Utility.ShowLoading(false);
	}, function (ex) {
		OcxCore.Utility.ShowLoading(false);
		if (ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
	});
}
/**
 * 接听
 * 
 * */
OcxCore.Session.Answer = function () {
	OcxCommandFun.CTIAgentButtonClick("Answer", {}, function (data) {
		OcxCore.Utility.ShowLoading(false);
	}, function (ex) {
		OcxCore.Utility.ShowLoading(false);
		if (ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
	});
}


/**
 * 转IVR
 * 
 * @param operation 转IVR类型（流程编码）
 * @param data 操作携带的数据，json自定义对象
 * 
 * @return 转IVR结果 true验证成功 false验证失败
 * */
OcxCommandFun.OperationInCall = function (operation, data) {
	if (operation == undefined || operation == null || operation == "") {
		OcxCore.Utility.ShowTip("流程编码不能为空！", 1);
		return false;
	}

	data = data == undefined || data == null || data == "" ? "" : data;

	//未登录或未签入的不允许咨询
	if (OcxCore.Session.IsCheckin() == false) {
		OcxCore.Utility.ShowTip("未签入,不允许操作!", 1);
		return false;
	}
	if (!OcxCore.OcxButtonbar.GetButton("OperationInCall").IsCanUsed()) {
		OcxCore.Utility.ShowTip("操作无效!", 1);
		return false;
	}

	var postData = {
		Operation: operation,
		Data: data
	};

	if (postData == undefined || postData == null || postData == "") {
		return false;
	}
	
	OcxCore.Utility.ShowLoading(true, "处理中...", 5);
	var procResult = OcxCommandFun.CTIAgentButtonClick("OperationInCall", postData, function (data) {
		OcxCore.Utility.ShowLoading(false);
	}, function (ex) {
		OcxCore.Utility.ShowLoading(false);
		if (ex.Message != undefined && ex.Message != "") OcxCore.Utility.ShowTip(ex.Message, 1);
	});

	return procResult;
}

/**
 * 外呼函数
 * 
 * */
OcxCore.Session.OperationInCall = OcxCommandFun.OperationInCall;//外呼函数

//Session的InitService执行后调用
OcxCore.Session.onAfterInitService(StartCTIService);