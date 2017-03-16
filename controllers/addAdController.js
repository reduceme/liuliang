app.controller('addAdController', ['$scope', '$http', 'uploadService', 'mainService',function ($scope, $http, uploadService, mainService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';
    $scope.adList = [];

    $scope.getAdList = function () {
        $scope.adList = [];
        $http({
            method: 'get',
            url: $scope.testUrl + 'ads/',
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            $scope.adList = data.data;
            for (var i = 0; i < $scope.adList.length; i++) {
                $scope.adList[i].create_at = mainService.timeConvert($scope.adList[i].create_at);
            }
        }).error(function (data, status, headers, config) {
        })
    };
    $scope.getAdList();

    //广告图片上传
    $scope.newAd = {
        name: '',
        url: '',
        img: ''
    };
    uploadService.getUploadFile($("#addImgUpload"), 1);
    $("#addImgUpload").on('fileuploaded', function (event, data, previewId, index) {
        for (var key in data.response.data) {
            $scope.$apply(function () {
                $scope.newAd.img = data.response.data[key];
                console.log($scope.newAd);
            })
        }
    });

    $scope.addAd = function () {
        console.log($scope.newAd);
        $http({
            method: 'post',
            url: $scope.testUrl + 'ads/',
            data: $scope.newAd,
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            // console.log(data);
            $scope.getAdList();
            alert("添加成功！");
        }).error(function (data, status, headers, config) {
        })
    };
}]);