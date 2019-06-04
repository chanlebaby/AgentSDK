OcxCore.Config = {
		ClientVersion: "2.1.4",//客户端版本
		ServerVersion: "1.0",//服务端版本
		DialogZIndex:10000000,//弹框层zIndex值
    	ResPath: "CTIAgentSDK",//资料目录
    	WebConnectMode:"http",//连接网站模式 socket flash http
    	WebConnectUrl:"",//网站客户端连接地址 如果连接网站模式是websocket则指定ws地址，如果是http则指定http心跳连接地址
    	WebHeartbeatTimeout:20,//网站心跳超时时长（秒）,默认20秒
    	CommandUrl:"CTIAgent/command.svt",//发送命令到服务端的地址
    	ResponseUrl:"CTIAgent/response.svt",//心跳连接地址
    	LogLevel:"TRACE",//显示日志级别TRACE,DEBUG,INFO,WARN,ERROR,FATAL
		//服务开始后
		StartServiceCallback:function(){
			
		},
		//服务停止后
		StopServiceCallback:function(stopType,data){
			
		},
		//客户端状态变化回调
		StateChangeCallback:function(ClientStatus,data)
		{
			
		}
	};

function StartService()
{
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
	
	if (OcxCore.Session.GetGlobal("StartServiceCallback") != null) 
	{
		OcxCore.Session.GetGlobal("StartServiceCallback").Call();
	}
	
}

//Session的InitService执行后调用
OcxCore.Session.onAfterInitService(StartService);