app.controller('addBindController', ['$scope', '$http', 'mainService', function ($scope, $http, mainService) {

        // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';

    //获取捆绑列表
    $scope.apkList = [];
    $scope.getApkList = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'apks/',
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            $scope.apkList = data.data;
            // console.log($scope.apkList);
            for (var i = 0; i < $scope.apkList.length; i++) {
                $scope.apkList[i].create_at = mainService.timeConvert($scope.apkList[i].create_at);
            }
            // console.log($scope.apkList);
        }).error(function (data, status, headers, config) {
        })
    };
    $scope.getApkList();

    //添加新捆绑库
    $scope.newApk = {
        name: '',
        url: '',
        package_name: ''
    };
    $scope.addApk = function () {
        $http({
            method: 'post',
            url: $scope.testUrl + 'apks/',
            data: $scope.newApk,
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            $scope.getApkList();
        }).error(function (data, status, headers, config) {
        })
    };
}]);