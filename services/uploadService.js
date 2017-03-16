app.service('uploadService', function () {
    this.getUploadFile = function (element, number) {
        element.fileinput({
            uploadUrl: "http://dzt.mmilove.com:8866/blob/",//上传的地址
            dropZoneEnabled: false,
            showPreview: false,
            uploadAsync: true,
            language: "zh",//设置语言
            showCaption: true,//是否显示标题
            showUpload: true, //是否显示上传按钮
            browseClass: "btn btn-default", //按钮样式
            allowedFileExtensions: [".*"], //接收的文件后缀
            maxFileCount: number,//最大上传文件数限制
            uploadAsync: true,
            // previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
            allowedPreviewTypes: null,
            // previewFileIconSettings: {
            // 	'docx': '<i class="glyphicon glyphicon-file"></i>',
            // 	'xlsx': '<i class="glyphicon glyphicon-file"></i>',
            // 	'pptx': '<i class="glyphicon glyphicon-file"></i>',
            // 	'jpg': '<i class="glyphicon glyphicon-picture"></i>',
            // 	'pdf': '<i class="glyphicon glyphicon-file"></i>',
            // 	'zip': '<i class="glyphicon glyphicon-file"></i>',
            // },
            elErrorContainer: "#errorBlock"
        });
    }
});