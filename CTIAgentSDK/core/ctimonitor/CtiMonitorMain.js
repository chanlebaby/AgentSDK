/**
 * 队列监控主JS库
 * 
 * 
 * */
var changeDurationInterval = null;
//默认配置
OcxCore.Config = {
		ClientVersion: "2.1",//客户端版本
		ServerVersion: "1.0",//服务端版本
		AppTypeId:"callcenter",
		CTIServerType:"cti",//CTI服务器类型 cti CTI服务器真实环境   ctiAgent cti模拟器  ctiJsDemo cti模拟器Js版本
		CTISrvDemoRootPath:"/CTIServerDemo",//CTI模拟器根目录
		HideMiddlePhoneMode:1,//加密号码模式 1字母加密 2星号加密
		DialogZIndex:10000000,//弹框层zIndex值
		WebConnectMode:"socket",//连接网站模式 socket flash http
		WebConnectUrl:"/ctiMonitorWsSrv",//网站客户端连接地址 如果连接网站模式是websocket则指定ws地址，如果是http则指定http心跳连接地址
    	CommandUrl:"CTIAgent/command.svt",//发送命令到服务端的地址
    	ResponseUrl:"CTIAgent/response.svt",//心跳连接地址
    	LogLevel:"TRACE",//显示日志级别TRACE,DEBUG,INFO,WARN,ERROR,FATAL
    	SeatGroupList:[],//当前用户所属的技能组列表，如[{GroupId:1,GroupName:"客服组"},{GroupId:2,GroupName:"外呼营销组"}]
    	ExtNumberList:[],//当前公司所有分机号列表，如[{ExtNumber:8001,ExtCaller:"2888888",ExtCallerRelayGrpNo:0},{ExtNumber:8002,ExtCaller:"2888888",ExtCallerRelayGrpNo:0}]
    	//服务开始后
		StartServiceCallback:function(){
			/*try {
				if(OcxCore.Session != undefined && OcxCore.Session != null && OcxCore.Session.getUserName() != null)
				{
					setTimeout(function(){
						//重新设置CTI客户端相关登录信息
						OcxCommandFun.CTIAgentLogin("ReloadLoginInfo",{},function(ret){
							if(ret.Result == false)
							{
								if(ret.Message != undefined && ret.Message != "") OcxCore.Utility.ShowTip(ret.Message, 1);
							}
						},function(ret){
							if(ret.Message != undefined && ret.Message != "") OcxCore.Utility.ShowTip(ret.Message, 1);
						});
					},50);
				}
			} catch (e) {
				OcxCore.Log.error("StartServiceCallback处理出错："+e.message);
			}*/
		},
		//服务停止后
		StopServiceCallback:function(stopType,data){
			/*try {
				if(changeDurationInterval !=null) 
				{
					clearInterval(changeDurationInterval);
					changeDurationInterval = null;
				}
			} catch (e) {
				OcxCore.Log.error("StopServiceCallback处理出错："+e.message);
			}*/
		},
		//客户端状态变化回调
		StateChangeCallback:function(ClientStatus,data)
		{
			
		},
		//客户端CTI状态变化回调
		CTIStateChangeCallback:function(CTIAgentStatus,CTIConnected,data)
		{
			
		}
};


(function(){
	
	var ReponsesProcess = OcxCore.Session.GetGlobal("ReponsesProcess");
	ReponsesProcess = (function(obj)
	{
		obj = obj != undefined && obj != null ? obj : {};
		var m_GlobalHandler = {
			"CurrentUserCTIStateChanged":function(data)//当前用户CTI状态改变
			{
				try {
					OcxCore.Utility.ShowLoading(false);
					
	   				if(data.Result == false)
					{
	   					if(data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1);
					}else
					{
						OcxCore.Session.GetGlobal("WindowManagement").Notify("CurrentUserCTIStateChanged", data);
						if(data.Message != undefined && data.Message != "") OcxCore.Utility.ShowTip(data.Message, 1,1);
					}
					OcxCore.Session.GetGlobal("CTIStateChangeCallback").Call(OcxCore.Session.getCTIAgentStatus(),OcxCore.Session.IsCTIConnected(),data);
					OcxCore.Session.GetGlobal("onCTIStateChange").Call(OcxCore.Session.getCTIAgentStatus(),OcxCore.Session.IsCTIConnected(),data);
				} catch (e) {
					OcxCore.Log.error("CurrentUserCTIStateChanged处理出错："+e.message);
				}
			}
		}
		
		obj.GlobalHandler = obj.GlobalHandler != undefined && obj.GlobalHandler != null ? obj.GlobalHandler : {};
		OcxCore.Utility.Extend(obj.GlobalHandler,m_GlobalHandler);
		return obj;
	})(ReponsesProcess);
	
	OcxCore.Session.RegisterGlobal("CTIStateChangeCallback", new OcxCore.Delegate());//客户端CTI状态变化响应回调函数
	
	OcxCore.Session.RegisterGlobal("onCTIStateChange", new OcxCore.Delegate());//客户端CTI状态变化响应回调函数
	
})();

var CtiMonitorCommandFun = {};

/**
 * CTIAgent CTI相关操作命令(HTTP方式)
 * */
CtiMonitorCommandFun.CommonAction = function(action,subAction,data,callback,errorCallback)
{
	if(data == undefined || data == null) data = {};
	if(action == undefined || action == null)
	{
		OcxCore.Utility.ShowTip("action不能为空！", 1);
		return false;
	}
	
	data.Action = action;
	data.SubAction = subAction == undefined || subAction == null ? "" : subAction;
	data.User = OcxCore.Session.getUserName();
	OcxCore.Log.trace(OcxCore.utils.stringFormat("CtiMonitorCommand http：'{0}'", OcxCore.Utility.RenderJson(data)));
	
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
			OcxCore.Utility.RenderJson(data),"com.callcenter.CTIAgent.web CtiMonitor_CH",false
		);
}

/**
 * CTIAgent CTI相关操作命令 （WebSocket方式）
 * */
CtiMonitorCommandFun.CommonActionWS = function(action,subAction,data,callback,errorCallback)
{
	if(data == undefined || data == null) data = {};
	if(action == undefined || action == null)
	{
		OcxCore.Utility.ShowTip("action不能为空！", 1);
		return false;
	}
	
	data.Action = action;
	data.SubAction = subAction == undefined || subAction == null ? "" : subAction;
	data.User = OcxCore.Session.getUserName();
	OcxCore.Log.trace(OcxCore.utils.stringFormat("CtiMonitorCommand WS：'{0}'", OcxCore.Utility.RenderJson(data)));
	if(callback != undefined && errorCallback != undefined && callback != null && errorCallback != null)
	{
		OcxCore.SendCommandWS(OcxCore.Utility.RenderJson(data), "com.callcenter.CTIAgent.web CtiMonitor_CH", true,
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
				},action
		);
	}
	else
	{
		OcxCore.SendCommandWS(OcxCore.Utility.RenderJson(data), "com.callcenter.CTIAgent.web CtiMonitor_CH", true,null,null,action);
	}
}

//Session的InitService执行后调用
OcxCore.Session.onAfterInitService(function(){
	var config = OcxCore.Config;
	//服务开始后回调函数
	if(config !=undefined &&  config.StartServiceCallback != undefined && config.StartServiceCallback != null)
		OcxCore.Session.GetGlobal("StartServiceCallback").Attach(config.StartServiceCallback);
	//服务停止后回调函数
	if(config !=undefined &&  config.StopServiceCallback != undefined && config.StopServiceCallback != null)
		OcxCore.Session.GetGlobal("StopServiceCallback").Attach(config.StopServiceCallback);
	//客户端状态变化回调函数
	if(config !=undefined &&  config.StateChangeCallback != undefined && config.StateChangeCallback != null)
		OcxCore.Session.GetGlobal("StateChangeCallback").Attach(config.StateChangeCallback);
	
	//服务开始后回调函数
	if (OcxCore.Session.GetGlobal("StartServiceCallback") != null) 
	{
		OcxCore.Session.GetGlobal("StartServiceCallback").Call();
	}
});