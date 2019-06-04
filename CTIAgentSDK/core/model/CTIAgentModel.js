//-------------CTIAgent 相关的枚举和实体类-----------------

//----------枚举 start-----------
/**
 * CTI坐席状态
 */
OcxCore.Enums.CTIAgentStatusFlag = {
		/**
	    * 离线 0
	    * */
		STATE_OFFLINE:new OcxCore.Enums.EnumConstructor("离线",0),
		/**
	    * 空闲 1
	    * */
		STATE_FREE:new OcxCore.Enums.EnumConstructor("空闲",1),
	    /**
	    * 示忙 2
	    * */
		STATE_BUSY:new OcxCore.Enums.EnumConstructor("忙碌",2),
		/**
	    * 呼入 3
	    * */
		STATE_CALLIN:new OcxCore.Enums.EnumConstructor("呼入",3),
	    /**
	    * 呼出 4
	    * */
		STATE_CALLOUT:new OcxCore.Enums.EnumConstructor("呼出",4),
		/**
	    * 通话 5
	    * */
		STATE_CALLING:new OcxCore.Enums.EnumConstructor("通话",5),
		/**
	    * 咨询 6
	    * */
		STATE_CONSULT:new OcxCore.Enums.EnumConstructor("咨询",6),
		/**
	    * 会议 7
	    * */
		STATE_CONF:new OcxCore.Enums.EnumConstructor("会议",7),
		/**
	    * 其他 8
	    * */
		STATE_OTHER:new OcxCore.Enums.EnumConstructor("其他",8),
		/**
	    * 事后整理 9
	    * */
		STATE_ENDPROC:new OcxCore.Enums.EnumConstructor("事后整理",9),
		/**
	    * 保持 10
	    * */
		STATE_KEEP:new OcxCore.Enums.EnumConstructor("保持",10)
};
/**
 * 监控状态
 */
OcxCore.Enums.CTIMonitorStatusFlag = {
		/**
	    * 初始化状态
	    * */
		INITSYSTEM:new OcxCore.Enums.EnumConstructor("初始化",0),
	    /**
	    * 监听
	    * */
		LISTEN:new OcxCore.Enums.EnumConstructor("监听",1),
		/**
	    * 强插
	    * */
		INSERT:new OcxCore.Enums.EnumConstructor("强插",2),
		/**
	    * 强拆
	    * */
		REMOVE:new OcxCore.Enums.EnumConstructor("强拆",3),
		/**
	    * 监控会议
	    * */
		CONF:new OcxCore.Enums.EnumConstructor("会议",4)
};

/**
 * CTI呼叫类型
 */
OcxCore.Enums.CallTypeFlag = {
		/**
	    * 呼入 0
	    * */
		CallIn:new OcxCore.Enums.EnumConstructor("呼入",0),
	    /**
	    * 呼出 1
	    * */
		CallOut:new OcxCore.Enums.EnumConstructor("呼出",1),
		/**
	    * 预测外呼 2
	    * */
		Pre_OutCall:new OcxCore.Enums.EnumConstructor("预测外呼",2),
		/**
	    * 自动外呼 3
	    * */
		Auto_OutCall:new OcxCore.Enums.EnumConstructor("自动外呼",3),
		/**
	    * 手动外呼 4
	    * */
	 	Manual_OutCall:new OcxCore.Enums.EnumConstructor("手动外呼",4),
		/**
	    * 下班转外线 5
	    * */
		AfterWork_TranferOutLine:new OcxCore.Enums.EnumConstructor("下班转外线",5),
		/**
	    * IVR转外呼 6
	    * */
		IVR_TranferOutLine:new OcxCore.Enums.EnumConstructor("IVR转外线",6),
		/**
	    * 坐席转外线 7
	    * */
		Seat_TranferOutLine:new OcxCore.Enums.EnumConstructor("坐席转外线 ",7),
		/**
	    * 遇忙转外线 8
	    * */
		Busy_TranferOutLine:new OcxCore.Enums.EnumConstructor("遇忙转外线 ",8)
};

/**
 * 坐席操作动作状态
 * */
OcxCore.Enums.CTIAgentOptionFlag = {
		/**
	    * 签入 0
	    * */
		OPTION_LOGIN:new OcxCore.Enums.EnumConstructor("签入",0),
		/**
	    * 签出 1
	    * */
		OPTION_LOGOUT:new OcxCore.Enums.EnumConstructor("签出",1),
		/**
	    * 空闲 2
	    * */
		OPTION_FREE:new OcxCore.Enums.EnumConstructor("空闲",2),
		/**
	    * 置忙 3
	    * */
		OPTION_BUSY:new OcxCore.Enums.EnumConstructor("置忙",3),
		/**
	    * 外呼 4
	    * */
		OPTION_MAKECALL:new OcxCore.Enums.EnumConstructor("外呼",4),
		/**
	    * 来电振铃 5
	    * */
		OPTION_CALLIN:new OcxCore.Enums.EnumConstructor("来电振铃",5),
		/**
	    * 接听 6
	    * */
		OPTION_ANSWER:new OcxCore.Enums.EnumConstructor("接听",6),
		/**
	    * 通话中 7
	    * */
		OPTION_CALLING:new OcxCore.Enums.EnumConstructor("通话中",7),
		/**
	    * 挂机 8
	    * */
		OPTION_HANGUP:new OcxCore.Enums.EnumConstructor("挂机",8),
		/**
	    * 保持 9
	    * */
		OPTION_KEEP:new OcxCore.Enums.EnumConstructor("保持",9),
		/**
	    * 找回 10
	    * */
		OPTION_RETURN:new OcxCore.Enums.EnumConstructor("找回",10),
	    /**
	    * 咨询 11
	    * */
		OPTION_CONSULT:new OcxCore.Enums.EnumConstructor("咨询",11),
		/**
	    * 转移 12
	    * */
		OPTION_TRANSFER:new OcxCore.Enums.EnumConstructor("转移",12),
		/**
	    * 会议 13
	    * */
		OPTION_CONFERENCE:new OcxCore.Enums.EnumConstructor("会议",13),
		/**
	    * 事后忙 14
	    * */
		OPTION_ENDBUSY:new OcxCore.Enums.EnumConstructor("事后忙",14),
		/**
	    * 事后闲 15
	    * */
		OPTION_ENDFREE:new OcxCore.Enums.EnumConstructor("事后闲",15),
		/**
	    * 监听16
	    * */
		OPTION_LISTEN:new OcxCore.Enums.EnumConstructor("监听",16),
		/**
	    * 强插 17
	    * */
		OPTION_FORCEENTER:new OcxCore.Enums.EnumConstructor("强插",17),
		/**
	    * 强拆 18
	    * */
		OPTION_FORCEREMOVE:new OcxCore.Enums.EnumConstructor("强拆",18),
		/**
	    * 强制示闲 19
	    * */
		OPTION_FORCESETFREE:new OcxCore.Enums.EnumConstructor("强制示闲",19),
		/**
	    * 强制示忙 20
	    * */
		OPTION_FORCESETBUSY:new OcxCore.Enums.EnumConstructor("强制示忙",20),
		/**
	    * 监控会议 21
	    * */
		OPTION_MONITERCONF:new OcxCore.Enums.EnumConstructor("监控会议",21),
		/**
	    * 拦截 22
	    * */
		OPTION_INTERCEPT:new OcxCore.Enums.EnumConstructor("拦截",22),
		/**
	    * 强制注销 23
	    * */
		OPTION_FORCECHECKOUT:new OcxCore.Enums.EnumConstructor("强制注销",23),
		/**
	    * 事后整理 24
	    * */
		OPTION_ENDPROC:new OcxCore.Enums.EnumConstructor("事后整理",24),
		/**
	    * 满意度调查 25
	    * */
		OPTION_SATISFACTION:new OcxCore.Enums.EnumConstructor("满意度调查",25),
		/**
	    * 坐席配置 26
	    * */
		OPTION_SETSEATINFO:new OcxCore.Enums.EnumConstructor("坐席配置",26),
		/**
	    * 其他 999
	    * */
		OPTION_OTHER:new OcxCore.Enums.EnumConstructor("其他",999),
		/**
	    * 离开 27
	    * */
		OPTION_LEAVEMODE:new OcxCore.Enums.EnumConstructor("离开",27),
		/**
	    * 恢复 28
	    * */
		OPTION_NORMALMODE:new OcxCore.Enums.EnumConstructor("恢复",28)
}

/**
 * CTI原始状态码
 * */
OcxCore.Enums.CTIAtentStatusFlag = {
	/**
	 * 坐席示闲 0
	 * */
	USER_IDLE:new OcxCore.Enums.EnumConstructor("",0),		//坐席示闲
	/**
	 * 分配空闲坐席时设置为这个状态 1
	 * */
	USER_USED:new OcxCore.Enums.EnumConstructor("",1),		//分配空闲坐席时设置为这个状态
	/**
	 * 坐席示忙//解决和头文件冲突问题 2
	 * */
	USER__BUSY:new OcxCore.Enums.EnumConstructor("",2),		//坐席示忙//解决和头文件冲突问题
	/**
	 * 坐席登出 3
	 * */
	USER_LOGOUT:new OcxCore.Enums.EnumConstructor("",3),	//坐席登出
	/**
	 * 坐席登入 4
	 * */
	USER_LOGIN:new OcxCore.Enums.EnumConstructor("",4),		//坐席登入
	/**
	 * 程序初始状态 5
	 * */
	USER_INIT:new OcxCore.Enums.EnumConstructor("",5),		//程序初始状态

//////////////////////////////////////////////////////////////////////////
	/**
	 *  6
	 * */
	USER_PICKUP_WAIT_DTMF_DIAL:new OcxCore.Enums.EnumConstructor("",6),
//////////////////////////////////////////////////////////////////////////
	//中继自动外呼
//	TRUNK_AUTO_CALLOUT,
	//用户外呼外线时状态
	/**
	 * 坐席已连接中继通道并开始并呼 7
	 * */
	USER_MAKECALL_TRUNK_FROM_LINKTRUNK:new OcxCore.Enums.EnumConstructor("",7),	//坐席已连接中继通道并开始并呼
//	TRUNK_MAKECALL_TO_LINKUSER,//中继已连接用户模块并开始外呼
	/**
	 * 等待坐席摘机后中继外呼 8
	 * */
	USER_MAKECALL_TRUNK_FROM_WAITPICKUP:new OcxCore.Enums.EnumConstructor("",8),	//等待坐席摘机后中继外呼
	
	//用户外呼内线时状态
	/**
	 * 等待主叫用户摘机后外呼内线 9
	 * */
	USER_MAKECALL_USER_FROM_WAITPICKUP:new OcxCore.Enums.EnumConstructor("",9),//等待主叫用户摘机后外呼内线
	/**
	 * 主叫用户正在进行外呼 10
	 * */
	USER_MAKECALL_USER_FORM_LINKUSER:new OcxCore.Enums.EnumConstructor("",10),//主叫用户正在进行外呼
	/**
	 * 被叫内线用户处于呼叫状态 11
	 * */
	USER_MAKECALL_USER_TO_LINKUSER:new OcxCore.Enums.EnumConstructor("",11),//被叫内线用户处于呼叫状态
	//双方通话中时状态
	/**
	 * 双方通话中时状态 12
	 * */
	USER_TALK2_TRUNK:new OcxCore.Enums.EnumConstructor("",12),
//	TRUNK_TALK2_USER,
	
//	TRUNKUSER_TALK2_USER,
	/**
	 *  13
	 * */
	USER_TALK2_TRUNKUSER:new OcxCore.Enums.EnumConstructor("",13),
	/**
	 *  14
	 * */
	USER_TALK2_USER:new OcxCore.Enums.EnumConstructor("",14),
	/**
	 *  15
	 * */
	USER_TALK2_TRUNK_ONLY_LISTEN:new OcxCore.Enums.EnumConstructor("",15),
//	TRUNK_TALK2_TRUNK_OUT,//外线
//	TRUNK_TALK2_TRUNK_IN,//内线
	//转移
	
	//会议
	
	/**
	 * 原坐席加入会议,其中有一内线坐席也在会议中(会议中有咨询坐席和外线用户) 16
	 * */
	USER_CONF_TALKING_IN_USER:new OcxCore.Enums.EnumConstructor("",16),//原坐席加入会议,其中有一内线坐席也在会议中(会议中有咨询坐席和外线用户)
	/**
	 * 原坐席加入会议,其中有一外线坐席也在会议中(会议中有外线坐席和外线用户) 17
	 * */
	USER_CONF_TALKING_IN_TRUNK:new OcxCore.Enums.EnumConstructor("",17),//原坐席加入会议,其中有一外线坐席也在会议中(会议中有外线坐席和外线用户)
	/**
	 * 咨询坐席加入会议后挂机 18
	 * */
	USER_CONF_TALKING_IN:new OcxCore.Enums.EnumConstructor("",18),//咨询坐席加入会议后挂机
	

//	TRUNK_CONF_TALKING_IN,//外线坐席加入会议
//	TRUNK_CONF_TALKING_OUT_USER,//外线用户加入会议(两个内线用户也在会议中)
//	TRUNK_CONF_TALKING_OUT_TRUNK,//外线用户加入会议(一个内线一个外线用户在会议中)
	//咨询
	//咨询内线
	/**
	 * 开始转移时源坐席状态 19
	 * */
	USER_TALKOTHER_FROM_USER_WAIT_PICKUP:new OcxCore.Enums.EnumConstructor("",19),//开始转移时源坐席状态
	/**
	 * 转移时目的坐席摘机 20
	 * */
	USER_TALKOTHER_TO_USER_WAIT_PICKUP:new OcxCore.Enums.EnumConstructor("",20),//转移时目的坐席摘机
//	TRUNK_TALKOTHER_USER_PLAY_WAITING,//原来外线的状态(坐席咨询内线-未接通),等待同平台通话
//	TRUNK_TALKOTHER_USER_OK_PLAY_WAITING,//原来外线的状态(坐席咨询内线-已接通),等待同平台通话
	/**
	 * 坐席和内线已连接正在咨询 21
	 * */
	USER_TALKOTHER_FROM_USER_OK:new OcxCore.Enums.EnumConstructor("",21),//坐席和内线已连接正在咨询
	/**
	 * 目的坐席和源坐席已连接 22
	 * */
	USER_TALKOTHER_TO_USER_OK:new OcxCore.Enums.EnumConstructor("",22),//目的坐席和源坐席已连接
	//咨询外线
	/**
	 * 原来和外线通话的坐席状态 23
	 * */
	USER_TALKOTHER_FROM_TRUNK_WAIT_PICKUP:new OcxCore.Enums.EnumConstructor("",23),//原来和外线通话的坐席状态
//	TRUNK_TALKOTHER_TO_USER_WAIT_PICKUP,//正在外呼的外线状态
//	TRUNK_TALKOTHER_TRUNK_PLAY_WAITING,//原来外线的状态(坐席咨询外线-未接通),等待同平台通话
//	TRUNK_TALKOTHER_TRUNK_OK_PLAY_WAITING,//原来外线的状态(坐席咨询外线-已接通),等待同平台通话
	/**
	 * 坐席和外线已连接正在咨询 24
	 * */
	USER_TALKOTHER_FROM_TRUNK_OK:new OcxCore.Enums.EnumConstructor("",24),	//坐席和外线已连接正在咨询
//	TRUNK_TALKOTHER_TO_USER_OK,	//外线和坐已连接正在咨询
	//咨询线路束
	//HOLD
	/**
	 *  25
	 * */
	USER_HOLD:new OcxCore.Enums.EnumConstructor("",25),
//	TRUNK_HOLD,
	//通话过程中
//	TRUNK_IDLE,
//	TRUNK_USED,
//	TRUNK_WAIT_HANGUP,//等待中继挂机
	/**
	 * 等待挂机 26
	 * */
	USER_WAIT_HANGUP:new OcxCore.Enums.EnumConstructor("",26),//等待挂机
	//中继呼入时状态
//	TRUNK_INCOME_RING,//ring
//	TRUNK_IVR_ANSWER,	//answer
//	TRUNK_PENDING,	//pending
//	TRUNK_PLAY_BYEBYE,
	//呼入时状态
	/**
	 * 坐席振铃，等待摘机同中继通话 27
	 * */
	USER_WAIT_PICKUP_TALK_2_TRUNK:new OcxCore.Enums.EnumConstructor("",27),//坐席振铃，等待摘机同中继通话
//	TRUNK_PLAY_WAIT_USERPICKUP_2_TALK,//已经分配坐席,等待接听是这个状态
//	TRUNK_INTO_ACD_WAIT_IDLE_USER,//进入队列，等待分配坐席
//	TRUNK_INTO_ACD_WAIT_TIMEOUT,//进入队列,等待超时
	//评价
//	TRUNK_PLAY_WAIT_PINTJIA_DTMF,
	//留言
//	TRUNK_PLAY_WAIT_LIUYAN,
//	TRUNK_RECORDING_FOR_LIUYAN,
	
	/**
	 *  28
	 * */
	USER_Error_State:new OcxCore.Enums.EnumConstructor("",28),
	/**
	 *  29
	 * */
	MAX_AGENT_STATES:new OcxCore.Enums.EnumConstructor("",29),
	
	/**
	 * 将CTI状态原始码转换为CTI坐席状态
	 * */
    TransferAtentStatus : function(atentStatus)
    {
    	switch(atentStatus)
    	{
    			//==空闲==
	    	case 0://OcxCore.Enums.CTIAtentStatusFlag.USER_IDLE:	
	    	case 1://OcxCore.Enums.CTIAtentStatusFlag.USER_USED:
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_FREE.getIndex();
	    		//==示忙==
	    	case 2://OcxCore.Enums.CTIAtentStatusFlag.USER__BUSY:
	    	case 4://OcxCore.Enums.CTIAtentStatusFlag.USER_LOGIN:
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex();
	    		//==外呼==
	    	case 6://OcxCore.Enums.CTIAtentStatusFlag.USER_PICKUP_WAIT_DTMF_DIAL: 
	    	case 10://OcxCore.Enums.CTIAtentStatusFlag.USER_MAKECALL_USER_FORM_LINKUSER:
	    	case 7://OcxCore.Enums.CTIAtentStatusFlag.USER_MAKECALL_TRUNK_FROM_LINKTRUNK: 
	    	case 9://OcxCore.Enums.CTIAtentStatusFlag.USER_MAKECALL_USER_FROM_WAITPICKUP:
	    	case 8://OcxCore.Enums.CTIAtentStatusFlag.USER_MAKECALL_TRUNK_FROM_WAITPICKUP: 
	    		return  OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLOUT.getIndex();
	    		// 	case USER_TALK2_TRUNKUSER:
	    		// 	case USER_TALK2_USER:
	    		//==通话==
	    	case 12://OcxCore.Enums.CTIAtentStatusFlag.USER_TALK2_TRUNK:	
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLING.getIndex();
	    		//==呼入==
	    	case 27://OcxCore.Enums.CTIAtentStatusFlag.USER_WAIT_PICKUP_TALK_2_TRUNK:
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLIN.getIndex();
	    		//==会议==
	    	case 16://OcxCore.Enums.CTIAtentStatusFlag.USER_CONF_TALKING_IN_USER://原坐席加入会议,其中有一内线坐席也在会议中(会议中有咨询坐席和外线用户)
	    	case 17://OcxCore.Enums.CTIAtentStatusFlag.USER_CONF_TALKING_IN_TRUNK://原坐席加入会议,其中有一外线坐席也在会议中(会议中有外线坐席和外线用户)
	    	case 18://OcxCore.Enums.CTIAtentStatusFlag.USER_CONF_TALKING_IN: //咨询坐席加入会议后挂机
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_CONF.getIndex();
	    		//==咨询==
	    		//咨询内线
	    	case 19://OcxCore.Enums.CTIAtentStatusFlag.USER_TALKOTHER_FROM_USER_WAIT_PICKUP://开始转移时源坐席状态
	    	case 20://OcxCore.Enums.CTIAtentStatusFlag.USER_TALKOTHER_TO_USER_WAIT_PICKUP://转移时目的坐席摘机
	    	case 21://OcxCore.Enums.CTIAtentStatusFlag.USER_TALKOTHER_FROM_USER_OK://坐席和内线已连接正在咨询
	    	case 22://OcxCore.Enums.CTIAtentStatusFlag.USER_TALKOTHER_TO_USER_OK://目的坐席和源坐席已连接
	    		//咨询外线
	    	case 23://OcxCore.Enums.CTIAtentStatusFlag.USER_TALKOTHER_FROM_TRUNK_WAIT_PICKUP://原来和外线通话的坐席状态
	    	case 24://OcxCore.Enums.CTIAtentStatusFlag.USER_TALKOTHER_FROM_TRUNK_OK: //坐席和外线已连接正在咨询
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_CONSULT.getIndex();	
	    		//==保持==
	    	case 25://OcxCore.Enums.CTIAtentStatusFlag.USER_HOLD://正在保持
				return OcxCore.Enums.CTIAgentStatusFlag.STATE_KEEP.getIndex(); 
				//==事后整理==
	    	case 26://OcxCore.Enums.CTIAtentStatusFlag.USER_WAIT_HANGUP: //等待挂机
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_ENDPROC.getIndex(); 
	    		//==离线==
	    	case 3://OcxCore.Enums.CTIAtentStatusFlag.USER_LOGOUT:
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex();
	    		//==其它==
	    	default:
	    		return OcxCore.Enums.CTIAgentStatusFlag.STATE_OTHER.getIndex();
    	}
    }
}

/**
 * CTI操作响应码
 * */
OcxCore.Enums.CTIResponseFlag = {
//-------------操作响应码----------------
	/**
    * 心跳连接响应 99
    * */
	HEARTBEAT_RES:new OcxCore.Enums.EnumConstructor("心跳连接响应",99),
	/**
    * 登陆响应 600
    * */
	LOGIN_RES:new OcxCore.Enums.EnumConstructor("登陆响应",600),
	/**
    * 登出响应 601
    * */		
	LOGOUT_RES:new OcxCore.Enums.EnumConstructor("登出响应",601),
	/**
	 * 呼出响应 602
	 * */
	MAKECALL_RES:new OcxCore.Enums.EnumConstructor("呼出响应",602),
	/**
	 * 示闲响应 603
	 * */
	SETIDLE_RES:new OcxCore.Enums.EnumConstructor("示闲响应",603), 
	/**
	 * 示忙响应 604
	 * */
	SETBUSY_RES:new OcxCore.Enums.EnumConstructor("示忙响应",604), 
	/**
	 * 保持响应 605
	 * */
	KEEP_RES:new OcxCore.Enums.EnumConstructor("保持响应",605),  
	/**
	 * 找回响应 606
	 * */
	RETURN_RES:new OcxCore.Enums.EnumConstructor("找回响应",606),
	/**
	 * 咨询响应 607
	 * */
	CONSULT_RES:new OcxCore.Enums.EnumConstructor("咨询响应",607), 
	/**
	 * 会议响应 608
	 * */
	CONFERENCE_RES:new OcxCore.Enums.EnumConstructor("会议响应",608),
	/**
	 * 监听响应  609
	 * */
	LISTEN_RES:new OcxCore.Enums.EnumConstructor("监听响应",609),
	/**
	 * 停止监听响应  610
	 * */
	STOPLISTEN_RES:new OcxCore.Enums.EnumConstructor("停止监听响应",610),
	/**
	 * 强插响应  611
	 * */
	FORCEENTER_RES:new OcxCore.Enums.EnumConstructor("强插响应",611),
	/**
	 * 强拆响应 612
	 * */
	FORCEREMOVE_RES:new OcxCore.Enums.EnumConstructor("强拆响应",612),
	/**
	 * 强制示闲响应 613
	 * */
	FORCESETIDLE_RES:new OcxCore.Enums.EnumConstructor("强制示闲响应",613),
	/**
	 * 强制示忙响应 614
	 * */
	FORCESETBUSY_RES:new OcxCore.Enums.EnumConstructor("强制示忙响应",614),
	/**
	 * 挂机响应 615
	 * */
	HANGUP_RES:new OcxCore.Enums.EnumConstructor("挂机响应",615),
	/**
	 * 停止监控会议响应 616
	 * */
	STOPMONCONF_RES:new OcxCore.Enums.EnumConstructor("停止监控会议响应",616),
	/**
	 * 转移响应 617
	 * */
	TRANSFER_RES:new OcxCore.Enums.EnumConstructor("转移响应",617),
	/**
	 * 退出会议响应 618
	 * */
	STOPCONFERENCE_RES:new OcxCore.Enums.EnumConstructor("退出会议响应",618),
	/**
	 * 事后忙响应 619
	 * */
	ENDBUSY_RES:new OcxCore.Enums.EnumConstructor("事后忙响应",619),
	/**
	 * 事后闲响应 620
	 * */
	ENDIDLE_RES:new OcxCore.Enums.EnumConstructor("事后闲响应",620),
	/**
	 * 接听响应 621
	 * */
	ANSWER_RES:new OcxCore.Enums.EnumConstructor("接听响应",621),
	/**
	 * 开始监控响应 622
	 * */
	BEGINMONITOR_RES:new OcxCore.Enums.EnumConstructor("开始监控响应",622),
	/**
	 * 停止监控响应 623
	 * */
	STOPMONITOR_RES:new OcxCore.Enums.EnumConstructor("停止监控响应",623),
	/**
	 * 开始队列监控响应 624
	 * */
	BEGINQUEUEMONITOR_RES:new OcxCore.Enums.EnumConstructor("开始队列监控响应",624),
	/**
	 * 停止队列监控响应 625
	 * */
	STOPQUEUEMONITOR_RES:new OcxCore.Enums.EnumConstructor("停止队列监控响应",625),
	/**
	 * 开始坐席监控响应 626
	 * */
	BEGINSEATMONITOR_RES:new OcxCore.Enums.EnumConstructor("开始坐席监控响应",626),
	/**
	 * 停止坐席监控响应 627
	 * */
	STOPSEATMONITOR_RES:new OcxCore.Enums.EnumConstructor("停止坐席监控响应",627),
	/**
	 * 重新加载登录信息响应 628
	 * */
	RELOADINFO_RES:new OcxCore.Enums.EnumConstructor("重新加载登录信息响应",628),
	/**
	 * 当前电话进线量响应 629
	 * */
	CALLINSTAT_RES:new OcxCore.Enums.EnumConstructor("当前电话进线量响应",629),
	/**
	 * 更新坐席签入的技能组响应 630
	 * */
	UPDATEGROUP_RES:new OcxCore.Enums.EnumConstructor("更新坐席签入的技能组响应",630),
	/**
	 * 设置坐席配置信息响应 631
	 * */
	SETSEATINFO_RES:new OcxCore.Enums.EnumConstructor("设置坐席配置信息响应",631),
	/**
	 * 离开响应 632
	 * */
	LEAVEMODE_RES:new OcxCore.Enums.EnumConstructor("离开响应",632),
	/**
	 * 恢复响应 633
	 * */
	NORMALMODE_RES:new OcxCore.Enums.EnumConstructor("恢复响应",633),
	
	/**
	 * 转IVR响应 634
	 * */
	OPERATIONINCALL_RES:new OcxCore.Enums.EnumConstructor("转IVR响应",634),
	//-------------通知码----------------	
	
	
	/**
    * 咨询坐席状态通知 800
    * */
	CONSULTSTATE_NOTIFY:new OcxCore.Enums.EnumConstructor("咨询坐席状态通知",800),
	/**
    * 监控状态通知 801
    * */		
	MONITORSTATE_NOTIFY:new OcxCore.Enums.EnumConstructor("监控状态通知",801),
	/**
	 * 呼入通知 802
	 * */
	CALLALERTING_NOTIFY:new OcxCore.Enums.EnumConstructor("呼入通知",802),
	/**
	 * 通话通知 803
	 * */
	TALKING_NOTIFY:new OcxCore.Enums.EnumConstructor("通话通知",803), 
	/**
	 * 呼出通知 804
	 * */
	CALLOUT_NOTIFY:new OcxCore.Enums.EnumConstructor("呼出通知",804), 
	/**
	 * 内线被转移通知 805
	 * */
	TRANSFERSEAT_NOTIFY:new OcxCore.Enums.EnumConstructor("内线被转移通知",805),  
	/**
	 * 强拆成功通知 806
	 * */
	FORCECUT_NOTIFY:new OcxCore.Enums.EnumConstructor("强拆成功通知",806),
	/**
	 * 技能组信息 807
	 * */
	GRPINFO_NOTIFY:new OcxCore.Enums.EnumConstructor("技能组信息",807),
	/**
	 * 坐席呼坐席 808
	 * */
	SEATCALLSEAT_NOTIFY:new OcxCore.Enums.EnumConstructor("坐席呼坐席",808),
	/**
	 * 连接断开 809
	 * */
	DISCONNECT_NOTIFY:new OcxCore.Enums.EnumConstructor("连接断开",809),
	/**
	 * 只允许挂机 810
	 * */
	ONLYHANGUP_NOTIFY:new OcxCore.Enums.EnumConstructor("只允许挂机",810),
	/**
	 * CTI服务器验证码通知 811
	 * */
	VERIFYCODE_NOTIFY:new OcxCore.Enums.EnumConstructor("CTI服务器验证码通知",811),
	/**
	 * 技能组排队等待数量通知 812
	 * */
	GROUPWAITCOUNT_NOTIFY:new OcxCore.Enums.EnumConstructor("技能组排队等待数量通知",812),
	/**
	 * 事后整理开始通知 813
	 * */
	ENDPROCSTART_NOTIFY:new OcxCore.Enums.EnumConstructor("事后整理开始通知",813),
	/**
	 * 事后整理结束通知 814
	 * */
	ENDPROCSTOP_NOTIFY:new OcxCore.Enums.EnumConstructor("事后整理结束通知",814),
	/**
	 * 队列状态通知 815
	 * */
	QUEUESTATE_NOTIFY:new OcxCore.Enums.EnumConstructor("队列状态通知",815),
	/**
	 * 坐席状态通知 816
	 * */
	SEATSTATE_NOTIFY:new OcxCore.Enums.EnumConstructor("坐席状态通知",816),
	/**
	 * 呼出CALLID通知 817
	 * */
	CALLID_NOTIFY:new OcxCore.Enums.EnumConstructor("呼出CALLID通知",817),
	/**
	 * 更新坐席签入技能组通知 818
	 * */
	UPDATEGROUP_NOTIFY:new OcxCore.Enums.EnumConstructor("更新坐席签入技能组通知",818),
	/**
	 * 自定义状态通知 819
	 * */
	CUSTOMSTATE_NOTIFY:new OcxCore.Enums.EnumConstructor("自定义状态通知",819),
	/**
	 * 转IVR结果状态通知 820
	 * */
	RESULTINCALL_NOTIFY:new OcxCore.Enums.EnumConstructor("转IVR结果通知",820)
}

//----------枚举 end-----------

//----------自定义Exception start-----------
if(OcxCore.Exceptions == undefined) OcxCore.Exceptions = {};
/**
 * CTI Action操作异常
 * */
OcxCore.Exceptions.CTIActionException = function(errcode,msg)
{
	var This = this;
	//继承OcxCore.Exception
	OcxCore.Exception.call(This,"CTIActionException",msg);
	var Base = {
		GetType: This.GetType,
		is: This.is
	}

	This.is = function(type) { return type == this.GetType() ? true : Base.is(type); }
	This.GetType = function() { return "CTIActionException"; }
	
	This.errcode = errcode;
	This.getErrcode = function()
	{
		return errcode;
	}
	This.toString = function()
	{
		return This.Name + ":" +errcode+":"+ msg;
	}
}

/**
 * CTI服务器连接异常
 */
OcxCore.Exceptions.CTIConnectException = function(msg)
{
	var This = this;
	//继承OcxCore.Exception
	OcxCore.Exception.call(This,"CTIConnectException",msg);
	var Base = {
		GetType: This.GetType,
		is: This.is
	}

	This.is = function(type) { return type == this.GetType() ? true : Base.is(type); }
	This.GetType = function() { return "CTIConnectException"; }
}

/**
 * 版本不一致异常
 */
OcxCore.Exceptions.IncompatibleException = function(msg)
{
	var This = this;
	//继承OcxCore.Exception
	OcxCore.Exception.call(This,"IncompatibleException",msg);
	var Base = {
		GetType: This.GetType,
		is: This.is
	}

	This.is = function(type) { return type == this.GetType() ? true : Base.is(type); }
	This.GetType = function() { return "IncompatibleException"; }
}

/**
 * 未登录异常
 */
OcxCore.Exceptions.UnauthorizedException = function(msg)
{
	var This = this;
	//继承OcxCore.Exception
	OcxCore.Exception.call(This,"UnauthorizedException",msg);
	var Base = {
		GetType: This.GetType,
		is: This.is
	}

	This.is = function(type) { return type == This.GetType() ? true : Base.is(type); }
	This.GetType = function() { return "UnauthorizedException"; }
}

/**
 * 未签入异常
 */
OcxCore.Exceptions.UnCheckinException = function(msg)
{
	var This = this;
	//继承OcxCore.Exception
	OcxCore.Exception.call(This,"UnCheckinException",msg);
	var Base = {
		GetType: This.GetType,
		is: This.is
	}

	This.is = function(type) { return type == this.GetType() ? true : Base.is(type); }
	This.GetType = function() { return "UnCheckinException"; }
}


//----------自定义Exception end-------------

//----------实体Model start-------------
if(OcxCore.Model == undefined) OcxCore.Model = {};

/**
 * 电话工具条按钮
 * */
OcxCore.Model.OcxButtonModel = function( id, text, enabled, visible, hasPermission)
{
	var This = this;
	
	This.Id = "";//按钮ID
	This.Text = "";//文本
	This.Enabled = false;//是否可用
	This.Visible = false;//是否可见
	This.HasPermission = false;//是否有权限
	
	if(id != undefined) This.Id = id;//按钮ID
	if(text != undefined) This.Text = text;//文本
	if(enabled != undefined) This.Enabled = enabled;//是否可用
	if(visible != undefined) This.Visible = visible;//是否可见
	if(hasPermission != undefined) This.HasPermission = hasPermission;//是否有权限
	
	This.getId=function()
	{
		return This.Id;
	}
	This.setId=function(id)
	{
		This.Id = id;
	}
	
	This.getText=function()
	{
		return This.Text;
	}
	This.setText=function(text)
	{
		This.Text = text;
	}
	
	This.getEnabled=function()
	{
		return This.Enabled;
	}
	This.setEnabled=function(enabled)
	{
		This.Enabled = enabled;
	}
	This.getVisible=function()
	{
		return This.Visible;
	}
	This.setVisible=function(visible)
	{
		This.Visible = visible;
	}
	
	This.getHasPermission=function()
	{
		return This.HasPermission;
	}
	This.setHasPermission=function(hasPermission)
	{
		This.HasPermission = hasPermission;
	}
	/**
	 *重新设置
	 * */
	This.Reset=function( enabled, visible, hasPermission)
	{
		This.Enabled = enabled;//是否可用
		This.Visible = visible;//是否可见
		This.HasPermission = hasPermission != undefined ? hasPermission:This.HasPermission;//是否有权限
	}
	/**
	 * 检测客户端HTML界面按钮点击事件是否有效
	 * 注：如果按钮不可用则点击无效
	 * */
	This.IsCanUsed=function()
	{
		return This.Enabled && This.HasPermission;
	}
	/**
	 * 恢复默认
	 * */
	This.InitDefault=function()
	{
		This.Enabled = false;//是否可用
		This.Visible = true;//是否可见
		This.HasPermission = false;//是否有权限
	}
	
	This.getButtonJson=function()
	{
		var jsmsg = {};
		jsmsg.Id=This.Id;
		jsmsg.Enabled=This.IsCanUsed();
		jsmsg.Visible=This.Visible;
		jsmsg.HasPermission=This.HasPermission;
		return jsmsg;
	}
}
/**
 * 电话工具条显示标签
 * */
OcxCore.Model.OcxLabelModel = function( id, text, visible, attrKey, attrValue){
	var This = this;
	
	This.Id = "";//按钮ID
	This.Text = "";//文本
	This.Attr = "";//属性名
	This.AttrValue = "";//属性值
	This.Visible = true;//是否可见
	
	if(id != undefined) This.Id = id;//按钮ID
	if(text != undefined) This.Text = text;//文本
	if(visible != undefined) This.Visible = visible;//是否可见
	if(attrKey != undefined) This.Attr = attrKey;//属性名
	if(attrValue != undefined) This.AttrValue = attrValue;//属性值
	
	This.getId=function()
	{
		return This.Id;
	}
	This.setId=function( id)
	{
		This.Id = id;
	}
	
	This.getText=function()
	{
		return This.Text;
	}
	This.setText=function( text)
	{
		This.Text = text;
	}
	/**
	 * 属性名
	 * */
	This.getAttr=function()
	{
		return This.Attr;
	}
	/**
	 * 属性名
	 * */
	This.setAttr=function( attrKey)
	{
		This.Attr = attrKey;
	}
	/**
	 * 属性值
	 * */
	This.getAttrValue=function()
	{
		return This.AttrValue;
	}
	/**
	 * 属性值
	 * */
	This.setAttrValue=function( attrValue)
	{
		This.AttrValue = attrValue;
	}
	
	This.Reset=function( text, visible, attrValue)
	{
		This.Text = text;
		This.Visible = visible;//是否可见
		This.AttrValue = attrValue;
	}
	
	This.getLabelJson=function()
	{
		var jsmsg = {};
		jsmsg.Id= This.Id;//按钮ID
		jsmsg.Text= This.Text;//文本
		jsmsg.Attr= This.Attr;//属性名
		jsmsg.AttrValue= This.AttrValue;//属性值
		jsmsg.Visible= This.Visible;//是否可见
		return jsmsg;
	}
}

/**
 * 技能组（队列）
 * */
OcxCore.Model.GroupModel = function(_groupId,_groupName,_companyId,_level,_sort)
{
	var This = this;
	/**
	 *队列ID（技能组ID）
	 * */
	var groupId = 0;
	/**
	 *队列名称（技能组名称）
	 * */
	var groupName="";
	/**
	 * 公司ID
	 * */
	var companyId="";
	/**
	 * 排队数量
	 * */
	var waitCount=0;
	/**
	 * 接续等级
	 * */
	var level=1;
	/**
	 * 排序码
	 * */
	var sort=1;
	/**
	 * 排队列表
	 * */
	var queueList = new OcxCore.List();
	/**
	 * 坐席列表
	 * */
	var seatList = new OcxCore.List();
	
	
	if(_groupId != undefined && _groupId != null) groupId = _groupId;
	if(_groupName != undefined && _groupName != null) groupName = _groupName;
	if(_companyId != undefined && _companyId != null) companyId = _companyId;
	if(_level != undefined && _level != null) level = _level;
	if(_sort != undefined && _sort != null) sort = _sort;

	This.getGroupId = function() {
		return groupId;
	}
	This.setGroupId = function(_groupId1) {
		groupId = _groupId1;
	}
	This.getGroupName = function() {
		return groupName;
	}
	This.setGroupName = function(_groupName1) {
		groupName = _groupName1;
	}
	This.getCompanyId = function() {
		return companyId;
	}
	This.setCompanyId = function(_companyId1) {
		companyId = _companyId1;
	}
	This.getWaitCount = function() {
		return waitCount;
	}
	This.setWaitCount = function(_waitCount) {
		waitCount = _waitCount;
	}
	This.getLevel = function() {
		return level;
	}
	This.setLevel = function(_level1) {
		level = _level1;
	}
	This.getSort = function() {
		return sort;
	}
	This.setSort = function(_sort1) {
		sort = _sort1;
	}
	This.getQueueList = function() {
		if(queueList == null )
			queueList = new OcxCore.List();
		return queueList;
	}
	This.setQueueList = function(_queueList) {
		queueList = _queueList;
	}
	This.getSeatList = function() {
		if(seatList == null )
			seatList = new OcxCore.List();
		return seatList;
	}
	This.setSeatList = function(_seatList) {
		seatList = _seatList;
	}
	/**
	 * 添加坐席
	 * */
	This.addSeat = function(userName)
	{
		if (!seatList.contains(userName))
			seatList.add(userName);
	}
	/**
	 * 删除坐席
	 * */
	This.removeSeat = function(userName)
	{
		if (!seatList.contains(userName))
			seatList.remove(userName);
	}
}

/**
 * 置忙小状态
 * */
OcxCore.Model.BusySubStateModel = function(_subState,_subStateName,_companyId,_enabled,_icon)
{
	var This = this;
	/**
	 *小状态编号
	 * */
	var subState = 0;
	/**
	 *小状态名称
	 * */
	var subStateName="";
	/**
	 * 公司ID
	 * */
	var companyId="";
	/**
	 * 是否可用
	 * */
	var enabled=1;
	/**
	 * 图标
	 * */
	var icon = "";
	
	
	if(_subState != undefined && _subState != null) subState = _subState;
	if(_subStateName != undefined && _subStateName != null) subStateName = _subStateName;
	if(_companyId != undefined && _companyId != null) companyId = _companyId;
	if(_enabled != undefined && _enabled != null) enabled = _enabled;
	if(_icon != undefined && _icon != null) icon = _icon;

	This.getSubState = function() {
		return subState;
	}
	This.setSubState = function(_subState1) {
		subState = _subState1;
	}
	This.getSubStateName = function() {
		return subStateName;
	}
	This.setSubStateName = function(_subStateName1) {
		subStateName = _subStateName1;
	}
	This.getCompanyId = function() {
		return companyId;
	}
	This.setCompanyId = function(_companyId1) {
		companyId = _companyId1;
	}
	This.getEnabled = function() {
		return enabled;
	}
	This.setEnabled = function(_enabled1) {
		enabled = _enabled1;
	}
	This.getIcon = function() {
		return icon;
	}
	This.setIcon = function(_icon1) {
		icon = _icon1;
	}
}

/**
 * 通话信息
 * */
OcxCore.Model.CTICallDataModel =function(){
	var This = this;
	var caller = "";//主叫号码
	var called = "";//被叫号码
	var callType = 0;//当前通话类型    呼叫类型 0 呼入 1 呼出 2 预测外呼 3 自动外呼 4 手动外呼 5 下班转外线 6 IVR转外线 7 座席转外线 8 遇忙转外线
	var callId = "";//当前通话ID
	var groupId = null;//当前队列ID
	var customId = "";//任务清单ID
	var callTime = null;//来去电时间
	var callEndTime = null;//挂机时间
	var otherParams = "";//客户端传过来的其他参数字符串
	var popTabId = "";//客户端弹屏页面ID
	var IVRPath = "";//第一层IVR按键值
	var dialFlag = 1;//拨打类型  1外线 2内线
	var customerId = "";//当前客户ID
	
	var userCode = "";//工号
	var extNumber = "";//分机号
	var callOut_Channel = 0;//呼出通道号
	var callIn_Channel = 0;//呼入通道号
	var receiveStartTime = null;//接听开始时间 
	var receiveEndTime = null;//接听结束时间
	var duration = 0;//时长
	var audioFile = "";//录音文件
	var waitTime = 0;//等待时长
	var ringTime = 0;//振铃时长
	var callState = 0;//呼叫状态
	var mutiCall = 0;//三方通话时长
	var callForword = 0;//转接时长
	var ringStartTime = null;//响铃时间
	var lastIVRTime = null;//最后一层IVR选择时间
	var trans_Called = "";//转接号码
	var enqueueTime = null;//进队列时间
	var dequeueTime = null;//出队列时间
	var companyId = "";//公司主键
	var ivrDuration = 0;//IVR停留时间
	var hungupBusNodeId = "";//挂机业务编号
	var hungupSide=0;//挂机方(默认0未通话挂机 1客户先挂机 2坐席先挂机)
	
	var dequeueCause = 0;//出队列原因 （1排队成功 2 挂机）
	
	This.getCaller=function() {
		return caller;
	}

	This.setCaller=function(_caller) {
		caller = _caller;
	}

	This.getCalled=function() {
		return called;
	}

	This.setCalled=function(_called) {
		called = _called;
	}

	This.getCallType=function() {
		return callType;
	}

	This.setCallType=function(_callType) {
		callType = _callType;
	}

	This.getCallId=function() {
		return callId;
	}

	This.setCallId=function(_callId) {
		callId = _callId;
	}
	This.getGroupId=function() {
		return groupId;
	}

	This.setGroupId=function(_groupId) {
		groupId = groupId;
	}
	This.getCustomId=function() {
		return customId;
	}

	This.setCustomId=function(_customId) {
		customId = _customId;
	}
	/**
	 * 来去电时间
	 * */
	This.getCallTime=function() {
		return callTime;
	}

	This.setCallTime=function(_callTime) {
		callTime = _callTime;
	}
	/**
	 * 挂机时间
	 * */
	This.getCallEndTime=function() {
		return callEndTime;
	}

	This.setCallEndTime=function(_callEndTime) {
		callEndTime = _callEndTime;
	}
	
//	This.getCallsCount=function() {
//		return callsCount;
//	}
//
//	This.setCallsCount=function(_callsCount) {
//		callsCount = _callsCount;
//	}
	/**
	 * 客户端传过来的其他参数字符串
	 * */
	This.getOtherParams=function() {
		return otherParams;
	}
	/**
	 * 客户端传过来的其他参数字符串
	 * */
	This.setOtherParams=function(_otherParams) {
		otherParams = _otherParams;
	}
	/**
	 * 客户端弹屏页面ID
	 * */
	This.getPopTabId=function() {
		return popTabId;
	}
	/**
	 * 客户端弹屏页面ID
	 * */
	This.setPopTabId=function(_popTabId) {
		popTabId = _popTabId;
	}
	This.getIVRPath=function() {
		return IVRPath;
	}
	This.setIVRPath=function(_iVRPath) {
		IVRPath = _iVRPath;
	}
	/**
	 * 拨打类型  1外线 2内线
	 * */
	This.getDialFlag=function() {
		return dialFlag;
	}
	/**
	 * 拨打类型  1外线 2内线
	 * */
	This.setDialFlag=function(_dialFlag) {
		dialFlag = _dialFlag;
	}
	/**
	 * 当前客户ID
	 * */
	This.getCustomerId=function() {
		return customerId;
	}
	/**
	 * 当前客户ID
	 * */
	This.setCustomerId=function(_customerId) {
		customerId = _customerId;
	}
	


	This.getUserCode=function() {
		return userCode;
	}

	This.setUserCode=function(_userCode) {
		userCode = _userCode;
	}

	This.getExtNumber=function() {
		return extNumber;
	}

	This.setExtNumber=function(_extNumber) {
		extNumber = _extNumber;
	}

	This.getCallOut_Channel=function() {
		return callOut_Channel;
	}

	This.setCallOut_Channel=function(_callOut_Channel) {
		callOut_Channel = _callOut_Channel;
	}

	This.getCallIn_Channel=function() {
		return callIn_Channel;
	}

	This.setCallIn_Channel=function(_callIn_Channel) {
		callIn_Channel = _callIn_Channel;
	}

	This.getReceiveStartTime=function() {
		return receiveStartTime;
	}

	This.setReceiveStartTime=function(_receiveStartTime) {
		receiveStartTime = _receiveStartTime;
	}

	This.getReceiveEndTime=function() {
		return receiveEndTime;
	}

	This.setReceiveEndTime=function(_receiveEndTime) {
		receiveEndTime = _receiveEndTime;
	}

	This.getDuration=function() {
		return duration;
	}

	This.setDuration=function(_duration) {
		duration = _duration;
	}

	This.getAudioFile=function() {
		return audioFile;
	}

	This.setAudioFile=function(_audioFile) {
		audioFile = _audioFile;
	}

	This.getWaitTime=function() {
		return waitTime;
	}

	This.setWaitTime=function(_waitTime) {
		waitTime = _waitTime;
	}

	This.getRingTime=function() {
		return ringTime;
	}

	This.setRingTime=function(_ringTime) {
		ringTime = _ringTime;
	}

	This.getCallState=function() {
		return callState;
	}

	This.setCallState=function(_callState) {
		callState = _callState;
	}

	This.getMutiCall=function() {
		return mutiCall;
	}

	This.setMutiCall=function(_mutiCall) {
		mutiCall = _mutiCall;
	}

	This.getCallForword=function() {
		return callForword;
	}

	This.setCallForword=function(_callForword) {
		callForword = _callForword;
	}

	This.getRingStartTime=function() {
		return ringStartTime;
	}

	This.setRingStartTime=function(_ringStartTime) {
		ringStartTime = _ringStartTime;
	}

	This.getLastIVRTime=function() {
		return lastIVRTime;
	}

	This.setLastIVRTime=function(_lastIVRTime) {
		lastIVRTime = _lastIVRTime;
	}

	This.getTrans_Called=function() {
		return trans_Called;
	}

	This.setTrans_Called=function(_trans_Called) {
		trans_Called = _trans_Called;
	}

	This.getEnqueueTime=function() {
		return enqueueTime;
	}

	This.setEnqueueTime=function(_enqueueTime) {
		enqueueTime = _enqueueTime;
	}

	This.getDequeueTime=function() {
		return dequeueTime;
	}

	This.setDequeueTime=function(_dequeueTime) {
		dequeueTime = _dequeueTime;
	}

	This.getCompanyId=function() {
		return companyId;
	}

	This.setCompanyId=function(_companyId) {
		companyId = _companyId;
	}

	This.getIvrDuration=function() {
		return ivrDuration;
	}

	This.setIvrDuration=function(_ivrDuration) {
		ivrDuration = _ivrDuration;
	}

	This.getHungupBusNodeId=function() {
		return hungupBusNodeId;
	}

	This.setHungupBusNodeId=function(_hungupBusNodeId) {
		hungupBusNodeId = _hungupBusNodeId;
	}

	This.getHungupSide=function() {
		return hungupSide;
	}

	This.setHungupSide=function(_hungupSide) {
		hungupSide = _hungupSide;
	}

	This.getDequeueCause=function() {
		return dequeueCause;
	}

	This.setDequeueCause=function(_dequeueCause) {
		dequeueCause = _dequeueCause;
	}

	This.initDefault=function()
	{
		caller = "";//主叫号码
		called = "";//被叫号码
		callType = 0;//当前通话类型
		callId = "";//当前通话ID
		groupId = null;//当前队列ID
		customId = "";//任务清单ID
		otherParams = "";
		popTabId = "";
		callTime = null;
		callEndTime = null;//挂机时间
//		callsCount = 0;//通话次数
		IVRPath = "";
		dialFlag = 1;//拨打类型  1外线 2内线
		customerId = "";//当前客户ID
		
		userCode = "";//工号
		extNumber = "";//分机号
		callOut_Channel = 0;//呼出通道号
		callIn_Channel = 0;//呼入通道号
		receiveStartTime = null;//接听开始时间 
		receiveEndTime = null;//接听结束时间
		duration = 0;//时长
		audioFile = "";//录音文件
		waitTime = 0;//等待时长
		ringTime = 0;//振铃时长
		callState = 0;//呼叫状态
		mutiCall = 0;//三方通话时长
		callForword = 0;//转接时长
		ringStartTime = null;//响铃时间
		lastIVRTime = null;//最后一层IVR选择时间
		trans_Called = "";//转接号码
		enqueueTime = null;//进队列时间
		dequeueTime = null;//出队列时间
		companyId = "";//公司主键
		ivrDuration = 0;//IVR停留时间
		hungupBusNodeId = "";//挂机业务编号
		hungupSide=0;//挂机方(默认0未通话挂机 1客户先挂机 2坐席先挂机)
	}
	
	/**
	 * JSON字符串
	 * */
	This.toJsonString=function()
	{
		/*JsonMsgModel jsmsg = new JsonMsgModel();
		jsmsg.put("Caller", caller);
		jsmsg.put("Called", called);
		jsmsg.put("CallType", callType);
		jsmsg.put("CallId", callId);
		jsmsg.put("GroupId", groupId);
		jsmsg.put("CustomId", customId);
		jsmsg.put("IVRPath", IVRPath);
		jsmsg.put("CallTime", callTime != null ? DateTimeHelper.ToString(callTime, "yyy-MM-dd HH:mm:ss"):"");
		jsmsg.put("CallEndTime", callEndTime != null ? DateTimeHelper.ToString(callEndTime, "yyy-MM-dd HH:mm:ss"):"");
		jsmsg.put("OtherParams", otherParams);
		jsmsg.put("PopTabId", popTabId);
//		jsmsg.put("CallsCount", callsCount);
		
		
		return jsmsg.toJsonString();*/
		return null;
	}
	
	This.toJson = function(){
		var jsonObj = {
				caller : caller,//主叫号码
				called : called,//被叫号码
				callType : callType,//当前通话类型    呼叫类型 0 呼入 1 呼出 2 预测外呼 3 自动外呼 4 手动外呼 5 下班转外线 6 IVR转外线 7 座席转外线 8 遇忙转外线
				callId : callId,//当前通话ID
				groupId : groupId,//当前队列ID
				customId : customId,//任务清单ID
				callTime : callTime,//来去电时间
				callEndTime : callEndTime,//挂机时间
				otherParams : otherParams,//客户端传过来的其他参数字符串
				popTabId : popTabId,//客户端弹屏页面ID
				IVRPath : IVRPath,//第一层IVR按键值
				dialFlag : dialFlag,//拨打类型  1外线 2内线
				customerId : customerId,//当前客户ID
				
				userCode : userCode,//工号
				extNumber : extNumber,//分机号
				callOut_Channel : callOut_Channel,//呼出通道号
				callIn_Channel : callIn_Channel,//呼入通道号
				receiveStartTime : receiveStartTime,//接听开始时间 
				receiveEndTime : receiveEndTime,//接听结束时间
				duration : duration,//时长
				audioFile : audioFile,//录音文件
				waitTime : waitTime,//等待时长
				ringTime : ringTime,//振铃时长
				callState : callState,//呼叫状态
				mutiCall : mutiCall,//三方通话时长
				callForword : callForword,//转接时长
				ringStartTime : ringStartTime,//响铃时间
				lastIVRTime : lastIVRTime,//最后一层IVR选择时间
				trans_Called : trans_Called,//转接号码
				enqueueTime : enqueueTime,//进队列时间
				dequeueTime : dequeueTime,//出队列时间
				companyId : companyId,//公司主键
				ivrDuration : ivrDuration,//IVR停留时间
				hungupBusNodeId : hungupBusNodeId,//挂机业务编号
				hungupSide:hungupSide,//挂机方(默认0未通话挂机 1客户先挂机 2坐席先挂机)
				
				dequeueCause : dequeueCause//出队列原因 （1排队成功 2 挂机）
		};
		return jsonObj;
	}
}

/**
 * 账号信息
 * */
OcxCore.Model.AccountInfo = function(){
	var This = this;
	/**
	 * 业务系统客户端版本
	 * */
    This.ClientVersion ="1.0";
    /**
     * 业务系统类型AppId
     * */
    This.ClientAppId = "callcenter";
    
	/**
	 * 用户主键
	 * */
    This.UserId=null;
    /**
     * 用户账号
    * */
    This.UserName=null;
    /**
     * 用户工号
    * */
    This.UserCode=null;
    
    /**
     * 用户姓名
    * */
    This.RealName=null;
    /**
     * 用户昵称
    * */
    This.NickName=null;
    /**
     * 性别
    * */
    This.Gender=null;
    /**
     * 公司Id
    * */
    This.CompanyId=null;
    /**
     * 部门Id
    * */
    This.DepartmentId=null;
    /**
     * 用户头像
    * */
    This.Photograph=null;
    /**
     * 登录IP地址
    * */
    This.IPAddress=null;
    /**
     * 登录时间
     * */
    This.LoginDate=null;
    
    //-----------坐席相关资料-------------
    /**
     * 用户类型 0非坐席 1坐席 2微信用户 3网站游客 4群组 5其他
     * */
    This.UserType=0;
    /**
     * 坐席类型(0普通坐席 1班长坐席)
     * */
    This.SeatType=0;
    /**
     * 座席工作模式（0：呼入呼出：1：仅呼入 2：自选）
     * */
    This.WorkMode=0;
    /**
     * 分机号码
     * */
    This.ExtNumber=null;
    /**
     * 分机的主叫号码
     * */
    This.ExtCallerNumber=null;
    /**
     * 分机的主叫号码对应中继组标识编码
     * */
    This.ExtCallerRelayGrpNo=null;
    /**
     * 接续等级
     * */
    This.Continuation=null;
    /**
     * Mac地址;
     * */
    This.MacAddress=null;
    /**
     * 超过此队列排队数量不允许置忙，设置数量大于0才生效
     * */
    This.CanSetBusyWaitCount=0;
    
    
    //-----------WebIM相关-------------
    
    This.CustomerId=null;//客户ID

    
    /**
	 * 业务系统客户端版本
	 * */
    This.getClientVersion=function() {
		return This.ClientVersion;
	}
    /**
	 * 业务系统客户端版本
	 * */
	This.setClientVersion=function(clientVersion) {
		This.ClientVersion = clientVersion;
	}
    /**
     * 业务系统类型AppId
     * */
    This.getClientAppId=function() {
		return This.ClientAppId;
	}
    /**
     * 业务系统类型AppId
     * */
	This.setClientAppId=function(clientAppId) {
		This.ClientAppId = clientAppId;
	}
    
	This.getUserId=function() {
		return This.UserId;
	}
	This.setUserId=function(userId) {
		This.UserId = userId;
	}

	/**
     * 用户姓名
    * */
    This.getRealName=function() {
		return This.RealName;
	}
	This.setRealName=function(realName) {
		This.RealName = realName;
	}
	/**
     * 用户昵称
    * */
    This.getNickName=function() {
		return This.NickName;
	}
	This.setNickName=function(nickName) {
		This.NickName = nickName;
	}
	This.getUserName=function() {
		return This.UserName;
	}
	This.setUserName=function(userName) {
		This.UserName = userName;
	}
	/**
     * 用户工号
    * */
	This.getUserCode=function() {
		return This.UserCode;
	}
	This.setUserCode=function(userCode) {
		This.UserCode = userCode;
	}
	This.getGender=function() {
		return This.Gender;
	}
	This.setGender=function(gender) {
		This.Gender = gender;
	}
	This.getCompanyId=function() {
		return This.CompanyId;
	}
	This.setCompanyId=function(companyId) {
		This.CompanyId = companyId;
	}

	This.getDepartmentId=function() {
		return This.DepartmentId;
	}
	This.setDepartmentId=function(departmentId) {
		This.DepartmentId = departmentId;
	}
	/**
     * 用户头像
    * */
	This.getPhotograph=function() {
		return This.Photograph;
	}
	This.setPhotograph=function(photograph) {
		This.Photograph = photograph;
	}
	This.getIPAddress=function() {
		return This.IPAddress;
	}
	This.setIPAddress=function(iPAddress) {
		This.IPAddress = iPAddress;
	}
	/**
     * 登录时间
     * */
	This.getLoginDate=function() {
		return This.LoginDate;
	}
	/**
     * 登录时间
     * */
	This.setLoginDate=function(loginDate) {
		This.LoginDate = loginDate;
	}
	/**
	 * 用户类型 0非坐席 1坐席 2微信用户 3网站游客 4群组 5其他
	 * */
	This.getUserType=function() {
		return This.UserType;
	}
	This.setUserType=function(userType) {
		This.UserType = userType;
	}
	This.getSeatType=function() {
		return This.SeatType;
	}
	This.setSeatType=function(seatType) {
		This.SeatType = seatType;
	}
	
	This.getWorkMode=function() {
		return This.WorkMode;
	}
	This.setWorkMode=function(workMode) {
		This.WorkMode = workMode;
	}
	This.getExtNumber=function() {
		return This.ExtNumber;
	}
	This.setExtNumber=function(extNumber) {
		This.ExtNumber = extNumber;
	}
	/**
     * 分机的主叫号码
     * */
	This.getExtCallerNumber=function() {
		return This.ExtCallerNumber;
	}
	This.setExtCallerNumber=function(extCallerNumber) {
		This.ExtCallerNumber = extCallerNumber;
	}
	/**
     * 分机的主叫号码对应中继组标识编码
     * */
	This.getExtCallerRelayGrpNo=function() {
		return This.ExtCallerRelayGrpNo;
	}
	This.setExtCallerRelayGrpNo=function(extCallerRelayGrpNo) {
		This.ExtCallerRelayGrpNo = extCallerRelayGrpNo;
	}
	This.getContinuation=function() {
		return This.Continuation;
	}
	This.setContinuation=function(continuation) {
		This.Continuation = continuation;
	}
	This.getMacAddress=function() {
		return This.MacAddress;
	}
	This.setMacAddress=function(macAddress) {
		This.MacAddress = macAddress;
	}
	/**
     * 超过此队列排队数量不允许置忙，设置数量大于0才生效
     * */
	This.getCanSetBusyWaitCount=function() {
		return This.CanSetBusyWaitCount;
	}
	/**
     * 超过此队列排队数量不允许置忙，设置数量大于0才生效
     * */
	This.setCanSetBusyWaitCount=function(canSetBusyWaitCount) {
		This.CanSetBusyWaitCount = canSetBusyWaitCount;
	}
	
//	/**
//     * 座席电话工具条SessionID;
//     * */
//	This.getCTIAgentSessionID=function() {
//		return This.CTIAgentSessionID;
//	}
//	This.setCTIAgentSessionID=function(CTIAgentSessionID) {
//		This.CTIAgentSessionID = _CTIAgentSessionID;
//	}
	
	This.getCustomerId=function() {
		return This.CustomerId;
	}
	This.setCustomerId=function(customerId) {
		This.CustomerId = customerId;
	}

	//----------WebIM相关 end------------
	
	/**
	 * 重置信息
	 * 
	 * */
	This.Reset = function( userId, userName,userCode, realName,nickName,
			 gender, userType, seatType, companyId, departmentId, photograph,
			 IP, extNumber, continuation, macAddress, workMode, canSetBusyWaitCount, ClientVersion, ClientAppId, userInfo)
	{
		This.UserId = userId;
		This.UserName = userName;
		This.UserCode = userCode;
		This.RealName = realName;
		This.NickName = nickName;
		This.Gender = gender;
		This.UserType = userType;
		This.SeatType = seatType;
		This.CompanyId = companyId;
		This.DepartmentId = departmentId;
		This.Photograph = photograph;
		This.IPAddress = IP;
		This.WorkMode = workMode;
		This.ExtNumber = extNumber;
		This.Continuation = continuation;
		This.MacAddress = macAddress;
		This.CanSetBusyWaitCount = canSetBusyWaitCount;
		This.ClientVersion =ClientVersion;//业务系统客户端版本
		This.ClientAppId = ClientAppId;//业务系统类型AppId
		
		//this.CTIAgentSessionID = _CTIAgentSessionID;
		if(userInfo != null)
		{
			if(userInfo.customerid != undefined)
			{
				This.CustomerId = userInfo.customerid;
			}
		}
			
	}
	
	/**
	 * 详细信息JSON字符串
	 * */
	This.DetailsJson=function()
	{
		/*JsonMsgModel jsmsg = new JsonMsgModel();
		jsmsg.put("UserId", UserId);
		jsmsg.put("UserName", UserName);
		jsmsg.put("RealName", RealName);
		jsmsg.put("Gender", Gender);
		jsmsg.put("UserType", UserType);
		jsmsg.put("SeatType", SeatType);
		jsmsg.put("CompanyId", CompanyId);
		jsmsg.put("DepartmentId", DepartmentId);
		jsmsg.put("Photograph", Photograph);
		jsmsg.put("IPAddress", IPAddress);
		//座席用户
		if(UserType == 1)
		{
			jsmsg.put("ExtNumber", ExtNumber);
			jsmsg.put("WorkMode", WorkMode);
			
			jsmsg.put("Continuation", Continuation);
			jsmsg.put("MacAddress", MacAddress);
			//jsmsg.put("CTIAgentSessionID", CTIAgentSessionID);
		}else //非座席用户
		{
			jsmsg.put("MacAddress", MacAddress);
			//jsmsg.put("CTIAgentSessionID", CTIAgentSessionID);
		}
		if(UserType > 1)
		{
			jsmsg.put("CustomerId", CustomerId);
		}
		return jsmsg.toJsonString();*/
		
		return null;
	}
	
	/**
	 * 简单信息JSON字符串
	 * */
	This.toSimpleJson=function()
	{
		/*JsonMsgModel jsmsg = new JsonMsgModel();
		jsmsg.put("UserId", UserId);
		jsmsg.put("UserName", UserName);
		jsmsg.put("RealName", RealName);
		jsmsg.put("Gender", Gender);
		jsmsg.put("UserType", UserType);
		jsmsg.put("CustomerId", CustomerId);
		
		return jsmsg.toJsonString();*/
		return null;
	}
}
/**
 * 
 * */
OcxCore.Model.CTIAgentDataModel = function(_sessionId){
	var This = this;
	
	This.sessionId = _sessionId != undefined ? _sessionId : "";//会话ID
	This.ctiVerifyCode = "";//CTI连接验证码
	
	This.CTIMonitorStatus = null;//CTI网页客户端监控状态 CTIMonitorStatusFlag
	This.CTIMonitorExtNumber = null;//CTI网页客户端当前监控的坐席分机
	This.CTIMonExtNumAtentState = null;//CTI网页客户端当前监控的坐席分机原始状态
	This.CTIMonitorGroupId = 0;//当前监控的技能组ID
	
	This.SeatGroups = new OcxCore.Map();//座席签入的技能组 HashMap<Integer,String>()
	
	This.checkinDate = null;//签入时间 Date
	This.checkoutDate = null;//签出时间 Date
	This.checkinOptionID = null;//签入动作ID
	This.changeStateDate = null;//状态改变开始时间 Date
	This.changeStateEndDate = null;//状态改变结束时间 Date
	
	This.CTIAgentOption=null;//CTI网页客户端操作动作 CTIAgentOptionFlag
	This.preOptionDate = null;//CTI网页客户端操作动作开始时间
	This.preOptionEndDate = null;//CTI网页客户端操作动作结束时间
	This.preOptionID = null;//上一次操作动作记录ID
	
	This.CallData = new OcxCore.Model.CTICallDataModel();//呼叫数据
	
	This.PopCallDataCache = null;//暂存的待弹屏呼叫数据，用于处理通知后才弹屏时传的通话参数
	
	This.EndFlag = 1;//事后忙闲标记  0事后闲 1事后忙 
	
	This.canSetBusy = true;//是否允许置忙，默认true允许        true允许/false不允许
    This.isSetIdleManualOperation = false;//是否为人工操作示闲动作
	
	//---------CTIAgent信息栏-----------
	This.lblUsername = new OcxCore.Model.OcxLabelModel("username","");//用户工号
	This.lblUserRealName = new OcxCore.Model.OcxLabelModel("userRealName","");//姓名
	This.lblExtnumber = new OcxCore.Model.OcxLabelModel("extnumber","");//分机号
	This.lblCTIConnectState = new OcxCore.Model.OcxLabelModel("CTIConnectState","");//CTI连接状态
	This.lblCurrentStatus = new OcxCore.Model.OcxLabelModel("currentStatus","",true,"state","");//CTIAgent状态
	This.lblCallNumber = new OcxCore.Model.OcxLabelModel("callNumber","");//拨号号码
	This.lblCaller = new OcxCore.Model.OcxLabelModel("caller","");//主叫
	This.lblCalled = new OcxCore.Model.OcxLabelModel("called","");//被叫
	This.lblCallType = new OcxCore.Model.OcxLabelModel("callType","");//呼叫类型 呼入/呼出
	This.lblWaitCount = new OcxCore.Model.OcxLabelModel("waitCount","0");//排队数
	This.lblCallsNum = new OcxCore.Model.OcxLabelModel("callsNum","0");//通话次数
	This.lblCallDuration = new OcxCore.Model.OcxLabelModel("callDuration","00:00:00");//通话时长
	This.lblBusyNum = new OcxCore.Model.OcxLabelModel("busyNum","0");//示忙次数
	This.lblTransferNum = new OcxCore.Model.OcxLabelModel("transferNum","0");//转移次数
	This.lblTimeoutNum = new OcxCore.Model.OcxLabelModel("timeoutNum","0");//超时次数
	This.lblStateDuration = new OcxCore.Model.OcxLabelModel("stateDuration","--:--:--",true,"duration","");//状态时长
	
	//--------CTIAgent坐席电话工具条按钮栏-------
	This.btnFree = new OcxCore.Model.OcxButtonModel("SetIdle","示闲",false,false,false);//示闲
	This.btnBusy = new OcxCore.Model.OcxButtonModel("SetBusy","示忙",false,false,false);//示忙
	This.btnSetBusyApply = new OcxCore.Model.OcxButtonModel("SetBusyApply","示忙申请",false,false,false);//示忙申请
	This.btnAnswer = new OcxCore.Model.OcxButtonModel("Answer","接听",false,false,false);//接听
	This.btnOutCall = new OcxCore.Model.OcxButtonModel("MakeCall","外呼",false,false,false);//外呼
	This.btnHugeup = new OcxCore.Model.OcxButtonModel("Hangup","挂机",false,false,false);//挂机
	This.btnStartEndProc = new OcxCore.Model.OcxButtonModel("StartEndProc","开始事后整理",false,false,false);//开始事后整理
	This.btnStopEndProc = new OcxCore.Model.OcxButtonModel("StopEndProc","停止整理",false,false,false);//整理结束
	This.btnSatisfaction = new OcxCore.Model.OcxButtonModel("Satisfaction","满意度调查",false,false,false);//满意度调查
	This.btnLeaveMode = new OcxCore.Model.OcxButtonModel("LeaveMode","离开",false,false,false);//离开
	This.btnNormalMode = new OcxCore.Model.OcxButtonModel("NormalMode","恢复",false,false,false);//恢复
	This.btnConsult = new OcxCore.Model.OcxButtonModel("Consult","咨询",false,false,false);//咨询
	This.btnTransfer = new OcxCore.Model.OcxButtonModel("Transfer","转移",false,false,false);//转移
	This.btnGetBack = new OcxCore.Model.OcxButtonModel("Return","找回",false,false,false);//找回
	This.btnHold = new OcxCore.Model.OcxButtonModel("Keep","保持",false,false,false);//保持
	This.btnConf = new OcxCore.Model.OcxButtonModel("Conference","三方会议",false,false,false);//三方会议
	This.btnFreeAfter = new OcxCore.Model.OcxButtonModel("SetEndidle","事后闲",false,false,false);//事后闲
	This.btnBusyAfter = new OcxCore.Model.OcxButtonModel("SetEndbusy","事后忙",false,false,false);//事后忙
	This.btnIntercept = new OcxCore.Model.OcxButtonModel("Intercept","拦截",false,false,false);//拦截
	This.btnMonitor = new OcxCore.Model.OcxButtonModel("Monitor","监控",false,false,false);//监控
	This.btnCheckin = new OcxCore.Model.OcxButtonModel("Checkin","签入",false,false,false);//签入
	This.btnCheckout = new OcxCore.Model.OcxButtonModel("Checkout","签出",false,false,false);//签出
	This.btnOperationInCall = new OcxCore.Model.OcxButtonModel("OperationInCall","转IVR",false,false,false);//转IVR
	
	//---------CTIAgent坐席监控按钮栏-----------
	This.btnListen = new OcxCore.Model.OcxButtonModel("Listen","监听",false,false,false);//监听
	This.btnStopListen = new OcxCore.Model.OcxButtonModel("StopListen","停止监听",false,false,false);//停止监听
	This.btnForceEnter = new OcxCore.Model.OcxButtonModel("ForceEnter","强插",false,false,false);//强插
	This.btnForceRemove = new OcxCore.Model.OcxButtonModel("ForceRemove","强拆",false,false,false);//强拆
	This.btnForceSetIdle = new OcxCore.Model.OcxButtonModel("ForceSetIdle","强制示闲",false,false,false);//强制示闲
	This.btnForceSetBusy = new OcxCore.Model.OcxButtonModel("ForceSetBusy","强制示忙",false,false,false);//强制示忙
	This.btnMoniterConf = new OcxCore.Model.OcxButtonModel("MoniterConf","监控会议",false,false,false);//监控会议
	This.btnStopMonitorConf = new OcxCore.Model.OcxButtonModel("StopMonitorConf","停止监控会议",false,false,false);//停止监控会议
	This.btnSendTipMsg = new OcxCore.Model.OcxButtonModel("SendTipMsg","消息",false,false,false);//消息
	This.btnForceCheckOut = new OcxCore.Model.OcxButtonModel("ForceCheckOut","强制注销",false,false,false);//强制注销
	
	
	/*public CTIAgentDataModel()
	{
		
	}
	
	public CTIAgentDataModel(String sessionId,AccountState accountState)
	{
		This.sessionId = sessionId;
		This.accountState = accountState;
		lblUsername.setText(accountState.getUserName());
		lblUserRealName.setText(accountState.getAccountInfo().getRealName());
		lblExtnumber.setText(accountState.getAccountInfo().getExtNumber());
	}*/
	
	This.getSessionId=function() {
		return This.sessionId;
	}
	This.setSessionId=function( sessionId1) {
		This.sessionId = sessionId1;
	}
	
	/**
	 * CTI连接验证码
	 * */
	This.getCTIVerifyCode=function() {
		return This.ctiVerifyCode;
	}
	This.setCTIVerifyCode=function(ctiVerifyCode) {
		This.ctiVerifyCode = ctiVerifyCode;
	}
	
	/**
	 * CTI网页客户端监控状态
	 * */
	This.getCTIMonitorStatus=function() {
		return This.CTIMonitorStatus;
	}
	This.setCTIMonitorStatus=function( cTIMonitorStatus) {
		This.CTIMonitorStatus = cTIMonitorStatus;
	}
	/**
	 * CTI网页客户端当前监控的坐席分机
	 * */
	This.getCTIMonitorExtNumber=function() {
		return This.CTIMonitorExtNumber;
	}
	This.setCTIMonitorExtNumber=function(cTIMonitorExtNumber) {
		This.CTIMonitorExtNumber = cTIMonitorExtNumber;
	}
	/**
	 * CTI网页客户端当前监控的坐席分机原始状态
	 * */
	This.getCTIMonExtNumAtentState=function() {
		return This.CTIMonExtNumAtentState;
	}
	This.setCTIMonExtNumAtentState=function(cTIMonExtNumAtentState) {
		This.CTIMonExtNumAtentState = cTIMonExtNumAtentState;
	}
	/**
	 * 当前监控的技能组ID
	 * */
	This.getCTIMonitorGroupId=function() {
		return This.CTIMonitorGroupId;
	}
	This.setCTIMonitorGroupId=function(cTIMonitorGroupId) {
		This.CTIMonitorGroupId = cTIMonitorGroupId;
	}
	
	/**
     * 坐席所签入的技能组
     * */
	This.getSeatGroups=function() {
		if(This.SeatGroups == null)
			This.SeatGroups = new OcxCore.Map();
		return This.SeatGroups;
	}
	/**
     * 坐席所签入的技能组
     * */
	This.setSeatGroups=function( seatGroups) {
		This.SeatGroups = seatGroups;
	}
	
	/**
	 * 分机号
	 * */
	This.getExtNumber=function()
	{
		return OcxCore.Session.getExtNumber();
	}
	/**
	 * 分机号对应主叫号码
	 * */
	This.getExtCallerNumber=function()
	{
		return OcxCore.Session != null && OcxCore.Session.getExtCallerNumber() != null && OcxCore.Session.getExtCallerNumber().length()>0 ? OcxCore.Session.getExtCallerNumber() : "";
	}
	/**
	 * 分机的主叫号码对应中继组标识编码
	 * */
	This.getExtCallerRelayGrpNo=function()
	{
		return OcxCore.Session != null && OcxCore.Session.getExtCallerRelayGrpNo() != null && OcxCore.Session.getExtCallerRelayGrpNo().length()>0 ? OcxCore.Session.getExtCallerRelayGrpNo() : "";
	}
	/**
	 * 用户账号
	 * */
	This.getUserName=function()
	{
		return OcxCore.Session != null ? OcxCore.Session.getUserName() : null;
	}
	/**
	 * 用户工号
	 * */
	This.getUserCode=function()
	{
		return OcxCore.Session != null ? OcxCore.Session.getUserCode() : null;
	}
	/**
	 * 用户姓名
	 * */
	This.getRealName=function()
	{
		return OcxCore.Session != null ? OcxCore.Session.getRealName() : null;
	}
	/**
	 * 用户昵称
	 * */
	This.getNickName=function()
	{
		return OcxCore.Session != null ? OcxCore.Session.getNickName() : null;
	}
	/**
	 * 用户ID
	 * */
	This.getUserId=function()
	{
		return OcxCore.Session != null ? OcxCore.Session.getUserId() : null;
	}
	/**
	 * 公司ID
	 * */
	This.getCompanyId=function()
	{
		return OcxCore.Session != null ? OcxCore.Session.getCompanyId() : null;
	}
	/**
	 * 签入时间
	 * */
	This.getCheckinDate=function() {
		return This.checkinDate;
	}
	/**
	 * 签入时间
	 * */
	This.setCheckinDate=function(checkinDate) {
		This.checkinDate = checkinDate;
	}
	/**
	 * 签入动作ID
	 * */
	This.getCheckinOptionID=function() {
		return This.checkinOptionID;
	}
	/**
	 * 签入动作ID
	 * */
	This.setCheckinOptionID=function(checkinOptionID) {
		This.checkinOptionID = checkinOptionID;
	}
	/**
	 * 状态改变时间
	 * */
	This.getChangeStateDate=function() {
		return This.changeStateDate;
	}
	/**
	 * 状态改变时间
	 * */
	This.setChangeStateDate=function(changeStateDate) {
		This.changeStateDate = changeStateDate;
	}
	/**
	 * CTI网页客户端操作动作
	 * */
	This.getCTIAgentOption=function()
	{
		return This.CTIAgentOption;
	}
	/**
	 * CTI网页客户端操作动作
	 * */
	This.setCTIAgentOption=function( CTIAgentOption)
	{
		This.CTIAgentOption = CTIAgentOption;
	}
	/**
	 * CTI网页客户端操作动作时间
	 * */
	This.getPreOptionDate=function() {
		return This.preOptionDate;
	}
	/**
	 * CTI网页客户端操作动作时间
	 * */
	This.setPreOptionDate=function(preOptionDate) {
		This.preOptionDate = preOptionDate;
	}
	/**
	 * 上一次操作动作记录ID
	 * */
	This.getPreOptionID=function() {
		return This.preOptionID;
	}
	/**
	 * 上一次操作动作记录ID
	 * */
	This.setPreOptionID=function(preOptionID) {
		This.preOptionID = preOptionID;
	}
	
	/**
	 * 呼叫数据
	 * */
	This.getCallData=function() {
		return This.CallData;
	}
	/**
	 * 呼叫数据
	 * */
	This.setCallData=function( CallData) {
		This.CallData = CallData;
	}
	/**
	 * 暂存的待弹屏呼叫数据，用于处理通话后才弹屏时传的通话参数
	 * */
	This.getPopCallDataCache=function() {
		return This.PopCallDataCache;
	}
	/**
	 * 暂存的待弹屏呼叫数据，用于处理通话后才弹屏时传的通话参数
	 * */
	This.setPopCallDataCache=function( PopCallDataCache) {
		This.PopCallDataCache = PopCallDataCache;
	}
	
	/**
	 * 事后忙闲标记  0事后闲 1事后忙
	 * */
	This.getEndFlag=function() {
		return This.EndFlag;
	}
	/**
	 * 事后忙闲标记  0事后闲 1事后忙
	 * */
	This.setEndFlag=function( EndFlag) {
		This.EndFlag = EndFlag;
	}
	/**
	 * 是否允许置忙，默认true允许        true允许/false不允许  
	 * */
	This.getCanSetBusy=function() {
		return This.canSetBusy;
	}
	/**
	 * 是否允许置忙，默认true允许        true允许/false不允许  
	 * */
	This.setCanSetBusy=function( canSetBusy) {
		This.canSetBusy = canSetBusy;
	}
	
	
	This.getLblUsername=function() {
		return This.lblUsername;
	}
	This.getLblUserRealName=function() {
		return This.lblUserRealName;
	}
	This.getLblExtnumber=function() {
		return This.lblExtnumber;
	}
	/**
	 * CTI连接状态
	 * */
	This.getLblCTIConnectState=function() {
		if(OcxCore.Session.IsCTIConnected())
		{
			This.lblCTIConnectState.setText("正常");
		}
		else if(OcxCore.cti != undefined && OcxCore.cti.CTIServerImpl != undefined && OcxCore.cti.CTIServerImpl.getConnectState() == 2)
		{
			This.lblCTIConnectState.setText("重连中");
		}
		else
		{
			This.lblCTIConnectState.setText("断开");
		}
		
		return This.lblCTIConnectState;
	}
	This.getLblCurrentStatus=function() {
		if(OcxCore.Session.getCTIAgentStatus() != null)
		{
			if(OcxCore.Session.getCTIAgentSubStatus() > 200)
			{
				var subStatusObj = OcxCore.Session.getBusySubStateById(OcxCore.Session.getCTIAgentSubStatus());
				This.lblCurrentStatus.setText(subStatusObj != null ? subStatusObj.getSubStateName():"忙碌");
			}
			else
			{
				This.lblCurrentStatus.setText(OcxCore.Enums.GetName(OcxCore.Enums.CTIAgentStatusFlag,OcxCore.Session.getCTIAgentStatus()));
			}
			
			This.lblCurrentStatus.setAttrValue(OcxCore.Session.getCTIAgentStatus()+"");
		}else
		{
			This.lblCurrentStatus.setText(OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getName());
			This.lblCurrentStatus.setAttrValue(OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex()+"");
		}
		return This.lblCurrentStatus;
	}
	This.getLblCallNumber=function() {
		return This.lblCallNumber;
	}
	This.getLblCaller=function() {
		return This.lblCaller;
	}
	This.getLblCalled=function() {
		return This.lblCalled;
	}
	This.getLblCallType=function() {
		
		return This.lblCallType;
	}
	This.getLblWaitCount=function() {
		var waitcount = 0;
		if(This.SeatGroups.size()>0 && OcxCore.Session.getGroupManagement() != null)
		{
			This.SeatGroups.each(function(key,value,index){
				var group = OcxCore.Session.getGroupManagement().getGroup(key);
				if(group !=  null) waitcount += group.getWaitCount();
			});
		}
		This.lblWaitCount.setText(waitcount+"");
		return This.lblWaitCount;
	}
	This.getLblCallsNum=function() {
		return This.lblCallsNum;
	}
	This.getLblCallDuration=function() {
		return This.lblCallDuration;
	}
	This.getLblBusyNum=function() {
		return This.lblBusyNum;
	}
	This.getLblTransferNum=function() {
		return This.lblTransferNum;
	}
	This.getLblTimeoutNum=function() {
		return This.lblTimeoutNum;
	}
	This.getLblStateDuration=function() {
		
		if(This.changeStateDate != null)
		{
			var diffSeconds=0;
			try {
				var date3=OcxCore.utils.getNowDate().getTime()-This.changeStateDate.getTime();  //时间差的毫秒数
				diffSeconds = Math.round(date3/1000);
			} catch (e) {
				
			}
			This.lblStateDuration.setText(OcxCore.FormatSeconds(diffSeconds));
			This.lblStateDuration.setAttrValue(diffSeconds);
		}else
		{
			This.lblStateDuration.setText("--:--:--");
			This.lblStateDuration.setAttrValue("");
		}
		return This.lblStateDuration;
	}
	
	This.getBtnStopEndProc=function() {
		return This.btnStopEndProc;
	}
	This.getBtnFree=function() {
		return This.btnFree;
	}
	This.getBtnBusy=function() {
		return This.btnBusy;
	}
	This.getBtnSetBusyApply=function() {
		return This.btnSetBusyApply;
	}
	This.getBtnAnswer=function() {
		return This.btnAnswer;
	}
	This.getBtnOutCall=function() {
		return This.btnOutCall;
	}
	This.getBtnHugeup=function() {
		return This.btnHugeup;
	}
	//开始事后整理
	This.getBtnStartEndProc=function() {
		return This.btnStartEndProc;
	}
	//满意度调查
	This.getBtnSatisfaction=function() {
		return This.btnSatisfaction;
	}
	//离开
	This.getBtnLeaveMode=function() {
		return This.btnLeaveMode;
	}
	//恢复
	This.getBtnNormalMode=function() {
		return This.btnNormalMode;
	}
	This.getBtnConsult=function() {
		return This.btnConsult;
	}
	This.getBtnTransfer=function() {
		return This.btnTransfer;
	}
	This.getBtnGetBack=function() {
		return This.btnGetBack;
	}
	This.getBtnHold=function() {
		return This.btnHold;
	}
	This.getBtnConf=function() {
		return This.btnConf;
	}
	This.getBtnFreeAfter=function() {
		return This.btnFreeAfter;
	}
	This.getBtnBusyAfter=function() {
		return This.btnBusyAfter;
	}
	This.getBtnIntercept=function() {
		return This.btnIntercept;
	}
	This.getBtnMonitor=function() {
		return This.btnMonitor;
	}
	This.getBtnCheckin=function() {
		return This.btnCheckin;
	}
	This.getBtnCheckout=function() {
		return This.btnCheckout;
	}
	
	This.getBtnListen=function() {
		return This.btnListen;
	}
	This.getBtnOperationInCall=function() {
		return This.btnOperationInCall;
	}
	This.setBtnListen=function(btnListen) {
		This.btnListen = btnListen;
	}

	This.getBtnStopListen=function() {
		return This.btnStopListen;
	}

	This.getBtnForceEnter=function() {
		return This.btnForceEnter;
	}

	This.getBtnForceRemove=function() {
		return This.btnForceRemove;
	}

	This.getBtnForceSetIdle=function() {
		return This.btnForceSetIdle;
	}

	This.getBtnForceSetBusy=function() {
		return This.btnForceSetBusy;
	}

	This.getBtnMoniterConf=function() {
		return This.btnMoniterConf;
	}

	This.getBtnStopMonitorConf=function() {
		return This.btnStopMonitorConf;
	}

	This.getBtnSendTipMsg=function() {
		return This.btnSendTipMsg;
	}

	This.getBtnForceCheckOut=function() {
		return This.btnForceCheckOut;
	}

	This.setLblUsername=function(lblUsername) {
		This.lblUsername = lblUsername;
	}

	This.setLblUserRealName=function(lblUserRealName) {
		This.lblUserRealName = lblUserRealName;
	}

	This.setLblExtnumber=function(lblExtnumber) {
		This.lblExtnumber = lblExtnumber;
	}

	This.setLblCurrentStatus=function(lblCurrentStatus) {
		This.lblCurrentStatus = lblCurrentStatus;
	}

	This.setLblCaller=function(lblCaller) {
		This.lblCaller = lblCaller;
	}

	This.setLblCalled=function(lblCalled) {
		This.lblCalled = lblCalled;
	}

	This.setLblWaitCount=function(lblWaitCount) {
		This.lblWaitCount = lblWaitCount;
	}

	This.setLblCallsNum=function(lblCallsNum) {
		This.lblCallsNum = lblCallsNum;
	}

	This.setLblCallDuration=function(lblCallDuration) {
		This.lblCallDuration = lblCallDuration;
	}

	This.setLblBusyNum=function(lblBusyNum) {
		This.lblBusyNum = lblBusyNum;
	}

	This.setLblTransferNum=function(lblTransferNum) {
		This.lblTransferNum = lblTransferNum;
	}

	This.setLblTimeoutNum=function(lblTimeoutNum) {
		This.lblTimeoutNum = lblTimeoutNum;
	}

	This.setLblStateDuration=function(lblStateDuration) {
		This.lblStateDuration = lblStateDuration;
	}

	This.setBtnFree=function(btnFree) {
		This.btnFree = btnFree;
	}

	This.setBtnBusy=function(btnBusy) {
		This.btnBusy = btnBusy;
	}
	This.setBtnSetBusyApply=function(btnSetBusyApply) {
		This.btnSetBusyApply = btnSetBusyApply;
	}
	This.setBtnAnswer=function(btnAnswer) {
		This.btnAnswer = btnAnswer;
	}

	This.setBtnOutCall=function(btnOutCall) {
		This.btnOutCall = btnOutCall;
	}

	This.setBtnHugeup=function(btnHugeup) {
		This.btnHugeup = btnHugeup;
	}

	This.setBtnConsult=function(btnConsult) {
		This.btnConsult = btnConsult;
	}

	This.setBtnTransfer=function(btnTransfer) {
		This.btnTransfer = btnTransfer;
	}

	This.setBtnGetBack=function(btnGetBack) {
		This.btnGetBack = btnGetBack;
	}

	This.setBtnHold=function(btnHold) {
		This.btnHold = btnHold;
	}

	This.setBtnConf=function(btnConf) {
		This.btnConf = btnConf;
	}

	This.setBtnFreeAfter=function(btnFreeAfter) {
		This.btnFreeAfter = btnFreeAfter;
	}

	This.setBtnBusyAfter=function(btnBusyAfter) {
		This.btnBusyAfter = btnBusyAfter;
	}

	This.setBtnIntercept=function(btnIntercept) {
		This.btnIntercept = btnIntercept;
	}

	This.setBtnMonitor=function(btnMonitor) {
		This.btnMonitor = btnMonitor;
	}

	This.setBtnCheckin=function(btnCheckin) {
		This.btnCheckin = btnCheckin;
	}

	This.setBtnCheckout=function(btnCheckout) {
		This.btnCheckout = btnCheckout;
	}

	/**
	 * 账户信息和状态JSON
	 * */
//	This.AccountInfoJson=function()
//	{
//		JsonMsgModel jsmsg = new JsonMsgModel();
//		if(This.accountState.getAccountInfo() != null)
//		{
//			jsmsg.append(new JsonText(This.accountState.getAccountInfo().DetailsJson()));
//		}
//		return jsmsg.toJsonString();
//	}
	/**
	 * 呼叫数据JSON
	 * */
//	This.CallDataInfoJson=function()
//	{
//		return CallData.toJsonString();
//	}
	/**
	 * CTIAgent标签信息JSON字符串
	 * */
	This.LabelsJson=function()
	{
		var jsmsg = {};

		jsmsg[This.lblUsername.getId()]=This.getLblUsername().getLabelJson();
		jsmsg[This.lblUserRealName.getId()]=This.getLblUserRealName().getLabelJson();
		jsmsg[This.lblExtnumber.getId()]=This.getLblExtnumber().getLabelJson();
		jsmsg[This.lblCTIConnectState.getId()]=This.getLblCTIConnectState().getLabelJson();
		jsmsg[This.lblCurrentStatus.getId()]=This.getLblCurrentStatus().getLabelJson();
		var lblCallerJson = This.getLblCaller().getLabelJson();
		if(This.getCallData().getCallType() == 0 && OcxCore.Session.getHideMiddlePhone() && OcxCore.utils.isNotNull(lblCallerJson.Text))
		{
			if( OcxCore.Session.getConfig("HideMiddlePhoneMode") == 2)
			{
				lblCallerJson.Text = OcxCore.utils.hiddenPhoneByStar(lblCallerJson.Text);
			}
			else
			{
				lblCallerJson.Text = OcxCore.utils.hiddenPhone(lblCallerJson.Text);
			}
		}
		jsmsg[This.lblCaller.getId()]=lblCallerJson;
		var lblCalledJson = This.getLblCalled().getLabelJson();
		if(This.getCallData().getCallType() != 0 && OcxCore.Session.getHideMiddlePhone() && OcxCore.utils.isNotNull(lblCalledJson.Text))
		{
			if( OcxCore.Session.getConfig("HideMiddlePhoneMode") == 2)
			{
				lblCalledJson.Text = OcxCore.utils.hiddenPhoneByStar(lblCalledJson.Text);
			}
			else
			{
				lblCalledJson.Text = OcxCore.utils.hiddenPhone(lblCalledJson.Text);
			}
		}
		jsmsg[This.lblCalled.getId()]=lblCalledJson;
		var lblCallNumberJson = This.getLblCallNumber().getLabelJson();
		if(OcxCore.Session.getHideMiddlePhone() && OcxCore.utils.isNotNull(lblCallNumberJson.Text))
		{
            if( OcxCore.Session.getConfig("HideMiddlePhoneMode") == 2)
            {
                lblCallNumberJson.Text = OcxCore.utils.hiddenPhoneByStar(lblCallNumberJson.Text);
            }
            else
            {
                lblCallNumberJson.Text = OcxCore.utils.hiddenPhone(lblCallNumberJson.Text);
            }
		}
		jsmsg[This.lblCallNumber.getId()]=lblCallNumberJson;
		var lblCallTypeJson = This.getLblCallType().getLabelJson();
		if(lblCallNumberJson.Text != "")
		{
			if(This.getCallData().getCallType() != 0)
			{
				lblCallTypeJson.Text = "呼出";
			}
			else
			{
				lblCallTypeJson.Text = "呼入";
			}
		}
		else
		{
			lblCallTypeJson.Text = "";
		}
		
		jsmsg[This.lblCallType.getId()]=lblCallTypeJson;
		
		jsmsg[This.lblWaitCount.getId()]=This.getLblWaitCount().getLabelJson();
		jsmsg[This.lblCallsNum.getId()]=This.getLblCallsNum().getLabelJson();
		jsmsg[This.lblCallDuration.getId()]=This.getLblCallDuration().getLabelJson();
		jsmsg[This.lblBusyNum.getId()]=This.getLblBusyNum().getLabelJson();
		jsmsg[This.lblTransferNum.getId()]=This.getLblTransferNum().getLabelJson();
		jsmsg[This.lblTimeoutNum.getId()]=This.getLblTimeoutNum().getLabelJson();
		jsmsg[This.lblStateDuration.getId()]=This.getLblStateDuration().getLabelJson();
		
		return jsmsg;
	}
	
	/**
	 * CTIAgent按钮栏JSON字符串
	 * */
	This.ButtonsJson=function()
	{
		var jsmsg = {};

		jsmsg[This.btnStopEndProc.getId()]=This.btnStopEndProc.getButtonJson();
		jsmsg[This.btnFree.getId()]=This.btnFree.getButtonJson();
		jsmsg[This.btnBusy.getId()]=This.btnBusy.getButtonJson();
		jsmsg[This.btnSetBusyApply.getId()]=This.btnSetBusyApply.getButtonJson();
		jsmsg[This.btnAnswer.getId()]=This.btnAnswer.getButtonJson();
		jsmsg[This.btnOutCall.getId()]=This.btnOutCall.getButtonJson();
		jsmsg[This.btnHugeup.getId()]=This.btnHugeup.getButtonJson();
		jsmsg[This.btnStartEndProc.getId()]=This.btnStartEndProc.getButtonJson();
		jsmsg[This.btnSatisfaction.getId()]=This.btnSatisfaction.getButtonJson();
		jsmsg[This.btnLeaveMode.getId()]=This.btnLeaveMode.getButtonJson();
		jsmsg[This.btnNormalMode.getId()]=This.btnNormalMode.getButtonJson();
		jsmsg[This.btnConsult.getId()]=This.btnConsult.getButtonJson();
		jsmsg[This.btnTransfer.getId()]=This.btnTransfer.getButtonJson();
		jsmsg[This.btnGetBack.getId()]=This.btnGetBack.getButtonJson();
		jsmsg[This.btnHold.getId()]=This.btnHold.getButtonJson();
		jsmsg[This.btnConf.getId()]=This.btnConf.getButtonJson();
		jsmsg[This.btnFreeAfter.getId()]=This.btnFreeAfter.getButtonJson();
		jsmsg[This.btnBusyAfter.getId()]=This.btnBusyAfter.getButtonJson();
		jsmsg[This.btnIntercept.getId()]=This.btnIntercept.getButtonJson();
		jsmsg[This.btnMonitor.getId()]=This.btnMonitor.getButtonJson();
		jsmsg[This.btnCheckin.getId()]=This.btnCheckin.getButtonJson();
		jsmsg[This.btnCheckout.getId()]=This.btnCheckout.getButtonJson();
		jsmsg[This.btnOperationInCall.getId()]=This.btnOperationInCall.getButtonJson();
		
		return jsmsg;
	}
	
	/**
	 * 最初OCX加载时参数状态
	 * 界面加载或与CTI服务器断开连接时的状态
	 *
	 */
	This.InitDefault=function()
	{
		//This.SeatGroups = new OcxCore.Map();
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_OFFLINE.getIndex());//CTI网页客户端状态
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.CTIMonitorStatus = OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex();//CTI网页客户端监控状态
		This.CTIMonitorExtNumber = "";//CTI网页客户端当前监控的坐席分机
		This.CTIMonExtNumAtentState = "";
		This.CTIMonitorGroupId = 0;//当前监控的技能组ID
		This.checkinDate = null;//签入时间
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		
		This.checkinOptionID = null;//签入动作ID
		This.CTIAgentOption = null;//CTI网页客户端操作动作
		This.preOptionDate = null;//CTI网页客户端操作动作时间
		This.preOptionID = null;//上一次操作动作记录ID
		
		This.CallData.initDefault();//呼叫数据
		This.PopCallDataCache = null;//暂存的待弹屏呼叫数据，用于处理通知后才弹屏时传的通话参数
		This.EndFlag = 1;//事后忙闲标记  0事后闲 1事后忙
        This.isSetIdleManualOperation = false;//是否为人工操作示闲动作
		//是否开启示忙审批，开启则默认不允许置忙
		if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval)
		{
			This.canSetBusy = false;//是否允许置忙，默认true允许        true允许/false不允许  
		}
		else
		{
			This.canSetBusy = true;//是否允许置忙，默认true允许        true允许/false不允许  
		}
		if(OcxCore.Session != null)
		{
			This.lblUsername.setText(OcxCore.Session.getUserCode());
			This.lblUserRealName.setText(OcxCore.Session.getRealName());
			if(OcxCore.Session.getExtNumber() != null && OcxCore.Session.getExtNumber()>0)
				This.lblExtnumber.setText(OcxCore.Session.getExtNumber());
			else
				This.lblExtnumber.setText("无设备");
		}else
		{
			This.lblUsername.setText("");
			This.lblUserRealName.setText("");
			This.lblExtnumber.setText("无设备");
		}
		This.lblCallNumber.setText("");//拨号号码
		This.lblCaller.setText("");//主叫
		This.lblCalled.setText("");//被叫
		This.lblCallType.setText("");//呼叫类型
		This.lblWaitCount.setText("0");//排队数
		This.lblCallsNum.setText("0");//通话次数
		This.lblCallDuration.setText("0");//通话时长
		This.lblBusyNum.setText("0");//示忙次数
		This.lblTransferNum.setText("0");//转移次数
		This.lblTimeoutNum.setText("0");//超时次数
		
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false, false,false);//整理结束
		This.btnFree.InitDefault();//示闲
		This.btnBusy.Reset(false, false,false);//示忙
		This.btnSetBusyApply.Reset(false,false,false);//示忙申请
		This.btnAnswer.Reset(false, false,false);//接听
		This.btnOutCall.InitDefault();//外呼
		This.btnHugeup.Reset(false, false,false);//挂机
		This.btnStartEndProc.Reset(false, false,false);//开始事后整理
		This.btnSatisfaction.Reset(false, false,false);//满意度调查
		This.btnLeaveMode.Reset(false, false,false);//离开
		This.btnNormalMode.Reset(false, false,false);//恢复
		This.btnConsult.InitDefault();//咨询
		This.btnTransfer.InitDefault();//转移
		This.btnGetBack.Reset(false, false,false);//找回
		This.btnHold.InitDefault();//保持
		This.btnConf.InitDefault();//三方会议
		This.btnFreeAfter.InitDefault();//事后闲
		This.btnBusyAfter.Reset(false, false,false);//事后忙
		This.btnIntercept.Reset(false, false,false);//拦截
		This.btnMonitor.InitDefault();//监控
		This.btnCheckin.Reset(true, true);//签入
		This.btnCheckout.Reset(false, false);//签出
		This.btnOperationInCall.Reset(false, false);//转IVR
		
		//---------CTIAgent坐席监控按钮栏-----------
		This.btnListen.InitDefault();//监听
		This.btnStopListen.InitDefault();//停止监听
		This.btnForceEnter.InitDefault();//强插
		This.btnForceRemove.InitDefault();//强拆
		This.btnForceSetIdle.InitDefault();//强制示闲
		This.btnForceSetBusy.InitDefault();//强制示忙
		This.btnMoniterConf.InitDefault();//监控会议
		This.btnStopMonitorConf.InitDefault();//停止监控会议
		This.btnSendTipMsg.InitDefault();//消息
		This.btnForceCheckOut.InitDefault();//强制注销
	}
	
	/**
	 * 设置CTIAgent电话按钮权限
	 *
	 */
	This.SetButtonPermission=function(map)
	{
		This.btnStopEndProc.setHasPermission(true);
		if(map.containsKey(This.btnFree.getId())) This.btnFree.setHasPermission(map.get(This.btnFree.getId()));
		if(map.containsKey(This.btnBusy.getId())) This.btnBusy.setHasPermission(map.get(This.btnBusy.getId()));
		if(map.containsKey(This.btnBusy.getId())) This.btnSetBusyApply.setHasPermission(map.get(This.btnBusy.getId()));//示忙申请
		if(map.containsKey(This.btnAnswer.getId())) This.btnAnswer.setHasPermission(map.get(This.btnAnswer.getId()));
		if(map.containsKey(This.btnOutCall.getId())) This.btnOutCall.setHasPermission(map.get(This.btnOutCall.getId()));
		if(map.containsKey(This.btnHugeup.getId())) This.btnHugeup.setHasPermission(map.get(This.btnHugeup.getId()));
		if(map.containsKey(This.btnStartEndProc.getId())) This.btnStartEndProc.setHasPermission(map.get(This.btnStartEndProc.getId()));
		if(map.containsKey(This.btnSatisfaction.getId())) This.btnSatisfaction.setHasPermission(map.get(This.btnSatisfaction.getId()));
		if(map.containsKey(This.btnConsult.getId())) This.btnConsult.setHasPermission(map.get(This.btnConsult.getId()));
		if(map.containsKey(This.btnTransfer.getId())) This.btnTransfer.setHasPermission(map.get(This.btnTransfer.getId()));
		if(map.containsKey(This.btnGetBack.getId())) This.btnGetBack.setHasPermission(map.get(This.btnGetBack.getId()));
		if(map.containsKey(This.btnHold.getId())) This.btnHold.setHasPermission(map.get(This.btnHold.getId()));
		if(map.containsKey(This.btnConf.getId())) This.btnConf.setHasPermission(map.get(This.btnConf.getId()));
		if(map.containsKey(This.btnFreeAfter.getId())) This.btnFreeAfter.setHasPermission(map.get(This.btnFreeAfter.getId()));
		if(map.containsKey(This.btnBusyAfter.getId())) This.btnBusyAfter.setHasPermission(map.get(This.btnBusyAfter.getId()));
		if(map.containsKey(This.btnIntercept.getId())) This.btnIntercept.setHasPermission(map.get(This.btnIntercept.getId()));
		if(map.containsKey(This.btnMonitor.getId())) This.btnMonitor.setHasPermission(map.get(This.btnMonitor.getId()));
		if(map.containsKey(This.btnCheckin.getId())) This.btnCheckin.setHasPermission(map.get(This.btnCheckin.getId()));
		if(map.containsKey(This.btnCheckout.getId())) This.btnCheckout.setHasPermission(map.get(This.btnCheckout.getId()));
		if(map.containsKey(This.btnOperationInCall.getId())) This.btnOperationInCall.setHasPermission(map.get(This.btnOperationInCall.getId()));
		
		if(map.containsKey(This.btnListen.getId())) 
		{
			This.btnListen.setHasPermission(map.get(This.btnListen.getId()));
			This.btnStopListen.setHasPermission(map.get(This.btnListen.getId()));
		}
		
		if(map.containsKey(This.btnForceEnter.getId())) This.btnForceEnter.setHasPermission(map.get(This.btnForceEnter.getId()));
		if(map.containsKey(This.btnForceRemove.getId())) This.btnForceRemove.setHasPermission(map.get(This.btnForceRemove.getId()));
		if(map.containsKey(This.btnForceSetIdle.getId())) This.btnForceSetIdle.setHasPermission(map.get(This.btnForceSetIdle.getId()));
		if(map.containsKey(This.btnForceSetBusy.getId())) This.btnForceSetBusy.setHasPermission(map.get(This.btnForceSetBusy.getId()));
		if(map.containsKey(This.btnMoniterConf.getId()))
		{
			This.btnMoniterConf.setHasPermission(map.get(This.btnMoniterConf.getId()));
			This.btnStopMonitorConf.setHasPermission(map.get(This.btnMoniterConf.getId()));
		}
		if(map.containsKey(This.btnSendTipMsg.getId())) This.btnSendTipMsg.setHasPermission(map.get(This.btnSendTipMsg.getId()));
		if(map.containsKey(This.btnForceCheckOut.getId())) This.btnForceCheckOut.setHasPermission(map.get(This.btnForceCheckOut.getId()));
		
		if(map.containsKey(This.btnLeaveMode.getId())) 
		{
			This.btnLeaveMode.setHasPermission(map.get(This.btnLeaveMode.getId()));
			This.btnNormalMode.setHasPermission(map.get(This.btnLeaveMode.getId()));
		}
		
		//是否开启示忙审批，开启则禁用事后忙闲设置
		if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval)
		{
			This.btnFreeAfter.setHasPermission(false);
			This.btnBusyAfter.setHasPermission(false);
		}
	}
	/**
	 * CTIAgent签入成功后的参数状态（签入成功）
	 *
	 */
	This.CheckinSuccessStatus=function()
	{
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.CTIMonitorStatus = OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex();//CTI网页客户端监控状态
		This.CTIMonitorExtNumber = "";//CTI网页客户端当前监控的坐席分机
		This.CTIMonExtNumAtentState = "";
		This.CTIMonitorGroupId = 0;//当前监控的技能组ID
		This.checkinDate = OcxCore.utils.getNowDate();//签入时间
        This.isSetIdleManualOperation = false;//是否为人工操作示闲动作
		//是否开启示忙审批，开启则禁用事后忙闲设置
		/*if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval)
		{
			This.canSetBusy = false;//是否允许置忙，默认false不允许        true允许/false不允许
		}
		else
		{
			This.canSetBusy = true;//是否允许置忙，默认false不允许        true允许/false不允许
		}*/
		
		//签入时默认状态，1空闲 2置忙，默认2
		if(OcxCore.Session.getDefaultStatus() == 2)				
		{
			This.btnBusy_click();
		}
		else
		{
			This.btnFree_click();
		}
		//签入时默认事后忙闲状态：0事后闲  1事后忙，默认1
		if(OcxCore.Session.getDefaultEndFlag() == 1)				
		{
			This.btnBusyAfter_click();
		}
		else
		{
			This.btnFreeAfter_click();
		}
		
		This.btnCheckin.Reset(true, false);//签入
		This.CallData.initDefault();//呼叫数据
		This.PopCallDataCache = null;//暂存的待弹屏呼叫数据，用于处理通知后才弹屏时传的通话参数
		if(OcxCore.Session != null)
		{
			This.lblUsername.setText(OcxCore.Session.getUserName());
			This.lblUserRealName.setText(OcxCore.Session.getRealName());
			This.lblExtnumber.setText(OcxCore.Session.getExtNumber());
		}else
		{
			This.lblUsername.setText("");
			This.lblUserRealName.setText("");
			This.lblExtnumber.setText("");
		}
		
		This.lblCallNumber.setText("");//拨号号码
		This.lblCaller.setText("");//主叫
		This.lblCalled.setText("");//被叫
		//This.lblWaitCount.setText("0");//排队数
		This.lblCallsNum.setText("0");//通话次数
		This.lblCallDuration.setText("0");//通话时长
		This.lblBusyNum.setText("0");//示忙次数
		This.lblTransferNum.setText("0");//转移次数
		This.lblTimeoutNum.setText("0");//超时次数
		
		//---------CTIAgent坐席监控按钮栏-----------
		This.btnListen.Reset(This.btnListen.getHasPermission(),This.btnListen.getHasPermission());//监听
		This.btnStopListen.Reset(This.btnStopListen.getHasPermission(),This.btnStopListen.getHasPermission());//停止监听
		This.btnForceEnter.Reset(This.btnForceEnter.getHasPermission(),This.btnForceEnter.getHasPermission());//强插
		This.btnForceRemove.Reset(This.btnForceRemove.getHasPermission(),This.btnForceRemove.getHasPermission());//强拆
		This.btnForceSetIdle.Reset(This.btnForceSetIdle.getHasPermission(),This.btnForceSetIdle.getHasPermission());//强制示闲
		This.btnForceSetBusy.Reset(This.btnForceSetBusy.getHasPermission(),This.btnForceSetBusy.getHasPermission());//强制示忙
		This.btnMoniterConf.Reset(This.btnMoniterConf.getHasPermission(),This.btnMoniterConf.getHasPermission());//监控会议
		This.btnStopMonitorConf.Reset(This.btnStopMonitorConf.getHasPermission(),This.btnStopMonitorConf.getHasPermission());//停止监控会议
		This.btnSendTipMsg.Reset(This.btnSendTipMsg.getHasPermission(),This.btnSendTipMsg.getHasPermission());//消息
		This.btnForceCheckOut.Reset(This.btnForceCheckOut.getHasPermission(),This.btnForceCheckOut.getHasPermission());//强制注销
	}
	
	/**
	 * 挂机成功后的参数状态（挂机成功）
	 *
	 */
	This.HugeUpSuccessStatus=function()
	{
        This.btnOperationInCall.Reset(false, false);//转IVR

		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.CTIMonitorStatus = OcxCore.Enums.CTIMonitorStatusFlag.INITSYSTEM.getIndex();//CTI网页客户端监控状态
		This.CTIMonitorExtNumber = "";//CTI网页客户端当前监控的坐席分机
		This.CTIMonExtNumAtentState = "";
		
		This.lblCallNumber.setText("");//拨号号码
		This.lblCaller.setText("");//主叫
		This.lblCalled.setText("");//被叫

        This.isSetIdleManualOperation = false;//是否为人工操作示闲动作
		
		//默认事后忙闲状态：0事后闲  1事后忙，默认1
		if(This.EndFlag == 1)				
		{
			This.btnBusy_click();
		}
		else
		{
			This.btnFree_click();
		}
	}
	
	/**
	 * “示闲”按钮点击后的参数状态
	 *
	 */
	This.btnFree_click=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_FREE.getIndex());//CTI网页客户端状态
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		This.CallData.initDefault();
		This.PopCallDataCache = null;//暂存的待弹屏呼叫数据，用于处理通知后才弹屏时传的通话参数
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFree.Reset(true,false);//示闲
		This.btnBusy.Reset(true,true);//示忙
		This.btnAnswer.Reset(false,false);//接听
		This.btnOutCall.Reset(false,true);//外呼
		This.btnHugeup.Reset(false,false);//挂机
		This.btnStartEndProc.Reset(false, false);//开始事后整理
		This.btnSatisfaction.Reset(false, false);//满意度调查
		This.btnConsult.Reset(false,true);//咨询
		This.btnTransfer.Reset(false,true);//转移
		This.btnGetBack.Reset(false,false);//找回
		This.btnHold.Reset(false,true);//保持
		This.btnConf.Reset(false,true);//三方会议
		This.btnFreeAfter.setEnabled(true);//事后闲
		This.btnBusyAfter.setEnabled(true);//事后忙
		//This.btnIntercept.Reset(true,true);//拦截
		This.btnMonitor.Reset(false,false);//监控
		This.btnCheckin.Reset(true, false);//签入
		This.btnCheckout.Reset(true, true);//签出
		This.btnLeaveMode.Reset(true, true);//离开
		This.btnNormalMode.Reset(false, false);//恢复
		This.btnOperationInCall.Reset(false, false);//转IVR
		
		if(OcxCore.Config.MakeCallOnIdleState != undefined && OcxCore.Config.MakeCallOnIdleState)
		{
			This.btnOutCall.Reset(true,true);//外呼
		}
		//是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙(排除示忙申请通过的)
		if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval && This.canSetBusy == false)
		{
			This.canSetBusy = false;//是否允许置忙，默认false不允许        true允许/false不允许
			This.btnSetBusyApply.Reset(true,true);//示忙申请
			This.btnBusy.Reset(false,false);//示忙
		}
		else if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval && This.canSetBusy == true)//开启示忙审批,但示忙申请通过了
		{
            //必须是人工操作示闲了才可以把canSetBusy置为false
            if(This.isSetIdleManualOperation){
                This.canSetBusy = false;//是否允许置忙，默认false不允许        true允许/false不允许
                This.btnSetBusyApply.Reset(true,true);//示忙申请
                This.btnBusy.Reset(false,false);//示忙
            }
            else{
                This.btnSetBusyApply.Reset(false,false);//示忙申请
            }
		}
		else
		{
			This.canSetBusy = true;//是否允许置忙，默认false不允许        true允许/false不允许
			This.btnSetBusyApply.Reset(false,false);//示忙申请
		}
        This.isSetIdleManualOperation = false;//是否为人工操作示闲动作
	}

	/**
	 * “示忙”按钮点击后的参数状态
	 *
	 */
	This.btnBusy_click=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex());//CTI网页客户端状态    --示忙
		if(OcxCore.Session.getCTIAgentSubStatus() == 0)
		{
			OcxCore.Session.setCTIAgentSubStatus(2);//置忙小状态
		}
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		This.CallData.initDefault();
		This.PopCallDataCache = null;//暂存的待弹屏呼叫数据，用于处理通知后才弹屏时传的通话参数
        This.isSetIdleManualOperation = false;//是否为人工操作示闲动作
		
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFree.Reset(true,true);//示闲
		if(OcxCore.Session.getCTIAgentSubStatus() > 200)//当前为小状态
		{
			This.btnBusy.Reset(true,true);//示忙
		}
		else
		{
			This.btnBusy.Reset(true,false);//示忙
		}
		This.btnSetBusyApply.Reset(false,false);//示忙申请
		This.btnAnswer.Reset(false,false);//接听
		This.btnOutCall.Reset(true,true);//外呼
		This.btnHugeup.Reset(false,false);//挂机
		This.btnStartEndProc.Reset(false, false);//开始事后整理
		This.btnSatisfaction.Reset(false, false);//满意度调查
		This.btnConsult.Reset(false,true);//咨询
		This.btnTransfer.Reset(false,true);//转移
		This.btnGetBack.Reset(false,false);//找回
		This.btnHold.Reset(false,true);//保持
		This.btnConf.Reset(false,true);//三方会议
		This.btnFreeAfter.setEnabled(true);//事后闲
		This.btnBusyAfter.setEnabled(true);//事后忙
		This.btnIntercept.Reset(false,false);//拦截
		This.btnMonitor.Reset(true,true);//监控
		This.btnCheckin.Reset(true, false);//签入
		This.btnCheckout.Reset(true, true);//签出
		This.btnLeaveMode.Reset(true, true);//离开
		This.btnNormalMode.Reset(false, false);//恢复
		This.btnOperationInCall.Reset(false, false);//转IVR

		//是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙(排除示忙申请通过的)
		/*if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval && This.canSetBusy == true)
		{
			This.canSetBusy = false;//是否允许置忙，默认false不允许        true允许/false不允许
			This.btnSetBusyApply.Reset(true,true);//示忙申请
			This.btnBusy.Reset(false,false);//示忙
		}*/
	}
	
	/**
	 * “接听”按钮点击后的参数状态
	 *
	 */
	This.btnAnswer_click=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLING.getIndex());//CTI网页客户端状态   
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFree.Reset(false,false);//示闲
		This.btnBusy.Reset(false,false);//示忙
		This.btnSetBusyApply.Reset(false,false);//示忙申请
		This.btnAnswer.Reset(false,false);//接听
		This.btnOutCall.Reset(false,false);//外呼
		This.btnHugeup.Reset(true,true);//挂机
		This.btnStartEndProc.Reset(false, false);//开始事后整理
		This.btnSatisfaction.Reset(false, false);//满意度调查
		This.btnConsult.Reset(true,true);//咨询
		This.btnTransfer.Reset(false,true);//转移
		This.btnGetBack.Reset(false,false);//找回
		This.btnHold.Reset(true,true);//保持
		This.btnConf.Reset(false,true);//三方会议
		This.btnFreeAfter.setEnabled(true);//事后闲
		This.btnBusyAfter.setEnabled(true);//事后忙
		This.btnIntercept.Reset(false,false);//拦截
		This.btnMonitor.Reset(false,false);//监控
		This.btnCheckout.Reset(false, false);//签出
		This.btnLeaveMode.Reset(false, false);//离开
		This.btnNormalMode.Reset(false, false);//恢复
		This.btnOperationInCall.Reset(false, false);//转IVR
	}

	/**
	 * “外呼”按钮点击后的参数状态
	 *
	 */
	This.btnOutCall_click=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLOUT.getIndex());//CTI网页客户端状态   
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFree.Reset(false,false);//示闲
		This.btnBusy.Reset(false,false);//示忙
		This.btnSetBusyApply.Reset(false,false);//示忙申请
		This.btnAnswer.Reset(false,false);//接听
		This.btnOutCall.Reset(false,false);//外呼
		This.btnHugeup.Reset(true,true);//挂机
		This.btnStartEndProc.Reset(false, false);//开始事后整理
		This.btnSatisfaction.Reset(false, false);//满意度调查
		This.btnConsult.Reset(false,true);//咨询
		This.btnTransfer.Reset(false,true);//转移
		This.btnGetBack.Reset(false,false);//找回
		This.btnHold.Reset(false,true);//保持
		This.btnConf.Reset(false,true);//三方会议
		This.btnFreeAfter.setEnabled(true);//事后闲
		This.btnBusyAfter.setEnabled(true);//事后忙
		This.btnIntercept.Reset(false,false);//拦截
		This.btnMonitor.Reset(false,false);//监控	
		This.btnCheckout.Reset(false, false);//签出
		This.btnLeaveMode.Reset(false, false);//离开
		This.btnNormalMode.Reset(false, false);//恢复
		This.btnOperationInCall.Reset(false, false);//转IVR
	}
	
	/**
	 * “呼入”后的参数状态
	 *
	 */
	This.CallIn_Button_Status=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLIN.getIndex());//CTI网页客户端状态   
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFree.Reset(false,false);//示闲
		This.btnBusy.Reset(false,false);//示忙
		This.btnSetBusyApply.Reset(false,false);//示忙申请
		This.btnAnswer.Reset(true,false);//接听
		This.btnOutCall.Reset(false,false);//外呼
		This.btnHugeup.Reset(true,true);//挂机
		This.btnStartEndProc.Reset(false, false);//开始事后整理
		This.btnSatisfaction.Reset(false, false);//满意度调查
		This.btnConsult.Reset(false,true);//咨询
		This.btnTransfer.Reset(false,true);//转移
		This.btnGetBack.Reset(false,false);//找回
		This.btnHold.Reset(false,true);//保持
		This.btnConf.Reset(false,true);//三方会议
		This.btnFreeAfter.setEnabled(true);//事后闲
		This.btnBusyAfter.setEnabled(true);//事后忙
		This.btnIntercept.Reset(false,false);//拦截
		This.btnMonitor.Reset(false,false);//监控
		This.btnCheckout.Reset(false, false);//签出
		This.btnLeaveMode.Reset(false, false);//离开
		This.btnNormalMode.Reset(false, false);//恢复
	}
	
	/**
	 * “通话”的参数状态
	 *
	 */
	This.Talking_Button_Status=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLING.getIndex());//CTI网页客户端状态   
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFree.Reset(false,false);//示闲
		This.btnBusy.Reset(false,false);//示忙
		This.btnSetBusyApply.Reset(false,false);//示忙申请
        This.btnAnswer.Reset(false,false);//接听
        This.btnOutCall.Reset(false,false);//外呼
        This.btnHugeup.Reset(true,true);//挂机
        This.btnConsult.Reset(true,true);//咨询
        This.btnTransfer.Reset(false,true);//转移
        This.btnGetBack.Reset(false,false);//找回
        This.btnHold.Reset(true,true);//保持
        This.btnConf.Reset(false,true);//三方会议
        This.btnFreeAfter.setEnabled(true);//事后闲
        This.btnBusyAfter.setEnabled(true);//事后忙
        This.btnIntercept.Reset(false,false);//拦截
        This.btnMonitor.Reset(false,false);//监控
        This.btnCheckout.Reset(false, false);//签出
        This.btnLeaveMode.Reset(false, false);//离开
		This.btnNormalMode.Reset(false, false);//恢复
		This.btnOperationInCall.Reset(true,true);//转IVR
		
        //根据所配置的事后整理模式控制事后整理按钮是否可用
        if(This.getCallData().getCallType() == 0)//呼入
        {
        	//事后整理模式，0禁用 1呼入 2呼出 3呼入呼出，默认0
        	if(OcxCore.Session.getEndProcMode() == 1 || OcxCore.Session.getEndProcMode() == 3)
        	{
        		This.btnStartEndProc.Reset(true, true);//开始事后整理
        	}
        }
        else//呼出
        {
        	if(OcxCore.Session.getEndProcMode() == 2 || OcxCore.Session.getEndProcMode() == 3)
        	{
        		This.btnStartEndProc.Reset(true, true);//开始事后整理
        	}
        }
        
        //根据所配置的满意度调查模式控制满意度调查按钮是否可用
    	//满意度调查模式，0关闭 1手动开启 2自动开启，默认0
    	if(OcxCore.Session.getSatisfactionMode() == 1 || OcxCore.Session.getEndProcMode() == 2)
    	{
    		This.btnSatisfaction.Reset(true, true);//满意度调查
    		try
    		{
    			//如果已过失效日期，则禁用满意度调查按钮
    			if(OcxCore.validator.isNotNull(OcxCore.Session.getSatisfactionEndTime()) && OcxCore.utils.getNowDate().getTime() > (new Date(OcxCore.Session.getSatisfactionEndTime().replace(/-/g,"\/"))).getTime())
        		{
    				This.btnSatisfaction.Reset(false, false);//满意度调查
        		}
    		}
    		catch(e)
    		{
    			
    		}
    	}

        //是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙(排除示忙申请通过的)
        if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval && This.canSetBusy == false)
        {
            This.btnSetBusyApply.Reset(true,true);//示忙申请
        }
	}
	
	/**
	 * “保持”按钮点击后的参数状态
	 *
	 */
	This.btnHold_click=function()
	{
		This.btnConsult.Reset(false,true);//咨询
		This.btnHold.Reset(false,false);//保持
		This.btnGetBack.Reset(true,true);//找回
	}
	
	/**
	 * “找回”按钮点击后的参数状态
	 *
	 */
	This.btnGetBack_click=function()
	{
		This.Talking_Button_Status();
//		CTIAgentStatus = CTIAgentStatusFlag.STATE_CALLING;//CTI网页客户端状态       --通话
//		changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
//		btnConsult.Reset(true,true);//咨询
//		btnTransfer.Reset(false,true);//转移
//		btnHold.Reset(true,true);//保持
//		btnGetBack.Reset(false,false);//找回
	}
	/**
	 * “事后闲”按钮点击后的参数状态
	 *
	 */
	This.btnFreeAfter_click=function()
	{
		This.EndFlag = 0;//事后忙闲标记  0事后闲 1事后忙
		This.btnFreeAfter.Reset(true,false);//事后闲
		This.btnBusyAfter.Reset(true,true);//事后忙
	}
	
	/**
	 * “事后忙”按钮点击后的参数状态
	 *
	 */
	This.btnBusyAfter_click=function()
	{
		This.EndFlag = 1;//事后忙闲标记  0事后闲 1事后忙
		This.btnFreeAfter.Reset(true,true);//事后闲
		This.btnBusyAfter.Reset(true,false);//事后忙
	}
	
	/**
	 * “离开”按钮点击后的参数状态
	 *
	 */
	This.btnLeaveMode_click=function()
	{
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFree.Reset(false,false);//示闲
		This.btnBusy.Reset(false,false);//示忙
		This.btnSetBusyApply.Reset(false,false);//示忙申请
		This.btnAnswer.Reset(false,false);//接听
		This.btnOutCall.Reset(false,false);//外呼
		This.btnHugeup.Reset(false,false);//挂机
		This.btnStartEndProc.Reset(false, false);//开始事后整理
		This.btnSatisfaction.Reset(false, false);//满意度调查
		This.btnConsult.Reset(false,true);//咨询
		This.btnTransfer.Reset(false,true);//转移
		This.btnGetBack.Reset(false,false);//找回
		This.btnHold.Reset(false,true);//保持
		This.btnConf.Reset(false,true);//三方会议
		This.btnFreeAfter.setEnabled(false);//事后闲
		This.btnBusyAfter.setEnabled(false);//事后忙
		This.btnIntercept.Reset(false,false);//拦截
		This.btnMonitor.Reset(false,false);//监控	
		This.btnCheckout.Reset(true, true);//签出
		This.btnLeaveMode.Reset(false, false);//离开
		This.btnNormalMode.Reset(true, true);//恢复
		This.btnOperationInCall.Reset(false, false);//转IVR
	}
	
	/**
	 * “恢复”按钮点击后的参数状态
	 *
	 */
	This.btnNormalMode_click=function()
	{
		if(OcxCore.Session.getCTIAgentStatus() == OcxCore.Enums.CTIAgentStatusFlag.STATE_BUSY.getIndex())
        {
			//--------CTIAgent按钮栏-------
			This.btnStopEndProc.Reset(false,false);//整理结束
			This.btnFree.Reset(true,true);//示闲
			if(OcxCore.Session.getCTIAgentSubStatus() > 200)//当前为小状态
			{
				This.btnBusy.Reset(true,true);//示忙
			}
			else
			{
				This.btnBusy.Reset(true,false);//示忙
			}
			This.btnSetBusyApply.Reset(false,false);//示忙申请
			This.btnAnswer.Reset(false,false);//接听
			This.btnOutCall.Reset(true,true);//外呼
			This.btnHugeup.Reset(false,false);//挂机
			This.btnStartEndProc.Reset(false, false);//开始事后整理
			This.btnSatisfaction.Reset(false, false);//满意度调查
			This.btnConsult.Reset(false,true);//咨询
			This.btnTransfer.Reset(false,true);//转移
			This.btnGetBack.Reset(false,false);//找回
			This.btnHold.Reset(false,true);//保持
			This.btnConf.Reset(false,true);//三方会议
			This.btnFreeAfter.setEnabled(true);//事后闲
			This.btnBusyAfter.setEnabled(true);//事后忙
			This.btnIntercept.Reset(false,false);//拦截
			This.btnMonitor.Reset(true,true);//监控
			This.btnCheckin.Reset(true, false);//签入
			This.btnCheckout.Reset(true, true);//签出
			This.btnLeaveMode.Reset(true, true);//离开
			This.btnNormalMode.Reset(false, false);//恢复
        }
		else
		{
			//--------CTIAgent按钮栏-------
			This.btnStopEndProc.Reset(false,false);//整理结束
			This.btnFree.Reset(true,false);//示闲
			This.btnBusy.Reset(true,true);//示忙
			This.btnAnswer.Reset(false,false);//接听
			This.btnOutCall.Reset(false,true);//外呼
			This.btnHugeup.Reset(false,false);//挂机
			This.btnStartEndProc.Reset(false, false);//开始事后整理
			This.btnSatisfaction.Reset(false, false);//满意度调查
			This.btnConsult.Reset(false,true);//咨询
			This.btnTransfer.Reset(false,true);//转移
			This.btnGetBack.Reset(false,false);//找回
			This.btnHold.Reset(false,true);//保持
			This.btnConf.Reset(false,true);//三方会议
			This.btnFreeAfter.setEnabled(true);//事后闲
			This.btnBusyAfter.setEnabled(true);//事后忙
			//This.btnIntercept.Reset(true,true);//拦截
			This.btnMonitor.Reset(false,false);//监控
			This.btnCheckin.Reset(true, false);//签入
			This.btnCheckout.Reset(true, true);//签出
			This.btnLeaveMode.Reset(true, true);//离开
			This.btnNormalMode.Reset(false, false);//恢复
			
			if(OcxCore.Config.MakeCallOnIdleState != undefined && OcxCore.Config.MakeCallOnIdleState)
			{
				This.btnOutCall.Reset(true,true);//外呼
			}
			//是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙(排除示忙申请通过的)
			if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval && This.canSetBusy == false)
			{
				This.canSetBusy = false;//是否允许置忙，默认false不允许        true允许/false不允许
				This.btnSetBusyApply.Reset(true,true);//示忙申请
				This.btnBusy.Reset(false,false);//示忙
			}
			else if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval && This.canSetBusy == true)//开启示忙审批,但示忙申请通过了
			{
				This.canSetBusy = false;//是否允许置忙，默认false不允许        true允许/false不允许
				This.btnSetBusyApply.Reset(false,false);//示忙申请
			}
			else
			{
				This.canSetBusy = true;//是否允许置忙，默认false不允许        true允许/false不允许
				This.btnSetBusyApply.Reset(false,false);//示忙申请
			}
		}
	}
	
	/**
	 * “咨询”后的参数状态
	 *
	 */
	This.Consult_Button_Status=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_CONSULT.getIndex());//CTI网页客户端状态   
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		
		//--------CTIAgent按钮栏-------
		This.btnConsult.Reset(false,true);//咨询
		This.btnTransfer.Reset(true,true);//转移
		This.btnGetBack.Reset(true,true);//找回
		This.btnHold.Reset(false,false);//保持
		This.btnConf.Reset(true,true);//三方会议
		This.btnMonitor.Reset(false,false);//监控
	}
	/**
	 * 等待咨询
	 */
	This.WaitConsult_Button_Status=function()
	{
		//OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_CONSULT.getIndex());//CTI网页客户端状态   
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		//--------CTIAgent按钮栏-------
		This.btnHugeup.Reset(true,true);//挂机
		This.btnConsult.Reset(false,true);//咨询
		This.btnGetBack.Reset(true,true);//找回
		This.btnHold.Reset(false,false);//保持
	}
	/**
	 * “会议”后的参数状态
	 *
	 */
	This.Conference_Button_Status=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_CONF.getIndex());//CTI网页客户端状态   
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		//--------CTIAgent按钮栏-------
		This.btnConsult.Reset(false,true);//咨询
		This.btnTransfer.Reset(false,true);//转移
		//This.btnGetBack.Reset(false,true);//找回
		//This.btnHold.Reset(true,true);//保持
		This.btnConf.Reset(false,true);//三方会议
		This.btnMonitor.Reset(false,false);//监控
	}
	
	/**
	 * “只允许挂机通知”后的参数状态
	 *
	 */
	This.OnlyHugeup_Button_Status=function()
	{
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFree.Reset(false,false);//示闲
		This.btnBusy.Reset(false,false);//示忙
		This.btnSetBusyApply.Reset(false,false);//示忙申请
		if(OcxCore.Session.getCTIAgentStatus() == OcxCore.Enums.CTIAgentStatusFlag.STATE_CALLIN.getIndex())
        {
			This.btnAnswer.Reset(true,false);//接听
        }
		else
		{
			This.btnAnswer.Reset(false,false);//接听
		}
		This.btnOutCall.Reset(false,false);//外呼
		This.btnHugeup.Reset(true,true);//挂机
		This.btnStartEndProc.Reset(false, false);//开始事后整理
		This.btnSatisfaction.Reset(false, false);//满意度调查
		This.btnConsult.Reset(false,true);//咨询
		This.btnTransfer.Reset(false,true);//转移
		This.btnGetBack.Reset(false,false);//找回
		This.btnHold.Reset(false,true);//保持
		This.btnConf.Reset(false,true);//三方会议
		This.btnFreeAfter.setEnabled(true);//事后闲
		This.btnBusyAfter.setEnabled(true);//事后忙
		This.btnIntercept.Reset(false,false);//拦截
		This.btnMonitor.Reset(false,false);//监控	
		This.btnCheckout.Reset(false, false);//签出
		This.btnLeaveMode.Reset(false, false);//离开
		This.btnNormalMode.Reset(false, false);//恢复

        //是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙(排除示忙申请通过的)
        if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval && This.canSetBusy == false)
        {
            This.btnSetBusyApply.Reset(true,true);//示忙申请
        }
	}
	
	/**
	 * 事后整理开始时的参数状态
	 *
	 */
	This.EndProcStart_Button_Status=function()
	{
		OcxCore.Session.setCTIAgentStatus(OcxCore.Enums.CTIAgentStatusFlag.STATE_ENDPROC.getIndex());//CTI网页客户端状态
		OcxCore.Session.setCTIAgentSubStatus(0);//副状态
		This.changeStateDate = OcxCore.utils.getNowDate();//状态改变时间
		//This.CallData.initDefault();
		This.PopCallDataCache = null;//暂存的待弹屏呼叫数据，用于处理通知后才弹屏时传的通话参数
		
		This.lblCallNumber.setText("");//拨号号码
		This.lblCaller.setText("");//主叫
		This.lblCalled.setText("");//被叫
		
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(true,true);//整理结束
		This.btnFree.Reset(true,false);//示闲
		This.btnBusy.Reset(true,false);//示忙
		This.btnSetBusyApply.Reset(false,false);//示忙申请
		This.btnAnswer.Reset(false,false);//接听
		This.btnOutCall.Reset(false,false);//外呼
		This.btnHugeup.Reset(false,false);//挂机
		This.btnStartEndProc.Reset(false, false);//开始事后整理
		This.btnSatisfaction.Reset(false, false);//满意度调查
		This.btnConsult.Reset(false,false);//咨询
		This.btnTransfer.Reset(false,false);//转移
		This.btnGetBack.Reset(false,false);//找回
		This.btnHold.Reset(false,false);//保持
		This.btnConf.Reset(false,false);//三方会议
		This.btnFreeAfter.setEnabled(false);//事后闲
		This.btnBusyAfter.setEnabled(false);//事后忙
		This.btnIntercept.Reset(false,false);//拦截
		This.btnMonitor.Reset(true,false);//监控	
		This.btnCheckout.Reset(true, false);//签出
		This.btnLeaveMode.Reset(false, false);//离开
		This.btnNormalMode.Reset(false, false);//恢复
        This.btnOperationInCall.Reset(false, false);//转IVR

        //是否开启示忙审批，开启则必须先做示忙申请，审批通过才允许示忙(排除示忙申请通过的)
        if(OcxCore.Config.SetBusyApproval != undefined && OcxCore.Config.SetBusyApproval && This.canSetBusy == false)
        {
            This.btnSetBusyApply.Reset(true,true);//示忙申请
        }
	}
	/**
	 * 事后整理结束时的参数状态
	 *
	 */
	This.EndProcStop_Button_Status=function()
	{
		//--------CTIAgent按钮栏-------
		This.btnStopEndProc.Reset(false,false);//整理结束
		This.btnFreeAfter.setEnabled(true);//事后闲
		This.btnBusyAfter.setEnabled(true);//事后忙
	}
}

/**
 * 技能组管理类
 * */
OcxCore.Model.GroupManagement = function()
{
	var This = this;
	var m_Groups = new OcxCore.Map();
	
	/**
	 * 新增队列
	 * */
	This.addGroup = function(groupId,groupName,companyId,level,sort)
	{
		var group = null;
		if (!m_Groups.containsKey(groupId))
		{
			group = new OcxCore.Model.GroupModel(groupId,groupName,companyId,level,sort);
			m_Groups.put(groupId,group);
		}
		else
		{
			group = m_Groups.get(groupId);
			group.setGroupName(groupName);
			group.setCompanyId(companyId);
			if(level != undefined) group.setLevel(level);
			if(sort != undefined) group.setSort(sort);
		}
		return group;
	}
	/**
	 * 删除队列
	 * */
	This.removeGroup = function(groupId)
	{
		if (m_Groups.containsKey(groupId))
		{
			m_Groups.remove(groupId);
		}
	}
	/**
	 * 清除所有技能组
	 * */
	This.removeAllGroups = function()
	{
		m_Groups.clear();
	}
	/**
	 * 获取技能组
	 * */
	This.getGroup = function(groupId)
	{
		if (!m_Groups.containsKey(groupId))
		{
			return null;
		}
		return m_Groups.get(groupId);
	}
	
	/**
	 * 获取指定公司所有技能组
	 * */
	This.getGroupsByCompanyId = function(CompanyId)
	{
		var groups = new OcxCore.List();
		m_Groups.each(function(key,value,index){
			var group = value;
			if(OcxCore.validator.isNotNull(CompanyId) && CompanyId == group.getCompanyId())
			{
				groups.add(group);
			}else if(OcxCore.validator.isNull(CompanyId))
			{
				groups.add(group);
			}
		});
		return groups;
	}
}
//----------实体Model end---------------


