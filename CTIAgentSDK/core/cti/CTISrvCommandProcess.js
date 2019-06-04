if (OcxCore.cti == undefined) OcxCore.cti = {};
OcxCore.cti.CTISrvCommandProcess = (function () {
	var This = {};//this;

	This.Process = function (paramData) {
		try {

			var dataJsonNode = OcxCore.Utility.ParseJson(paramData);

			try {
				//客户端接收到CTI发送的信息回调函数
				if (OcxCore.Session.GetGlobal("onReceiveCTIMessage") != undefined)
					OcxCore.Session.GetGlobal("onReceiveCTIMessage").Call(dataJsonNode);
			}
			catch (e) {
				OcxCore.Log.error("OcxCore.cti.CTISrvCommandProcess() onReceiveCTIMessage处理出错：" + e.message);
			}

			var _action = dataJsonNode.Action != undefined ? dataJsonNode.Action : 0;//响应码或通知码，对应响应消息值
			var CompanyId = dataJsonNode.Appid != undefined ? dataJsonNode.Appid : "";//公司ID
			var ExtNumber = dataJsonNode.SeatNum != undefined ? dataJsonNode.SeatNum : 0;//分机号
			var Ret = dataJsonNode.Ret != undefined ? dataJsonNode.Ret : -99;//结果（0为成功）
			//String data
			var Action = _action;
			if (Action == null) {
				throw new OcxCore.Exceptions.CTIActionException(1, "无效响应码或通知码");
			}
			OcxCore.Log.trace(OcxCore.utils.stringFormat("CTI服务器响应消息 ： {0}  , 内容：{1}", OcxCore.Enums.GetName(OcxCore.Enums.CTIResponseFlag, Action) + ":" + Action, paramData));

			var jsonMsg = {};
			var state = OcxCore.Session;
			var AgentData = state != null ? state.getCTIAgentData() : null;
			//处理公共的响应或通知
			switch (Action) {
				case 809://DISCONNECT_NOTIFY://CTI连接断开通知
					DISCONNECT_NOTIFY(Action, dataJsonNode);
					return "ok";
				case 811://VERIFYCODE_NOTIFY://CTI服务器验证码通知
					VERIFYCODE_NOTIFY(Action, dataJsonNode);
					return "ok";
				case 812://GROUPWAITCOUNT_NOTIFY://技能组排队等待数量通知
					GROUPWAITCOUNT_NOTIFY(Action, dataJsonNode);
					return "ok";
				case 628://RELOADINFO_RES:// 重新加载登录信息响应
					RELOADINFO_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 99://HEARTBEAT_RES 心跳连接响应 99
					return "ok";
				default:
					break;
			}
			if (ExtNumber <= 0)// || CompanyId == null || CompanyId.length == 0
			{
				throw new OcxCore.Exceptions.CTIActionException(1, "参数无效");
			}
			if (state == null) {
				throw new OcxCore.Exceptions.CTIActionException(1, "分机对应坐席未登录！");
			}
			//判断CTI服务器验证码是否一致，不一致则自动签出，操作无效 
			/*if(!OcxCore.cti.CTIServerImpl.getCtiVerifyCode()==state.getCTIAgentData().getCTIVerifyCode())
			{
				UnVerifyHandler(state, state.getCTIAgentData());
				return "ok";
			} */

			switch (Action) {
				case 600://LOGIN_RES:// 登录响应
					LOGIN_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 601://LOGOUT_RES:// 登出响应
					LOGOUT_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 602://MAKECALL_RES://呼出响应 
					MAKECALL_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 621://ANSWER_RES:// 接听响应
					ANSWER_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 615://HANGUP_RES:// 挂机响应
					HANGUP_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 603://SETIDLE_RES:// 示闲响应
					SETIDLE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 604://SETBUSY_RES:// 示忙响应
					SETBUSY_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 605://KEEP_RES://保持响应 
					KEEP_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 606://RETURN_RES:// 找回响应
					RETURN_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 607://CONSULT_RES:// 咨询响应
					CONSULT_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 617://TRANSFER_RES:// 转移响应
					TRANSFER_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 608://CONFERENCE_RES:// 会议响应
					CONFERENCE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 609://LISTEN_RES:// 监听响应
					LISTEN_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 610://STOPLISTEN_RES:// 停止监听响应
					STOPLISTEN_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 611://FORCEENTER_RES:// 强插响应
					FORCEENTER_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 612://FORCEREMOVE_RES:// 强拆响应
					FORCEREMOVE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 613://FORCESETIDLE_RES:// 强制示闲响应
					FORCESETIDLE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 614://FORCESETBUSY_RES:// 强制示忙响应
					FORCESETBUSY_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 616://STOPMONCONF_RES:// 停止监控会议响应
					STOPMONCONF_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 618://STOPCONFERENCE_RES:// 退出会议响应
					STOPCONFERENCE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 619://ENDBUSY_RES:// 事后忙响应
					ENDBUSY_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 620://ENDIDLE_RES:// 事后闲响应
					ENDIDLE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 622://BEGINMONITOR_RES:// 开始监控响应
					BEGINMONITOR_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 623://STOPMONITOR_RES:// 停止监控响应
					STOPMONITOR_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 631://SETSEATINFO_RES:// 设置坐席配置信息响应
					SETSEATINFO_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 632://LEAVEMODE_RES:// 离开响应
					LEAVEMODE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 633://NORMALMODE_RES:// 恢复响应
					NORMALMODE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 634://OPERATIONINCALL_RES:// 转IVR响应
					OPERATIONINCALL_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;

				case 804://CALLOUT_NOTIFY:// 呼出通知
					CALLOUT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 802://CALLALERTING_NOTIFY:// 呼入通知
					CALLALERTING_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 803://TALKING_NOTIFY:// 通话通知
					TALKING_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					//OcxCore.Log.trace(OcxCore.utils.stringFormat("CTISrvCommand info:\r\nAction = {0}",new Object[]{"803"}));
					break;
				case 805://TRANSFERSEAT_NOTIFY:// 内线被转移通知
					TRANSFERSEAT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 808://SEATCALLSEAT_NOTIFY:// 坐席呼坐席通知
					SEATCALLSEAT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 807://GRPINFO_NOTIFY:// 技能组信息通知
					GRPINFO_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 800://CONSULTSTATE_NOTIFY:// 咨询坐席状态通知
					CONSULTSTATE_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 801://MONITORSTATE_NOTIFY:// 监控坐席状态通知
					MONITORSTATE_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 810://ONLYHANGUP_NOTIFY:// 只允许挂机通知
					ONLYHANGUP_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					//OcxCore.Log.trace(OcxCore.utils.stringFormat("CTISrvCommand info:\r\nAction = {0}",new Object[]{"810"}));
					break;
				case 806://FORCECUT_NOTIFY:// 强拆成功通知
					FORCECUT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 813://ENDPROCSTART_NOTIFY:// 事后整理开始通知
					ENDPROCSTART_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 814://ENDPROCSTOP_NOTIFY:// 事后整理结束通知
					ENDPROCSTOP_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 815://ENQUEUEWAIT_NOTIFY:// 进等待队列通知
					ENQUEUEWAIT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 816://DEQUEUEWAIT_NOTIFY:// 出等待队列通知
					DEQUEUEWAIT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 817://CALLID_NOTIFY://呼出CALLID通知
					CALLID_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 818://UPDATEGROUP_NOTIFY:// 更新坐席签入技能组通知
					UPDATEGROUP_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 819://CUSTOMSTATE_NOTIFY:// 自定义状态通知
					CUSTOMSTATE_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;
				case 820://RESULTINCALL_NOTIFY:// 转IVR结果通知
					RESULTINCALL_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode);
					break;

				default:// 

					break;
			}
		} catch (e) {
			if (e.is != undefined && e.is("CTIActionException")) {
				OcxCore.Log.error("处理CTI反馈信息 出错：" + e.getMessage());
			} else {
				OcxCore.Log.error(OcxCore.utils.stringFormat("处理CTI反馈信息 出错:{0}", e.message));
			}
		}
		return "ok";
	}
	//-------------------响应处理  Start------------------
	/**
	 * 登录响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function LOGIN_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		var msg = "";

		if (Ret == 0)//签入成功
		{
			//同步CTI服务器时间
			if (dataJsonNode.ServerTime != undefined && dataJsonNode.ServerTime != null && dataJsonNode.ServerTime != "") {
				try {
					OcxCore.utils.setNowDate(dataJsonNode.ServerTime);
				} catch (e) {

				}
			}

			state.setExtNumber(ExtNumber);
			AgentData.CheckinSuccessStatus();

			//将坐席加入队列中
			/*if(AgentData.getSeatGroups() != null)
			{
				for (Map.Entry<Integer, String> entry : AgentData.getSeatGroups().entrySet()) {
					GroupModel group = GroupManagement.getInstance().getGroup(entry.getKey());
					if(group == null)
						group = GroupManagement.getInstance().addGroup(entry.getKey(), entry.getValue(), AgentData.getCompanyId());
					group.addSeat(AgentData.getUserCode());
				}
			}*/

			//更新签入备注
			//CTIAgentServerImpl.getInstance().UpdateCtiOption(AgentData.getCheckinOptionID(),null, null, "签入成功");
			var OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
			//同步CTI服务器中分机的状态
			if (dataJsonNode.Status != undefined) {
				var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != null && dataJsonNode.CallId.indexOf('VarId') == -1 ? dataJsonNode.CallId : "";//呼叫ID
				var atentSate = parseInt(dataJsonNode.Status);//坐席分机原始状态码,同步CTI服务器中分机的状态
				var seatState = OcxCore.Enums.CTIAtentStatusFlag.TransferAtentStatus(atentSate);//坐席状态
				//如果当前状态是呼入、呼出、通话、咨询、会议、保持，则 同步通话信息，CallId不为空
				if ((seatState == 3 || seatState == 4 || seatState == 5 || seatState == 6 || seatState == 7 || seatState == 10) && OcxCore.validator.isNotNull(CallId)) {
					state.setLastCallId(CallId);//最后一通电话呼叫ID
					var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
					var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
					//var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId:"";//呼叫ID
					var CustomId = dataJsonNode.CustomId != undefined ? dataJsonNode.CustomId : "";//客户ID（任务清单ID）
					var GrpId = dataJsonNode.GrpId != undefined ? dataJsonNode.GrpId : "";//队列ID
					var IVRPath = dataJsonNode.IVRPath != undefined ? dataJsonNode.IVRPath : "";//IVR路径
					var CallType = dataJsonNode.CallType != undefined ? dataJsonNode.CallType : 0;//呼叫类型 0呼入 1呼出 2 预测外呼 3 自动外呼 4 手动外呼
					var CallTime = dataJsonNode.CallTime != undefined ? dataJsonNode.CallTime : null;//呼叫时间 yyyy-MM-dd hh:mm:ss
					var AudioFile = dataJsonNode.AudioFile != undefined ? dataJsonNode.AudioFile : "";//录音路径(相对路径)

					AgentData.getLblCaller().setText(Caller);
					if (CallType > 0) {
						var realCalledPhone = Called;//还原真实的被叫号码，手机号码不带0不带9
						//还原真实的被叫号码，手机号码不带0不带9
						if (realCalledPhone != null && OcxCore.Config.CanShowRealPhone && realCalledPhone.length == 12 && realCalledPhone.indexOf('0') == 0 && OcxCore.validator.isMobile(realCalledPhone.substr(1))) {
							realCalledPhone = realCalledPhone.substr(1);
						}
						AgentData.getLblCalled().setText(realCalledPhone);
						AgentData.getLblCallNumber().setText(realCalledPhone);

						AgentData.getCallData().setCalled(realCalledPhone);
					}
					else {
						AgentData.getLblCalled().setText(Called);
						AgentData.getLblCallNumber().setText(Caller);

						AgentData.getCallData().setCalled(Called);
					}

					AgentData.getCallData().setCaller(Caller);
					AgentData.getCallData().setCallId(CallId);
					AgentData.getCallData().setCustomId(CustomId);
					if (OcxCore.validator.isInt(GrpId))
						AgentData.getCallData().setGroupId(parseInt(GrpId));
					else
						AgentData.getCallData().setGroupId(null);

					AgentData.getCallData().setCallTime(OcxCore.utils.stringToDate(CallTime));//呼叫时间
					AgentData.getCallData().setCallType(CallType);//呼叫类型
					AgentData.getCallData().setIVRPath(IVRPath);
					AgentData.getCallData().setAudioFile(AudioFile);//录音路径(相对路径)
					AgentData.getCallData().setPopTabId(CallId);

					//接听开始时间，
					if (seatState == 5 && dataJsonNode.StateStartTime != undefined && dataJsonNode.StateStartTime != null && dataJsonNode.StateStartTime != "") {
						try {
							var StateStartTime = OcxCore.utils.stringToDate(dataJsonNode.StateStartTime);
							if (StateStartTime != null) {
								AgentData.getCallData().setReceiveStartTime(StateStartTime);//接听开始时间
							}
							else {
								AgentData.getCallData().setReceiveStartTime(AgentData.getCallData().getCallTime());//接听开始时间
							}
						} catch (e) {

						}
					}

					var data = {};
					data.Caller = Caller;
					data.Called = Called;
					data.CallId = CallId;
					data.CustomId = CustomId;
					data.GrpId = GrpId;
					data.IVRPath = IVRPath;
					data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');//呼叫开始时间
					data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
					data.ReceiveEndTime = null;//接听结束时间
					data.CallEndTime = null;//呼叫结束时间
					data.CallType = AgentData.getCallData().getCallType();
					data.AudioFile = AgentData.getCallData().getAudioFile();
					data.OtherParams = AgentData.getCallData().getOtherParams();
					data.PopTabId = AgentData.getCallData().getPopTabId();

					var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
					if (CallDataCache != undefined)//只缓存最近100个通话
					{
						if (CallDataCache.size() >= 100) {
							CallDataCache.remove(CallDataCache.keySet()[0]);
						}
						CallDataCache.put(data.PopTabId, data);
					}
					OcxCore.Session.RegisterGlobal("CurrentCallDataCache", data);//当前呼入呼出电话数据缓存
				}
				var SubStatus = dataJsonNode.SubStatus != undefined && dataJsonNode.SubStatus != null ? dataJsonNode.SubStatus : 0;//置忙小状态
				state.setCTIAgentSubStatus(SubStatus);//置忙小状态
				switch (seatState) {
					case 0://STATE_OFFLINE:
						//state.setExtNumber("");
						AgentData.InitDefault();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex();
						break;
					case 1://STATE_FREE:
						AgentData.btnFree_click();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex();
						break;
					case 2://STATE_BUSY:
						AgentData.btnBusy_click();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
						break;
					case 3://STATE_CALLIN:
						AgentData.CallIn_Button_Status();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLIN.getIndex();
						break;
					case 4://STATE_CALLOUT:
						AgentData.btnOutCall_click();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_MAKECALL.getIndex();
						break;
					case 5://STATE_CALLING:
						AgentData.Talking_Button_Status();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex();
						break;
					case 6://STATE_CONSULT:
						AgentData.Consult_Button_Status();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONSULT.getIndex();
						break;
					case 7://STATE_CONF:
						AgentData.Conference_Button_Status();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONFERENCE.getIndex();
						break;
					case 8://STATE_OTHER:
						AgentData.btnBusy_click();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
						break;
					case 9://STATE_ENDPROC:
						AgentData.btnBusy_click();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
						break;
					case 10://STATE_KEEP
						AgentData.btnHold_click();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_KEEP.getIndex();
						break;
					default:
						AgentData.btnBusy_click();
						OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
						break;
				}

				//同步坐席状态改变时间
				if (dataJsonNode.StateStartTime != undefined && dataJsonNode.StateStartTime != null && dataJsonNode.StateStartTime != "") {
					try {
						var StateStartTime = OcxCore.utils.stringToDate(dataJsonNode.StateStartTime);
						if (StateStartTime != null) {
							AgentData.setChangeStateDate(StateStartTime);
						}
					} catch (e) {

					}
				}
			}
			var EndFlagStr = "";
			//同步事后忙闲状态
			if (dataJsonNode.EndFlag != undefined) {
				var EndFlag = parseInt(dataJsonNode.EndFlag);
				if (EndFlag == 1)//事后忙
				{
					AgentData.btnBusyAfter_click();
					EndFlagStr = "事后忙";
				}
				else {
					AgentData.btnFreeAfter_click();
					EndFlagStr = "事后闲";
				}
			}
			OcxCore.Log.trace(OcxCore.utils.stringFormat("签入成功，当前坐席状态 ：{0}  事后标识：{1} ", OcxCore.Enums.GetName(OcxCore.Enums.CTIAgentStatusFlag, state.getCTIAgentStatus()), EndFlagStr));
			//标记动作
			AgentData.setCTIAgentOption(OptionFlag);
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
			//String OpID = CTIAgentServerImpl.getInstance().SaveCtiOption(AgentData.getUserCode(),String.valueOf(ExtNumber), OptionFlag, OcxCore.utils.getNowDate(), null, AgentData.getCompanyId(), "", null);
			//AgentData.setPreOptionID(OpID);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "签入成功", null);
			state.Send("CHECKIN_RES", jsonMsg);

			//保存签入记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGIN.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OptionFlag, OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			//SendCompScopeUserStateChanged(null, AgentData);

			OcxCore.cti.CTIServerImpl.setCanAutoReconnect(true);
			OcxCore.cti.CTIServerImpl.setCanAutoReCheckin(true);
		} else {
			//var Cause = dataJsonNode.Cause != undefined ? parseInt(dataJsonNode.Cause):0;//结果（0为成功）
			switch (Ret) {
				case 0:// 签入成功
					msg = "签入成功";
					break;
				case 1:// 数据库错误
					msg = "数据库错误";
					break;
				case 2:// 物理地址绑定错误
					msg = "物理地址绑定错误";
					break;
				case 3:// 分机错误
					msg = "分机错误";
					break;
				case 4:// 坐席信息错误
					msg = "坐席信息错误";
					break;
				case 5:// 坐席认证错误
					msg = "坐席认证错误";
					break;
				case 6:// CTI服务器错误
					msg = "CTI服务器错误";
					break;
				case 7://分机已登录 
					msg = "此分机已登录";
					break;
				case 13://工号已登录 
					msg = "此工号已签入其他分机";
					break;
				case 999:// 其他错误
					msg = "其他错误";
					break;
			}
			OcxCore.Log.error("签入失败 ：" + Ret + " " + msg);
			//记录签入结束时间
			//CTIAgentServerImpl.getInstance().UpdateCtiOption(AgentData.getCheckinOptionID(),null, OcxCore.utils.getNowDate(), msg);
			//state.setExtNumber("");

			if (Ret == 13 && state.AskIfForceCheckin != undefined) {
				var aResult = state.AskIfForceCheckin();
				if (!aResult) {
					AgentData.InitDefault();

					jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
					state.Send("RefleshUserInfoAndButton", jsonMsg);

					jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "签入失败：" + msg, null);
					state.Send("CHECKIN_RES", jsonMsg);
				}
			}
			else {
				AgentData.InitDefault();

				jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
				state.Send("RefleshUserInfoAndButton", jsonMsg);

				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "签入失败：" + msg, null);
				state.Send("CHECKIN_RES", jsonMsg);
			}

			//关闭连接
			OcxCore.cti.CTIServerImpl.CloseConnect();
		}
	}

	/**
	 * 登出响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function LOGOUT_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0)//签出成功
		{

			//将坐席从队列中删除
			//			if(AgentData.getSeatGroups() != null)
			//			{
			//				for (Map.Entry<Integer, String> entry : AgentData.getSeatGroups().entrySet()) {
			//					GroupModel group = GroupManagement.getInstance().getGroup(entry.getKey());
			//					if(group != null)
			//					{
			//						group.removeSeat(AgentData.getUserCode());
			//					}
			//				}
			//			}
			//非当前用户分机的签出消息不做处理
			if (OcxCore.validator.isNotNull(ExtNumber) && OcxCore.validator.isNotNull(state.getExtNumber()) && state.getExtNumber() != ExtNumber) {
				OcxCore.Log.warn("接收到的签出消息中分机号【" + ExtNumber + "】与当前用户签入分机号【" + state.getExtNumber() + "】不一致，不做签出处理");
				return;
			}
			if (state.IsCheckin()) {
				//state.setExtNumber("");
				AgentData.InitDefault();

				jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);
				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "签出成功", null);
				state.Send("CHECKOUT_RES", jsonMsg);
				//保存签出记录时间
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
			}
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			//SendCompScopeUserStateChanged(null, AgentData);

		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "签出失败", null);
			state.Send("CHECKOUT_RES", jsonMsg);

			//记录签出动作
			//OcxCommandFun.SaveCtiOption(state.getUserCode(),ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "签出失败", null);
		}

		//关闭连接
		OcxCore.cti.CTIServerImpl.CloseConnect();
	}
	/**
	 * 重新加载登录信息响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function RELOADINFO_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		var msg = "";

		if (state == null || AgentData == null) return;

		if (Ret == 0)//签入会话一致
		{
			//同步CTI服务器时间
			if (dataJsonNode.ServerTime != undefined && dataJsonNode.ServerTime != null && dataJsonNode.ServerTime != "") {
				try {
					OcxCore.utils.setNowDate(dataJsonNode.ServerTime);
				} catch (e) {

				}
			}

			OcxCore.cti.CTIServerImpl.setCanAutoReconnect(true);
			OcxCore.cti.CTIServerImpl.setCanAutoReCheckin(true);

			var OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
			//同步CTI服务器中分机的状态
			if (dataJsonNode.Status != undefined) {
				var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != null && dataJsonNode.CallId.indexOf('VarId') == -1 ? dataJsonNode.CallId : "";//呼叫ID
				var atentSate = parseInt(dataJsonNode.Status);//坐席分机原始状态码,同步CTI服务器中分机的状态
				var seatState = OcxCore.Enums.CTIAtentStatusFlag.TransferAtentStatus(atentSate);//坐席状态
				//同步CallId
				if ((seatState == 3 || seatState == 4 || seatState == 5 || seatState == 6 || seatState == 7 || seatState == 10) && OcxCore.validator.isNotNull(CallId)) {
					//AgentData.getCallData().setCallId(CallId);
					state.setLastCallId(CallId);//最后一通电话呼叫ID

					var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
					var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
					//var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId:"";//呼叫ID
					var CustomId = dataJsonNode.CustomId != undefined ? dataJsonNode.CustomId : "";//客户ID（任务清单ID）
					var GrpId = dataJsonNode.GrpId != undefined ? dataJsonNode.GrpId : "";//队列ID
					var IVRPath = dataJsonNode.IVRPath != undefined ? dataJsonNode.IVRPath : "";//IVR路径
					var CallType = dataJsonNode.CallType != undefined ? dataJsonNode.CallType : 0;//呼叫类型 0呼入 1呼出 2 预测外呼 3 自动外呼 4 手动外呼
					var CallTime = dataJsonNode.CallTime != undefined ? dataJsonNode.CallTime : null;//呼叫时间 yyyy-MM-dd hh:mm:ss
					var AudioFile = dataJsonNode.AudioFile != undefined ? dataJsonNode.AudioFile : "";//录音路径(相对路径)

					AgentData.getLblCaller().setText(Caller);
					if (CallType > 0) {
						var realCalledPhone = Called;//还原真实的被叫号码，手机号码不带0不带9
						//还原真实的被叫号码，手机号码不带0不带9
						if (realCalledPhone != null && OcxCore.Config.CanShowRealPhone && realCalledPhone.length == 12 && realCalledPhone.indexOf('0') == 0 && OcxCore.validator.isMobile(realCalledPhone.substr(1))) {
							realCalledPhone = realCalledPhone.substr(1);
						}
						AgentData.getLblCalled().setText(realCalledPhone);
						AgentData.getLblCallNumber().setText(realCalledPhone);

						AgentData.getCallData().setCalled(realCalledPhone);
					}
					else {
						AgentData.getLblCalled().setText(Called);
						AgentData.getLblCallNumber().setText(Caller);

						AgentData.getCallData().setCalled(Called);
					}

					AgentData.getCallData().setCaller(Caller);
					AgentData.getCallData().setCallId(CallId);
					AgentData.getCallData().setCustomId(CustomId);
					if (OcxCore.validator.isInt(GrpId))
						AgentData.getCallData().setGroupId(parseInt(GrpId));
					else
						AgentData.getCallData().setGroupId(null);

					AgentData.getCallData().setCallTime(OcxCore.utils.stringToDate(CallTime));//呼叫时间 OcxCore.utils.getNowDate()
					AgentData.getCallData().setCallType(CallType);//呼叫类型
					AgentData.getCallData().setIVRPath(IVRPath);
					AgentData.getCallData().setAudioFile(AudioFile);//录音路径(相对路径)
					AgentData.getCallData().setPopTabId(CallId);

					//接听开始时间，
					if (seatState == 5 && dataJsonNode.StateStartTime != undefined && dataJsonNode.StateStartTime != null && dataJsonNode.StateStartTime != "") {
						try {
							var StateStartTime = OcxCore.utils.stringToDate(dataJsonNode.StateStartTime);
							if (StateStartTime != null) {
								AgentData.getCallData().setReceiveStartTime(StateStartTime);//接听开始时间
							}
							else {
								AgentData.getCallData().setReceiveStartTime(AgentData.getCallData().getCallTime());//接听开始时间
							}
						} catch (e) {

						}
					}

					var data = {};
					data.Caller = Caller;
					data.Called = Called;
					data.CallId = CallId;
					data.CustomId = CustomId;
					data.GrpId = GrpId;
					data.IVRPath = IVRPath;
					data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');//呼叫开始时间
					data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
					data.ReceiveEndTime = null;//接听结束时间
					data.CallEndTime = null;//呼叫结束时间
					data.CallType = AgentData.getCallData().getCallType();
					data.AudioFile = AgentData.getCallData().getAudioFile();
					data.OtherParams = AgentData.getCallData().getOtherParams();
					data.PopTabId = AgentData.getCallData().getPopTabId();

					var CallDataCache = OcxCore.Session.GetGlobal("CallDataCache");//呼入呼出电话数据缓存
					if (CallDataCache != undefined)//只缓存最近100个通话
					{
						if (CallDataCache.size() >= 100) {
							CallDataCache.remove(CallDataCache.keySet()[0]);
						}
						CallDataCache.put(data.PopTabId, data);
					}
					OcxCore.Session.RegisterGlobal("CurrentCallDataCache", data);//当前呼入呼出电话数据缓存

				}
				var SubStatus = dataJsonNode.SubStatus != undefined && dataJsonNode.SubStatus != null ? dataJsonNode.SubStatus : 0;//置忙小状态
				state.setCTIAgentSubStatus(SubStatus);//置忙小状态
				var isSameState = false;
				//判断重连后的分机状态与断开连接前的分机状态是否一致，如果一致则工具栏按钮状态不变
				if (seatState != state.getCTIAgentStatus()) {
					switch (seatState) {
						case 0://STATE_OFFLINE:
							AgentData.InitDefault();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex();
							break;
						case 1://STATE_FREE:
							AgentData.btnFree_click();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex();
							break;
						case 2://STATE_BUSY:
							AgentData.btnBusy_click();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
							break;
						case 3://STATE_CALLIN:
							AgentData.CallIn_Button_Status();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLIN.getIndex();
							break;
						case 4://STATE_CALLOUT:
							AgentData.btnOutCall_click();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_MAKECALL.getIndex();
							break;
						case 5://STATE_CALLING:
							AgentData.Talking_Button_Status();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex();
							break;
						case 6://STATE_CONSULT:
							AgentData.Consult_Button_Status();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONSULT.getIndex();
							break;
						case 7://STATE_CONF:
							AgentData.Conference_Button_Status();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONFERENCE.getIndex();
							break;
						case 8://STATE_OTHER:
							AgentData.btnBusy_click();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
							break;
						case 9://STATE_ENDPROC:
							AgentData.btnBusy_click();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
							break;
						case 10://STATE_KEEP
							AgentData.btnHold_click();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_KEEP.getIndex();
							break;
						default:
							AgentData.btnBusy_click();
							OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
							break;
					}
				}
				else {
					isSameState = true;
				}

				//同步坐席状态改变时间
				if (dataJsonNode.StateStartTime != undefined && dataJsonNode.StateStartTime != null && dataJsonNode.StateStartTime != "") {
					try {
						var StateStartTime = OcxCore.utils.stringToDate(dataJsonNode.StateStartTime);
						if (StateStartTime != null) {
							AgentData.setChangeStateDate(StateStartTime);
						}
					} catch (e) {

					}
				}

				//监控中断开，一些坐席的状态改变收不到，重连后发送开始监控指令，同步所有的坐席状态。
				if (state.IsCheckin() && AgentData.getCTIMonitorGroupId() != null && AgentData.getCTIMonitorGroupId() != 0) {
					//BeginMonitor//开始监控
					var result = OcxCore.cti.CTIServerImpl.CommonAction("BeginMonitor", state.getExtNumber(), state.getCompanyId(), AgentData.getCTIMonitorGroupId());
					OcxCore.Log.debug(OcxCore.utils.stringFormat("重连后发送开始监控指令，同步所有的坐席状态: Action = {0} , Result={1}, GroupId={2}", "BeginMonitor" + ":" + "开始监控", result, AgentData.getCTIMonitorGroupId()));
				}
				if (isSameState) {
					var tmpMsg = OcxCore.utils.stringFormat("签入会话一致，重新加载登录信息成功，当前坐席状态 ：{0} ", OcxCore.Enums.GetName(OcxCore.Enums.CTIAgentStatusFlag, state.getCTIAgentStatus()));
					jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, tmpMsg, null);
					state.GetGlobal("onReloadInfoRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//断开自动重新加载登录信息响应回调函数
					OcxCore.Log.trace(tmpMsg);
					return;
				}
			}
			var EndFlagStr = "";
			//同步事后忙闲状态
			if (dataJsonNode.EndFlag != undefined) {
				var EndFlag = parseInt(dataJsonNode.EndFlag);
				if (EndFlag == 1)//事后忙
				{
					AgentData.btnBusyAfter_click();
					EndFlagStr = "事后忙";
				}
				else {
					AgentData.btnFreeAfter_click();
					EndFlagStr = "事后闲";
				}
			}
			var tmpMsg = OcxCore.utils.stringFormat("签入会话一致，重新加载登录信息成功，当前坐席状态 ：{0}  事后标识：{1} ", OcxCore.Enums.GetName(OcxCore.Enums.CTIAgentStatusFlag, state.getCTIAgentStatus()), EndFlagStr);
			OcxCore.Log.trace(tmpMsg);
			//标记动作
			AgentData.setCTIAgentOption(OptionFlag);
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
			//String OpID = CTIAgentServerImpl.getInstance().SaveCtiOption(AgentData.getUserCode(),String.valueOf(ExtNumber), OptionFlag, OcxCore.utils.getNowDate(), null, AgentData.getCompanyId(), "", null);
			//AgentData.setPreOptionID(OpID);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, tmpMsg, null);
			state.GetGlobal("onReloadInfoRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//断开自动重新加载登录信息响应回调函数


			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OptionFlag, OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			//SendCompScopeUserStateChanged(null, AgentData);

			if (state.getCTIAgentStatus() == OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex() && OcxCore.Session.getAutoReCheckin()) {
				OcxCore.Log.trace("CTI中间件自动切换LINK连接并自动签入中...");
				OcxCore.Session.Checkin();
			}
		}
		else {
			switch (Ret) {
				case 1:// 数据库错误
					msg = "数据库错误";
					break;
				case 2:// 物理地址绑定错误
					msg = "物理地址绑定错误";
					break;
				case 3:// 分机错误
					msg = "分机错误";
					break;
				case 4:// 坐席信息错误
					msg = "坐席信息错误";
					break;
				case 5:// 坐席认证错误
					msg = "坐席认证错误";
					break;
				case 6:// CTI服务器错误
					msg = "CTI服务器错误";
					break;
				case 7://已登录 
					msg = "此分机已登录";
					break;
				case 999:// 其他错误
					msg = "其他错误";
					break;
			}
			OcxCore.Log.trace("签入会话不一致，重新加载登录信息失败 ：" + Ret + " " + msg);
			if (state.IsCheckin()) {
				AgentData.InitDefault();

				jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);
				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "签入超时，请重新签入", null);
				state.Send("CHECKOUT_RES", jsonMsg);
				//保存签出记录时间
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
			}
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "签入会话不一致，重新加载登录信息失败 ：" + Ret + " " + msg, null);
			state.GetGlobal("onReloadInfoRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//断开自动重新加载登录信息响应回调函数
			//关闭连接
			OcxCore.cti.CTIServerImpl.CloseConnect();

			if (Ret == 5 && OcxCore.Session.getAutoReCheckin()) {
				OcxCore.Log.trace("CTI中间件自动切换LINK连接并自动签入中...");
				setTimeout(function () {
					OcxCore.Session.Checkin();
				}, 200);
			}
		}
	}
	/**
	 * 呼出响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function MAKECALL_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			//标记动作
			//			AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_MAKECALL.getIndex());
			//			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
			//
			//			AgentData.btnOutCall_click();
			//			
			//			jsonMsg =  OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "外呼成功"); 
			//	        state.Send("RefleshUserInfoAndButton",jsonMsg);
			//	        
			//	        jsonMsg =  OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state,""); 
			//	        state.Send("CurrentUserCTIStateChanged",jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "外呼成功", null);
			state.GetGlobal("onMakeCallRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//呼出响应回调函数

			//保存操作记录
			//	        OcxCommandFun.SaveCtiOption(state.getUserCode(),state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_MAKECALL.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			AgentData.HugeUpSuccessStatus();
			AgentData.getCallData().initDefault();

			if (state.getCTIAgentStatus() == OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex()) {
				//标记本次动作
				AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex());
				AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

				//保存操作记录
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			} else {
				//标记本次动作
				AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex());
				AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

				//保存操作记录
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			}

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "外呼失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "外呼失败", null);
			state.GetGlobal("onMakeCallRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//外呼响应回调函数

		}
	}
	/**
	 * 接听响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function ANSWER_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			//标记本次动作
			AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex());
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

			AgentData.btnAnswer_click();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "接听成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "接听成功", null);
			state.GetGlobal("onAnswerRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//接听响应回调函数

			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "接听失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "接听失败", null);
			state.GetGlobal("onAnswerRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//接听响应回调函数
		}
	}
	/**
	 * 挂机响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function HANGUP_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {

			var data = {};
			if (AgentData.getCallData().getReceiveStartTime() != null) {
				AgentData.getCallData().setReceiveEndTime(OcxCore.utils.getNowDate());//接听结束时间
			}
			AgentData.getCallData().setCallEndTime(OcxCore.utils.getNowDate());

			data.Caller = AgentData.getCallData().getCaller();
			data.Called = AgentData.getCallData().getCalled();
			data.CallId = AgentData.getCallData().getCallId();
			data.CustomId = AgentData.getCallData().getCustomId();
			data.GrpId = AgentData.getCallData().getGroupId();
			data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');//呼叫开始时间
			data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
			data.ReceiveEndTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveEndTime(), 'yyyy-MM-dd hh:mm:ss');//接听结束时间
			data.CallEndTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallEndTime(), 'yyyy-MM-dd hh:mm:ss');
			data.CallType = AgentData.getCallData().getCallType();//GrpId
			data.AudioFile = AgentData.getCallData().getAudioFile();
			data.OtherParams = AgentData.getCallData().getOtherParams();
			data.PopTabId = AgentData.getCallData().getPopTabId();

			AgentData.HugeUpSuccessStatus();

			var isNotice = false;
			if (state.getCTIAgentStatus() == OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex()) {
				if (AgentData.getCTIAgentOption() != OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex()) {
					//标记本次动作
					AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex());
					AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

					//保存操作记录
					OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_HANGUP.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
					//保存操作记录
					OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

					isNotice = true;
				}
			} else {
				if (AgentData.getCTIAgentOption() != OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex()) {
					//标记本次动作
					AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex());
					AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

					//保存操作记录
					OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_HANGUP.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
					//保存操作记录
					OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
					isNotice = true;
				}
			}

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "挂机成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			if (isNotice) {
				jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);

				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "挂机成功", data);
				state.Send("HANGUP_RES", jsonMsg);

				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "挂机成功", data);
				state.GetGlobal("onHangupRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//挂机响应回调函数
			}

			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "挂机失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "挂机失败", null);
			state.GetGlobal("onHangupRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//挂机响应回调函数
		}
	}
	/**
	 * 示闲响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function SETIDLE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.btnFree_click();

			//标记本次动作
			AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex());
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "示闲成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "示闲成功", null);
			state.GetGlobal("onSetIdleRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//示闲响应回调函数
			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			AgentData.isSetIdleManualOperation = false;//是否为人工操作示闲动作
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "示闲失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "示闲失败", null);
			state.GetGlobal("onSetIdleRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//示闲响应回调函数
		}
	}
	/**
	 * 示忙响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function SETBUSY_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			var SubStatus = dataJsonNode.SubStatus != undefined && dataJsonNode.SubStatus != null ? dataJsonNode.SubStatus : 0;//置忙小状态
			state.setCTIAgentSubStatus(SubStatus);//置忙小状态
			AgentData.btnBusy_click();

			//标记本次动作
			AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex());
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

			var showMessage = "";
			if (state.getCTIAgentSubStatus() > 200) {
				var subStatusObj = state.getBusySubStateById(state.getCTIAgentSubStatus());
				showMessage = subStatusObj != null ? subStatusObj.getSubStateName() : "忙碌";
			}
			else {
				showMessage = "忙碌";
			}
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, showMessage + "操作成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, showMessage + "操作成功", null);
			state.GetGlobal("onSetBusyRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//示忙响应回调函数

			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			state.setCTIAgentSubStatus(0);
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "操作失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "操作失败", null);
			state.GetGlobal("onSetBusyRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//忙闲响应回调函数
		}
	}
	/**
	 * 保持响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function KEEP_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.btnHold_click();
			//标记本次动作
			AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_KEEP.getIndex());
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "保持成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "保持成功", null);
			state.GetGlobal("onKeepRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//保持响应回调函数
			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_KEEP.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "保持失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "保持失败", null);
			state.GetGlobal("onKeepRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//保持响应回调函数
		}
	}
	/**
	 * 找回响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function RETURN_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.btnGetBack_click();

			//标记本次动作
			AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex());
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "找回成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "找回成功", null);
			state.GetGlobal("onGetBackRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//找回响应回调函数

			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_RETURN.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

			//SendCompScopeUserStateChanged(null, AgentData);
		}
		else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "找回失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "找回失败", null);
			state.GetGlobal("onGetBackRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//找回响应回调函数
		}
	}
	/**
	 * 咨询响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function CONSULT_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.Consult_Button_Status();
			//标记本次动作
			AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONSULT.getIndex());
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "咨询成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "咨询成功", null);
			state.GetGlobal("onConsultRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//咨询响应回调函数

			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONSULT.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			AgentData.Talking_Button_Status();//咨询失败时还原回通话时的按钮状态
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "咨询失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "咨询失败", null);
			state.GetGlobal("onConsultRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//咨询响应回调函数
		}
	}
	/**
	 * 转移响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function TRANSFER_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.HugeUpSuccessStatus();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "转移成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "转移成功", null);
			state.GetGlobal("onTransferRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//转移响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_TRANSFER.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);

			if (state.getCTIAgentStatus() == OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex()) {
				//标记本次动作
				AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex());
				AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
				//保存操作记录
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			} else {
				//标记本次动作
				AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex());
				AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
				//保存操作记录
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			}

			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "转移失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "转移失败", null);
			state.GetGlobal("onTransferRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//转移响应回调函数
		}
	}
	/**
	 * 会议响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function CONFERENCE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {

			AgentData.Conference_Button_Status();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			if (AgentData.getCTIMonitorExtNumber() != null && AgentData.getCTIMonitorExtNumber().length > 0) {
				var msg = "被监控坐席分机：" + AgentData.getCTIMonitorExtNumber();
				//标记本次动作
				AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_MONITERCONF.getIndex());
				AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

				AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.CONF.getIndex());

				var data = {};
				if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
					var seatAtentSate = parseInt(AgentData.getCTIMonExtNumAtentState());//坐席分机原始状态码
					var nbtnsNode = MonitorStateButtonStatus(seatAtentSate, AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
					data.MonitorButton = nbtnsNode;
				}

				data.CommandID = "MonitorOptionRes";
				data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
				data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
				data.CloseMonitorDialog = false;
				AgentData.setCTIMonitorExtNumber("");

				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "监控会议成功", data);
				state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

				jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);

				//保存操作记录
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_MONITERCONF.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			} else {
				//标记本次动作
				AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONFERENCE.getIndex());
				AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

				jsonMsg = OcxCore.cti.CTIServerImpl.generateStateChangedJsonMsgData(state, "会议成功");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);

				//保存操作记录
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONFERENCE.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			}

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "会议成功", null);
			state.GetGlobal("onConferenceRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//会议响应回调函数

		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "会议失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "会议失败", null);
			state.GetGlobal("onConferenceRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//会议响应回调函数
		}
	}
	/**
	 * 监听响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function LISTEN_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			var msg = "被监控坐席分机：" + AgentData.getCTIMonitorExtNumber();
			//标记本次动作
			AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_LISTEN.getIndex());
			AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
			//保存本次操作记录时间
			//OcxCommandFun.SaveCtiOption(state.getUserCode(),ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_LISTEN.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), msg, null);

			AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.LISTEN.getIndex());
			var data = {};
			if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
				var seatAtentSate = parseInt(AgentData.getCTIMonExtNumAtentState());//坐席分机原始状态码
				var nbtnsNode = MonitorStateButtonStatus(seatAtentSate, AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
				data.MonitorButton = nbtnsNode;
			}
			var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//被监控坐席呼叫ID
			AgentData.getCallData().setCallId(CallId);

			data.CommandID = "MonitorOptionRes";
			data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
			data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
			data.CloseMonitorDialog = false;

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "监听成功", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "监听成功", null);
			state.GetGlobal("onListenRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//监听响应回调函数

			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LISTEN.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), msg, null);

		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "监听失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "监听失败", null);
			state.GetGlobal("onListenRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//监听响应回调函数
		}
	}
	/**
	 * 停止监听响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function STOPLISTEN_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.setCTIAgentOption(null);
			AgentData.setPreOptionDate(null);
			AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex());
			var data = {};
			if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
				var seatAtentSate = parseInt(AgentData.getCTIMonExtNumAtentState());//坐席分机原始状态码
				var nbtnsNode = MonitorStateButtonStatus(seatAtentSate, AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
				data.MonitorButton = nbtnsNode;
			}

			data.CommandID = "MonitorOptionRes";
			data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
			data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
			data.CloseMonitorDialog = false;
			AgentData.setCTIMonitorExtNumber("");

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "停止监听成功", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "停止监听成功", null);
			state.GetGlobal("onStopListenRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//停止监听响应回调函数
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "停止监听失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "停止监听失败", null);
			state.GetGlobal("onStopListenRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//停止监听响应回调函数
		}
	}
	/**
	 * 强插响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function FORCEENTER_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.setCTIAgentOption(null);
			AgentData.setPreOptionDate(null);
			var msg = "被监控坐席分机：" + AgentData.getCTIMonitorExtNumber();


			AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.INSERT.getIndex());
			var data = {};
			if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
				var seatAtentSate = parseInt(AgentData.getCTIMonExtNumAtentState());//坐席分机原始状态码
				var nbtnsNode = MonitorStateButtonStatus(seatAtentSate, AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
				data.MonitorButton = nbtnsNode;
			}

			data.CommandID = "MonitorOptionRes";
			data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
			data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
			data.CloseMonitorDialog = false;

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强插成功", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强插成功", null);
			state.GetGlobal("onForceEnterRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//强插响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_FORCEENTER.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), msg, null);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "强插失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "强插失败", null);
			state.GetGlobal("onForceEnterRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//强插响应回调函数
		}
	}
	/**
	 * 强拆响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function FORCEREMOVE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.setCTIAgentOption(null);
			AgentData.setPreOptionDate(null);
			var msg = "被监控坐席分机：" + AgentData.getCTIMonitorExtNumber();

			AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex());
			var data = {};
			if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
				var seatAtentSate = parseInt(AgentData.getCTIMonExtNumAtentState());//坐席分机原始状态码
				var nbtnsNode = MonitorStateButtonStatus(seatAtentSate, AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
				data.MonitorButton = nbtnsNode;
			}

			data.CommandID = "MonitorOptionRes";
			data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
			data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
			data.CloseMonitorDialog = true;
			AgentData.setCTIMonitorExtNumber("");

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强拆成功", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强拆成功", null);
			state.GetGlobal("onForceRemoveRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//强拆响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_FORCEREMOVE.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), msg, null);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "强拆失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "强拆失败", null);
			state.GetGlobal("onForceRemoveRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//强拆响应回调函数
		}
	}
	/**
	 * 强制示闲响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function FORCESETIDLE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.setCTIAgentOption(null);
			AgentData.setPreOptionDate(null);
			var msg = "被监控坐席分机：" + AgentData.getCTIMonitorExtNumber();

			AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex());
			var data = {};
			if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
				var seatAtentSate = parseInt(AgentData.getCTIMonExtNumAtentState());//坐席分机原始状态码
				var nbtnsNode = MonitorStateButtonStatus(seatAtentSate, AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
				data.MonitorButton = nbtnsNode;
			}

			data.CommandID = "MonitorOptionRes";
			data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
			data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
			data.CloseMonitorDialog = false;
			AgentData.setCTIMonitorExtNumber("");

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强制示闲成功", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强制示闲成功", null);
			state.GetGlobal("onForceSetIdleRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//强制示闲响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_FORCESETFREE.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), msg, null);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "强制示闲失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "强制示闲失败", null);
			state.GetGlobal("onForceSetIdleRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//强制示闲响应回调函数
		}
	}
	/**
	 * 强制示忙响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function FORCESETBUSY_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.setCTIAgentOption(null);
			AgentData.setPreOptionDate(null);
			var msg = "被监控坐席分机：" + AgentData.getCTIMonitorExtNumber();

			AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex());
			var data = {};
			if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
				var seatAtentSate = parseInt(AgentData.getCTIMonExtNumAtentState());//坐席分机原始状态码
				var nbtnsNode = MonitorStateButtonStatus(seatAtentSate, AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
				data.MonitorButton = nbtnsNode;
			}

			data.CommandID = "MonitorOptionRes";
			data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
			data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
			data.CloseMonitorDialog = false;
			AgentData.setCTIMonitorExtNumber("");

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强制示忙成功", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强制示忙成功", null);
			state.GetGlobal("onForceSetBusyRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//强制示忙响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_FORCESETBUSY.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), msg, null);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "强制示忙失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "强制示忙失败", null);
			state.GetGlobal("onForceSetBusyRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//强制示忙响应回调函数
		}
	}
	/**
	 * 停止监控会议响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function STOPMONCONF_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.setCTIAgentOption(null);
			AgentData.setPreOptionDate(null);

			AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex());
			var data = {};
			if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
				var seatAtentSate = parseInt(AgentData.getCTIMonExtNumAtentState());//坐席分机原始状态码
				var nbtnsNode = MonitorStateButtonStatus(seatAtentSate, AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
				data.MonitorButton = nbtnsNode;
			}

			data.CommandID = "MonitorOptionRes";
			data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
			data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
			data.CloseMonitorDialog = false;
			AgentData.setCTIMonitorExtNumber("");

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "停止监控会议成功", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "停止监控会议成功", null);
			state.GetGlobal("onStopMonitorConfRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//停止监控会议响应回调函数
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "停止监控会议失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "停止监控会议失败", null);
			state.GetGlobal("onStopMonitorConfRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//停止监控会议响应回调函数
		}
	}
	/**
	 * 退出会议响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function STOPCONFERENCE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex());
			AgentData.setCTIMonitorExtNumber("");

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "退出会议成功", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "退出会议成功", null);
			state.GetGlobal("onStopConferenceRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//退出会议响应回调函数
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "退出会议失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "退出会议失败", null);
			state.GetGlobal("onStopConferenceRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//退出会议响应回调函数
		}
	}
	/**
	 * 事后忙响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function ENDBUSY_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.btnBusyAfter_click();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "事后忙成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "事后忙成功", null);
			state.GetGlobal("onEndBusyRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//事后忙响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_ENDBUSY.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "事后忙失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "事后忙失败", null);
			state.GetGlobal("onEndBusyRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//事后忙响应回调函数
		}
	}
	/**
	 * 事后闲响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function ENDIDLE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.btnFreeAfter_click();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "事后闲成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "事后闲成功", null);
			state.GetGlobal("onEndIdleRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//事后闲响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_ENDFREE.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);

			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "事后闲失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "事后闲失败", null);
			state.GetGlobal("onEndIdleRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//事后忙响应回调函数
		}
	}

	/**
	 * 开始监控响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function BEGINMONITOR_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		var msg = "";
		if (Ret == 0) {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "开始监控成功", null);
			state.GetGlobal("onBeginMonitorRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//开始监控响应回调函数
		} else {
			switch (Ret) {
				case 8:
					msg = "已开启监控，无需重复开启";
					break;
				case 9:
					msg = "监控未开始，无需停止";
					break;
				case 10:
					msg = "不能停止他人的监控";
					break;
				case 11:
					msg = "超出最大监控人数";
					break;
				case 999:
					msg = "其他错误";
					break;
			}
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "监控操作失败：" + msg);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "监控操作失败：" + msg, null);
			state.GetGlobal("onBeginMonitorRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//开始监控响应回调函数
		}
	}

	/**
	 * 停止监控响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function STOPMONITOR_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		var msg = "";
		if (Ret == 0) {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "停止监控成功", null);
			state.GetGlobal("onStopMonitorRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//停止监控响应回调函数
		} else {
			switch (Ret) {
				case 9:
					msg = "监控未开始，无需停止";
					break;
				case 10:
					msg = "不能停止他人的监控";
					break;
				case 999:
					msg = "其他错误";
					break;
			}
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "停止监控操作失败：" + msg);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "停止监控操作失败：" + msg, null);
			state.GetGlobal("onStopMonitorRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//停止监控响应回调函数
		}
	}

	/**
	 * 设置坐席配置信息响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function SETSEATINFO_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "同步坐席配置到CTI服务器成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "同步坐席配置到CTI服务器成功", null);
			state.GetGlobal("onSetSeatInfoRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//设置坐席配置信息响应回调函数
			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_SETSEATINFO.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "同步坐席配置到CTI服务器失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "同步坐席配置到CTI服务器失败", null);
			state.GetGlobal("onSetSeatInfoRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//设置坐席配置信息响应回调函数
		}
	}

	/**
	 * 离开响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function LEAVEMODE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.btnLeaveMode_click();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "离开成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "离开成功", null);
			state.GetGlobal("onLeaveModeRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//离开响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_LEAVEMODE.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "离开失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "离开失败", null);
			state.GetGlobal("onLeaveModeRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//离开响应回调函数
		}
	}

	/**
	 * 恢复响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function NORMALMODE_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.btnNormalMode_click();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "恢复成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "恢复成功", null);
			state.GetGlobal("onNormalModeRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//恢复响应回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_NORMALMODE.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "恢复失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "恢复失败", null);
			state.GetGlobal("onNormalModeRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//恢复响应回调函数
		}
	}

	/**
	 * 转IVR响应
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function OPERATIONINCALL_RES(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (Ret == 0) {
			AgentData.getBtnConsult().Reset(false, false);
			AgentData.getBtnHold().Reset(false, false);
			AgentData.getBtnOperationInCall().Reset(false, false);//转IVR

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "转IVR成功");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "转IVR成功", null);
			state.GetGlobal("onOperationInCallRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//转IVR回调函数

			//保存本次操作记录时间
			OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_NORMALMODE.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
			//SendCompScopeUserStateChanged(null, AgentData);
		} else {
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "转IVR失败");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(false, "-1", Ret, "转IVR失败", null);
			state.GetGlobal("onOperationInCallRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//转IVR响应回调函数
		}
	}

	//-------------------通知处理  Start------------------
	/**
	 * 呼出通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function CALLOUT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//标记本次动作
		AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex());
		AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

		var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
		var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
		var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//呼叫ID
		var CustomId = dataJsonNode.CustomId != undefined ? dataJsonNode.CustomId : "";//客户ID（任务清单ID）
		var CallType = dataJsonNode.CallType != undefined ? dataJsonNode.CallType : null;//呼叫类型 1 呼出  2 预测外呼 3自动外呼  4手动外呼
		var AudioFile = dataJsonNode.AudioFile != undefined ? dataJsonNode.AudioFile : "";//录音路径(相对路径)

		var realCalledPhone = Called;//还原真实的被叫号码，手机号码不带0不带9
		//还原真实的被叫号码，手机号码不带0不带9
		if (OcxCore.Config.CanShowRealPhone && realCalledPhone.length == 12 && realCalledPhone.indexOf('0') == 0 && OcxCore.validator.isMobile(realCalledPhone.substr(1))) {
			realCalledPhone = realCalledPhone.substr(1);
		}
		AgentData.getLblCaller().setText(Caller);
		AgentData.getLblCalled().setText(realCalledPhone);
		AgentData.getLblCallNumber().setText(realCalledPhone);

		AgentData.getCallData().setCaller(Caller);
		AgentData.getCallData().setCalled(realCalledPhone);
		AgentData.getCallData().setCallId(CallId);
		AgentData.getCallData().setCustomId(CustomId);
		if (AgentData.getCallData().getCallTime() == null) {
			AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
		}
		AgentData.getCallData().setReceiveStartTime(OcxCore.utils.getNowDate());//接听开始时间
		AgentData.getCallData().setGroupId(null);
		AgentData.getCallData().setAudioFile(AudioFile);//录音路径(相对路径)

		state.setLastCallId(CallId);//最后一通电话呼叫ID
		//判断之前有没有弹过外呼屏，通过判断CallType是否为默认0来识别
		var hasCallOutPop = false;
		if (AgentData.getCallData().getCallType() > 0 && OcxCore.validator.isNotNull(AgentData.getCallData().getPopTabId())) {
			hasCallOutPop = true;
		}
		if (OcxCore.validator.isNotNull(CallType)) {
			AgentData.getCallData().setCallType(CallType);
		}
		else if (AgentData.getCallData().getCallType() == 0) {
			AgentData.getCallData().setCallType(1);//外呼
		}

		if (OcxCore.validator.isNull(AgentData.getCallData().getPopTabId())) {
			var popTabId = OcxCore.validator.isNotNull(CallId) ? CallId : OcxCore.Utility.GetUUID();
			AgentData.getCallData().setPopTabId(popTabId);
		}
		//AgentData.getCallData().setCallsCount(AgentData.getCallData().getCallsCount()+1);
		AgentData.Talking_Button_Status();

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
		state.Send("CurrentUserCTIStateChanged", jsonMsg);
		//当配置为呼出通话后才弹屏或为预测外呼时，收到呼出通知就弹屏
		if (state.getShowCallOutPopOnTalking() == true || AgentData.getCallData().getCallType() == 2 || OcxCore.Config.EnableCallIdNotify == false || !hasCallOutPop) {
			var data = {};
			data.Caller = Caller;
			data.Called = realCalledPhone;
			data.CallId = CallId;
			data.CustomId = CustomId;
			data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');
			data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
			data.ReceiveEndTime = null;//接听结束时间
			data.CallEndTime = null;//呼叫结束时间
			data.CallType = AgentData.getCallData().getCallType();
			data.AudioFile = AudioFile;
			data.OtherParams = AgentData.getCallData().getOtherParams();
			data.PopTabId = AgentData.getCallData().getPopTabId();
			data.CustomerId = AgentData.getCallData().getCustomerId();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "呼出弹屏通知", data);
			AgentData.setPopCallDataCache(null);
			state.Send("CALLOUT_NOTIFY", jsonMsg);
		}

		var data = {};
		data.Caller = Caller;
		data.Called = realCalledPhone;
		data.CallId = CallId;
		data.CustomId = CustomId;
		data.GrpId = 0;
		data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');
		data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
		data.ReceiveEndTime = null;//接听结束时间
		data.CallEndTime = null;//呼叫结束时间
		data.CallType = AgentData.getCallData().getCallType();
		data.AudioFile = AudioFile;
		data.PopTabId = AgentData.getCallData().getPopTabId();

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "通话通知", data);
		state.Send("TALKING_NOTIFY", jsonMsg);

		//保存操作记录
		OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

		//SendCompScopeUserStateChanged(null, AgentData);
	}
	/**
	 * 呼出CALLID通知(只有Web拨打才发送，座机拨打不发送)
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function CALLID_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//呼叫ID

		AgentData.getCallData().setCallId(CallId);
		AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
		AgentData.getCallData().setGroupId(null);

		AgentData.setPopCallDataCache(null);

		state.setLastCallId(CallId);//最后一通电话呼叫ID
		//标记动作
		AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_MAKECALL.getIndex());
		AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

		AgentData.btnOutCall_click();

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "外呼成功");
		//将当前状态临时标记为正在呼叫
		jsonMsg.LabelsInfo.currentStatus.Text = "正在呼叫";
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
		state.Send("CurrentUserCTIStateChanged", jsonMsg);

		//保存操作记录
		OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_MAKECALL.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);

		//拨外线才弹屏 AgentData.getCallData().getDialFlag() == 1  && 
		if (state.getShowCallOutPopOnTalking() == false) {
			//主被叫为空则不弹屏
			if (OcxCore.validator.isNull(AgentData.getCallData().getCaller()) && OcxCore.validator.isNull(AgentData.getCallData().getCalled())) {
				return;
			}
			if (OcxCore.validator.isNull(AgentData.getCallData().getCallType()) || AgentData.getCallData().getCallType() == 0) {
				AgentData.getCallData().setCallType(1);//外呼
			}
			if (OcxCore.validator.isNull(AgentData.getCallData().getPopTabId())) {
				var popTabId = OcxCore.validator.isNotNull(CallId) ? CallId : OcxCore.Utility.GetUUID();
				AgentData.getCallData().setPopTabId(popTabId);
			}
			var data = {};
			data.Caller = AgentData.getCallData().getCaller();
			data.Called = AgentData.getCallData().getCalled();
			data.CallId = AgentData.getCallData().getCallId();
			data.CustomId = AgentData.getCallData().getCustomId();
			data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');
			data.ReceiveStartTime = null;//接听开始时间
			data.ReceiveEndTime = null;//接听结束时间
			data.CallEndTime = null;//呼叫结束时间
			data.CallType = AgentData.getCallData().getCallType();
			data.AudioFile = "";
			data.OtherParams = AgentData.getCallData().getOtherParams();
			data.PopTabId = AgentData.getCallData().getPopTabId();
			data.CustomerId = AgentData.getCallData().getCustomerId();

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "呼出弹屏通知", data);

			state.Send("CALLOUT_NOTIFY", jsonMsg);
		}
	}

	/**
	 * 呼入通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function CALLALERTING_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//标记本次动作
		AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLIN.getIndex());
		AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

		var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
		var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
		var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//呼叫ID
		var CustomId = dataJsonNode.CustomId != undefined ? dataJsonNode.CustomId : "";//客户ID（任务清单ID）
		var GrpId = dataJsonNode.GrpId != undefined ? dataJsonNode.GrpId : "";//队列ID
		var IVRPath = dataJsonNode.IVRPath != undefined ? dataJsonNode.IVRPath : "";//IVR路径
		AgentData.getLblCaller().setText(Caller);
		AgentData.getLblCalled().setText(Called);
		AgentData.getLblCallNumber().setText(Caller);

		AgentData.getCallData().setCaller(Caller);
		AgentData.getCallData().setCalled(Called);
		AgentData.getCallData().setCallId(CallId);
		AgentData.getCallData().setCustomId(CustomId);
		if (OcxCore.validator.isInt(GrpId))
			AgentData.getCallData().setGroupId(parseInt(GrpId));
		else
			AgentData.getCallData().setGroupId(null);
		AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
		AgentData.getCallData().setCallType(0);//呼入
		AgentData.getCallData().setIVRPath(IVRPath);
		var popTabId = OcxCore.validator.isNotNull(CallId) ? CallId : OcxCore.Utility.GetUUID();
		AgentData.getCallData().setPopTabId(popTabId);

		state.setLastCallId(CallId);//最后一通电话呼叫ID
		//AgentData.getCallData().setCallsCount(AgentData.getCallData().getCallsCount()+1);
		AgentData.CallIn_Button_Status();
		var data = {};
		data.Caller = Caller;
		data.Called = Called;
		data.CallId = CallId;
		data.CustomId = CustomId;
		data.GrpId = GrpId;
		data.IVRPath = IVRPath;
		data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');
		data.ReceiveStartTime = null;//接听开始时间
		data.ReceiveEndTime = null;//接听结束时间
		data.CallEndTime = null;//呼叫结束时间
		data.CallType = AgentData.getCallData().getCallType();
		data.AudioFile = "";
		data.OtherParams = AgentData.getCallData().getOtherParams();
		data.PopTabId = AgentData.getCallData().getPopTabId();
		if(dataJsonNode.Data != undefined) data.Data = dataJsonNode.Data;

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateStateChangedJsonMsgData(state, "");
		state.Send("CurrentUserCTIStateChanged", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "呼入弹屏通知", data);
		AgentData.setPopCallDataCache(null);
		//判断呼入时是否通话后才弹屏，如果是则暂存通话数据，等通话通知后再弹屏
		if (state.getShowCallInPopOnTalking()) {
			//暂存的待弹屏呼叫数据，用于处理通话后才弹屏时传的通话参数
			AgentData.setPopCallDataCache({ CommandID: "CALLALERTING_NOTIFY", Data: jsonMsg });
			state.Send("ShowCallInNotice", jsonMsg);//调用显示来电提醒函数
		}
		else {
			state.Send("ShowCallInNotice", jsonMsg);//调用显示来电提醒函数
			state.Send("CALLALERTING_NOTIFY", jsonMsg);//调用来电弹屏函数
		}

		//保存操作记录
		OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLIN.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
	}
	/**
	 * 通话通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function TALKING_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//标记本次动作
		AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex());
		AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

		var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
		var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
		var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : AgentData.getCallData().getCallId();//呼叫ID
		var CustomId = dataJsonNode.CustomId != undefined ? dataJsonNode.CustomId : AgentData.getCallData().getCustomId();//客户ID（任务清单ID）
		var GrpId = dataJsonNode.GrpId != undefined ? dataJsonNode.GrpId : AgentData.getCallData().getGroupId();//队列ID
		var AudioFile = dataJsonNode.AudioFile != undefined ? dataJsonNode.AudioFile : "";//录音路径(相对路径)

		var realCalledPhone = Called;//还原真实的被叫号码，手机号码不带0不带9
		//还原真实的被叫号码，手机号码不带0不带9
		if (OcxCore.Config.CanShowRealPhone && realCalledPhone.length == 12 && realCalledPhone.indexOf('0') == 0 && OcxCore.validator.isMobile(realCalledPhone.substr(1))) {
			realCalledPhone = realCalledPhone.substr(1);
		}
		AgentData.getLblCaller().setText(Caller);
		AgentData.getLblCalled().setText(realCalledPhone);

		AgentData.getCallData().setCaller(Caller);
		AgentData.getCallData().setCalled(realCalledPhone);
		AgentData.getCallData().setCallId(CallId);
		AgentData.getCallData().setCustomId(CustomId);
		if (OcxCore.validator.isInt(GrpId))
			AgentData.getCallData().setGroupId(parseInt(GrpId));
		else
			AgentData.getCallData().setGroupId(null);
		if (AgentData.getCallData().getCallTime() == null) {
			AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
		}
		if (AgentData.getCallData().getReceiveStartTime() == null) {
			AgentData.getCallData().setReceiveStartTime(OcxCore.utils.getNowDate());//接听开始时间
		}
		AgentData.getCallData().setAudioFile(AudioFile);//录音路径(相对路径)
		var popTabId = OcxCore.validator.isNotNull(CallId) ? CallId : OcxCore.Utility.GetUUID();
		AgentData.getCallData().setPopTabId(popTabId);

		state.setLastCallId(CallId);//最后一通电话呼叫ID
		//AgentData.getCallData().setCallsCount(AgentData.getCallData().getCallsCount()+1);
		AgentData.Talking_Button_Status();
		var data = {};
		data.Caller = Caller;
		data.Called = realCalledPhone;
		data.CallId = CallId;
		data.CustomId = CustomId;
		data.GrpId = GrpId;
		data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');
		data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
		data.ReceiveEndTime = null;//接听结束时间
		data.CallEndTime = null;//呼叫结束时间
		data.CallType = AgentData.getCallData().getCallType();
		data.AudioFile = AudioFile;
		data.PopTabId = AgentData.getCallData().getPopTabId();


		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateStateChangedJsonMsgData(state, "");
		state.Send("CurrentUserCTIStateChanged", jsonMsg);

		//判断通话时是否有暂存的待弹屏呼叫数据，如果有则弹屏
		var popCallDataCache = AgentData.getPopCallDataCache();
		if (popCallDataCache != null) {
			popCallDataCache.Data.AudioFile = AudioFile;
			popCallDataCache.Data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
			popCallDataCache.Data.ReceiveEndTime = null;//接听结束时间
			popCallDataCache.Data.CallEndTime = null;//呼叫结束时间
			state.Send(popCallDataCache.CommandID, popCallDataCache.Data);
		}
		AgentData.setPopCallDataCache(null);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "通话通知", data);
		state.Send("TALKING_NOTIFY", jsonMsg);

		//保存操作记录
		OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
	}
	/**
	 * 内线被转移通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function TRANSFERSEAT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//标记本次动作
		AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex());
		AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

		var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
		var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
		var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//呼叫ID
		var CustomId = dataJsonNode.CustomId != undefined ? dataJsonNode.CustomId : "";//客户ID（任务清单ID）
		var GrpId = dataJsonNode.GrpId != undefined ? dataJsonNode.GrpId : "";//队列ID
		var CallType = dataJsonNode.CallType != undefined ? dataJsonNode.CallType : "";//呼叫类型
		var AudioFile = dataJsonNode.AudioFile != undefined ? dataJsonNode.AudioFile : "";//录音路径(相对路径)
		var realCalledPhone = Called;//还原真实的被叫号码，手机号码不带0不带9
		//还原真实的被叫号码，手机号码不带0不带9
		if (OcxCore.Config.CanShowRealPhone && realCalledPhone.length == 12 && realCalledPhone.indexOf('0') == 0 && OcxCore.validator.isMobile(realCalledPhone.substr(1))) {
			realCalledPhone = realCalledPhone.substr(1);
		}
		AgentData.getLblCaller().setText(Caller);
		AgentData.getLblCalled().setText(realCalledPhone);
		AgentData.getLblCallNumber().setText(realCalledPhone);

		AgentData.getCallData().setCaller(Caller);
		AgentData.getCallData().setCalled(realCalledPhone);
		AgentData.getCallData().setCallId(CallId);
		AgentData.getCallData().setCustomId(CustomId);
		if (OcxCore.validator.isInt(GrpId))
			AgentData.getCallData().setGroupId(parseInt(GrpId));
		else
			AgentData.getCallData().setGroupId(null);
		if (OcxCore.validator.isInt(CallType))
			AgentData.getCallData().setCallType(parseInt(CallType));

		AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
		AgentData.getCallData().setReceiveStartTime(OcxCore.utils.getNowDate());//接听开始时间
		AgentData.getCallData().setAudioFile(AudioFile);//录音路径(相对路径)
		var popTabId = OcxCore.validator.isNotNull(CallId) ? CallId : OcxCore.Utility.GetUUID();
		AgentData.getCallData().setPopTabId(popTabId);

		state.setLastCallId(CallId);//最后一通电话呼叫ID
		//AgentData.getCallData().setCallsCount(AgentData.getCallData().getCallsCount()+1);
		AgentData.Talking_Button_Status();
		var data = {};
		data.Caller = Caller;
		data.Called = realCalledPhone;
		data.CallId = CallId;
		data.CustomId = CustomId;
		data.GrpId = GrpId;
		data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');
		data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
		data.ReceiveEndTime = null;//接听结束时间
		data.CallEndTime = null;//呼叫结束时间
		data.CallType = AgentData.getCallData().getCallType();
		data.AudioFile = AudioFile;
		data.PopTabId = AgentData.getCallData().getPopTabId();

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateStateChangedJsonMsgData(state, "");
		state.Send("CurrentUserCTIStateChanged", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "内线被转移通知", data);
		state.Send("TRANSFERSEAT_NOTIFY", jsonMsg);

		//保存操作记录
		OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
	}
	/**
	 * 坐席呼坐席通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function SEATCALLSEAT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//标记本次动作
		AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLIN.getIndex());
		AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

		var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
		var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
		var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//呼叫ID

		AgentData.getLblCaller().setText(Caller);
		AgentData.getLblCalled().setText(Called);
		AgentData.getLblCallNumber().setText(Called);

		AgentData.getCallData().setCaller(Caller);
		AgentData.getCallData().setCalled(Called);
		AgentData.getCallData().setCallId(CallId);
		AgentData.getCallData().setCustomId("");
		AgentData.getCallData().setGroupId(null);
		AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
		AgentData.getCallData().setCallType(0);
		var popTabId = OcxCore.validator.isNotNull(CallId) ? CallId : OcxCore.Utility.GetUUID();
		AgentData.getCallData().setPopTabId(popTabId);
		AgentData.getCallData().setDialFlag(2);//1外线 2内线

		state.setLastCallId(CallId);//最后一通电话呼叫ID
		//AgentData.getCallData().setCallsCount(AgentData.getCallData().getCallsCount()+1);

		AgentData.CallIn_Button_Status();
		var data = {};
		data.Caller = Caller;
		data.Called = Called;
		data.CallId = CallId;
		data.CustomId = "";
		data.GrpId = "";
		data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');
		data.ReceiveStartTime = null;//接听开始时间
		data.ReceiveEndTime = null;//接听结束时间
		data.CallEndTime = null;//呼叫结束时间
		data.CallType = AgentData.getCallData().getCallType();
		data.PopTabId = AgentData.getCallData().getPopTabId();

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateStateChangedJsonMsgData(state, "");
		state.Send("CurrentUserCTIStateChanged", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "坐席呼坐席通知", data);
		state.Send("ShowCallInNotice", jsonMsg);//调用显示来电提醒函数
		state.Send("SEATCALLSEAT_NOTIFY", jsonMsg);

		//保存操作记录
		OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
	}
	/**
	 * 技能组信息通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function GRPINFO_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//技能组数组
		var grpNodes = dataJsonNode.Data != undefined ? dataJsonNode.Data : [];
		var data = {};
		data.CommandID = "GRPINFO_NOTIFY";
		data.Data = grpNodes;

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "技能组信息通知", data);
		state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);
	}
	/**
	 * 咨询坐席状态通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function CONSULTSTATE_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//坐席数组
		var seatNodes = dataJsonNode.Data != undefined ? dataJsonNode.Data : [];
		var arrayNode = new Array();
		for (var i = 0; i < seatNodes.length; i++) {
			var itemNode = seatNodes[i];
			//排除本身
			if (AgentData != null && itemNode.Seat == state.getExtNumber()) {
				continue;
			}
			var objNode = {};
			objNode.Seat = itemNode.Seat;
			objNode.JobNum = itemNode.JobNum;
			objNode.Name = itemNode.Name;

			var atentSate = itemNode.State;//坐席分机原始状态码
			var seatState = OcxCore.Enums.CTIAtentStatusFlag.TransferAtentStatus(atentSate);//坐席状态
			objNode.State = seatState;
			objNode.SubState = 0;
			objNode.StateStartTime = itemNode.StateStartTime != undefined ? itemNode.StateStartTime : "";
			//			AccountState as = SessionManagement.getInstance().GetAccountState(objNode.JobNum").asText());
			var photoPath = "";

			//			if(as != null)
			//			{
			//				photoPath = as.getCTIAgentData().getAccountInfo().getPhotograph();
			//				objNode.Gender = as.getCTIAgentData().getAccountInfo().getGender());
			//				if(as.getCTIAgentData().getChangeStateDate() != null)
			//				{
			//					int diffSeconds = DateTimeHelper.DiffSeconds(as.getCTIAgentData().getChangeStateDate(), OcxCore.utils.getNowDate());
			//					objNode.ChangeStateDuration = diffSeconds);
			//				}else
			//				{
			//					objNode.ChangeStateDuration = "");
			//				}
			//			}else
			//			{
			objNode.Gender = itemNode.Gender != undefined ? itemNode.Gender : "女";
			objNode.ChangeStateDuration = "";
			//			}
			if (objNode.StateStartTime != null && objNode.StateStartTime != "") {
				var diffSeconds = 0;
				try {
					var date1 = new Date(Date.parse(objNode.StateStartTime.replace(/-/g, "/")));
					var date3 = OcxCore.utils.getNowDate().getTime() - date1.getTime();  //时间差的毫秒数
					diffSeconds = Math.round(date3 / 1000);
				} catch (e) {

				}
				objNode.ChangeStateDuration = diffSeconds;
			} else {
				objNode.ChangeStateDuration = "";
			}
			objNode.Photograph = photoPath;
			arrayNode.push(objNode);
		}

		var data = {};
		data.CommandID = "CONSULTSTATE_NOTIFY";
		data.Data = arrayNode;

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "咨询坐席状态通知", data);
		state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);
	}
	/**
	 * 监控坐席状态通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function MONITORSTATE_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//坐席数组
		var seatNodes = dataJsonNode.Data != undefined ? dataJsonNode.Data : [];
		var arrayNode = new Array();
		for (var i = 0; i < seatNodes.length; i++) {
			var itemNode = seatNodes[i];

			var objNode = {};
			objNode.Seat = itemNode.Seat;
			objNode.JobNum = itemNode.JobNum;
			objNode.Name = itemNode.Name;


			var atentSate = itemNode.State;//坐席分机原始状态码
			var seatState = OcxCore.Enums.CTIAtentStatusFlag.TransferAtentStatus(atentSate);//坐席状态
			objNode.State = seatState;
			objNode.AtentState = atentSate;
			objNode.SubState = itemNode.SubState != undefined ? itemNode.SubState : 0;
			objNode.StateStartTime = itemNode.StateStartTime != undefined ? itemNode.StateStartTime : "";
			//{\"Seat\":1001,\"State\":1,\"JobNum\":\"10000\",\"Name\":\"宾客\"}
			//{"Seat":8001,"State":2,"SubState":2,"JobNum":1001,"Name":"客服1","Gender":"男","StateStartTime":"2017-09-12 19:11:30"}
			//			AccountState as = SessionManagement.getInstance().GetAccountState(objNode.get("JobNum").asText());
			var photoPath = "";
			if (OcxCore.validator.isNotNull(AgentData.getCTIMonitorExtNumber()) && AgentData.getCTIMonitorExtNumber() == itemNode.Seat) {
				AgentData.setCTIMonExtNumAtentState(itemNode.State);
			}
			var nbtnsNode = MonitorStateButtonStatus(atentSate, itemNode.Seat, state, AgentData, true);
			objNode.MonitorButton = nbtnsNode;
			objNode.Gender = itemNode.Gender != undefined ? itemNode.Gender : "女";
			objNode.ChangeStateDuration = "";
			objNode.OnLine = true;//false

			objNode.Photograph = photoPath;

			if (objNode.StateStartTime != null && objNode.StateStartTime != "") {
				var diffSeconds = 0;
				try {
					var date1 = new Date(Date.parse(objNode.StateStartTime.replace(/-/g, "/")));
					var date3 = OcxCore.utils.getNowDate().getTime() - date1.getTime();  //时间差的毫秒数
					diffSeconds = Math.round(date3 / 1000);
				} catch (e) {

				}
				objNode.ChangeStateDuration = diffSeconds;
			} else {
				objNode.ChangeStateDuration = "";
			}

			arrayNode.push(objNode);
		}
		var data = {};
		data.CommandID = "MONITORSTATE_NOTIFY";
		data.Data = arrayNode;

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "监控状态通知", data);
		state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);
	}
	/**
	 * 只允许挂机通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function ONLYHANGUP_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		AgentData.OnlyHugeup_Button_Status();
		var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//呼叫ID
		AgentData.getCallData().setCallId(CallId);
		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
		state.Send("RefleshUserInfoAndButton", jsonMsg);
	}
	/**
	 * 强拆成功通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function FORCECUT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//标记本次动作
		AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex());
		AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

		AgentData.setCTIMonitorStatus(OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex());
		//AgentData.setCTIMonitorExtNumber("");
		var data = {};
		if (OcxCore.validator.isNotNull(AgentData.getCTIMonExtNumAtentState())) {
			var nbtnsNode = MonitorStateButtonStatus(AgentData.getCTIMonExtNumAtentState(), AgentData.getCTIMonitorExtNumber(), state, AgentData, true);
			data.MonitorButton = nbtnsNode;
		}

		data.CommandID = "MonitorOptionRes";
		data.CTIMonitorStatus = AgentData.getCTIMonitorStatus();
		data.CTIMonitorExtNumber = AgentData.getCTIMonitorExtNumber();
		data.CloseMonitorDialog = true;
		AgentData.setCTIMonitorExtNumber("");

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "强拆成功", data);
		state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);

		var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
		var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
		var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//呼叫ID
		var CustomId = dataJsonNode.CustomId != undefined ? dataJsonNode.CustomId : "";//客户ID（任务清单ID）
		var GrpId = dataJsonNode.GrpId != undefined ? dataJsonNode.GrpId : "";//队列ID
		var AudioFile = dataJsonNode.AudioFile != undefined ? dataJsonNode.AudioFile : "";//录音路径(相对路径)

		AgentData.getLblCaller().setText(Caller);
		AgentData.getLblCalled().setText(Called);
		AgentData.getLblCallNumber().setText(Called);

		AgentData.getCallData().setCaller(Caller);
		AgentData.getCallData().setCalled(Called);
		AgentData.getCallData().setCallId(CallId);
		AgentData.getCallData().setCustomId(CustomId);
		if (OcxCore.validator.isInt(GrpId))
			AgentData.getCallData().setGroupId(parseInt(GrpId));
		else
			AgentData.getCallData().setGroupId(null);
		AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
		AgentData.getCallData().setReceiveStartTime(OcxCore.utils.getNowDate());//接听开始时间
		AgentData.getCallData().setAudioFile(AudioFile);//录音路径(相对路径)
		var popTabId = OcxCore.validator.isNotNull(CallId) ? CallId : OcxCore.Utility.GetUUID();
		AgentData.getCallData().setPopTabId(popTabId);
		state.setLastCallId(CallId);//最后一通电话呼叫ID
		//AgentData.getCallData().setCallsCount(AgentData.getCallData().getCallsCount()+1);

		AgentData.Talking_Button_Status();
		var data = {};
		data.Caller = Caller;
		data.Called = Called;
		data.CallId = CallId;
		data.CustomId = CustomId;
		data.GrpId = GrpId;
		data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');//呼叫开始时间
		data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
		data.ReceiveEndTime = null;//接听结束时间
		data.CallEndTime = null;//呼叫结束时间
		data.AudioFile = AudioFile;
		data.PopTabId = AgentData.getCallData().getPopTabId();

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateStateChangedJsonMsgData(state, "");
		state.Send("CurrentUserCTIStateChanged", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "内线被转移通知", data);
		state.Send("TRANSFERSEAT_NOTIFY", jsonMsg);

		//保存本次操作记录时间
		OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
	}

	/**
	 * 事后整理开始通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function ENDPROCSTART_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		var data = {};

		var EndProcTime = dataJsonNode.EndProcTime ? dataJsonNode.EndProcTime : 0;//事后整理时长（秒）

		if (AgentData.getCallData().getReceiveStartTime() != null) {
			AgentData.getCallData().setReceiveEndTime(OcxCore.utils.getNowDate());//接听结束时间
		}
		AgentData.getCallData().setCallEndTime(OcxCore.utils.getNowDate());

		data.Caller = AgentData.getCallData().getCaller();
		data.Called = AgentData.getCallData().getCalled();
		data.CallId = AgentData.getCallData().getCallId();
		data.CustomId = AgentData.getCallData().getCustomId();
		data.GrpId = AgentData.getCallData().getGroupId();
		data.CallTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallTime(), 'yyyy-MM-dd hh:mm:ss');
		data.ReceiveStartTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveStartTime(), 'yyyy-MM-dd hh:mm:ss');//接听开始时间
		data.ReceiveEndTime = OcxCore.utils.dateFormat(AgentData.getCallData().getReceiveEndTime(), 'yyyy-MM-dd hh:mm:ss');//接听结束时间
		data.CallEndTime = OcxCore.utils.dateFormat(AgentData.getCallData().getCallEndTime(), 'yyyy-MM-dd hh:mm:ss');
		data.CallType = AgentData.getCallData().getCallType();//GrpId
		data.AudioFile = AgentData.getCallData().getAudioFile();
		data.OtherParams = AgentData.getCallData().getOtherParams();
		data.PopTabId = AgentData.getCallData().getPopTabId();

		var isNotice = false;

		if (EndProcTime > 0) {
			if (AgentData.getCTIAgentOption() != OcxCore.Enums.CTIAgentOptionFlag.OPTION_ENDPROC.getIndex()) {
				data.EndProcTime = EndProcTime;
				AgentData.EndProcStart_Button_Status();
				//标记本次动作
				AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_ENDPROC.getIndex());
				AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
				isNotice = true;
				//保存操作记录
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_HANGUP.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
				//保存本次操作记录时间
				OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_ENDPROC.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
			}
		}
		else {
			AgentData.HugeUpSuccessStatus();

			if (state.getCTIAgentStatus() == OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex()) {
				if (AgentData.getCTIAgentOption() != OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex()) {
					//标记本次动作
					AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex());
					AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
					isNotice = true;
					//保存操作记录
					OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_HANGUP.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
					//保存本次操作记录时间
					OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
				}
			} else {
				if (AgentData.getCTIAgentOption() != OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex()) {
					//标记本次动作
					AgentData.setCTIAgentOption(OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex());
					AgentData.setPreOptionDate(OcxCore.utils.getNowDate());
					isNotice = true;
					//保存操作记录
					OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_HANGUP.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "", null);
					//保存本次操作记录时间
					OcxCommandFun.SaveCtiOption(state.getUserCode(), ExtNumber, OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex(), OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
				}
			}
		}

		if (isNotice) {
			var data2 = {};
			if (EndProcTime > 0) {
				data2.EndProcTime = EndProcTime;
			}

			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "", data2);
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateStateChangedJsonMsgData(state, "");
			state.Send("CurrentUserCTIStateChanged", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "挂机成功", data);
			state.Send("HANGUP_RES", jsonMsg);

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "挂机成功", data);
			state.GetGlobal("onHangupRes").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//挂机响应回调函数
		}
	}

	/**
	 * 事后整理结束通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function ENDPROCSTOP_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		AgentData.EndProcStop_Button_Status();

		//jsonMsg = generateJsonData(true,"0",Action,"",null, AgentData);
		//state.Send("CurrentUserStateChanged", jsonMsg.toJsonString());
	}

	/**
	 * 进等待队列通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function ENQUEUEWAIT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {

	}
	/**
	 * 出等待队列通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function DEQUEUEWAIT_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {

	}
	/**
	 * 更新坐席签入技能组通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function UPDATEGROUP_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		//技能组数组
		var grpNodes = dataJsonNode.Data != undefined ? dataJsonNode.Data : [];

		state.clearGroupList();//先清空原有的技能组列表
		var SeatGroups = new OcxCore.Map();
		if (grpNodes != null && grpNodes.length > 0) {
			for (var i = 0; i < grpNodes.length; i++) {
				SeatGroups.put(parseInt(grpNodes[i].GrpId), grpNodes[i].GrpName);

				state.addGroup(parseInt(grpNodes[i].GrpId), grpNodes[i].GrpName);
			}
		}
		AgentData.setSeatGroups(SeatGroups);
	}

	/**
	 * CTI连接断开通知
	 * 
	 * @param Action
	 * @param dataJsonNode
	 * */
	function DISCONNECT_NOTIFY(Action, dataJsonNode) {
		OcxCore.Log.trace(OcxCore.utils.stringFormat("CTISrvCommand info:\r\n 响应消息 ： {0}", Action + ":CTI连接断开通知"));
		var jsonMsg = null;
		var state = OcxCore.Session;
		var AgentData = state.getCTIAgentData();
		if (!OcxCore.cti.CTIServerImpl.IsConnected()) {
			if (state.IsCheckin()) {
				//state.setExtNumber("");
				AgentData.InitDefault();

				jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);
				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "CTI服务器断开连接,自动签出", null);
				state.Send("CHECKOUT_RES", jsonMsg);
				//保存签出记录时间
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "CTI服务器断开连接,自动签出", null);
			}
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			//关闭连接
			OcxCore.cti.CTIServerImpl.CloseConnect();
			return;
		}
		if (state.IsCheckin()) {
			AgentData = state.getCTIAgentData();
			if (state.IsCheckin()) {
				var extNumber = state.getExtNumber();
				var companyId = state.getCompanyId();
				//state.setExtNumber("");
				AgentData.InitDefault();
				//签出CTI服务器
				var result = OcxCore.cti.CTIServerImpl.Checkout(extNumber, companyId, "0");

				jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);
				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "签出成功", null);
				state.Send("CHECKOUT_RES", jsonMsg);
				//保存签出记录时间
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "CTI服务器断开连接,自动签出", null);
			}
			jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
			state.Send("RefleshUserInfoAndButton", jsonMsg);
		}
		//关闭连接
		OcxCore.cti.CTIServerImpl.CloseConnect();
	}
	/**
	 * CTI服务器验证码通知
	 * 
	 * @param Action
	 * @param dataJsonNode
	 * */
	function VERIFYCODE_NOTIFY(Action, dataJsonNode) {
		var verifyCode = dataJsonNode.VerifyCode != undefined ? dataJsonNode.VerifyCode : "";//CTI服务器验证码
		OcxCore.Log.trace(OcxCore.utils.stringFormat("CTISrvCommand info:\r\n 响应消息 ： {0}  , VerifyCode：{1}", Action + ":CTI服务器验证码通知", verifyCode));
		if (!verifyCode == OcxCore.cti.CTIServerImpl.getCtiVerifyCode()) {
			OcxCore.cti.CTIServerImpl.setCtiVerifyCode(verifyCode);
			//验证码改变后自动重置所有会话为签出状态
			//SessionManagement.getInstance().CheckoutAll(false);
		}
	}
	/**
	 * 技能组排队等待数量通知
	 * 
	 * @param Action
	 * @param dataJsonNode
	 * */
	function GROUPWAITCOUNT_NOTIFY(Action, dataJsonNode) {
		var state = OcxCore.Session;
		var GrpId = dataJsonNode.GrpId != undefined ? dataJsonNode.GrpId : 0;//技能组ID
		var WaitCount = dataJsonNode.WaitCount != undefined ? dataJsonNode.WaitCount : 0;//排队等待数量
		var group = state.getGroupManagement() != null ? state.getGroupManagement().getGroup(GrpId) : null;
		if (group != null) {
			group.setWaitCount(WaitCount);

			var jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, "");
			state.Send("RefleshUserInfoAndButton", jsonMsg);

			var data = {};
			data.CommandID = "GROUPWAITCOUNT_NOTIFY";
			data.GroupId = GrpId;
			data.WaitCount = WaitCount;

			jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "技能组排队等待数量通知", data);
			state.Send("GLOBAL:COMMON_NOTIFY", jsonMsg);
		}
	}

	/**
	 * 自定义状态通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function CUSTOMSTATE_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (state == null || AgentData == null || dataJsonNode.Status == undefined) return;
		//同步CTI服务器中分机的状态
		var atentSate = parseInt(dataJsonNode.Status);//坐席分机原始状态码,同步CTI服务器中分机的状态
		var seatState = OcxCore.Enums.CTIAtentStatusFlag.TransferAtentStatus(atentSate);//坐席状态
		var SubStatus = dataJsonNode.SubStatus != undefined && dataJsonNode.SubStatus != null ? dataJsonNode.SubStatus : 0;//置忙小状态
		if (seatState != null)
			state.setCTIAgentStatus(seatState);//设置状态
		state.setCTIAgentSubStatus(SubStatus);//置忙小状态
		//被咨询方收到此通知时（咨询、会议），判断是否能主叫被叫参数
		if (dataJsonNode.Caller != undefined && dataJsonNode.Called != undefined) {
			var Caller = dataJsonNode.Caller != undefined ? dataJsonNode.Caller : "";//主叫
			var Called = dataJsonNode.Called != undefined ? dataJsonNode.Called : "";//被叫
			var CallId = dataJsonNode.CallId != undefined && dataJsonNode.CallId != 'VarId8' ? dataJsonNode.CallId : "";//呼叫ID

			AgentData.getLblCaller().setText(Caller);
			AgentData.getLblCalled().setText(Called);
			AgentData.getLblCallNumber().setText(Called);

			AgentData.getCallData().setCaller(Caller);
			AgentData.getCallData().setCalled(Called);
			AgentData.getCallData().setCallId(CallId);
			AgentData.getCallData().setCustomId("");
			AgentData.getCallData().setGroupId(null);
			AgentData.getCallData().setCallTime(OcxCore.utils.getNowDate());
			AgentData.getCallData().setReceiveStartTime(OcxCore.utils.getNowDate());//接听开始时间
			AgentData.getCallData().setCallType(0);
			var popTabId = OcxCore.validator.isNotNull(CallId) ? CallId : OcxCore.Utility.GetUUID();
			AgentData.getCallData().setPopTabId(popTabId);
			AgentData.getCallData().setDialFlag(2);//1外线 2内线
		}

		var OptionFlag = null;
		switch (seatState) {
			case 0://STATE_OFFLINE:
				AgentData.InitDefault();
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex();
				break;
			case 1://STATE_FREE:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_FREE.getIndex();
				break;
			case 2://STATE_BUSY:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
				break;
			case 3://STATE_CALLIN:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLIN.getIndex();
				break;
			case 4://STATE_CALLOUT:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_MAKECALL.getIndex();
				break;
			case 5://STATE_CALLING:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CALLING.getIndex();
				break;
			case 6://STATE_CONSULT:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONSULT.getIndex();
				break;
			case 7://STATE_CONF:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_CONFERENCE.getIndex();
				break;
			case 8://STATE_OTHER:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
				break;
			case 9://STATE_ENDPROC:
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
				break;
			case 10://STATE_KEEP
				OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_KEEP.getIndex();
				break;
			default:
				//OptionFlag = OcxCore.Enums.CTIAgentOptionFlag.OPTION_BUSY.getIndex();
				break;
		}

		OcxCore.Log.trace(OcxCore.utils.stringFormat("自定义状态通知，当前坐席状态 ：{0} ", OcxCore.Enums.GetName(OcxCore.Enums.CTIAgentStatusFlag, state.getCTIAgentStatus())));
		//标记动作
		AgentData.setCTIAgentOption(OptionFlag);
		AgentData.setPreOptionDate(OcxCore.utils.getNowDate());

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
		state.Send("CurrentUserCTIStateChanged", jsonMsg);

		if (OptionFlag != null) {
			//保存操作记录
			OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OptionFlag, OcxCore.utils.getNowDate(), null, state.getCompanyId(), "", null);
		}

	}

	/**
	 * 转IVR结果通知
	 * 
	 * @param Action
	 * @param CompanyId
	 * @param ExtNumber
	 * @param Ret
	 * @param state
	 * @param AgentData
	 * @param jsonMsg
	 * @param dataJsonNode
	 * */
	function RESULTINCALL_NOTIFY(Action, CompanyId, ExtNumber, Ret, state, AgentData, jsonMsg, dataJsonNode) {
		if (state == null || AgentData == null || dataJsonNode.RetCode == undefined) return;

		AgentData.getBtnConsult().Reset(true, true);
		AgentData.getBtnHold().Reset(true, true);
		AgentData.getBtnOperationInCall().Reset(true,true);//转IVR

		jsonMsg = OcxCore.cti.CTIServerImpl.generateRefleshUserInfoJsonMsgData(state, null);
		state.Send("RefleshUserInfoAndButton", jsonMsg);

		jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "转IVR结果通知", dataJsonNode);
		state.GetGlobal("OnOperationInCallComplete").Call(jsonMsg.Result, jsonMsg.ErrorCode, jsonMsg.Message, jsonMsg);//转IVR结果通知回调函数
	}


	/**
	 * CTI服务器验证码不一致的处理方法
	 * 
	 * @param state 
	 * @param AgentData
	 * */
	function UnVerifyHandler(state, AgentData) {
		OcxCore.Log.trace(OcxCore.utils.stringFormat("Common_CH info:\r\n CTI服务器验证失败，坐席自动签出！User = {0}, SeatNum={1}", state.getUserCode(), state.getExtNumber()));
		if (state.IsCheckin()) {
			//签出CTI服务器
			var result = OcxCore.cti.CTIServerImpl.Checkout(state.getExtNumber(), state.getCompanyId(), "0");
			AgentData = state.getCTIAgentData();
			if (state.IsCheckin()) {
				//state.setExtNumber("");
				AgentData.InitDefault();
				jsonMsg = OcxCore.cti.CTIServerImpl.generateCTIStateChangedJsonMsgData(state, "");
				state.Send("CurrentUserCTIStateChanged", jsonMsg);
				jsonMsg = OcxCore.cti.CTIServerImpl.generateJsonMsgData(true, "1", 0, "CTI服务器验证失败，坐席自动签出", null);
				state.Send("CHECKOUT_RES", jsonMsg);
				//保存签出记录时间
				OcxCommandFun.SaveCtiOption(state.getUserCode(), state.getExtNumber(), OcxCore.Enums.CTIAgentOptionFlag.OPTION_LOGOUT.getIndex(), OcxCore.utils.getNowDate(), OcxCore.utils.getNowDate(), state.getCompanyId(), "CTI服务器验证失败，坐席自动签出", null);
			}
		}
	}
	//-------------------响应处理  End------------------



	//	function SendCompScopeUserStateChanged(JsonMsgModel jsonMsg,AccountState state,CTIAgentDataModel AgentData) throws IOException
	//	{
	//		jsonMsg = jsonMsg == null ? new JsonMsgModel():jsonMsg;
	//		jsonMsg.put("User", AgentData.getUserId());
	//		jsonMsg.put("State", state.getClientStatus().getIndex());
	//		jsonMsg.put("CTIState", state.getCTIAgentStatus().getIndex());
	//		jsonMsg.put("Details", new JsonText(AgentData.AccountInfoJson()));
	//        SessionManagement.getInstance().SendCompScope(AgentData.getCompanyId(),"UserStateChanged", jsonMsg.toJsonString());
	//	}

	function MonitorStateButtonStatus(seatAtentSate, seatNum, state, AgentData, seatOnline) {
		var objNode = {};

		var Listen = false;//监听
		var StopListen = false;//停止监听
		var ForceEnter = false;//强插
		var ForceRemove = false;//强拆
		var ForceSetIdle = false;//强制示闲
		var ForceSetBusy = false;//强制示忙
		var MoniterConf = false;//监控会议
		var StopMonitorConf = false;//停止监控会议
		var SendTipMsg = false;//消息
		var ForceCheckOut = false;//强制注销
		if (state != null && seatNum != state.getExtNumber())//排除当前坐席分机
		{
			var CTIMonitorStatus = AgentData != null ? AgentData.getCTIMonitorStatus() : OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex();//CTI网页客户端监控状态
			var monitorExtNum = AgentData != null && AgentData.getCTIMonitorExtNumber() != null ? AgentData.getCTIMonitorExtNumber() : "";//CTI网页客户端当前监控的坐席分机
			if (seatOnline) {
				switch (seatAtentSate) {
					//==空闲==
					case 0://USER_IDLE:	
					case 1://USER_USED: 
						ForceSetBusy = true;//强制示忙
						SendTipMsg = true;//消息
						ForceCheckOut = true;//强制注销
						break;
					//return CTIAgentStatusFlag.STATE_FREE;
					//==示忙==
					case 2://USER__BUSY:
						ForceSetIdle = true;//强制示闲
						SendTipMsg = true;//消息
						ForceCheckOut = true;//强制注销
						break;
					//return CTIAgentStatusFlag.STATE_BUSY;
					//==外呼==
					case 6://USER_PICKUP_WAIT_DTMF_DIAL: 
					case 10://USER_MAKECALL_USER_FORM_LINKUSER:
					case 7://USER_MAKECALL_TRUNK_FROM_LINKTRUNK: 
					case 9://USER_MAKECALL_USER_FROM_WAITPICKUP:
					case 8://USER_MAKECALL_TRUNK_FROM_WAITPICKUP: 
						SendTipMsg = true;//消息
						break;
					//return  CTIAgentStatusFlag.STATE_CALLOUT;
					// 	case USER_TALK2_TRUNKUSER:
					// 	case USER_TALK2_USER:
					//==通话==
					case 12://USER_TALK2_TRUNK:
						if (CTIMonitorStatus == OcxCore.Enums.CTIMonitorStatusFlag.LISTEN.getIndex() && monitorExtNum == seatNum) {
							StopListen = true;//停止监听
							ForceEnter = true;//强插
							ForceRemove = true;//强拆
						}
						else if (CTIMonitorStatus == OcxCore.Enums.CTIMonitorStatusFlag.INSERT.getIndex() && monitorExtNum == seatNum) {
							//StopListen = true;//停止监听
						}
						else {
							Listen = true;//监听
						}
						SendTipMsg = true;//消息
						break;
					//return CTIAgentStatusFlag.STATE_CALLING;
					//==呼入==
					case 27://USER_WAIT_PICKUP_TALK_2_TRUNK:
						SendTipMsg = true;//消息
						break;
					//return CTIAgentStatusFlag.STATE_CALLIN;
					//==会议==
					case 16://USER_CONF_TALKING_IN_USER://原坐席加入会议,其中有一内线坐席也在会议中(会议中有咨询坐席和外线用户)
						if (CTIMonitorStatus == OcxCore.Enums.CTIMonitorStatusFlag.CONF.getIndex() && monitorExtNum == seatNum) {
							StopMonitorConf = true;//停止监控会议
						}
						else if (CTIMonitorStatus == OcxCore.Enums.CTIMonitorStatusFlag.LISTEN.getIndex() && monitorExtNum == seatNum) {
							StopListen = true;//停止监听
							ForceEnter = true;//强插
							ForceRemove = true;//强拆
							MoniterConf = true;//监控会议
						}
						else if (CTIMonitorStatus == OcxCore.Enums.CTIMonitorStatusFlag.INSERT.getIndex() && monitorExtNum == seatNum) {
							//StopListen = true;//停止监听
						}
						else {
							//Listen = true;//监听
						}
						SendTipMsg = true;//消息
						break;
					case 17://USER_CONF_TALKING_IN_TRUNK://原坐席加入会议,其中有一外线坐席也在会议中(会议中有外线坐席和外线用户)
					case 18://USER_CONF_TALKING_IN: //咨询坐席加入会议后挂机

						if (CTIMonitorStatus == OcxCore.Enums.CTIMonitorStatusFlag.CONF.getIndex() && monitorExtNum == seatNum) {
							StopMonitorConf = true;//停止监控会议
						}
						else if (CTIMonitorStatus == OcxCore.Enums.CTIMonitorStatusFlag.LISTEN.getIndex() && monitorExtNum == seatNum) {
							StopListen = true;//停止监听
							ForceEnter = true;//强插
							ForceRemove = true;//强拆
							MoniterConf = true;//监控会议
						}
						else if (CTIMonitorStatus == OcxCore.Enums.CTIMonitorStatusFlag.INSERT.getIndex() && monitorExtNum == seatNum) {
							//StopListen = true;//停止监听
						}
						else {
							//Listen = true;//监听
						}
						SendTipMsg = true;//消息
						break;
					//return CTIAgentStatusFlag.STATE_CONF;
					//==咨询==
					//咨询内线
					case 19://USER_TALKOTHER_FROM_USER_WAIT_PICKUP://开始转移时源坐席状态
					case 20://USER_TALKOTHER_TO_USER_WAIT_PICKUP://转移时目的坐席摘机
					case 21://USER_TALKOTHER_FROM_USER_OK://坐席和内线已连接正在咨询
					case 22://USER_TALKOTHER_TO_USER_OK://目的坐席和源坐席已连接
					//咨询外线
					case 23://USER_TALKOTHER_FROM_TRUNK_WAIT_PICKUP://原来和外线通话的坐席状态
					case 24://USER_TALKOTHER_FROM_TRUNK_OK: //坐席和外线已连接正在咨询
						SendTipMsg = true;//消息
						break;
					//return CTIAgentStatusFlag.STATE_CONSULT;	
					//==保持==
					case 25://USER_HOLD://正在保持	
						SendTipMsg = true;//消息
						break;
					//==示忙==
					case 26://USER_WAIT_HANGUP: //等待挂机
						ForceSetBusy = true;//强制示忙
						SendTipMsg = true;//消息
						break;
					//return CTIAgentStatusFlag.STATE_BUSY; 
					//==离线==
					case 3://USER_LOGOUT:
						break;
					//return CTIAgentStatusFlag.STATE_OFFLINE;
					//==其它==
					default:
						SendTipMsg = true;//消息
						break;
					//return CTIAgentStatusFlag.STATE_OTHER;
				}
			}
			else {
				ForceCheckOut = true;//强制注销
			}

			if (!AgentData.getBtnListen().getHasPermission()) Listen = false;//监听
			if (!AgentData.getBtnStopListen().getHasPermission()) StopListen = false;//停止监听
			if (!AgentData.getBtnForceEnter().getHasPermission()) ForceEnter = false;//强插
			if (!AgentData.getBtnForceRemove().getHasPermission()) ForceRemove = false;//强拆
			if (!AgentData.getBtnForceSetIdle().getHasPermission()) ForceSetIdle = false;//强制示闲
			if (!AgentData.getBtnForceSetBusy().getHasPermission()) ForceSetBusy = false;//强制示忙
			if (!AgentData.getBtnMoniterConf().getHasPermission()) MoniterConf = false;//监控会议
			if (!AgentData.getBtnStopMonitorConf().getHasPermission()) StopMonitorConf = false;//停止监控会议
			if (!AgentData.getBtnSendTipMsg().getHasPermission()) SendTipMsg = false;//消息
			if (!AgentData.getBtnForceCheckOut().getHasPermission()) ForceCheckOut = false;//强制注销
		}

		objNode.Listen = Listen;//监听
		objNode.StopListen = StopListen;//停止监听
		objNode.ForceEnter = ForceEnter;//强插
		objNode.ForceRemove = ForceRemove;//强拆
		objNode.ForceSetIdle = ForceSetIdle;//强制示闲
		objNode.ForceSetBusy = ForceSetBusy;//强制示忙
		objNode.MoniterConf = MoniterConf;//监控会议
		objNode.StopMonitorConf = StopMonitorConf;//停止监控会议
		objNode.SendTipMsg = SendTipMsg;//消息
		objNode.ForceCheckOut = ForceCheckOut;//强制注销

		return objNode;
	}

	return This;
})();