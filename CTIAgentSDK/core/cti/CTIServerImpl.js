if(OcxCore.cti == undefined) OcxCore.cti = {};
OcxCore.cti.CTIServerImpl = (function(){
	var This = {};//this;
	
	var _OutlinePhonePrefix = "";//外线号码加前缀，比如加9
	var _IsConnected = false;//CTI服务器是否可连接
	var _connectState = 0;//0 连接关闭 1已连接 2重连中
	var _CtiVerifyCode = "ServerInited";//CTI连接验证码，初始默认值为ServerInited，CTI服务器比较此值时会自动重置分机状态
	var _checkinSessionId = "";//签入会话唯一标识ID
	var _canAutoReCheckin = false;//当前是否允许自动签入
	var _canAutoReconnect = false;//当前是否允许更换link自动重连
	
	//var _connectMode = "socket";//连接模式 socket http flash
	//var _CTIServerType = "ctiAgent";//CTI服务器类型 cti CTI服务器真实环境   ctiAgent cti中转网站
	var _websocketController = null;//WebSocket连接对象
	
	
	This.Initialize = function()
	{
		_IsConnected = false;
		_connectState = 0;
		_CtiVerifyCode = "ServerInited1";//CTI连接验证码，初始默认值为ServerInited，CTI服务器比较此值时会自动重置分机状态
		
		//OcxCore.Log.trace("CTI服务器IP："+This.getCTIServerIP()+",端口："+This.getCTIServerPoint()+"，连接模式："+This.getConnectMode() +"  CTI服务器类型："+(This.getCTIServerType() == 'cti' ? "CTI服务器":"CTI中转网站"));
	}
	
	/**
	 * 网站停止后调用的CTIAgent销毁方法
	 * */
	This.destroy=function()
	{
		try
		{
			
		}catch(ex)
		{
			
		}
	}
	
	//CTI模拟器根目录
	This.getCTISrvDemoRootPath=function()
	{
		if(OcxCore.Config.CTISrvDemoRootPath != undefined && OcxCore.Config.CTISrvDemoRootPath == "/")
			return "";
		return OcxCore.Config.CTISrvDemoRootPath != undefined ? OcxCore.Config.CTISrvDemoRootPath:"/CTIServerDemo";;//CTI模拟器根目录
	}
	
	
	This.getCTIServerIP=function()
	{
		return OcxCore.Session.getCTIServerIP();
	}
	
	
	This.getCTIServerPoint=function()
	{
		return OcxCore.Session.getCTIServerPort();
	}
	
	
	This.getAutoCallServer=function()
	{
		return OcxCore.Session.getAutoCallServer();
	}
	
	
	This.getOutlinePhonePrefix=function()
	{
		return _OutlinePhonePrefix;
	}
	/**
	 * CTI服务器版本
	 * */
	This.getCTIVersion=function()
	{
		 return "1.0";
    }
	
	/**
	 * CTI服务器版本
	 * */
	This.getCTISrvCharset=function()
	{
		 return IsCTIDemo() ? "UTF-8":"GB2312";
    }
	
	/**
	 * CTI服务器是否可连接
	 * */
	This.IsConnected=function()
	{
		 return _IsConnected;
    }
	/**
	 * 设置CTI服务器是否可连接状态
	 * */
	This.setIsConnected=function( isConnected)
	{
		var oldConnected = _IsConnected;
		_IsConnected = isConnected;
		if(oldConnected != isConnected)
		{
			try
			{
				if(_IsConnected)
				{
					OcxCore.OcxInfobar.GetLabel("CTIConnectState").SetText("正常").StateChange();
				}
				else if(This.getConnectState() == 2)
				{
					OcxCore.OcxInfobar.GetLabel("CTIConnectState").SetText("重连中").StateChange();
				}
				else
				{
					OcxCore.OcxInfobar.GetLabel("CTIConnectState").SetText("断开").StateChange();
				}
			}
			catch(e)
			{
				
			}
		}
    }
	/**
	 * 0 连接关闭 1已连接 2重连中
	 * */
	This.getConnectState=function()
	{
		 return _connectState;
    }
	
	/**
	 * CTI连接验证码
	 * */
	This.getCtiVerifyCode=function()
	{
		 return _CtiVerifyCode;
    }
	/**
	 * CTI连接验证码
	 * */
	This.setCtiVerifyCode=function(ctiVerifyCode)
	{
		_CtiVerifyCode = ctiVerifyCode;
    }
	/**
	 * 签入会话唯一标识ID
	 * */
	This.getCheckinSessionId=function()
	{
		if(OcxCore.validator.isNull(_checkinSessionId))
		{
			if(OcxCore.validator.isNotNull(OcxCore.Session.getSessionId()))
			{
				_checkinSessionId = OcxCore.Session.getSessionId().toUpperCase().replace(/-/g, '');
			}
			else
			{
				_checkinSessionId = OcxCore.Utility.GetUUID().toUpperCase().replace(/-/g, '');
			}
		}
		 return _checkinSessionId;
    }
	/**
	 * 签入会话唯一标识ID
	 * */
	This.setCheckinSessionId=function(checkinSessionId)
	{
		_checkinSessionId = checkinSessionId;
    }
	
	/**
	 * 签入的用户ID
	 * */
	This.getCheckinUserId=function()
	{
		 return OcxCore.Session.getUserId();
    }
	/**
	 * 签入的用户账号
	 * */
	This.getCheckinUserAccount=function()
	{
		 return OcxCore.Session.getUserName();
    }
	/**
	 * 签入的公司编号
	 * */
	This.getCheckinCompanyCode=function()
	{
		 return OcxCore.Session.getCompanyCode != undefined && OcxCore.Session.getCompanyCode() != null ? OcxCore.Session.getCompanyCode() : "";
    }
	/**
	 * 连接模式 socket http flash
	 * */
	This.getConnectMode=function()
	{
		return OcxCore.Config.ConnectMode != undefined ? OcxCore.Config.ConnectMode:"socket";;//连接模式 socket http flash
    }
	/**
	 * CTI服务器类型 cti CTI服务器真实环境   ctiAgent cti中转网站
	 * */
	This.getCTIServerType=function()
	{
		return OcxCore.Config.CTIServerType != undefined ? OcxCore.Config.CTIServerType:"cti";//CTI服务器类型 cti CTI服务器真实环境   ctiAgent cti中转网站
    }
	/**
	 * 当前是否允许自动签入
	 * */
	This.getCanAutoReCheckin = function(){
		return _canAutoReCheckin;
	};
	/**
	 * 当前是否允许自动签入
	 * */
	This.setCanAutoReCheckin = function(canAutoReCheckin){
		_canAutoReCheckin = canAutoReCheckin;
	};
	/**
	 * 当前是否允许更换link自动重连
	 * */
	This.getCanAutoReconnect = function(){
		return _canAutoReconnect;
	};
	/**
	 * 当前是否允许更换link自动重连
	 * */
	This.setCanAutoReconnect = function(canAutoReconnect){
		_canAutoReconnect = canAutoReconnect;
	};
	/**
	 * 将座席分机签入CTI服务器
	 * @param jobNum 座席工号
	 * @param realName 座席姓名
	 * @param gender 性别 男 女
	 * @param extNumber 座席分机号
	 * @param levelNum 接续等级
	 * @param companyId 公司ID
	 * @param groups 签入的技能组 Map<Integer,String>
	 * @param Caller 主叫号码
	 * @param RelayGrpNo 中继组标识编号
	 * @param callerList 主叫号码列表（区分主备）
	 * @param forceLogin 是否强制签入 1是 0否
	 * @param SeatInfo 设置坐席配置信息
	 * @return 结果编码    0成功/其他失败   
	 */
	This.Checkin=function(jobNum, realName,gender, extNumber, levelNum, companyId, groups, Caller, RelayGrpNo,callerList,forceLogin,SeatInfo)
	{
		var result = false;
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			jobNum = parseInt(OcxCore.Utility.IsNull(jobNum,0));
			gender = OcxCore.Utility.IsNull(gender,"男");
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			levelNum = parseInt(OcxCore.Utility.IsNull(levelNum,1));
			Caller = OcxCore.Utility.IsNull(Caller,"")+"";
			RelayGrpNo = parseInt(OcxCore.Utility.IsNull(RelayGrpNo,0));
			callerList = callerList != undefined && callerList.size() > 0 ? callerList : new OcxCore.List();
			forceLogin = parseInt(OcxCore.Utility.IsNull(forceLogin,0));
			var _groups = new Array();
			
			groups.each(function(key,value,index){
				key = parseInt(OcxCore.Utility.IsNull(key,0));
				_groups.push({
					GrpId:key,
					GrpName:value.GroupName,
					Level:parseInt(OcxCore.Utility.IsNull(value.Level,1)),
					Sort:parseInt(OcxCore.Utility.IsNull(value.Sort,1))
				});
			});
			
			var _callerList = new Array();
			for(var i=0;i<callerList.size();i++)
			{
				var callerObj = callerList.get(i);
				var relayGrpNo = parseInt(OcxCore.Utility.IsNull(callerObj.RelayGrpNo,0));
				_callerList.push({
					Caller:callerObj.Caller,
					RelayGrpNo:relayGrpNo,
					IsDefault:parseInt(callerObj.IsDefault)
				});
			}
			//设置坐席配置信息
			var SetSeatInfo = {};
			if(SeatInfo != undefined)
			{
				SetSeatInfo.EndProcMode = parseInt(OcxCore.Utility.IsNull(SeatInfo.EndProcMode,0));
				SetSeatInfo.EndProcTime = parseInt(OcxCore.Utility.IsNull(SeatInfo.EndProcTime,0));
				SetSeatInfo.SatisfactionMode = parseInt(OcxCore.Utility.IsNull(SeatInfo.SatisfactionMode,0));
				SetSeatInfo.SatisfactionEndTime = OcxCore.Utility.IsNull(SeatInfo.SatisfactionEndTime,"")+"";
				SetSeatInfo.DefaultStatus = parseInt(OcxCore.Utility.IsNull(SeatInfo.DefaultStatus,2));
				SetSeatInfo.DefaultEndFlag = parseInt(OcxCore.Utility.IsNull(SeatInfo.DefaultEndFlag,1));
			}
			else
			{
				SetSeatInfo.EndProcMode = 0;
				SetSeatInfo.EndProcTime = 0;
				SetSeatInfo.SatisfactionMode = 0;
				SetSeatInfo.SatisfactionEndTime = "";
				SetSeatInfo.DefaultStatus = 2;
				SetSeatInfo.DefaultEndFlag = 1;
			}
			
			var map = {
			  		Action:"Login",//登入
					AppId:companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					JobNum:jobNum,//工号
					Name:realName,//姓名
					Gender:gender,//性别 男 女
					SeatNum:extNumber,//分机号
					Grps:_groups,//技能组列表
					//GrpId:key,//技能组ID
					//GrpName:value,//技能组名
					Level:levelNum,//级别
					Caller:Caller,//主叫号码
					RelayGrpNo:RelayGrpNo,//中继组标识编号
					Callers:_callerList,//主叫号码列表（区分主备）
					ForceLogin:forceLogin, //是否强制签入 1是 0否
					SetSeatInfo:SetSeatInfo, //设置坐席配置信息
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			
			result = This.SendToServer("Login",map);
			
			return result;
		} catch (e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	
	/**
	 * 签出座席分机
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param groupId 签出的技能组ID，如果为空则签出所有技能组
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.Checkout=function( extNumber, companyId, groupId)
	{
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			groupId = OcxCore.Utility.IsNullOrEmpty(groupId) ? 0: parseInt(groupId);//0表示签出所有技能组
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			
			/*var map = new OcxCore.Map();
			map.put("Action", "Logout");//登出
			map.put("AppId", companyId);//公司ID
			map.put("SeatNum", extNumber+"");//分机号
			map.put("GrpId", groupId);//技能组ID
*/			
			var map = {
					Action: "Logout",//登出
					AppId: companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum: extNumber,//分机号
					JobNum:jobNum,//工号
					GrpId: groupId,//技能组ID
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
				};
			
			var result = This.SendToServer("Logout",map);
			
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 重新同步CTI登录信息
	 * @param jobNum 座席工号
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param realName 座席姓名
	 * @param gender 性别 男 女
	 * @param levelNum 接续等级
	 * @param groups 签入的技能组 Map<Integer,String>
	 * @param Caller 主叫号码
	 * @param RelayGrpNo 中继组标识编号
	 * @param callerList 主叫号码列表（区分主备）
	 * @param SeatInfo 设置坐席配置信息
	 * @return 结果编码    0成功/其他失败   
	 */
	This.ReloadInfo=function(jobNum, extNumber, companyId, realName,gender, levelNum, groups, Caller, RelayGrpNo,callerList,SeatInfo)
	{
		var result = false;
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			jobNum = parseInt(OcxCore.Utility.IsNull(jobNum,0));
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			
			realName = OcxCore.Utility.IsNull(realName,"");
			gender = OcxCore.Utility.IsNull(gender,"男");
			levelNum = parseInt(OcxCore.Utility.IsNull(levelNum,1));
			Caller = OcxCore.Utility.IsNull(Caller,"")+"";
			RelayGrpNo = parseInt(OcxCore.Utility.IsNull(RelayGrpNo,0));
			groups = groups != undefined && groups.size() > 0 ? groups : new OcxCore.Map();
			callerList = callerList != undefined && callerList.size() > 0 ? callerList : new OcxCore.List();
			var _groups = new Array();
			
			groups.each(function(key,value,index){
				key = parseInt(OcxCore.Utility.IsNull(key,0));
				_groups.push({
					GrpId:key,
					GrpName:value.GroupName,
					Level:parseInt(OcxCore.Utility.IsNull(value.Level,1)),
					Sort:parseInt(OcxCore.Utility.IsNull(value.Sort,1))
				});
			});
			
			var _callerList = new Array();
			for(var i=0;i<callerList.size();i++)
			{
				var callerObj = callerList.get(i);
				var relayGrpNo = parseInt(OcxCore.Utility.IsNull(callerObj.RelayGrpNo,0));
				_callerList.push({
					Caller:callerObj.Caller,
					RelayGrpNo:relayGrpNo,
					IsDefault:parseInt(callerObj.IsDefault)
				});
			}
			
			//设置坐席配置信息
			var SetSeatInfo = {};
			if(SeatInfo != undefined)
			{
				SetSeatInfo.EndProcMode = parseInt(OcxCore.Utility.IsNull(SeatInfo.EndProcMode,0));
				SetSeatInfo.EndProcTime = parseInt(OcxCore.Utility.IsNull(SeatInfo.EndProcTime,0));
				SetSeatInfo.SatisfactionMode = parseInt(OcxCore.Utility.IsNull(SeatInfo.SatisfactionMode,0));
				SetSeatInfo.SatisfactionEndTime = OcxCore.Utility.IsNull(SeatInfo.SatisfactionEndTime,"")+"";
				SetSeatInfo.DefaultStatus = parseInt(OcxCore.Utility.IsNull(SeatInfo.DefaultStatus,2));
				SetSeatInfo.DefaultEndFlag = parseInt(OcxCore.Utility.IsNull(SeatInfo.DefaultEndFlag,1));
			}
			else
			{
				SetSeatInfo.EndProcMode = 0;
				SetSeatInfo.EndProcTime = 0;
				SetSeatInfo.SatisfactionMode = 0;
				SetSeatInfo.SatisfactionEndTime = "";
				SetSeatInfo.DefaultStatus = 2;
				SetSeatInfo.DefaultEndFlag = 1;
			}
			
			var map = {
			  		Action:"ReloadInfo",//重新加载登录信息
					AppId:companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					JobNum:jobNum,//工号
					SeatNum:extNumber,//分机号
					Name:realName,//姓名
					Gender:gender,//性别 男 女
					Grps:_groups,//技能组列表
					Level:levelNum,//级别
					Caller:Caller,//主叫号码
					RelayGrpNo:RelayGrpNo,//中继组标识编号
					Callers:_callerList,//主叫号码列表（区分主备）
					SetSeatInfo:SetSeatInfo, //设置坐席配置信息
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			
			result = This.SendToServer("ReloadInfo",map);
			
			return result;
		} catch (e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	
	/**
	 * 设置坐席配置信息
	 * @param jobNum 座席工号
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param EndProcMode 事后整理模式，0禁用 1呼入 2呼出 3呼入呼出，默认0
	 * @param EndProcTime 事后整理时长(秒)
	 * @param SatisfactionMode 满意度调查模式，0关闭 1手动开启 2自动开启，默认0
	 * @param SatisfactionEndTime 满意度调查失效时间,如 20:00
	 * @param DefaultStatus 签入时默认状态，1空闲 2置忙,默认2
	 * @param DefaultEndFlag 事后忙闲状态：0事后闲  1事后忙，默认1
	 * @return 结果编码    0成功/其他失败   
	 */
	This.SetSeatInfo=function(jobNum, extNumber, companyId, EndProcMode, EndProcTime, SatisfactionMode,SatisfactionEndTime,DefaultStatus,DefaultEndFlag)
	{
		var result = false;
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			jobNum = parseInt(OcxCore.Utility.IsNull(jobNum,0));
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			
			EndProcMode = parseInt(OcxCore.Utility.IsNull(EndProcMode,0));
			EndProcTime = parseInt(OcxCore.Utility.IsNull(EndProcTime,0));
			SatisfactionMode = parseInt(OcxCore.Utility.IsNull(SatisfactionMode,0));
			SatisfactionEndTime = OcxCore.Utility.IsNull(SatisfactionEndTime,"")+"";
			DefaultStatus = parseInt(OcxCore.Utility.IsNull(DefaultStatus,2));
			DefaultEndFlag = parseInt(OcxCore.Utility.IsNull(DefaultEndFlag,1));
			
			var map = {
			  		Action:"SetSeatInfo",//设置坐席配置信息
					AppId:companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					JobNum:jobNum,//工号
					SeatNum:extNumber,//分机号
					EndProcMode:EndProcMode,//事后整理模式，0禁用 1呼入 2呼出 3呼入呼出，默认0
					EndProcTime:EndProcTime,//事后整理时长(秒)
					SatisfactionMode:SatisfactionMode,//满意度调查模式，0关闭 1手动开启 2自动开启，默认0
					SatisfactionEndTime:SatisfactionEndTime,//满意度调查失效时间,如 20:00
					DefaultStatus:DefaultStatus,//签入时默认状态，1空闲 2置忙,默认2
					DefaultEndFlag:DefaultEndFlag,//事后忙闲状态：0事后闲  1事后忙，默认1
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			
			result = This.SendToServer("SetSeatInfo",map);
			
			return result;
		} catch (e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	
	/**
	 * 更新坐席签入的技能组
	 * @param jobNum 座席工号
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param groups 签入的技能组 Map<Integer,String>
	 *
	 * @return 结果编码    0成功/其他失败   
	 */
	This.UpdateGroup=function(jobNum, extNumber, companyId, groups)
	{
		var result = false;
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			jobNum = parseInt(OcxCore.Utility.IsNull(jobNum,0));
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			var _groups = new Array();
			
			groups.each(function(key,value,index){
				key = parseInt(OcxCore.Utility.IsNull(key,0));
				_groups.push({
					GrpId:key,
					GrpName:value.GroupName,
					Level:parseInt(OcxCore.Utility.IsNull(value.Level,1)),
					Sort:parseInt(OcxCore.Utility.IsNull(value.Sort,1))
				});
			});
			
			var map = {
			  		Action:"UpdateGroup",//更新坐席签入的技能组
					AppId:companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					JobNum:jobNum,//工号
					SeatNum:extNumber,//分机号
					Grps:_groups,//技能组列表
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			
			result = This.SendToServer("UpdateGroup",map);
			
			return result;
		} catch (e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	
	/**
	 * 网站关闭时通知CTI服务器
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.ServerShutdown=function()
	{
		try {
			/*var map = new OcxCore.Map();
			map.put("Action", "ServerShutdown");//网站关闭时通知CTI服务器
*/			
			var map = {
					Action:"ServerShutdown"//网站关闭时通知CTI服务器
			};
			var result = This.SendToServer("ServerShutdown",map);
			
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 检测CTI服务器是否可以连接
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.CheckCTIConnect=function()
	{
		try {
			/*var map = new OcxCore.Map();
			map.put("VerifyCode", This.getCtiVerifyCode());*/
			var map = {
					Action:"HeartBeat",//网站关闭时通知CTI服务器
					VerifyCode:This.getCtiVerifyCode()
			};
			var result = This.SendToServer("HeartBeat",map,true);
			return result;
		} catch ( e) {
			//CTIAgentServerImpl.WriteLog("Send To CTI Server Error:"+e.message);
		}
		return false;
	}
	/**
	 * 示闲操作<br/>
	 * 
	 * action说明：<br/>
	 * SetIdle//示闲
	 * @param extNumber 分机号
	 * @param companyId 公司ID
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.SetIdle=function(extNumber, companyId)
	{
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			
			var map = {
					Action:"SetIdle",
					AppId:companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum:extNumber,//分机号
					JobNum:jobNum, //工号
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			map.SubStatus = 0;
			var result = This.SendToServer("SetIdle",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 示忙操作、示忙小状态操作<br/>
	 * 
	 * action说明：<br/>
	 * SetBusy//示忙
	 * @param extNumber 分机号
	 * @param companyId 公司ID
	 * @param busySubStatus 示忙小状态，默认2忙碌
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.SetBusy=function(extNumber, companyId,busySubStatus)
	{
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			
			var map = {
					Action:"SetBusy",
					AppId:companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum:extNumber,//分机号
					JobNum:jobNum, //工号
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			if(busySubStatus != undefined && busySubStatus != null && busySubStatus != "")
			{
				map.SubStatus = parseInt(OcxCore.Utility.IsNull(busySubStatus,2));
			}
			else
				map.SubStatus = 2;
			var result = This.SendToServer("SetBusy",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 普通座席操作<br/>
	 * 
	 * 普通操作action说明：<br/>
	 * SetIdle//示闲，SetBusy//示忙，Keep//保持，Return//找回，
	 * BeginConsult//开始咨询，Conference"//会议，Hangup //挂机，
	 * BeginMonitor//开始监控，Transfer//转移，SetEndbusy//事后忙，
	 * SetEndidle//事后闲，StopMonitor//停止监控
	 * @param action 座席分机号
	 * @param companyId 公司ID
	 * @param groupId 技能组ID，如果为空则不传此参数
	 * @param CallId 呼叫ID，如果为空则不传此参数
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.CommonAction=function(action, extNumber, companyId,groupId,CallId)
	{
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			/*var map = new OcxCore.Map();
			map.put("Action", action);
			map.put("AppId", companyId);//公司ID
			map.put("SeatNum", extNumber+"");//分机号
			*/			
			var map = {
					Action:action,
					AppId:companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum:extNumber,//分机号
					JobNum:jobNum, //工号
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			if(groupId != undefined && groupId != null && groupId != "")
			{
				map.GroupId = parseInt(OcxCore.Utility.IsNull(groupId,0));
			}
			if(CallId != undefined && CallId != null && CallId != "")
			{
				map.CallId = OcxCore.Utility.IsNull(CallId,"");
			}
			var result = This.SendToServer(action,map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 呼叫
	 * 
	 * 
	 * @param Called 被叫
	 * @param Caller 主叫号码
	 * @param RelayGrpNo 中继组标识编号
	 * @param CustomId 外呼任务清单ID
	 * @param Flag 呼叫标记（1：呼外线 2：呼内线分机 3：呼工号）
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param taskId 外呼任务ID
	 * @param batchId 外呼任务批次ID
	 * @param customerId 客户ID
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.MakeCall=function(Called, Caller, RelayGrpNo, CustomId, Flag, extNumber, companyId,taskId,batchId,customerId,data)
	{
		try {
			Called = OcxCore.Utility.IsNull(Called,"")+"";
			Caller = OcxCore.Utility.IsNull(Caller,"")+"";
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			Flag = parseInt(OcxCore.Utility.IsNull(Flag,1));
			CustomId = OcxCore.Utility.IsNull(CustomId,"")+"";
			RelayGrpNo = OcxCore.Utility.IsNull(RelayGrpNo,"")+"";
			taskId = OcxCore.Utility.IsNull(taskId,"")+"";
			batchId = OcxCore.Utility.IsNull(batchId,"")+"";
			customerId = OcxCore.Utility.IsNull(customerId,"")+"";
			//RelayGrpNo = parseInt(OcxCore.Utility.IsNull(RelayGrpNo,0));
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			
			/*var map = new OcxCore.Map();
			map.put("Action", "MakeCall");//呼叫
			map.put("AppId", companyId);//公司ID
			map.put("SeatNum", extNumber+"");//分机号
			map.put("Called", Called);//被叫
			map.put("Caller", Flag ==1 ? Caller:"");//主叫号码
			map.put("Flag", Flag+"");//呼叫标记（1：呼外线 2：呼内线）
			map.put("CustomId", CustomId);//外呼任务清单ID或客户ID
			map.put("RelayGrpNo", RelayGrpNo);//中继组标识编号
*/			
			var map = {
					Action:"MakeCall",//呼叫
					AppId:companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum:extNumber,//分机号
					JobNum:jobNum, //工号
					Called:Called,//被叫
					Caller:Flag ==1 ? Caller:"",//主叫号码
					Flag:Flag,//呼叫标记（1：呼外线 2：呼内线分机 3：呼工号）
					CustomId:CustomId,//外呼任务清单ID
					RelayGrpNo:RelayGrpNo,//中继组标识编号
					TaskId:taskId,//外呼任务ID
					BatchId:batchId,//外呼任务批次ID
					CustomerId:customerId,//客户ID
                	Data:data,//客户ID
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			var result = This.SendToServer("MakeCall",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 咨询外线/咨询内线<br/>
	 * 
	 * action说明：ConsultOutline//咨询外线，ConsultInline//咨询内线
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param Called 被叫
	 * @param Caller 主叫号码
	 * @param RelayGrpNo 中继组标识编码
	 * @param isConsultOutline 是否咨询外线    true咨询外线 false咨询内线
	 * @param CallId 呼叫ID
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.Consult=function( extNumber, companyId, Called, Caller, RelayGrpNo, isConsultOutline,CallId)
	{
		try {
			Called = OcxCore.Utility.IsNull(Called,"")+"";
			Caller = OcxCore.Utility.IsNull(Caller,"")+"";
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			RelayGrpNo = OcxCore.Utility.IsNull(RelayGrpNo,"")+"";
			CallId = OcxCore.Utility.IsNull(CallId,"")+"";
			//RelayGrpNo = parseInt(OcxCore.Utility.IsNull(RelayGrpNo,0));
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			
			/*var map = new OcxCore.Map();
			map.put("Action", isConsultOutline ? "ConsultOutline":"ConsultInline");//ConsultOutline//咨询外线，ConsultInline//咨询内线
			map.put("AppId", companyId);//公司ID
			map.put("SeatNum", extNumber+"");//分机号
			map.put("Called", Called);//被叫
			map.put("Caller", Caller);//主叫号码
			map.put("RelayGrpNo", RelayGrpNo);//中继组标识编码
*/			
			var map = {
					Action: isConsultOutline ? "ConsultOutline":"ConsultInline",//ConsultOutline//咨询外线，ConsultInline//咨询内线
					AppId: companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum: extNumber,//分机号
					JobNum:jobNum, //工号
					Called: Called,//被叫
					Caller: Caller,//主叫号码
					RelayGrpNo: RelayGrpNo,//中继组标识编码
					CallId:CallId, //呼叫ID
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			var result = This.SendToServer((isConsultOutline ? "ConsultOutline":"ConsultInline"),map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 咨询某组<br/>
	 * 
	 * action说明：ConsultGroup//咨询某组
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param GroupId 组号
	 * @param CallId 呼叫ID
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.ConsultGroup=function( extNumber, companyId, GroupId,CallId)
	{
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			GroupId = parseInt(OcxCore.Utility.IsNull(GroupId,0));
			CallId = OcxCore.Utility.IsNull(CallId,"")+"";
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			/*var map = new OcxCore.Map();
			map.put("Action", "ConsultGroup");//咨询某组
			map.put("AppId", companyId);//公司ID
			map.put("SeatNum", extNumber+"");//分机号
			map.put("GroupId", GroupId);//组号
*/			
			var map = {
					Action: "ConsultGroup",//咨询某组
					AppId: companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum: extNumber,//分机号
					JobNum:jobNum, //工号
					GroupId: GroupId,//组号
					CallId:CallId, //呼叫ID
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			var result = This.SendToServer("ConsultGroup",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 获取某组坐席状态<br/>
	 * 
	 * action说明：GetGrpSeatState//获取某组坐席状态
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param GroupId 组号
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.GetGrpSeatState=function( extNumber, companyId, GroupId)
	{
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			GroupId = parseInt(OcxCore.Utility.IsNull(GroupId,0));
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			
			/*var map = new OcxCore.Map();
			map.put("Action", "GetGrpSeatState");//获取某组坐席状态
			map.put("AppId", companyId);//公司ID
			map.put("SeatNum", extNumber);//分机号
			map.put("GroupId", GroupId);//组号
*/			
			var map = {
					Action: "GetGrpSeatState",//获取某组坐席状态
					AppId: companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum: extNumber,//分机号
					JobNum:jobNum, //工号
					GroupId: GroupId,//组号
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			var result = This.SendToServer("GetGrpSeatState",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	/**
	 * 监控操作<br/>
	 * 
	 * action说明：MoniterConf //监控会议，Listen//监听，StopListen//停止监听，ForceEnter//强插，
	 * ForceRemove//强拆，ForceSetIdle//强制示忙，ForceSetBusy//强制示闲，StopMonitorConf//停止监控会议，
	 * StopConference//退出会议
	 * @param Action 监控操作命令
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param AgentDest 被监听分机
	 * @param CallId 呼叫ID,如果为空则不传此参数
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.MonitorAction=function(Action, extNumber, companyId, AgentDest,CallId)
	{
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			AgentDest = parseInt(OcxCore.Utility.IsNull(AgentDest,0));
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			
			/*var map = new OcxCore.Map();
			map.put("Action", Action);//监控操作命令
			map.put("AppId", companyId);//公司ID
			map.put("SeatNum", String.valueOf(extNumber));//分机号
			map.put("AgentDest", AgentDest);//被监听分机
*/			
			var map = {
					Action: Action,//监控操作命令
					AppId: companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum: extNumber,//分机号
					JobNum:jobNum, //工号
					AgentDest: AgentDest,//被监听分机
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			if(CallId != undefined && CallId != null && CallId != "")
			{
				map.CallId = OcxCore.Utility.IsNull(CallId,"");
			}
			var result = This.SendToServer(Action,map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	
	/**
	 * 开启离开模式<br/>
	 * 
	 * action说明：LeaveMode//离开
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param phoneNumber 手机号码
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.LeaveMode=function( extNumber, companyId, phoneNumber)
	{
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			extNumber = parseInt(OcxCore.Utility.IsNull(extNumber,0));
			phoneNumber = OcxCore.Utility.IsNull(phoneNumber,"")+"";
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
			
			var map = {
					Action: "LeaveMode",//离开
					AppId: companyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum: extNumber,//分机号
					JobNum:jobNum, //工号
					PhoneNumber: phoneNumber,//手机号码
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			var result = This.SendToServer("LeaveMode",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	
	/**
	 * 呼叫
	 * 
	 * 
	 * @param Called 被叫
	 * @param Caller 主叫号码
	 * @param RelayGrpNo 中继组标识编号
	 * @param CustomId 外呼任务清单ID
	 * @param Flag 呼叫标记（1：呼外线 2：呼内线分机 3：呼工号）
	 * @param extNumber 座席分机号
	 * @param companyId 公司ID
	 * @param taskId 外呼任务ID
	 * @param batchId 外呼任务批次ID
	 * @param customerId 客户ID
	 * @return 发送结果  true/false    发送成功/失败  
	 */
	This.OperationInCall=function(CallId, Operation, Data)
	{
		try {
			CallId = OcxCore.Utility.IsNull(CallId,"")+"";
			Operation = OcxCore.Utility.IsNull(Operation,"")+"";

			var map = {
					Action:"OperationInCall",//呼叫
					AppId:OcxCore.Session.getCompanyId(),//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum:OcxCore.Session.getExtNumber(),//分机号
					CallId:CallId, //工号
					Operation:Operation,//被叫
					Data:Data
			};
			var result = This.SendToServer("OperationInCall",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
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
	This.CallIn=function(StartCaller,EndCaller,Called,GroupId,CustomId, Flag, ExtNumber, CompanyId,IVRPath)
	{
		try {
			StartCaller = OcxCore.Utility.IsNull(StartCaller,"")+"";
			EndCaller = OcxCore.Utility.IsNull(EndCaller,"")+"";
			Called = OcxCore.Utility.IsNull(Called,"")+"";
			GroupId = parseInt(OcxCore.Utility.IsNull(GroupId,0));
			CustomId = OcxCore.Utility.IsNull(CustomId,"")+"";
			Flag = parseInt(OcxCore.Utility.IsNull(Flag,1));
			ExtNumber = ExtNumber != "" ? parseInt(OcxCore.Utility.IsNull(ExtNumber,0)):0;
			CompanyId = OcxCore.Utility.IsNull(CompanyId,"")+"";
			IVRPath = OcxCore.Utility.IsNull(IVRPath,"")+"";
			var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
					
			var map = {
					Action:"CallIn",//呼入
					AppId:CompanyId,//公司ID
					SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
					SeatNum:ExtNumber,//分机号
					JobNum:jobNum, //工号
					StartCaller:StartCaller,//主叫号码开始段
					EndCaller:EndCaller,//主叫号码结束段
					Called:Called,//被叫
					CustomId:CustomId,//外呼任务清单ID
					GroupId:GroupId,//队列ID
					Flag:Flag,//呼叫标记（1：外线呼入 2：呼内线）
					ExtNumber:ExtNumber,//座席分机号
					CompanyId:CompanyId,//公司ID
					IVRPath:IVRPath,//最后一层IVR节点号
					Account:This.getCheckinUserAccount(),//签入的用户账号
					UserId:This.getCheckinUserId(),//签入的用户ID
					CompanyCode:This.getCheckinCompanyCode()//公司编号(数字)
			};
			var result = This.SendToServer("CallIn",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
	}
	
	/**
	 * 向CTI服务端发送命令操作
	 * 
	 * @param Action 操作命令
	 * @param formFields 表单数据键值对
	 * @param isCheckConnect 是否为检测连接
	 * @throws Exception 
	 * */
	This.SendToServer=function(Action, formFields, isCheckConnect)
    {
		isCheckConnect = isCheckConnect !=undefined ? isCheckConnect : false;
		
		try {
			
			/*if(!This.IsConnected() && !isCheckConnect && Action != "Login")
			{
				return false;
			}*/
			if(OcxCore.Utility.IsNullOrEmpty(This.getCTIServerIP()) || OcxCore.Utility.IsNullOrEmpty(This.getCTIServerPoint()))
			{
				return false;
			}
			
			var strParam = OcxCore.Utility.RenderJson(formFields);
			
			if(This.getConnectMode() == "socket")//websocket连接
			{
				var sendResult = This.getWebsocketController().sendMessage(strParam);
				if(sendResult)
				{
					if(!isCheckConnect)
						OcxCore.Log.trace("Send to CTI Server:Action="+Action+" Content:"+strParam);
				}
				else
				{
					if(!isCheckConnect)
						OcxCore.Log.trace("Send to CTI Server Error:Action="+Action+" Content:"+strParam);
				}
				return sendResult;
			}
			else if(This.getConnectMode() == "flash")//flash socket连接
			{
				This.setIsConnected(false);
				return false;
			}
			else if(This.getConnectMode() == "http") //普通http连接
			{
				This.setIsConnected(false);
				return false;
			}else
			{
				This.setIsConnected(false);
				return false;
			}
		} 
		catch ( e) {
			This.setIsConnected(false);
			if(!isCheckConnect)
				OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;
    }
	/**
	 * 启动批次
	 * */
	This.SetBatchStart=function(taskid, batchid, companyId){
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			taskid = OcxCore.Utility.IsNull(taskid,"")+"";
			batchid = OcxCore.Utility.IsNull(batchid,"")+"";
			
			/*var map = new OcxCore.Map();
			map.put("Action","StartCall");
			map.put("CompanyId", companyId);
			map.put("TaskId", taskid);
			map.put("BatchId", batchid);*/
			
			var map = {
					Action:"StartCall",
					CompanyId: companyId,
					TaskId: taskid,
					BatchId: batchid
			};
			var result = This.SendToAutoCallServer("StartCall",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;	
	}
	/**
	 * 暂停批次
	 * */
	This.SetBatchStop=function(taskid, batchid, companyId){
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			taskid = OcxCore.Utility.IsNull(taskid,"")+"";
			batchid = OcxCore.Utility.IsNull(batchid,"")+"";
			
			/*var map = new OcxCore.Map();
			map.put("Action","StopCall");
			map.put("CompanyId", companyId);
			map.put("TaskId", taskid);
			map.put("BatchId", batchid);*/
			var map = {
					Action:"StopCall",
					CompanyId: companyId,
					TaskId: taskid,
					BatchId: batchid
			};
			var result = This.SendToAutoCallServer("StopCall",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;	
	}
	/**
	 * 刷新批次数据
	 * */
	This.SetBatchRefresh=function(taskid, batchid, companyId){
		try {
			companyId = OcxCore.Utility.IsNull(companyId,"")+"";
			taskid = OcxCore.Utility.IsNull(taskid,"")+"";
			batchid = OcxCore.Utility.IsNull(batchid,"")+"";
			
			/*var map = new OcxCore.Map();
			map.put("Action","RefreshData");
			map.put("CompanyId", companyId);
			map.put("TaskId", taskid);
			map.put("BatchId", batchid);*/
			
			var map = {
					Action:"RefreshData",
					CompanyId: companyId,
					TaskId: taskid,
					BatchId: batchid
			};
			var result = This.SendToAutoCallServer("RefreshData",map);
			return result;
		} catch ( e) {
			OcxCore.Log.error("Send To CTI Server Error:"+e.message);
		}
		
		return false;	
	}
	
	This.SendToAutoCallServer=function(Action, formFields)
    {
		return false;
		/*try {
			if(CommonHelper.IsNullOrEmpty(getAutoCallServer()))
			{
				return false;
			}
			String autoCallServer = getAutoCallServer();
			autoCallServer = autoCallServer + Action;
			// 服务地址
			URL url = new URL(autoCallServer);
			// 设定连接的相关参数
			HttpURLConnection connection = null;
			try
			{
				connection = (HttpURLConnection) url.openConnection();
				connection.setDoOutput(true);
				connection.setRequestMethod("POST");
				connection.setUseCaches(false);
				connection.setConnectTimeout(10000);//5s超时
				OutputStreamWriter out = new OutputStreamWriter(
						connection.getOutputStream(), "GB2312");
	
				StringBuilder strParam = new StringBuilder("");
				int i=0;
				// 向服务端发送key = value对
				for (Map.Entry<String, String> entry : formFields.entrySet()) {
					if(i>0) strParam.append("&");
					strParam.append(entry.getKey());
					strParam.append("=");
					strParam.append(entry.getValue());
					i++;
				}
				
				OcxCore.Log.trace("Send to AutoCallServer:Action="+Action+" Content:"+strParam.toString());
				out.write(strParam.toString());
				out.flush();
				out.close();
			
			}catch(IOException e)
			{
				throw new CTIConnectException("AutoCallServer服务器连接异常："+e.message);
			}
			

			// 获取服务端的反馈
			String strLine = "";
			StringBuilder strResponse = new StringBuilder("");
			InputStream in = connection.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(in));
			while ((strLine = reader.readLine()) != null) {
				strResponse.append(strLine);
			}
			String response = strResponse.toString();
			CTIAgentServerImpl.TraceLog("AutoCallServer Response:"+response);
			if (response != null && response.length() > 0
					&& response.trim().toLowerCase().equals("ok")) {
				return true;
			} else
				return false;
		} 
		catch (CTIConnectException e) {
			//CTIAgentServerImpl.getInstance().WriteLog("AutoCallServer Connect Error:"+e.message);
			throw e;
		}
		catch ( e) {
			OcxCore.Log.error("Send To AutoCallServer Error:"+e.message);
			throw e;
		}*/
    }
	
	/**
	 * 生成响应消息
	 * */
	/*This.generateJsonMsgData( errcode, errmsg, actionId, action, data)
	{
		var jsonMsg = {};
		jsonMsg.put("errcode", errcode);
        jsonMsg.put("errmsg", errmsg);
        jsonMsg.put("actionId", actionId);
        jsonMsg.put("action", action);
        if(data != null)
        	jsonMsg.put("data", new JsonText(data.toJsonString()));
        else
        	jsonMsg.put("data", JsonText.getEmptyObject());
        return jsonMsg;
	}*/
	/**
	 * 生成坐席状态改变通知消息
	 * */
	This.generateStateChangedJsonMsgData=function( state, errmsg, data)
	{
		data = data !=undefined && data != null ? data : {};
		data.LabelsInfo= state.getCTIAgentData().LabelsJson();
		data.ButtonsInfo=state.getCTIAgentData().ButtonsJson();
		errmsg = errmsg != null && errmsg.length>0 ? errmsg:"";
        return This.generateJsonMsgData(true,"1",0,errmsg,data, "RefleshUserInfoAndButton");
	}
	/**
	 * 生成刷新用户信息和按钮状态消息
	 * */
	This.generateRefleshUserInfoJsonMsgData=function( state, errmsg, data)
	{
		data = data !=undefined && data != null ? data : {};
		data.LabelsInfo= state.getCTIAgentData().LabelsJson();
		data.ButtonsInfo=state.getCTIAgentData().ButtonsJson();
		errmsg = errmsg != null && errmsg.length>0 ? errmsg:"";
        return This.generateJsonMsgData(true,"1",0,errmsg,data, "RefleshUserInfoAndButton");
	}
	/**
	 * 生成坐席CTI状态改变通知消息
	 * */
	This.generateCTIStateChangedJsonMsgData=function( state, errmsg, data)
	{
		data = data !=undefined && data != null ? data : {};
		data.CTIAgentStatus = state.getCTIAgentStatus();
		data.CTIAgentSubStatus = state.getCTIAgentSubStatus();
		data.IsCTIConnected = state.IsCTIConnected();
		errmsg = errmsg != null && errmsg.length>0 ? errmsg:"";
        return This.generateJsonMsgData(true,"1",0,errmsg,data, "CurrentUserCTIStateChanged");
	}
	/**
	 * 生成响应消息
	 * */
	This.generateJsonData=function(Result, Code,ErrorCode, Message, jsonMsg, ActionCode)
	{
		jsonMsg = jsonMsg !=undefined &&  jsonMsg != null ? jsonMsg:{};
		jsonMsg.Result=Result;
        jsonMsg.Code=Code;
        jsonMsg.ErrorCode=ErrorCode;
        jsonMsg.Message=Message;
        jsonMsg.ActionCode= ActionCode !=undefined ? ActionCode:null;
        
        return jsonMsg;
	}
	/**
	 * 生成响应消息
	 * */
	This.generateJsonMsgData=function( Result, Code,ErrorCode, Message, jsonMsg, ActionCode)
	{
		jsonMsg = jsonMsg !=undefined &&  jsonMsg != null ? jsonMsg:{};
		jsonMsg.Result=Result;
        jsonMsg.Code=Code;
        jsonMsg.ErrorCode=ErrorCode;
        jsonMsg.Message=Message;
        jsonMsg.ActionCode= ActionCode !=undefined ? ActionCode:null;
        
        return jsonMsg;
	}
	
	
	//-------------------------WebSocket通信相关 start--------------------------
	//WebsocketController控制器
	This.getWebsocketController = function()
	{
		if(_websocketController == undefined || _websocketController == null)// || m_Stop || !is_online_
		{
			_websocketController = new This.initWebSocket();
		}
		return _websocketController;
	}
	/**
	 * 初始话WebSocket
	 * */
	This.initWebSocket = function() {
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
			//发送缓存的消息
			_sendMsgCache.each(function(key,value,index){
				_websocket.send(value);
			});
			_sendMsgCache.clear();
			
			
			var state = OcxCore.Session;
			if(state.IsCheckin() && _connectState == 2)
			{
				//发送重新加载登录信息命令
				OcxCore.Session.ReloadCtiInfo();
				//This.ReloadInfo(state.getUserName(), state.getExtNumber(), state.getCompanyId());
			}
			_connectState = 1;//0 连接关闭 1已连接 2重连中
			//停止断开自动重连
			wsObj.hearCheck.stopReconnect();
			//启动心跳检测
			wsObj.hearCheck.startHeartBeat();
			OcxCore.Log.trace("CTI中间件websocket心跳检测已启动...");
			
			//客户端与CTI连接状态变化回调函数
			if(OcxCore.Session.GetGlobal("onCTIConnectStateChange") != undefined && OcxCore.Session.GetGlobal("onCTIConnectStateChange").AttachSize()>0)
				OcxCore.Session.GetGlobal("onCTIConnectStateChange").Call(This.getConnectState(),wsObj);
		};
		//wsObj.onerror = new OcxCore.Delegate();//连接错误
		//连接关闭
		wsObj.onclose = function(){
			_sendMsgCache.clear();
			var state = OcxCore.Session;
			var AgentData = state.getCTIAgentData();
			if(state.IsCheckin())
			{
				//停止心跳检测
				wsObj.hearCheck.stopHeartBeat();
				if(This.getCanAutoReconnect() && (wsObj.hearCheck.reconnectCount < wsObj.hearCheck.getMaxReconnectCount()))
				{
					//启动断开自动重连
					wsObj.hearCheck.startReconnect();
				}
				else
				{
					//停止断开自动重连
					wsObj.hearCheck.stopReconnect();
					/*//如果超出了重连次数，自动切换Link重连
					if(This.getCanAutoReconnect())
					{
						OcxCore.Log.trace("CTI中间件自动切换LINK连接并自动重连中...");
						This.setCanAutoReconnect(false);
						//启动断开自动重连
						wsObj.hearCheck.startReconnect();
					}
					else
					{*/
					This.setCanAutoReconnect(false);
					var extNumber = state.getExtNumber();
					var companyId = state.getCompanyId();
					//state.setExtNumber("");
					AgentData.InitDefault();
					//签出CTI服务器
					//setTimeout(function(){This.Checkout(extNumber, companyId, "0");},100);
					
					OcxCore.Utility.ShowLoading(false);
					
					var jsonMsg =  This.generateRefleshUserInfoJsonMsgData(state, null); 
					state.Send("RefleshUserInfoAndButton",jsonMsg);
					
					jsonMsg =  This.generateCTIStateChangedJsonMsgData(state,""); 
					state.Send("CurrentUserCTIStateChanged",jsonMsg);
					
					jsonMsg =  This.generateJsonMsgData(true,"1",0,"CTI服务器断开连接,自动签出",null);
					state.Send("CHECKOUT_RES", jsonMsg);
					
					
					//保存签出记录时间
					OcxCommandFun.SaveCtiOption(state.getUserCode(),state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "CTI服务器断开连接,自动签出", null);
					
					//自动重新签入
					if(OcxCore.Session.getAutoReCheckin() && This.getCanAutoReCheckin())
					{
						OcxCore.Log.trace("CTI中间件断开连接后自动切换LINK连接并自动签入中...");
						This.setCanAutoReCheckin(false);
						setTimeout(function(){
			        		OcxCore.Session.Checkin();
			        	},200);
					}
					else
					{
						This.setCanAutoReCheckin(false);
					}
					//}
				}
			}
			else
			{
				This.setCanAutoReconnect(false);
				This.setCanAutoReCheckin(false);
				//停止断开自动重连
				wsObj.hearCheck.stopReconnect();
				//停止心跳检测
				wsObj.hearCheck.stopHeartBeat();
				
				//OcxCore.Utility.ShowLoading(false);
			}
			
			//客户端与CTI连接状态变化回调函数
			if(OcxCore.Session.GetGlobal("onCTIConnectStateChange") != undefined && OcxCore.Session.GetGlobal("onCTIConnectStateChange").AttachSize()>0)
				OcxCore.Session.GetGlobal("onCTIConnectStateChange").Call(This.getConnectState(),wsObj);
		};
		//wsObj.onmessage = new OcxCore.Delegate();//收到消息
		//wsObj.onNoSupport = new OcxCore.Delegate();//不支持WebSocket
		wsObj.init = function(){
			//连接关闭
			if((This.IsConnected() || _initStatus == 2) && _websocket != null && _websocket.readyState > 1)
			{
				This.setIsConnected(false);
				_initStatus = 0;
			}
			if(This.IsConnected() || _initStatus == 1 || (_websocket != null && _websocket.readyState == 1)) return true;
			if (window.WebSocket) {
				//客户端与CTI连接之前回调函数
				if (OcxCore.Session.GetGlobal("onBeforeCTIConnect") != undefined && OcxCore.Session.GetGlobal("onBeforeCTIConnect") != null && OcxCore.Session.GetGlobal("onBeforeCTIConnect").AttachSize()>0) 
				{
					var callbackResult = OcxCore.Session.GetGlobal("onBeforeCTIConnect").Call(This.getConnectState(),wsObj,{ConnectState:This.getConnectState(),wsObj:wsObj});
					if(callbackResult != undefined && callbackResult != null && callbackResult == false)
					{
						OcxCore.Log.error("客户端与CTI连接之前回调函数onBeforeCTIConnect返回false！"+" IP地址:"+This.getCTIServerIP()+":"+This.getCTIServerPoint()+" ,SessionId:"+This.getCheckinSessionId());
						//return false;
					}
				}
				
				var socketURL = null;
				if(This.getCTIServerType() == 'cti')
				{
					socketURL = "ws://"+This.getCTIServerIP()+":"+This.getCTIServerPoint()+"/cti?JobNum="+OcxCore.Session.getUserCode()+"&SeatNum="+OcxCore.Session.getExtNumber()+"&AppId="+OcxCore.Session.getCompanyId()+"&SessionId="+This.getCheckinSessionId()+"&Account="+This.getCheckinUserAccount()+"&UserId="+This.getCheckinUserId();
				}
				else if(This.getCTIServerType() == 'ctiAgent')
				{
					socketURL = "ws://"+This.getCTIServerIP()+":"+This.getCTIServerPoint()+This.getCTISrvDemoRootPath()+"/cti?JobNum="+OcxCore.Session.getUserCode()+"&SeatNum="+OcxCore.Session.getExtNumber()+"&AppId="+OcxCore.Session.getCompanyId()+"&SessionId="+This.getCheckinSessionId()+"&Account="+This.getCheckinUserAccount()+"&UserId="+This.getCheckinUserId();
				}
				else if(This.getCTIServerType() == 'ctiJsDemo')
				{
					return false;
				}
				else
				{
					return false;
				}
				_initStatus = 1;
				_websocket = new WebSocket(encodeURI(socketURL));
				_websocket.onopen = function() {
					OcxCore.Log.trace("websocket连接CTI服务器成功！IP地址:"+This.getCTIServerIP()+":"+This.getCTIServerPoint()+" ,SessionId:"+This.getCheckinSessionId());
					_initStatus = 2;
					//连接成功
					This.setIsConnected(true);
					wsObj.onopen();
				}
				_websocket.onerror = function(e) {
					_initStatus = 0;
					//连接失败
					This.setIsConnected(false);
					OcxCore.Log.error("websocket连接CTI服务器发生错误！,IP地址:"+This.getCTIServerIP()+":"+This.getCTIServerPoint()+" ,SessionId:"+This.getCheckinSessionId());
					//This.CloseConnect();
				}
				_websocket.onclose = function(e) {
					_initStatus = 0;
					//连接断开
					This.setIsConnected(false);
					OcxCore.Log.trace("websocket与CTI服务器断开连接！相关信息：code:"+e.code+",reason:"+e.reason+",wasClean:"+e.wasClean+" ,IP地址:"+This.getCTIServerIP()+":"+This.getCTIServerPoint()+" ,SessionId:"+This.getCheckinSessionId());
					//This.CloseConnect();
					wsObj.onclose();
				}
				//消息接收
				_websocket.onmessage = function(message) {
					try
					{
						if(message != undefined && message != null && message !='')
						{
							OcxCore.Log.trace("websocket接收到CTI服务器的消息："+message.data);
							OcxCore.cti.CTISrvCommandProcess.Process(message.data);
						}
					}
					catch (ex)
					{
						OcxCore.Log.error("websocket接收到CTI服务器的消息后处理出错："+ex.message);
					}
				}
				
				return true;
			}
			else
			{
				_connectState = 0;//0 连接关闭 1已连接 2重连中
				This.setIsConnected(false);
				_initStatus = -2;
				OcxCore.Log.error("Send To CTI Server Error:浏览器不支持websocket通讯，请切换到支持websocket的浏览器");
				return false;
			}
		}
		//发送心跳消
		wsObj.sendSocketHeartBeat = function(){
			try{
				if(_initStatus == -2 || _initStatus == 1 || !This.IsConnected())
				{
					return;
				}
				//连接关闭
				if((This.IsConnected() || _initStatus == 2) && _websocket != null && _websocket.readyState > 1)
				{
					This.setIsConnected(false);
					_initStatus = 0;
					return;
				}
				var extNumber = parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getExtNumber(),0));
				var jobNum =  !isNaN(OcxCore.Session.getUserCode()) ? parseInt(OcxCore.Utility.IsNull(OcxCore.Session.getUserCode(),0)):0;
				var data = {
						Action:"ClientHeartBeat",//发送WebSocket“心跳”请求
						AppId: OcxCore.Session.getCompanyId(),//公司ID
						SessionId:This.getCheckinSessionId(),//签入会话唯一标识ID
						SeatNum: extNumber,//分机号
						JobNum:jobNum, //工号
						Account:This.getCheckinUserAccount(),//签入的用户账号
						UserId:This.getCheckinUserId()//签入的用户ID
				};
				var strParam = OcxCore.Utility.RenderJson(data);
				
				if(_websocket != null && _websocket.readyState == 1) _websocket.send(strParam);
				
				if(OcxCore.Config.ShowCTIHeartbeatLog)
				{
					OcxCore.Log.trace("电话工具条websocket发送心跳消息到CTI服务器："+strParam);
				}
			}
			catch(e)
			{
				
			}
		}
		//心跳检测
		wsObj.hearCheck = {
			hearBeatTimeout:20 * 1000,//心跳超时时长(毫秒)
			hearBeatTimeoutObj:null,
			reconnectTimeout:5 * 1000,//重连超时时长
			reconnectCount:0,//重连次数，重连超过5次停止重连
			getMaxReconnectCount:function(){
				return OcxCore.Config.MaxCTIReconnectCount != undefined ? OcxCore.Config.MaxCTIReconnectCount : 10;
			},//最大重连次数，超过后停止重连
			getHeartbeatTimeout:function(){
				return OcxCore.Config.CTIHeartbeatTimeout != undefined ? OcxCore.Config.CTIHeartbeatTimeout * 1000 : wsObj.hearCheck.hearBeatTimeout;
			},//心跳超时时长
			reconnectTimeoutObj:null,
			//启动心跳检测
			startHeartBeat:function(){
				if(wsObj.hearCheck.hearBeatTimeoutObj != null)
					clearTimeout(wsObj.hearCheck.hearBeatTimeoutObj);
				wsObj.hearCheck.hearBeatTimeoutObj=setTimeout(function(){
					wsObj.sendSocketHeartBeat();
					wsObj.hearCheck.startHeartBeat();
				}, wsObj.hearCheck.getHeartbeatTimeout());
			},
			//停止心跳检测
			stopHeartBeat:function(){
				if(wsObj.hearCheck.hearBeatTimeoutObj != null)
				{
					clearTimeout(wsObj.hearCheck.hearBeatTimeoutObj);
					wsObj.hearCheck.hearBeatTimeoutObj = null;
					OcxCore.Log.trace("CTI中间件websocket心跳检测已停止...");
				}
			},
			//启动断开自动重连
			startReconnect:function(){
				if(wsObj.hearCheck.reconnectTimeoutObj != null)
					clearTimeout(wsObj.hearCheck.reconnectTimeoutObj);
				if(_connectState !=2 || wsObj.hearCheck.reconnectCount == wsObj.hearCheck.getMaxReconnectCount())
				{
					wsObj.hearCheck.reconnectCount = 0;
				}
				_connectState = 2;//0 连接关闭 1已连接 2重连中
				wsObj.hearCheck.reconnectCount++;
				OcxCore.Log.trace("CTI中间件websocket断开自动重连中..."+wsObj.hearCheck.reconnectCount);
				if(wsObj.hearCheck.reconnectCount == 1)
				{
					wsObj.hearCheck.reconnectTimeoutObj=setTimeout(function(){
						wsObj.init();
					}, 10);
				}
				else
				{
					wsObj.hearCheck.reconnectTimeoutObj=setTimeout(function(){
						wsObj.init();
					}, wsObj.hearCheck.reconnectTimeout);
				}
				try
				{
					OcxCore.OcxInfobar.GetLabel("CTIConnectState").SetText("重连中").StateChange();
				}
				catch(e)
				{
					
				}
			},
			//停止断开自动重连
			stopReconnect:function(){
				if(wsObj.hearCheck.reconnectTimeoutObj != null)
				{
					clearTimeout(wsObj.hearCheck.reconnectTimeoutObj);
					wsObj.hearCheck.reconnectTimeoutObj = null;
				}
				if(_connectState == 2)
				{
					_connectState = 0;
					OcxCore.Log.trace("CTI中间件websocket断开自动重连已停止...");
				}
				wsObj.hearCheck.reconnectCount = 0;
				try
				{
					if(This.IsConnected())
					{
						OcxCore.OcxInfobar.GetLabel("CTIConnectState").SetText("正常").StateChange();
					}
					else if(This.getConnectState() == 2)
					{
						OcxCore.OcxInfobar.GetLabel("CTIConnectState").SetText("重连中").StateChange();
					}
					else
					{
						OcxCore.OcxInfobar.GetLabel("CTIConnectState").SetText("断开").StateChange();
					}
				}
				catch(e)
				{
					
				}
			}
		}
		//发送消息
		wsObj.sendMessage = function(msg)
		{
			if(_initStatus == -2)
			{
				return false;
			}
			//连接关闭
			if((This.IsConnected() || _initStatus == 2) && _websocket != null && _websocket.readyState > 1)
			{
				This.setIsConnected(false);
				_initStatus = 0;
			}
			if(This.IsConnected() || _initStatus == 2)
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
				//停止心跳检测
				wsObj.hearCheck.stopHeartBeat();
				if(_websocket != undefined && _websocket != null && (This.IsConnected() || _initStatus == 2))
				{
					_initStatus = 0;
					This.setIsConnected(false);
					if( _websocket.readyState == 1)
					{
						_websocket.close(1000,"客户端主动关闭连接");
					}
				}
				_sendMsgCache.clear();
				_connectState = 0;
			}
			catch(e)
			{
				
			}
			_websocket = null;
		};
		return wsObj;
	};
	/**
	 * 关闭连接
	 * */
	This.CloseConnect = function()
	{
		try
		{
			This.setCanAutoReconnect(false);
			This.setCanAutoReCheckin(false);
			This.getWebsocketController().closeSocketConnect();
		}
		catch(e)
		{
			
		}
	}
	//-------------------------WebSocket通信相关 start--------------------------
	
	return This;
})();