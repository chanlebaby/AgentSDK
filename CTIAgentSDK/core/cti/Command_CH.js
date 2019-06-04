if (OcxCore.cti == undefined) OcxCore.cti = {};
OcxCore.cti.Command_CH = (function () {
	var This = {};//this;

	This.Process = function (ActionID, action, appTypeId, version, paramData) {
		try {
			var paramsNode = paramData;
			//var action = action;
			var jsonMsg = {};
			//		if("Login".equals(action))//Agent创建会话
			//		{
			//			return CTIAgentLoginHandler(paramsNode);
			//		}
			//		else
			if ("ReloadLoginInfo" == action)//重新加载登录信息
			{
				return ReloadLoginInfoHandler(paramsNode);
			}
			else if ("Checkin" == action)//Agent签入CTI
			{
				if (OcxCore.cti.CTIServerImpl.getConnectState() == 2) {
					throw new OcxCore.Exceptions.CTIActionException(504, "正在重新连接CTI服务器，请稍后再操作！");
				}
				return CTIAgentCheckinHandler(paramsNode);
			}
			else if ("Checkout" == action)//Agent签出CTI
			{
				if (OcxCore.cti.CTIServerImpl.getConnectState() == 2) {
					throw new OcxCore.Exceptions.CTIActionException(504, "正在重新连接CTI服务器，请稍后再操作！");
				}
				return CTIAgentCheckoutHandler(paramsNode);
			}
			else if ("ReloadInfo" == action)//同步CTI登录信息
			{
				return CTIAgentReloadInfoHandler(paramsNode);
			}
			else if ("SetSeatInfo" == action)//设置坐席配置信息
			{
				return CTIAgentSetSeatInfoHandler(paramsNode);
			}
			else if ("ServerStartup" == action)//呼叫中心网站启动时通知CTI中间件服务器
			{
				return CallCenterWebStartupHandler(paramsNode);
			} else if ("ServerShutdown" == action)//呼叫中心网站关闭时通知CTI中间件服务器
			{
				return CallCenterWebShutdownHandler(paramsNode);
			}

			if (OcxCore.Session == null || !OcxCore.Session.IsCheckin()) {
				//OcxCore.Log.debug("=====Common_CH=====Agent会话过期====state为空======sessionId:"+getSessionID()+"  User:"+User);
				throw new OcxCore.Exceptions.CTIActionException(401, "用户未签入");
			}

			var User = OcxCore.Session.getUserName();////操作用户账号
			var UserCode = OcxCore.Session.getUserCode();////操作用户工号
			var CompanyId = OcxCore.Session.getCompanyId();////操作用户企业ID
			var sessionId = OcxCore.Session.getSessionId();////会话ID
			if (OcxCore.validator.isNull(User) || OcxCore.validator.isNull(UserCode) || OcxCore.validator.isNull(sessionId) || OcxCore.validator.isNull(CompanyId)) {
				throw new OcxCore.Exceptions.CTIActionException(400, "请求有误，请检查传递的参数是否合法");
			}
			var state = OcxCore.Session;
			var AgentData = state.getCTIAgentData();
			if (OcxCore.cti.CTIServerImpl.getConnectState() == 2) {
				throw new OcxCore.Exceptions.CTIActionException(504, "正在重新连接CTI服务器，请稍后再操作！");
			}
			else if (OcxCore.cti.CTIServerImpl.getConnectState() == 0) {
				return UnConnectHandler(state, AgentData, jsonMsg, paramsNode);
			}
			/* if(!OcxCore.cti.CTIServerImpl.IsConnected())
			{
				return UnConnectHandler(state, AgentData, jsonMsg,paramsNode);
			} */
			//判断CTI服务器验证码是否一致，不一致则自动签出，操作无效
			/*if(!OcxCore.cti.CTIServerImpl.getCtiVerifyCode()==AgentData.getCTIVerifyCode())
			{
				return UnVerifyHandler(state, AgentData, jsonMsg,paramsNode);
			}*/
			//Agent电话按钮点击操作
			switch (action) {
				//---------------------电话条按钮操作---------------------
				case "SetIdle"://示闲
					return SetIdleHandler(state, AgentData, jsonMsg, paramsNode);
				case "SetBusy"://示忙
					return SetBusyHandler(state, AgentData, jsonMsg, paramsNode);
				case "Answer"://接听
					return AnswerHandler(state, AgentData, jsonMsg, paramsNode);
				case "MakeCall"://外呼
					return MakeCallHandler(state, AgentData, jsonMsg, paramsNode);
				case "Hangup"://挂机
					return HangupHandler(state, AgentData, jsonMsg, paramsNode);
				case "Transfer"://转移
					return TransferHandler(state, AgentData, jsonMsg, paramsNode);
				case "Keep"://保持
					return KeepHandler(state, AgentData, jsonMsg, paramsNode);
				case "Return"://找回
					return ReturnHandler(state, AgentData, jsonMsg, paramsNode);
				case "Conference"://会议
					return ConferenceHandler(state, AgentData, jsonMsg, paramsNode);
				case "SetEndidle"://事后闲
					return SetEndidleHandler(state, AgentData, jsonMsg, paramsNode);
				case "SetEndbusy"://事后忙
					return SetEndbusyHandler(state, AgentData, jsonMsg, paramsNode);
				case "Intercept"://拦截
					return InterceptHandler(state, AgentData, jsonMsg, paramsNode);
				case "StartEndProc"://开始事后整理
					return StartEndProcHandler(state, AgentData, jsonMsg, paramsNode);
				case "StopEndProc"://整理结束
					return StopEndProcHandler(state, AgentData, jsonMsg, paramsNode);
				case "Satisfaction"://满意度调查
					return SatisfactionHandler(state, AgentData, jsonMsg, paramsNode);
				case "LeaveMode"://离开
					return LeaveModeHandler(state, AgentData, jsonMsg, paramsNode);
				case "NormalMode"://恢复
					return NormalModeHandler(state, AgentData, jsonMsg, paramsNode);

				//---------------------普通操作---------------------	
				case "BeginConsult"://开始咨询
					return BeginConsultHandler(state, AgentData, jsonMsg, paramsNode);
				case "ConsultGroup"://咨询某组
					return ConsultGroupHandler(state, AgentData, jsonMsg, paramsNode);
				case "GetGrpSeatState"://获取某组坐席状态
					return GetGrpSeatStateHandler(state, AgentData, jsonMsg, paramsNode);
				case "ConsultOutline"://咨询外线
					return ConsultOutlineHandler(state, AgentData, jsonMsg, paramsNode);
				case "ConsultInline"://咨询内线
					return ConsultInlineHandler(state, AgentData, jsonMsg, paramsNode);
				case "BeginMonitor"://开始监控
					return BeginMonitorHandler(state, AgentData, jsonMsg, paramsNode);
				case "StopMonitor"://停止监控
					return StopMonitorHandler(state, AgentData, jsonMsg, paramsNode);
				case "MoniterConf"://监控会议
					return MoniterConfHandler(state, AgentData, jsonMsg, paramsNode);
				case "Listen"://监听
					return ListenHandler(state, AgentData, jsonMsg, paramsNode);
				case "StopListen"://停止监听
					return StopListenHandler(state, AgentData, jsonMsg, paramsNode);
				case "ForceEnter"://强插
					return ForceEnterHandler(state, AgentData, jsonMsg, paramsNode);
				case "ForceRemove"://强拆
					return ForceRemoveHandler(state, AgentData, jsonMsg, paramsNode);
				case "ForceSetIdle"://强制示闲
					return ForceSetIdleHandler(state, AgentData, jsonMsg, paramsNode);
				case "ForceSetBusy"://强制示忙
					return ForceSetBusyHandler(state, AgentData, jsonMsg, paramsNode);
				case "StopMonitorConf"://停止监控会议
					return StopMonitorConfHandler(state, AgentData, jsonMsg, paramsNode);
				case "StopConference"://退出会议
					return StopConferenceHandler(state, AgentData, jsonMsg, paramsNode);
				case "SendTipMsg"://发送消息
					return SendTipMsgHandler(state, AgentData, jsonMsg, paramsNode);
				case "ForceCheckOut"://强制注销
					return ForceCheckOutHandler(state, AgentData, jsonMsg, paramsNode);
				case "OperationInCall"://转IVR
					return OperationInCallHandler(state, AgentData, jsonMsg, paramsNode);
				default:
					return jsonMsg;
			}

		} catch (e) {
			OcxCore.Log.error("操作失败：" + e.message);
			if (e.is != undefined && e.is("CTIActionException")) {
				return OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", e.getErrcode(), e.getMessage(), null);
			} else {
				return OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", 500, e.message, null);
			}
		}
	}
	/**
	 * Agent创建会话
	 * */
	function ReloadLoginInfoHandler(ps) {
		try {
			var CTIAgentSessionID = OcxCore.Session.getSessionId();//会话ID
			var UserName = OcxCore.Session.getUserName();//用户账号
			var UserCode = OcxCore.Session.getUserCode();//用户工号
			var RealName = OcxCore.Session.getRealName();//用户姓名
			var CompanyId = OcxCore.Session.getCompanyId();//公司ID 

			if (OcxCore.validator.isNull(UserName) || OcxCore.validator.isNull(UserCode) || OcxCore.validator.isNull(RealName) ||
				OcxCore.validator.isNull(CompanyId) || OcxCore.validator.isNull(CTIAgentSessionID)) {
				throw new OcxCore.Exceptions.CTIActionException(400, "请求有误，请检查传递的参数是否合法");
			}

			var ButtonPermission = OcxCore.Session.getButtonPermission() != null ? OcxCore.Session.getButtonPermission() : "";//按钮权限

			var btnps = ButtonPermission.length > 0 ? ButtonPermission.split(",") : new Array();

			//按钮权限控制
			var btnPermission = new OcxCore.Map();
			if (hasBtnPermission("Checkin", btnps)) {
				btnPermission.put("Checkin", true);
				btnPermission.put("Checkout", true);

				btnPermission.put("SetIdle", true);
				btnPermission.put("SetBusy", true);
				btnPermission.put("Answer", true);
				btnPermission.put("Hangup", true);

				btnPermission.put("Return", true);
				btnPermission.put("SetEndidle", true);
				btnPermission.put("SetEndbusy", true);
				btnPermission.put("Intercept", false);//拦截功能暂时不开放
			} else {
				btnPermission.put("Checkin", false);
				btnPermission.put("Checkout", false);

				btnPermission.put("SetIdle", false);
				btnPermission.put("SetBusy", false);
				btnPermission.put("Answer", false);
				btnPermission.put("Hangup", false);

				btnPermission.put("Return", false);
				btnPermission.put("SetEndidle", false);
				btnPermission.put("SetEndbusy", false);
				btnPermission.put("Intercept", false);
			}

			if (hasBtnPermission("LeaveMode", btnps)) {
				btnPermission.put("LeaveMode", true);
				btnPermission.put("NormalMode", true);
			} else {
				btnPermission.put("LeaveMode", false);
				btnPermission.put("NormalMode", false);
			}

			btnPermission.put("StartEndProc", hasBtnPermission("StartEndProc", btnps));
			btnPermission.put("Satisfaction", hasBtnPermission("Satisfaction", btnps));

			btnPermission.put("MakeCall", hasBtnPermission("MakeCall", btnps));
			btnPermission.put("Consult", hasBtnPermission("Consult", btnps));
			btnPermission.put("Transfer", hasBtnPermission("Transfer", btnps));
			btnPermission.put("Keep", hasBtnPermission("Keep", btnps));
			btnPermission.put("Conference", hasBtnPermission("Conference", btnps));
			btnPermission.put("OperationInCall", hasBtnPermission("OperationInCall", btnps));
			if (hasBtnPermission("Monitor", btnps)) {
				btnPermission.put("Monitor", true);

				btnPermission.put("Listen", hasBtnPermission("Listen", btnps));//监听
				btnPermission.put("ForceEnter", hasBtnPermission("ForceEnter", btnps));//强插
				btnPermission.put("ForceRemove", hasBtnPermission("ForceRemove", btnps));//强拆
				btnPermission.put("ForceSetIdle", hasBtnPermission("ForceSetIdle", btnps));//强制示闲
				btnPermission.put("ForceSetBusy", hasBtnPermission("ForceSetBusy", btnps));//强制示忙
				btnPermission.put("MoniterConf", hasBtnPermission("MoniterConf", btnps));//监控会议
				btnPermission.put("SendTipMsg", hasBtnPermission("SendTipMsg", btnps));//消息
				btnPermission.put("ForceCheckOut", hasBtnPermission("ForceCheckOut", btnps));//强制注销
			} else {
				btnPermission.put("Monitor", false);

				btnPermission.put("Listen", false);//监听
				btnPermission.put("ForceEnter", false);//强插
				btnPermission.put("ForceRemove", false);//强拆
				btnPermission.put("ForceSetIdle", false);//强制示闲
				btnPermission.put("ForceSetBusy", false);//强制示忙
				btnPermission.put("MoniterConf", false);//监控会议
				btnPermission.put("SendTipMsg", false);//消息
				btnPermission.put("ForceCheckOut", false);//强制注销
			}
			//显示拨号框
			if (hasBtnPermission("showDialNumber", btnps)) {
				OcxCore.Config.DialNumberVisible = true;
			}
			/*else
			{
				OcxCore.Config.DialNumberVisible = false;
			}*/
			var state = OcxCore.Session;

			state.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex());
			state.setClientStatus(OcxCore.Enums.ClientStatusFlag.ONLINE.getIndex());

			state.getCTIAgentData().InitDefault();
			state.getCTIAgentData().SetButtonPermission(btnPermission);

			//有坐席监控权限的标记为班长坐席
			/*if(state.getCTIAgentData().getBtnMonitor().getHasPermission() == true)
			{
				state.setSeatType(1);
			}
			else
			{
				state.setSeatType(0);
			}*/

			var jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			return OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "重新加载登录信息成功！", null);
		} catch (e) {

			OcxCore.Log.error("加载登录信息失败：" + e.message);
			return OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", 500, "加载登录信息失败：" + e.message, null);
		}

	}

	function hasBtnPermission(btnId, pers) {
		if (pers == null || pers.length == 0 || btnId == null || btnId.length == 0)
			return false;
		for (var i = 0; i < pers.length; i++) {
			if (btnId.toLowerCase() == pers[i].toLowerCase())
				return true;
		}
		return false;
	}
	/**
	 * Agent签入CTI
	 * */
	function CTIAgentCheckinHandler(ps) {
		var jsonMsg = null;
		//判断浏览器是否支持websocket通讯
		if (OcxCore.cti.CTIServerImpl.getConnectMode() == "socket")//websocket连接
		{
			if (window.WebSocket == undefined) {
				throw new OcxCore.Exceptions.CTIActionException(500, "浏览器不支持websocket通讯，请切换到支持websocket的浏览器");
			}
		}
		else if (This.getConnectMode() == "flash")//flash socket连接
		{
			throw new OcxCore.Exceptions.CTIActionException(500, "暂不支持flash socket通讯，请切换到支持websocket的浏览器");
		}
		else if (This.getConnectMode() == "http") //普通http连接
		{
			throw new OcxCore.Exceptions.CTIActionException(500, "暂不支持http通讯，请切换到支持websocket的浏览器");
		} else {
			throw new OcxCore.Exceptions.CTIActionException(500, "通讯类型无效");
		}
		var CTIAgentSessionID = OcxCore.Session.getSessionId();//会话ID
		var UserName = OcxCore.Session.getUserName();//用户账号
		var UserCode = OcxCore.Session.getUserCode();//用户工号
		var RealName = OcxCore.Session.getRealName();//用户姓名
		var CompanyId = OcxCore.Session.getCompanyId();//公司ID 

		var SeatType = OcxCore.Session.getSeatType();//坐席类型

		var ExtNumber = ps.ExtNumber != undefined ? ps.ExtNumber : OcxCore.Session.getExtNumber();//分机号
		var Continuation = OcxCore.Session.getContinuation() != null ? OcxCore.Session.getContinuation() : "1";//接续等级
		var ExtCaller = ps.ExtCallerNumber != undefined ? ps.ExtCallerNumber : OcxCore.Session.getExtCallerNumber();//分机主叫号码
		var ExtCallerRelayGrpNo = ps.ExtCallerRelayGrpNo != undefined ? ps.ExtCallerRelayGrpNo : OcxCore.Session.getExtCallerRelayGrpNo();//分机中继组编码
		var CanSetBusyWaitCount = OcxCore.Session.getCanSetBusyWaitCount() != null ? OcxCore.Session.getCanSetBusyWaitCount() : "0";//超过指定排队数量不允许置忙
		var ButtonPermission = OcxCore.Session.getButtonPermission() != null ? OcxCore.Session.getButtonPermission() : "";//按钮权限

		var ForceLogin = ps.ForceLogin != undefined ? ps.ForceLogin : 0;//是否强制签入 1是 0否

		var SeatGroups = new OcxCore.Map();
		if (ps.Groups != undefined && ps.Groups != null && ps.Groups.length > 0) {
			for (var i = 0; i < ps.Groups.length; i++) {
				//SeatGroups.put(parseInt(ps.Groups[i].GroupId), ps.Groups[i].GroupName);
				var Level = ps.Groups[i].Level != undefined ? parseInt(OcxCore.Utility.IsNull(ps.Groups[i].Level, 1)) : 1;
				var Sort = ps.Groups[i].Sort != undefined ? parseInt(OcxCore.Utility.IsNull(ps.Groups[i].Sort, 1)) : 1;

				SeatGroups.put(parseInt(ps.Groups[i].GroupId), {
					GroupId: parseInt(ps.Groups[i].GroupId),
					GroupName: ps.Groups[i].GroupName,
					Level: Level,
					Sort: Sort
				});
			}
		}

		var errMsg = "";
		if (OcxCore.validator.isNull(UserName)) errMsg += "坐席账号不能为空;";
		if (OcxCore.validator.isNull(UserCode) || !OcxCore.validator.isInt(UserCode)) errMsg += "坐席工号不能为空且为整型数字;";
		if (OcxCore.validator.isNull(ExtNumber) || !OcxCore.validator.isInt(ExtNumber)) errMsg += "座席分机号不能为空且为整型数字;";
		if (OcxCore.validator.isNull(Continuation) || !OcxCore.validator.isInt(Continuation)) errMsg += "接续等级不能为空且为整型数字;";
		if (OcxCore.validator.isNull(CompanyId)) errMsg += "公司ID不能为空;";
		if (SeatGroups.size() == 0) errMsg += "选择要签入的技能组;";
		if (OcxCore.validator.isNull(ButtonPermission)) errMsg += "此坐席未分配按钮权限;";

		if (errMsg.length > 0) {
			throw new OcxCore.Exceptions.CTIActionException(400, errMsg);
		}

		var btnps = ButtonPermission.length > 0 ? ButtonPermission.split(",") : new Array();
		if (!hasBtnPermission("Checkin", btnps)) {
			throw new OcxCore.Exceptions.CTIActionException(1, "此坐席未分配签入权限");
		}

		//主叫号码列表
		var ExtCallerNumberList = new OcxCore.List();
		if (ps.Callers != undefined && ps.Callers != null && ps.Callers.length > 0) {
			OcxCore.Session.clearCallerNumberList();//先清空主叫号码列表
			for (var i = 0; i < ps.Callers.length; i++) {
				ExtCallerNumberList.add({
					Caller: ps.Callers[i].Caller,
					RelayGrpNo: ps.Callers[i].RelayGrpNo,
					IsDefault: ps.Callers[i].IsDefault
				});

				OcxCore.Session.addCallerNumber(ps.Callers[i].Caller, ps.Callers[i].RelayGrpNo, ps.Callers[i].IsDefault);

				//设置默认的主叫号码
				if (ps.Callers[i].IsDefault == 1) {
					ExtCaller = ps.Callers[i].Caller;
					ExtCallerRelayGrpNo = ps.Callers[i].RelayGrpNo;
				}
			}
		}
		else if (OcxCore.Session.getCallerNumberList().size() > 0) {
			for (var i = 0; i < OcxCore.Session.getCallerNumberList().size(); i++) {
				var callerObj = OcxCore.Session.getCallerNumberList().get(i);
				ExtCallerNumberList.add({
					Caller: callerObj.Caller,
					RelayGrpNo: callerObj.RelayGrpNo,
					IsDefault: callerObj.IsDefault
				});

				//设置默认的主叫号码
				if (callerObj.IsDefault == 1) {
					ExtCaller = callerObj.Caller;
					ExtCallerRelayGrpNo = callerObj.RelayGrpNo;
				}
			}
		}
		else if (OcxCore.validator.isNotNull(ExtCaller) && OcxCore.validator.isNotNull(ExtCallerRelayGrpNo)) {
			OcxCore.Session.addCallerNumber(ExtCaller, ExtCallerRelayGrpNo, 1);
		}

		//按钮权限控制
		var btnPermission = new OcxCore.Map();
		if (hasBtnPermission("Checkin", btnps)) {
			btnPermission.put("Checkin", true);
			btnPermission.put("Checkout", true);

			btnPermission.put("SetIdle", true);
			btnPermission.put("SetBusy", true);
			btnPermission.put("Answer", true);
			btnPermission.put("Hangup", true);

			btnPermission.put("Return", true);
			btnPermission.put("SetEndidle", true);
			btnPermission.put("SetEndbusy", true);
			//btnPermission.put("Intercept", true);//拦截功能暂时不开放
		} else {
			btnPermission.put("Checkin", false);
			btnPermission.put("Checkout", false);

			btnPermission.put("SetIdle", false);
			btnPermission.put("SetBusy", false);
			btnPermission.put("Answer", false);
			btnPermission.put("Hangup", false);

			btnPermission.put("Return", false);
			btnPermission.put("SetEndidle", false);
			btnPermission.put("SetEndbusy", false);
			btnPermission.put("Intercept", false);
		}

		if (hasBtnPermission("LeaveMode", btnps)) {
			btnPermission.put("LeaveMode", true);
			btnPermission.put("NormalMode", true);
		} else {
			btnPermission.put("LeaveMode", false);
			btnPermission.put("NormalMode", false);
		}

		btnPermission.put("OperationInCall", hasBtnPermission("OperationInCall", btnps));

		btnPermission.put("StartEndProc", hasBtnPermission("StartEndProc", btnps));
		btnPermission.put("Satisfaction", hasBtnPermission("Satisfaction", btnps));

		btnPermission.put("MakeCall", hasBtnPermission("MakeCall", btnps));
		btnPermission.put("Consult", hasBtnPermission("Consult", btnps));
		btnPermission.put("Transfer", hasBtnPermission("Transfer", btnps));
		btnPermission.put("Keep", hasBtnPermission("Keep", btnps));
		btnPermission.put("Conference", hasBtnPermission("Conference", btnps));
		btnPermission.put("OperationInCall", hasBtnPermission("OperationInCall", btnps));
		
		if (hasBtnPermission("Monitor", btnps)) {
			btnPermission.put("Monitor", true);

			btnPermission.put("Listen", hasBtnPermission("Listen", btnps));//监听
			btnPermission.put("ForceEnter", hasBtnPermission("ForceEnter", btnps));//强插
			btnPermission.put("ForceRemove", hasBtnPermission("ForceRemove", btnps));//强拆
			btnPermission.put("ForceSetIdle", hasBtnPermission("ForceSetIdle", btnps));//强制示闲
			btnPermission.put("ForceSetBusy", hasBtnPermission("ForceSetBusy", btnps));//强制示忙
			btnPermission.put("MoniterConf", hasBtnPermission("MoniterConf", btnps));//监控会议
			//btnPermission.put("SendTipMsg", hasBtnPermission("SendTipMsg",btnps));//消息
			btnPermission.put("SendTipMsg", false);//消息
			btnPermission.put("ForceCheckOut", hasBtnPermission("ForceCheckOut", btnps));//强制注销
		} else {
			btnPermission.put("Monitor", false);

			btnPermission.put("Listen", false);//监听
			btnPermission.put("ForceEnter", false);//强插
			btnPermission.put("ForceRemove", false);//强拆
			btnPermission.put("ForceSetIdle", false);//强制示闲
			btnPermission.put("ForceSetBusy", false);//强制示忙
			btnPermission.put("MoniterConf", false);//监控会议
			btnPermission.put("SendTipMsg", false);//消息
			btnPermission.put("ForceCheckOut", false);//强制注销
		}

		var state = OcxCore.Session;
		state.setExtNumber(ExtNumber);
		state.setExtCallerNumber(ExtCaller);
		state.setExtCallerRelayGrpNo(ExtCallerRelayGrpNo);
		state.setContinuation(Continuation);
		state.setCanSetBusyWaitCount(CanSetBusyWaitCount);

		var AgentData = state.getCTIAgentData();
		AgentData.setSeatGroups(SeatGroups);
		AgentData.SetButtonPermission(btnPermission);
		AgentData.setCTIVerifyCode(OcxCore.cti.CTIServerImpl.getCtiVerifyCode());//更新此会话的CTI验证码
		//有坐席监控权限的标记为班长坐席
		if (AgentData.getBtnMonitor().getHasPermission() == true) {
			state.setSeatType(1);
		}
		else {
			state.setSeatType(0);
		}
		//将所签入的技能组加到技能组管理类中
		if (state.getGroupManagement() == null) {
			state.setGroupManagement(new OcxCore.Model.GroupManagement());
		}
		state.getGroupManagement().removeAllGroups();
		SeatGroups.each(function (key, value, index) {
			state.getGroupManagement().addGroup(key, value.GroupName, state.getCompanyId(), value.Level, value.Sort);
		});

		//是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙,坐席默认状态为示闲，默认事后状态为事后闲
		if (OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval) {
			//state.setDefaultStatus(1);//坐席默认状态为示闲
			state.setDefaultEndFlag(0);//默认事后状态为事后闲
		}

		var ExecutionTime = OcxCore.utils.getNowDate();
		var EndTime = null;
		var Remark = "";
		//坐席配置信息
		var SetSeatInfo = {
			EndProcMode: parseInt(OcxCore.Utility.IsNull(state.getEndProcMode(), 0)),
			EndProcTime: parseInt(OcxCore.Utility.IsNull(state.getEndProcTime(), 0)),
			SatisfactionMode: parseInt(OcxCore.Utility.IsNull(state.getSatisfactionMode(), 0)),
			SatisfactionEndTime: OcxCore.Utility.IsNull(state.getSatisfactionEndTime(), "") + "",
			DefaultStatus: parseInt(OcxCore.Utility.IsNull(state.getDefaultStatus(), 2)),
			DefaultEndFlag: parseInt(OcxCore.Utility.IsNull(state.getDefaultEndFlag(), 1))
		};
		//签入CTI服务器
		var result = OcxCore.cti.CTIServerImpl.Checkin(state.getUserCode(), state.getRealName(), state.getGender(), ExtNumber, state.getContinuation(), state.getCompanyId(), SeatGroups, state.getExtCallerNumber(), state.getExtCallerRelayGrpNo(), ExtCallerNumberList, ForceLogin, SetSeatInfo);
		EndTime = result ? null : OcxCore.utils.getNowDate();
		Remark = result ? "" : "签入失败";
		if (result) {
			AgentData.setCheckinDate(ExecutionTime);
		} else {
			//AgentData.setCheckinOptionID(null);
			//OcxCommandFun.UpdateCtiOption(OpID, null, EndTime, Remark);

			AgentData.setCTIVerifyCode("");
			throw new OcxCore.Exceptions.CTIActionException(3, "签入失败！");
		}
		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "签入操作成功！", null);
	}

	/**
	 * Agent同步CTI登录信息
	 * */
	function CTIAgentReloadInfoHandler(ps) {
		var jsonMsg = null;
		//判断浏览器是否支持websocket通讯
		if (OcxCore.cti.CTIServerImpl.getConnectMode() == "socket")//websocket连接
		{
			if (window.WebSocket == undefined) {
				throw new OcxCore.Exceptions.CTIActionException(500, "浏览器不支持websocket通讯，请切换到支持websocket的浏览器");
			}
		}
		else if (This.getConnectMode() == "flash")//flash socket连接
		{
			throw new OcxCore.Exceptions.CTIActionException(500, "暂不支持flash socket通讯，请切换到支持websocket的浏览器");
		}
		else if (This.getConnectMode() == "http") //普通http连接
		{
			throw new OcxCore.Exceptions.CTIActionException(500, "暂不支持http通讯，请切换到支持websocket的浏览器");
		} else {
			throw new OcxCore.Exceptions.CTIActionException(500, "通讯类型无效");
		}
		var CTIAgentSessionID = OcxCore.Session.getSessionId();//会话ID
		var UserName = OcxCore.Session.getUserName();//用户账号
		var UserCode = OcxCore.Session.getUserCode();//用户工号
		var RealName = OcxCore.Session.getRealName();//用户姓名
		var CompanyId = OcxCore.Session.getCompanyId();//公司ID 

		var SeatType = OcxCore.Session.getSeatType();//坐席类型

		var ExtNumber = OcxCore.Session.getExtNumber();//分机号
		var Continuation = OcxCore.Session.getContinuation() != null ? OcxCore.Session.getContinuation() : "1";//接续等级
		var ExtCaller = OcxCore.Session.getExtCallerNumber();//分机主叫号码
		var ExtCallerRelayGrpNo = OcxCore.Session.getExtCallerRelayGrpNo();//分机中继组编码
		var CanSetBusyWaitCount = OcxCore.Session.getCanSetBusyWaitCount() != null ? OcxCore.Session.getCanSetBusyWaitCount() : "0";//超过指定排队数量不允许置忙

		var errMsg = "";
		if (OcxCore.validator.isNull(UserName)) errMsg += "坐席账号不能为空;";
		if (OcxCore.validator.isNull(UserCode) || !OcxCore.validator.isInt(UserCode)) errMsg += "坐席工号不能为空且为整型数字;";
		if (OcxCore.validator.isNull(ExtNumber) || !OcxCore.validator.isInt(ExtNumber)) errMsg += "坐席分机号不能为空且为整型数字;";
		if (OcxCore.validator.isNull(Continuation) || !OcxCore.validator.isInt(Continuation)) errMsg += "接续等级不能为空且为整型数字;";
		if (OcxCore.validator.isNull(CompanyId)) errMsg += "公司ID不能为空;";
		//if(SeatGroups.size() ==0)  errMsg +="选择要签入的技能组;";

		if (errMsg.length > 0) {
			throw new OcxCore.Exceptions.CTIActionException(400, errMsg);
		}

		//主叫号码列表
		var ExtCallerNumberList = new OcxCore.List();
		if (OcxCore.Session.getCallerNumberList().size() > 0) {
			for (var i = 0; i < OcxCore.Session.getCallerNumberList().size(); i++) {
				var callerObj = OcxCore.Session.getCallerNumberList().get(i);
				ExtCallerNumberList.add({
					Caller: callerObj.Caller,
					RelayGrpNo: callerObj.RelayGrpNo,
					IsDefault: callerObj.IsDefault
				});

				//设置默认的主叫号码
				if (callerObj.IsDefault == 1) {
					ExtCaller = callerObj.Caller;
					ExtCallerRelayGrpNo = callerObj.RelayGrpNo;
				}
			}
		}
		else if (OcxCore.validator.isNotNull(ExtCaller) && OcxCore.validator.isNotNull(ExtCallerRelayGrpNo)) {
			OcxCore.Session.addCallerNumber(ExtCaller, ExtCallerRelayGrpNo, 1);
		}

		var state = OcxCore.Session;
		var AgentData = state.getCTIAgentData();
		state.setExtCallerNumber(ExtCaller);
		state.setExtCallerRelayGrpNo(ExtCallerRelayGrpNo);
		//技能组列表
		var SeatGroups = new OcxCore.Map();
		if (AgentData.getSeatGroups().size() == 0) {
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
		else {
			AgentData.getSeatGroups().each(function (key, value, index) {
				key = parseInt(OcxCore.Utility.IsNull(key, 0));
				SeatGroups.put(key, value);
			});
		}
		//是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙,坐席默认状态为示闲，默认事后状态为事后闲
		if (OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval) {
			//state.setDefaultStatus(1);//坐席默认状态为示闲
			state.setDefaultEndFlag(0);//默认事后状态为事后闲
		}
		//坐席配置信息
		var SetSeatInfo = {
			EndProcMode: parseInt(OcxCore.Utility.IsNull(state.getEndProcMode(), 0)),
			EndProcTime: parseInt(OcxCore.Utility.IsNull(state.getEndProcTime(), 0)),
			SatisfactionMode: parseInt(OcxCore.Utility.IsNull(state.getSatisfactionMode(), 0)),
			SatisfactionEndTime: OcxCore.Utility.IsNull(state.getSatisfactionEndTime(), "") + "",
			DefaultStatus: parseInt(OcxCore.Utility.IsNull(state.getDefaultStatus(), 2)),
			DefaultEndFlag: parseInt(OcxCore.Utility.IsNull(state.getDefaultEndFlag(), 1))
		};
		//重新同步CTI登录信息
		var result = OcxCore.cti.CTIServerImpl.ReloadInfo(state.getUserCode(), ExtNumber, state.getCompanyId(), state.getRealName(), state.getGender(), state.getContinuation(), SeatGroups, state.getExtCallerNumber(), state.getExtCallerRelayGrpNo(), ExtCallerNumberList, SetSeatInfo);
		if (result) {

		} else {
			throw new OcxCore.Exceptions.CTIActionException(3, "重新同步CTI登录信息失败！");
		}
		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "重新同步CTI登录信息操作成功！", null);
	}
	/**
	 * Agent签出CTI
	 * */
	function CTIAgentCheckoutHandler(ps) {
		var jsonMsg = null;

		if (!OcxCore.Session.IsCheckin()) {
			//关闭连接
			OcxCore.cti.CTIServerImpl.CloseConnect();
			throw new OcxCore.Exceptions.CTIActionException(1, "坐席未签入");
		}
		var UserName = OcxCore.Session.getUserName();//用户账号
		var CompanyId = OcxCore.Session.getCompanyId();//公司ID 
		var ExtNumber = OcxCore.Session.getExtNumber();//分机号

		var errMsg = "";
		if (OcxCore.validator.isNull(ExtNumber)) errMsg += "坐席分机号不能为空;";
		if (OcxCore.validator.isNotNull(ExtNumber) && !OcxCore.validator.isInt(ExtNumber)) errMsg += "座席分机号只能为整型数字;";
		if (OcxCore.validator.isNull(CompanyId)) errMsg += "公司ID不能为空;";

		if (errMsg.length > 0) {
			//关闭连接
			//OcxCore.cti.CTIServerImpl.CloseConnect();
			throw new OcxCore.Exceptions.CTIActionException(400, errMsg);
		}
		var state = OcxCore.Session;
		var AgentData = state.getCTIAgentData();
		if (!OcxCore.cti.CTIServerImpl.IsConnected()) {
			//state.setExtNumber("");
			AgentData.InitDefault();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "CTI服务器断开连接,自动签出", null);
			state.Send("CHECKOUT_RES", jsonMsg);


			//保存签出记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "CTI服务器断开连接,自动签出", null);

			//关闭连接
			OcxCore.cti.CTIServerImpl.CloseConnect();
			return OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "CTI服务器断开连接,自动签出！", null);
		}
		//签出CTI服务器
		var result = OcxCore.cti.CTIServerImpl.Checkout(state.getExtNumber(), state.getCompanyId(), "0");
		if (!result) {
			AgentData = state.getCTIAgentData();

			//state.setExtNumber("");
			AgentData.InitDefault();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "", null);
			state.Send("CHECKOUT_RES", jsonMsg);

			//保存签出记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);

			//关闭连接
			OcxCore.cti.CTIServerImpl.CloseConnect();
			return OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", 2, "签出失败！", null);
		} else {
			if (state.IsCheckin()) {
				AgentData = state.getCTIAgentData();

				//state.setExtNumber("");
				AgentData.InitDefault();

				jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);

				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "", null);
				state.Send("CHECKOUT_RES", jsonMsg);

				jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
				state.Send("RefleshUserInfoAndButton", jsonMsg);

				//保存签出记录时间
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
			}
			//关闭连接
			OcxCore.cti.CTIServerImpl.CloseConnect();
		}
		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "签出成功！", null);
	}

	/**
	 * Agent更新坐席配置信息
	 * */
	function CTIAgentSetSeatInfoHandler(ps) {
		var jsonMsg = null;

		var EndProcMode = ps.EndProcMode != undefined ? parseInt(ps.EndProcMode) : 0;//事后整理模式，0禁用 1呼入 2呼出 3呼入呼出，默认0
		var EndProcTime = ps.EndProcTime != undefined ? parseInt(ps.EndProcTime) : 0;//事后整理时长(秒)
		var SatisfactionMode = ps.SatisfactionMode != undefined ? parseInt(ps.SatisfactionMode) : 0;//满意度调查模式，0关闭 1手动开启 2自动开启，默认0
		var SatisfactionEndTime = ps.SatisfactionEndTime != undefined ? ps.SatisfactionEndTime : "";//满意度调查失效时间,如2018-12-31 23:59:59
		var DefaultStatus = ps.DefaultStatus != undefined ? parseInt(ps.DefaultStatus) : 2;//签入时默认状态，1空闲 2置忙，默认2
		var DefaultEndFlag = ps.DefaultEndFlag != undefined ? parseInt(ps.DefaultEndFlag) : 1;//签入时默认事后忙闲状态：0事后闲  1事后忙，默认1

		var state = OcxCore.Session;
		state.setEndProcMode(EndProcMode);
		state.setEndProcTime(EndProcTime);
		state.setSatisfactionMode(SatisfactionMode);
		state.setSatisfactionEndTime(SatisfactionEndTime);
		state.setDefaultStatus(DefaultStatus);
		state.setDefaultEndFlag(DefaultEndFlag);

		//是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙,坐席默认状态为示闲，默认事后状态为事后闲
		if (OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval) {
			//state.setDefaultStatus(1);//坐席默认状态为示闲
			state.setDefaultEndFlag(0);//默认事后状态为事后闲
		}
		//坐席配置信息
		var SetSeatInfo = {
			EndProcMode: parseInt(OcxCore.Utility.IsNull(state.getEndProcMode(), 0)),
			EndProcTime: parseInt(OcxCore.Utility.IsNull(state.getEndProcTime(), 0)),
			SatisfactionMode: parseInt(OcxCore.Utility.IsNull(state.getSatisfactionMode(), 0)),
			SatisfactionEndTime: OcxCore.Utility.IsNull(state.getSatisfactionEndTime(), "") + "",
			DefaultStatus: parseInt(OcxCore.Utility.IsNull(state.getDefaultStatus(), 2)),
			DefaultEndFlag: parseInt(OcxCore.Utility.IsNull(state.getDefaultEndFlag(), 1))
		};
		//保存坐席配置信息回调函数
		if (OcxCore.Session.GetGlobal("onSaveSeatSettings") != undefined && OcxCore.Session.GetGlobal("onSaveSeatSettings").AttachSize() > 0)
			OcxCore.Session.GetGlobal("onSaveSeatSettings").Call(SetSeatInfo);
		if (state.IsCheckin()) {
			//同步坐席配置到CTI服务器
			var result = OcxCore.cti.CTIServerImpl.SetSeatInfo(state.getUserCode(), state.getExtNumber(), state.getCompanyId(), SetSeatInfo.EndProcMode, SetSeatInfo.EndProcTime, SetSeatInfo.SatisfactionMode, SetSeatInfo.SatisfactionEndTime, SetSeatInfo.DefaultStatus, SetSeatInfo.DefaultEndFlag);
			if (result) {

			} else {
				throw new OcxCore.Exceptions.CTIActionException(3, "同步坐席配置到CTI失败！");
			}
		}

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "操作成功！", null);
	}



	//-------------------CTIAgentButtonClickHandler  Start-----------------
	/**
	 * 未连接CTI的处理方法
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function UnConnectHandler(state, AgentData, jsonMsg, ps) {
		if (state.IsCheckin()) {
			//state.setExtNumber("");
			AgentData.InitDefault();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "", null);
			state.Send("CHECKOUT_RES", jsonMsg);
			//保存签出记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
		}

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
		state.Send("RefleshUserInfoAndButton", jsonMsg);
		//关闭连接
		OcxCore.cti.CTIServerImpl.CloseConnect();
		throw new OcxCore.Exceptions.CTIActionException(503, "CTI服务器连接断开");
	}
	/**
	 * CTI服务器验证码不一致的处理方法
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function UnVerifyHandler(state, AgentData, jsonMsg, ps) {
		if (state.IsCheckin()) {
			//state.setExtNumber("");
			AgentData.InitDefault();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "", null);
			state.Send("CHECKOUT_RES", jsonMsg);
			//保存签出记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
		}

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		throw new OcxCore.Exceptions.CTIActionException(402, "用户登录已过期");
	}

	/**
	 * 示闲 
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function SetIdleHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnFree().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		//SetIdle//示闲
		//var result = OcxCore.cti.CTIServerImpl.CommonAction("SetIdle", state.getExtNumber(), state.getCompanyId());
		var result = OcxCore.cti.CTIServerImpl.SetIdle(state.getExtNumber(), state.getCompanyId());
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "SetIdle" + ":" + "示闲", result));
        if(result){
            AgentData.isSetIdleManualOperation = true;//是否为人工操作示闲动作
        }
		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 示忙
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function SetBusyHandler(state, AgentData, jsonMsg, ps) {
		var CTIAgentSubStatus = ps.CTIAgentSubStatus != undefined && ps.CTIAgentSubStatus != null && OcxCore.validator.isInt(ps.CTIAgentSubStatus) ? ps.CTIAgentSubStatus : 2;
		//已是忙状态
		/*if(state.getCTIAgentStatus() == OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex())
		{
			state.setCTIAgentSubStatus(CTIAgentSubStatus);
			jsonMsg =  OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state,""); 
	        state.Send("CurrentUserCTIStateChanged",jsonMsg);
	        return OcxCore.cti.CTIServerImpl.generateJsonMsgData(true,"1",0,"操作成功",null);
		}*/
		state.setCTIAgentSubStatus(0);
		if (!AgentData.getBtnBusy().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		//超过此队列排队数量不允许置忙，设置数量大于0才生效
		if (state.getCanSetBusyWaitCount() > 0) {
			if (AgentData.getSeatGroups() != null && AgentData.getSeatGroups().size() > 0 && state.getGroupManagement() != null) {
				var waitcount = 0;
				AgentData.getSeatGroups().each(function (key, value, index) {
					var group = state.getGroupManagement().getGroup(key);
					if (group != null) waitcount += group.getWaitCount();
				});
				if (waitcount > 0 && waitcount > state.getCanSetBusyWaitCount()) {
					throw new OcxCore.Exceptions.CTIActionException(2, "超过指定排队数量，不允许置忙！");
				}
			}
		}
		state.setCTIAgentSubStatus(CTIAgentSubStatus);
		//SetBusy//示忙
		//var result = OcxCore.cti.CTIServerImpl.CommonAction("SetBusy", state.getExtNumber(), state.getCompanyId());
		var result = OcxCore.cti.CTIServerImpl.SetBusy(state.getExtNumber(), state.getCompanyId(), CTIAgentSubStatus);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "SetBusy" + ":" + "示忙", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 接听
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function AnswerHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnAnswer().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		//Answer//接听
		var result = OcxCore.cti.CTIServerImpl.CommonAction("Answer", state.getExtNumber(), state.getCompanyId());
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "Answer" + ":" + "接听", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 外呼
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function MakeCallHandler(state, AgentData, jsonMsg, ps) {
		if (state.getCTIAgentStatus() != OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex()) {
			if (OcxCore.Config.MakeCallOnIdleState == undefined || !OcxCore.Config.MakeCallOnIdleState) {
				throw new OcxCore.Exceptions.CTIActionException(2, "坐席示忙状态下才可以外呼！");
			}
		}
		if (!AgentData.getBtnOutCall().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var called = ps.Called != undefined ? ps.Called + "" : "";//被叫
		var caller = ps.Caller != undefined ? ps.Caller : "";//主叫
		var customId = ps.CustomId != undefined ? ps.CustomId + "" : "";//外呼清单ID
		//var calltype = ps.CallType != undefined ? ps.CallType:"";
		var relayGrpNo = ps.RelayGrpNo != undefined ? ps.RelayGrpNo : "";//中继组编号
		var isPopNow = "1";//默认立即弹屏//ps.IsPopNow != undefined ? ps.IsPopNow:"0";
		var otherParams = ps.OtherParams != undefined ? ps.OtherParams : "";
		var flag = ps.Flag != undefined ? ps.Flag : "";// 1外线 2内线
		var taskId = ps.TaskId != undefined ? ps.TaskId : "";//外呼任务ID
		var batchId = ps.BatchId != undefined ? ps.BatchId : "";//外呼任务批次ID
		var customerId = ps.CustomerId != undefined ? ps.CustomerId : "";//客户ID
		var realCalledPhone = called;//真实的被叫号码，手机号码不加0或9前缀
        var makecallData = ps.Data != undefined ? ps.Data : null;//随路数据
		if (OcxCore.validator.isNull(called)) {
			throw new OcxCore.Exceptions.CTIActionException(3, "被叫号码不能为空！");
		}
		var dialFlag = 1; // 1外线 2内线
		if (flag != null && flag != "") {
			dialFlag = flag == 1 ? 1 : 2;
		}
		else {
			if (called.indexOf('9') == 0 && called.length > 3) //以9开头并且超过三位数是为拨打外线
			{
				dialFlag = 1;
			}
			else {
				dialFlag = called.length <= 4 && called.length > 2 ? 2 : 1;
			}

		}
		if (dialFlag == 1)//外线(排除外呼任务)
		{
			//判断是否要在拨号号码前加前缀
			if (OcxCore.validator.isNotNull(OcxCore.Session.getCTIDialPrefix())) {
				called = OcxCore.Session.getCTIDialPrefix() + called;
			}
			//如果呼外线未指定主叫号码时用分机的主叫号码和中继组标识编码
			caller = caller != null && caller.length > 0 ? caller : state.getExtCallerNumber();
			relayGrpNo = relayGrpNo != null && relayGrpNo.length > 0 ? relayGrpNo : state.getExtCallerRelayGrpNo();

			//还原真实的被叫号码，手机号码不带0不带9
			if (OcxCore.Config.CanShowRealPhone && realCalledPhone.length == 12 && realCalledPhone.indexOf('0') == 0 && OcxCore.validator.isMobile(realCalledPhone.substr(1))) {
				realCalledPhone = realCalledPhone.substr(1);
			}
		} else {
			caller = state.getExtNumber();//内线打内线时主叫设置为分机号
		}
		AgentData.getCallData().initDefault();
		//AgentData.getCallData().setPopTabId(OcxCore.Utility.GetUUID());
		AgentData.getCallData().setOtherParams(otherParams);
		//如果customId为空则为普通外呼，不为空则为手动外呼
		if (OcxCore.validator.isNull(customId)) {
			AgentData.getCallData().setCallType(1);//普通外呼
		}
		else {
			AgentData.getCallData().setCallType(4);//手动外呼
		}
		AgentData.getLblCaller().setText(caller);
		AgentData.getLblCalled().setText(realCalledPhone);
		AgentData.getLblCallNumber().setText(realCalledPhone);
		AgentData.getCallData().setCaller(caller);
		AgentData.getCallData().setCalled(realCalledPhone);
		AgentData.getCallData().setCallId("");
		AgentData.getCallData().setCustomId(customId);
		AgentData.getCallData().setGroupId(null);
		AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
		AgentData.getCallData().setDialFlag(dialFlag);
		AgentData.getCallData().setCustomerId(customerId);

		AgentData.OnlyHugeup_Button_Status();
		AgentData.setChangeStateDate(OcxCore.utils.getNowDate());//状态改变时间

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
		//将当前状态临时标记为正在呼叫
		jsonMsg.LabelsInfo.currentStatus.Text = "正在呼叫";

		state.Send("RefleshUserInfoAndButton", jsonMsg);

		//呼外线并且是立即弹屏,如果启用了CallIdNotify通知则不立即弹屏
		/* if("1"==isPopNow && dialFlag==1 && state.getShowCallOutPopOnTalking() == false && OcxCore.Config.EnableCallIdNotify == false)
		{
			AgentData.getCallData().setPopTabId(OcxCore.Utility.GetUUID());
			
			jsonMsg =  OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null); 
	        state.Send("RefleshUserInfoAndButton",jsonMsg);
			
			var data = {};
			data.Caller=caller;
			data.Called=realCalledPhone;
			data.CallId="";
			data.CustomId=customId;
			data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(),'yyyy-MM-dd hh:mm:ss');
			data.CallType=AgentData.getCallData().getCallType();
			data.OtherParams=otherParams;
			data.PopTabId=AgentData.getCallData().getPopTabId();
			
			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true,"1",0,"呼出通知", data,OcxCore.Enums.CTIResponseFlag.CALLOUT_NOTIFY.getIndex());//OcxCore.cti.CTIServerImpl.generateStateChangedJsonMsgData(state, CTIAgentServerImpl.generateActionId(), "CALLOUT_NOTIFY", null).toJsonString();
			//jsonMsg = generateJsonData(true,"0",OcxCore.Enums.CTIResponseFlag.CALLOUT_NOTIFY,"呼出通知",jsonMsg, AgentData);
	        state.Send("CALLOUT_NOTIFY", jsonMsg);
		} */

		var result = OcxCore.cti.CTIServerImpl.MakeCall(called, caller, relayGrpNo, customId, dialFlag, state.getExtNumber(), state.getCompanyId(), taskId, batchId, customerId,makecallData);
		if (result == false) {
			AgentData.HugeUpSuccessStatus();
			AgentData.getCallData().initDefault();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "呼出失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);
		}
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "MakeCall" + ":" + "外呼", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 挂机
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function HangupHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnHugeup().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//Hangup //挂机
		var result = OcxCore.cti.CTIServerImpl.CommonAction("Hangup", state.getExtNumber(), state.getCompanyId(), null, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "Hangup" + ":" + "挂机", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 转移
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function TransferHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnTransfer().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//Transfer//转移
		var result = OcxCore.cti.CTIServerImpl.CommonAction("Transfer", state.getExtNumber(), state.getCompanyId(), null, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "Transfer" + ":" + "转移", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 保持
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function KeepHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnHold().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//Keep//保持
		var result = OcxCore.cti.CTIServerImpl.CommonAction("Keep", state.getExtNumber(), state.getCompanyId(), null, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "Keep" + ":" + "保持", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 找回
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ReturnHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnGetBack().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//Return//找回
		var result = OcxCore.cti.CTIServerImpl.CommonAction("Return", state.getExtNumber(), state.getCompanyId(), null, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "Return" + ":" + "找回", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 会议
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ConferenceHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnConf().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//Conference//会议
		var result = OcxCore.cti.CTIServerImpl.CommonAction("Conference", state.getExtNumber(), state.getCompanyId(), null, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "Conference" + ":" + "会议", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 事后闲
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function SetEndidleHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnFreeAfter().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		//SetEndidle//事后闲
		var result = OcxCore.cti.CTIServerImpl.CommonAction("SetEndidle", state.getExtNumber(), state.getCompanyId());
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "SetEndidle" + ":" + "事后闲", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 事后忙
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function SetEndbusyHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnBusyAfter().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		//SetEndbusy//事后忙
		var result = OcxCore.cti.CTIServerImpl.CommonAction("SetEndbusy", state.getExtNumber(), state.getCompanyId());
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "SetEndbusy" + ":" + "事后忙", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 拦截
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function InterceptHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnIntercept().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		//Intercept//拦截
		var result = OcxCore.cti.CTIServerImpl.CommonAction("Intercept", state.getExtNumber(), state.getCompanyId());
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "Intercept" + ":" + "拦截", result));
		if (result) {
			//记录动作
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_INTERCEPT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
		}

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}

	/**
	 * 开始事后整理
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function StartEndProcHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnStartEndProc().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//StartEndProc//开始事后整理
		var result = OcxCore.cti.CTIServerImpl.CommonAction("StartEndProc", state.getExtNumber(), state.getCompanyId(), null, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "StartEndProc" + ":" + "开始事后整理", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}

	/**
	 * 整理结束
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function StopEndProcHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnStopEndProc().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//StopEndProc//整理结束
		var result = OcxCore.cti.CTIServerImpl.CommonAction("StopEndProc", state.getExtNumber(), state.getCompanyId(), null, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "StopEndProc" + ":" + "停止事后整理", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}

	/**
	 * 开始满意度调查
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function SatisfactionHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnSatisfaction().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//StartSatisfaction//开始满意度调查
		var result = OcxCore.cti.CTIServerImpl.CommonAction("Satisfaction", state.getExtNumber(), state.getCompanyId(), null, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "Satisfaction" + ":" + "满意度调查", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}

	/**
	 * 离开
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function LeaveModeHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnLeaveMode().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var PhoneNumber = ps.PhoneNumber != undefined ? ps.PhoneNumber : "";
		if (PhoneNumber.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "转接号码为能为空！");
		}
		//LeaveMode//离开
		var result = OcxCore.cti.CTIServerImpl.LeaveMode(state.getExtNumber(), state.getCompanyId(), PhoneNumber);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "LeaveMode:离开", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}

	/**
	 * 恢复
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function NormalModeHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnNormalMode().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");

		var result = OcxCore.cti.CTIServerImpl.CommonAction("NormalMode", state.getExtNumber(), state.getCompanyId());
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "NormalMode:恢复", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}

	//-------------------CTIAgentButtonClickHandler  End-------------------


	//-------------------CTIAgentActionHandler  Start---------------------
	/**
	 * 开始咨询
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function BeginConsultHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnConsult().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		//BeginConsult//开始咨询
		var result = OcxCore.cti.CTIServerImpl.CommonAction("BeginConsult", state.getExtNumber(), state.getCompanyId());
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "BeginConsult" + ":" + "开始咨询", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 咨询某组
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ConsultGroupHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnConsult().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");

		var GroupId = ps.GroupId != undefined ? ps.GroupId : "";
		if (GroupId.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "请选择技能组！");
		}
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//ConsultGroup//咨询某组
		var result = OcxCore.cti.CTIServerImpl.ConsultGroup(state.getExtNumber(), state.getCompanyId(), GroupId, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作:  Action = {0} , Result={1}", "ConsultGroup" + ":" + "咨询某组", result));
		if (result) {
			AgentData.WaitConsult_Button_Status();
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);
		}
		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 获取某组坐席状态
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function GetGrpSeatStateHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnConsult().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var GroupId = ps.GroupId != undefined ? ps.GroupId : "";
		if (GroupId.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "请选择技能组！");
		}
		//GetGrpSeatState//获取某组坐席状态
		var result = OcxCore.cti.CTIServerImpl.GetGrpSeatState(state.getExtNumber(), state.getCompanyId(), GroupId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "GetGrpSeatState" + ":" + "获取某组坐席状态", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 咨询外线
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ConsultOutlineHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnConsult().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");

		var called = ps.Called != undefined ? ps.Called : "";
		if (called.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "外线号码不能为空！");
		}
		//判断是否要在拨号号码前加前缀
		if (OcxCore.validator.isNotNull(OcxCore.Session.getCTIDialPrefix())) {
			called = OcxCore.Session.getCTIDialPrefix() + called;
		}
		var caller = state.getExtCallerNumber();//分机主叫号码
		var relayGrpNo = state.getExtCallerRelayGrpNo();//分机中继组标识编码
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//ConsultOutline//咨询外线
		var result = OcxCore.cti.CTIServerImpl.Consult(state.getExtNumber(), state.getCompanyId(), called, caller, relayGrpNo, true, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "ConsultOutline" + ":" + "咨询外线", result));

		if (result) {
			AgentData.WaitConsult_Button_Status();
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);
		}
		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 咨询内线
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ConsultInlineHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnConsult().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		var called = ps.Called != undefined ? ps.Called : "";
		if (called.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "内线分机号码不能为空！");
		}
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//ConsultInline//咨询内线
		var result = OcxCore.cti.CTIServerImpl.Consult(state.getExtNumber(), state.getCompanyId(), called, "", "", false, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "ConsultInline" + ":" + "咨询内线", result));
		if (result) {
			AgentData.WaitConsult_Button_Status();
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);
		}
		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 开始监控
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function BeginMonitorHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnMonitor().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");
		if (AgentData.getCTIMonitorGroupId() != null && AgentData.getCTIMonitorGroupId() != 0) {
			OcxCore.cti.CTIServerImpl.CommonAction("StopMonitor", state.getExtNumber(), state.getCompanyId(), AgentData.getCTIMonitorGroupId());
			AgentData.setCTIMonitorGroupId(0);//当前监控的技能组ID
			//当前坐席处在监听、强插、监控会议状态时，发送一个挂机命令给CTI
			if (AgentData.getCTIMonitorStatus() == OcxCore.Enums.CTIMonitorStatusFlag.LISTEN.getIndex() || AgentData.getCTIMonitorStatus() == OcxCore.Enums.CTIMonitorStatusFlag.INSERT.getIndex() || AgentData.getCTIMonitorStatus() == OcxCore.Enums.CTIMonitorStatusFlag.CONF.getIndex()) {
				//Hangup //挂机
				var result2 = OcxCore.cti.CTIServerImpl.CommonAction("Hangup", state.getExtNumber(), state.getCompanyId());
			}
		}
		var groupId = ps.GroupId != undefined ? ps.GroupId : 0;
		//BeginMonitor//开始监控
		var result = OcxCore.cti.CTIServerImpl.CommonAction("BeginMonitor", state.getExtNumber(), state.getCompanyId(), groupId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}, GroupId={2}", "BeginMonitor" + ":" + "开始监控", result, groupId));
		if (result) {
			AgentData.setCTIMonitorGroupId(groupId);//当前监控的技能组ID
		}
		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 停止监控
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function StopMonitorHandler(state, AgentData, jsonMsg, ps) {
		//if(!AgentData.getBtnMonitor().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403,"非法操作，操作无效！");
		//StopMonitor//停止监控
		var result = true;
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		if (AgentData.getCTIMonitorGroupId() != null && AgentData.getCTIMonitorGroupId() != 0) {
			result = OcxCore.cti.CTIServerImpl.CommonAction("StopMonitor", state.getExtNumber(), state.getCompanyId(), AgentData.getCTIMonitorGroupId(), CallId);
			AgentData.setCTIMonitorGroupId(0);//当前监控的技能组ID
		}
		//当前坐席处在监听、强插、监控会议状态时，发送一个挂机命令给CTI
		if (AgentData.getCTIMonitorStatus() == OcxCore.Enums.CTIMonitorStatusFlag.LISTEN.getIndex() || AgentData.getCTIMonitorStatus() == OcxCore.Enums.CTIMonitorStatusFlag.INSERT.getIndex() || AgentData.getCTIMonitorStatus() == OcxCore.Enums.CTIMonitorStatusFlag.CONF.getIndex()) {
			//Hangup //挂机
			var result2 = OcxCore.cti.CTIServerImpl.CommonAction("Hangup", state.getExtNumber(), state.getCompanyId(), null, CallId);
		}
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "StopMonitor" + ":" + "停止监控", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 监控会议
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function MoniterConfHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//MoniterConf//监控会议
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("MoniterConf", state.getExtNumber(), state.getCompanyId(), AgentDest, CallId);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "MoniterConf" + ":" + "监控会议", result));
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}


		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 监听
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ListenHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		//Listen//监听
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("Listen", state.getExtNumber(), state.getCompanyId(), AgentDest);
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "Listen" + ":" + "监听", result));
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 停止监听
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function StopListenHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//StopListen//停止监听
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("StopListen", state.getExtNumber(), state.getCompanyId(), AgentDest, CallId);
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "StopListen" + ":" + "停止监听", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 强插
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ForceEnterHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//ForceEnter//强插
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("ForceEnter", state.getExtNumber(), state.getCompanyId(), AgentDest, CallId);
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "ForceEnter" + ":" + "强插", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 强拆
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ForceRemoveHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//ForceRemove//强拆
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("ForceRemove", state.getExtNumber(), state.getCompanyId(), AgentDest, CallId);
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}

		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "ForceRemove" + ":" + "强拆", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 强制示闲
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ForceSetIdleHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		//ForceSetIdle//强制示闲
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("ForceSetIdle", state.getExtNumber(), state.getCompanyId(), AgentDest);
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}

		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "ForceSetIdle" + ":" + "强制示闲", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 强制示忙
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ForceSetBusyHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		//ForceSetBusy//强制示忙
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("ForceSetBusy", state.getExtNumber(), state.getCompanyId(), AgentDest);
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "ForceSetBusy" + ":" + "强制示忙", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 停止监控会议
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function StopMonitorConfHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//StopMonitorConf//停止监控会议
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("StopMonitorConf", state.getExtNumber(), state.getCompanyId(), AgentDest, CallId);
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "StopMonitorConf" + ":" + "停止监控会议", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 退出会议
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function StopConferenceHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		var AtentState = ps.AtentState != undefined ? ps.AtentState : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(2, "被监控分机不能为空！");
		}
		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		//StopConference//退出会议
		var result = OcxCore.cti.CTIServerImpl.MonitorAction("StopConference", state.getExtNumber(), state.getCompanyId(), AgentDest, CallId);
		if (result) {
			AgentData.setCTIMonitorExtNumber(AgentDest);
			AgentData.setCTIMonExtNumAtentState(AtentState);
		}
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "StopMonitorConf" + ":" + "停止监控会议", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}
	/**
	 * 发送消息
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function SendTipMsgHandler(state, AgentData, jsonMsg, ps) {
		throw new OcxCore.Exceptions.CTIActionException(2, "暂不支持此功能！");

		//		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest :"";
		//		var sendMsg = ps.Message != undefined ?  ps.Message : "";
		//		if(AgentDest.length == 0)
		//		{
		//			throw new OcxCore.Exceptions.CTIActionException(2,"被监控分机不能为空！");
		//		}
		//		AccountState DestState = SessionManagement.getInstance().GetAccountStateByExtNumber(Integer.parseInt(AgentDest),state.getCompanyId());
		//		if(DestState == null || DestState.getCTIAgentStatus() == CTIAgentStatusFlag.STATE_OFFLINE)
		//		{
		//			throw new OcxCore.Exceptions.CTIActionException(3,"被监控分机已离线！");
		//		}
		//		String msg = AgentData.getRealName()+ "("+state.getUserName()+")向您发送消息：<br/>"+sendMsg;
		//		
		//		JsonMsgModel data = new JsonMsgModel();
		//		data.put("Result", true);
		//		data.put("Code", "0");
		//		data.put("Message", msg);
		//		jsonMsg = CTIAgentServerImpl.generateNotifyJsonMsgData(0,"",CTIAgentServerImpl.generateActionId(),"GLOBAL:SHOW_TIP_NOTIFY", data,DestState);
		//		
		//        DestState.Send("GLOBAL:SHOW_TIP_NOTIFY", jsonMsg);
		//        OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作:\r\n Action = {0} , Result={1}","SendTipMsg"+":"+"发送消息",true}));
		//        
		//        return OcxCore.cti.CTIServerImpl.generateJsonMsgData(true,"1",0,"操作成功",null);
	}
	/**
	 * 强制注销
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function ForceCheckOutHandler(state, AgentData, jsonMsg, ps) {
		var AgentDest = ps.AgentDest != undefined ? ps.AgentDest : "";
		if (AgentDest.length == 0) {
			throw new OcxCore.Exceptions.CTIActionException(3, "被监控分机不能为空！");
		}
		var result = false;
		//被控制分机存在会话并且未签出
		//		if(DestState != null && DestState.getCTIAgentStatus() != OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex())
		//		{
		//			result = OcxCore.cti.CTIServerImpl.Checkout(parseInt(AgentDest), state.getCompanyId(), "0");
		//			//var msg = "您好！您所签入的坐席分机【"+AgentDest+"】被"+AgentData.getRealName()+ "("+state.getUserName()+")强制签出！";
		//			if(result)
		//			{
		//				var msg1 = "被强制注销的坐席分机："+AgentDest;// + ",工号："+DestState.getUserName();
		//				//记录动作
		//				OcxCommandFun.SaveCtiOption(state.getUserName(),state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_FORCECHECKOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), msg1, null);
		//			}
		//			JsonMsgModel data = new JsonMsgModel();
		//			data.put("Result", true);
		//			data.put("Code", "0");
		//			data.put("Message", msg);
		//			jsonMsg = CTIAgentServerImpl.generateNotifyJsonMsgData(0,"",CTIAgentServerImpl.generateActionId(),"GLOBAL:SHOW_TIP_NOTIFY", data,DestState);
		//	        DestState.Send("GLOBAL:SHOW_TIP_NOTIFY", jsonMsg);
		//		}else
		//		{
		result = OcxCore.cti.CTIServerImpl.Checkout(parseInt(AgentDest), state.getCompanyId(), "0");
		if (result) {
			var msg1 = "被强制注销的坐席分机：" + AgentDest;
			//记录动作
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_FORCECHECKOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), msg1, null);
		}
		//		}

		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作: Action = {0} , Result={1}", "ForceCheckOut" + ":" + "强制签出", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}

	/**
	 * 转IVR
	 * 
	 * @param state 
	 * @param AgentData
	 * @param jsonMsg
	 * */
	function OperationInCallHandler(state, AgentData, jsonMsg, ps) {
		if (!AgentData.getBtnOperationInCall().IsCanUsed()) throw new OcxCore.Exceptions.CTIActionException(403, "非法操作，操作无效！");

		var CallId = AgentData.getCallData().getCallId();//呼叫ID
		var Operation = ps.Operation;
		var Data = ps.Data;

		if (OcxCore.validator.isNull(Operation)) {
			throw new OcxCore.Exceptions.CTIActionException(3, "操作类型不能为空！");
		}

		var result = OcxCore.cti.CTIServerImpl.OperationInCall(CallId,Operation, Data);
		if (result == false) {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "操作失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);
		}
		OcxCore.Log.debug(OcxCore.utils.stringFormat("Common_CH  客户端操作   工号：{0} 分机:{1}     Action = {2} , Result={3}", state.getUserCode(), state.getExtNumber(), "OperationInCall" + ":" + "转IVR", result));

		return OcxCore.cti.CTIServerImpl.generateJsonMsgData(result, result ? "1" : "-1", result ? 0 : 1, result ? "操作成功" : "操作失败", null);
	}

	//-------------------CTIAgentActionHandler  End---------------------



	return This;
})();