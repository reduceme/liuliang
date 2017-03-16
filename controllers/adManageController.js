app.controller('adManageController', ['$scope', '$http', 'mainService', function ($scope, $http, mainService) {
//    广告目的
    $scope.adPurposes = [
        {id: 1, name: "落地页", value: 1},
        {id: 2, name: "下载地址", value: 2},
        {id: 3, name: "H5游戏", value: 3},
        {id: 4, name: "纯网页", value: 4},
    ];
//    广告目的改变
    $scope.currentPurposes = '';
    $scope.changePurposes = function (data) {
        $scope.currentPurposes = data;
    };

//    使用位置
    $scope.useLocation = [
        {id: 1, name: "启屏页", value: 1},
        {id: 2, name: "banner", value: 2},
        {id: 3, name: "滚动条", value: 3},
        {id: 4, name: "插屏", value: 4},
        {id: 5, name: "视频", value: 5}
    ];

//    选择使用位置
    $scope.currentUseLocation = '';
    $scope.changeLocation = function (data) {
        $scope.currentUseLocation = data;
    };

//    上传图片
    $scope.upImage = '';
    $scope.tempId = '';
    $scope.selectImage = function(file, id) {
        if(!$scope.upImage && !$scope.tempId){
            $scope.upLoadImg(file, id);
        }else {
            document.getElementById($scope.tempId).src = '';
            $scope.upLoadImg(file, id);
        }
    };

    $scope.upLoadImg = function (file, id) {
        if (!file.files || !file.files[0]) {
            return;
        }
        var exp = /.jpg$|.gif$|.png$/;
        if (exp.exec(file.value) == null) {
            $('#confir').modal('show');
            file.outerHTML = file.outerHTML;
            return;
        }
        $scope.tempId = id;
        $scope.reader = new FileReader();
        $scope.imgSize = (file.files[0].size / 1024).toFixed(0);
        if($scope.imgSize > 100){
            $("#showImgSize").modal('show');
            return;
        }else{
            $scope.reader.onload = function (evt) {
                document.getElementById(id).src = evt.target.result;
                $scope.upImage = evt.target.result;
            };
            $scope.reader.readAsDataURL(file.files[0]);
        }
    };

//    改变状态
    $scope.currentStatus = '';
    $scope.changeStatus = function (data) {
        $scope.currentStatus = data;
        console.log($scope.currentStatus);
    }
}]);