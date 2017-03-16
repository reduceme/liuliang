app.controller('dataTypeController', ['$scope', '$http', 'mainService', function ($scope, $http, mainService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';
    // $scope.selUrl = 'http://127.0.0.1:8866/category/stats?';
    $scope.selUrl = 'http://dzt.mmilove.com:8866/category/stats?';
    $scope.reset = true;
    $scope.startTime = '';
    $scope.endTime = '';

    $scope.categoryList = [];
    $scope.getCategoryList = function () {
        $http({
            method: 'get',
            url: $scope.selUrl,
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
            for (var i = 0; i < $scope.categoryList.length; i++) {
                $scope.categoryList[i].category.create_at = mainService.timeConvert($scope.categoryList[i].category.create_at);
            }
        }).error(function (data, status, headers, config) {
        });
    };
    $scope.getCategoryList();

    $scope.searchCategory = function (start, end) {
        start = $scope.startTime;
        end = $scope.endTime;
        var uriData = $scope.selUrl;
        if (start) {
            uriData += 'start=' + start.getTime() / 1000;
            if (end) {
                uriData += '&end=' + (end.getTime() + 86400000) / 1000;
            }
        } else if (end) {
            uriData += 'end=' + (end.getTime() + 86400000) / 1000;
        }
        $http({
            method: 'get',
            url: uriData
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
            for (var i = 0; i < $scope.categoryList.length; i++) {
                $scope.categoryList[i].category.create_at = mainService.timeConvert($scope.categoryList[i].category.create_at);
            }
        }).error(function (data, status, headers, config) {
        })
    };

    $scope.getSpecifyTime = function (start, end) {
        var uriData = $scope.selUrl;
        uriData += 'start=' + (start.getTime()) / 1000 + '&end=' + Math.round((end.getTime()) / 1000) + '&sex=' + $scope.currentSex;
        $http({
            method: 'get',
            url: uriData,
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
            for (var i = 0; i < $scope.categoryList.length; i++) {
                $scope.categoryList[i].category.create_at = mainService.timeConvert($scope.categoryList[i].category.create_at);
            }
        }).error(function (data, status, headers, config) {
        })
    };

    $scope.oneDay = 60 * 60 * 24 * 1000;

    //本日
    $scope.getToday = function () {
        $scope.today = new Date();
        $scope.today.setHours(0, 0, 0, 0);
        $scope.now = new Date();
        $scope.getSpecifyTime($scope.today, $scope.now);
    };

    //本周
    $scope.getWeek = function () {
        $scope.todayWeek = new Date();
        $scope.todayWeek.setHours(0, 0, 0, 0);
        $scope.lastWeek = new Date($scope.todayWeek - 7 * $scope.oneDay);
        $scope.getSpecifyTime($scope.lastWeek, $scope.todayWeek);
    };

    //30天
    $scope.getThirtieth = function () {
        $scope.todayThirtieth = new Date();
        $scope.todayThirtieth.setHours(0, 0, 0, 0);
        $scope.thirtiethDays = new Date($scope.todayThirtieth - 30 * $scope.oneDay);
        $scope.getSpecifyTime($scope.thirtiethDays, $scope.todayThirtieth);
    };

    //本月
    $scope.getCurrentMonthFirst = function () {
        $scope.todayMonth = new Date();
        $scope.todayMonth.setHours(0, 0, 0, 0);
        $scope.currentMonthFirst = new Date();
        $scope.currentMonthFirst.setDate(1);
        $scope.currentMonthFirst.setHours(0, 0, 0, 0);
        $scope.getSpecifyTime($scope.currentMonthFirst, $scope.todayMonth);
    };
}]);