app.controller('addChannelController', ['$scope', '$http', 'mainService', function ($scope, $http, mainService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';
    $scope.channelList = '';

    //转换时间格式的函数（毫秒转换成标准格式）
    function getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }

    //获取渠道信息
    $scope.getChannel = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'channels/',
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            $scope.channelList = data.data;
            for (var i = 0; i < $scope.channelList.length; i++) {
                $scope.channelList[i].create_at = mainService.timeConvert($scope.channelList[i].create_at);
            }
            console.log($scope.channelList);
        })
    };
    $scope.getChannel();

    /*添加渠道的header有问题，需要再次确认*/
    $scope.addChannel = function () {
        $http({
            method: 'post',
            url: $scope.testUrl + 'channels/',
            data: JSON.stringify({name: $scope.channleName}),
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            $scope.getChannel();
        }).error(function (data, status, headers, config) {
        })
    }

}]);