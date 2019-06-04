<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/common/_LayoutHeader.jsp"%>
<link href="${ctx}/fastdfs/custom.css" rel="stylesheet">
<link href="${ctx}/fastdfs/fine-uploader-gallery.min.css" rel="stylesheet">
<link href="${ctx}/fastdfs/fine-uploader-new.min.css" rel="stylesheet">
<script src="${ctx}/fastdfs/all.fine-uploader.min.js"></script>
<script src="${ctx}/fastdfs/ui-scripts.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<div id="fine-uploader"></div> 
<script type="text/template" id="qq-template-gallery">
    <div class="qq-uploader-selector qq-uploader qq-gallery" qq-drop-area-text="拖拽文件至此">
        <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
            <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
        </div>
        <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
            <span class="qq-upload-drop-area-text-selector"></span>
        </div>
        <div class="qq-upload-button-selector qq-upload-button">
            <div>上传文件</div>
        </div>
        <span class="qq-drop-processing-selector qq-drop-processing">
            <span>处理拖放的文件...</span>
            <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
        </span>
        <ul class="qq-upload-list-selector qq-upload-list" role="region" aria-live="polite" aria-relevant="additions removals">
            <li>
                <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
                <div class="qq-progress-bar-container-selector qq-progress-bar-container">
                    <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>
                </div>
                <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
                <div class="qq-thumbnail-wrapper">
                    <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>
                </div>
                <button type="button" class="qq-upload-cancel-selector qq-upload-cancel">X</button>
                <button type="button" class="qq-upload-retry-selector qq-upload-retry">
                    <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>
                    	重试
                </button>

                <div class="qq-file-info">
                    <div class="qq-file-name">
                        <span class="qq-upload-file-selector qq-upload-file"></span>
                        <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>
                    </div>
                    <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
                    <span class="qq-upload-size-selector qq-upload-size"></span>
                    <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">
                        <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>
                    </button>
                    <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause">
                        <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>
                    </button>
                    <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue">
                        <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>
                    </button>
                </div>
            </li>
        </ul>

        <dialog class="qq-alert-dialog-selector">
            <div class="qq-dialog-message-selector"></div>
            <div class="qq-dialog-buttons">
                <button type="button" class="qq-cancel-button-selector">关闭</button>
            </div>
        </dialog>

        <dialog class="qq-confirm-dialog-selector">
            <div class="qq-dialog-message-selector"></div>
            <div class="qq-dialog-buttons">
                <button type="button" class="qq-cancel-button-selector">否</button>
                <button type="button" class="qq-ok-button-selector">是</button>
            </div>
        </dialog>

        <dialog class="qq-prompt-dialog-selector">
            <div class="qq-dialog-message-selector"></div>
            <input type="text">
            <div class="qq-dialog-buttons">
                <button type="button" class="qq-cancel-button-selector">退出</button>
                <button type="button" class="qq-ok-button-selector">确认</button>
            </div>
        </dialog>
    </div>
</script>
<div id="fine-uploader-gallery"></div>
<%@ include file="/common/_LayoutFooter.jsp"%>
<script>
var delete_fileinfo = new Array();
var galleryUploader = new qq.FineUploader({
	element: document.getElementById("fine-uploader-gallery"),
	template: 'qq-template-gallery',
	request: {
		//发送请求地址  参数在Request PayLoad中
		endpoint: "${ctx}/FastDFS/upload.do",
		//输入的文件name值
		inputName: "qqfile",
		method: 'POST'
	},
	thumbnails: {
		placeholders: {
			waitingPath: '/cctcloud/fastdfs/waiting-generic.png',
			notAvailablePath: '/cctcloud/fastdfs/not_available-generic.png'
		}
	},
	//校验
	validation: {
		//格式要求
		allowedExtensions: ['jpeg', 'jpg', 'gif', 'png','txt'],
		//大小限制
		sizeLimit:1024000
	},
	deleteFile: {
		//是否开启删除
		enabled: true,
		method: "POST",
		endpoint: "${ctx}/FastDFS/delete.do",
		//是否弹框提示
		forceConfirm: false
		//confirmMessage: "Are you sure you want to delete {filename}?",
		//deletingStatusText: "Deleting...",
		//deletingFailedText: "Delete failed",
		
	},
	debug: false
});
</script>
</body>
</html>