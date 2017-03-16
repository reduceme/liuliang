app.controller('dailyController', ['$scope', '$http', 'mainService', function ($scope, $http, mainService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';
    // $scope.selUrl = 'http://127.0.0.1:8866/category/stats?';
    $scope.selUrl = 'http://dzt.mmilove.com:8866/category/stats?';

    $scope.showTable = false;
    $scope.selectedCategory = 0;
    $scope.categoryID = [];
    $scope.categoryName = [];

    $scope.selectedCategory = 0;
    $scope.categoryID = [];
    $scope.categoryType = [];
    /*$scope.getCategory = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'category/',
        }).success(function (data, status, headers, config) {
            $scope.categoryType = data.data;
            for (var i = 0; i < $scope.categoryType.length; i++) {
                $scope.categoryID[i] = $scope.categoryType[i].id;
                $scope.categoryType[i].create_at = mainService.timeConvert($scope.categoryType[i].create_at);
            }
        }).error(function (data, status, headers, config) {
        });
    };
    $scope.getCategory();*/

    //获取渠道信息
    $scope.channelList = [];
    $scope.getChannelList = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'channels/'
        }).success(function (data, status, headers, config) {
            if(data.code != 0){
                alert("获取失败！");
                return;
            }
            $scope.channelList = data.data;
        }).error(function (data, status, headers, config) {
            alert("获取失败！");
        })
    };

    $scope.getCategoryList = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'category/stats?'
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
        }).error(function (data, status, headers, config) {
        });
    };
    $scope.getCategoryList();

    //查询类型数据
    $scope.searchCategory = function (start, end) {
        var uriData = $scope.selUrl;
        if (start) {
            uriData += 'start=' + start.getTime() / 1000;
            if (end) {
                uriData += '&end=' + (end.getTime() + 86400000) / 1000;
            }
        } else {
            uriData += 'end=' + (end.getTime() + 86400000) / 1000;
        }
        $http({
            method: 'get',
            url: uriData
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
        }).error(function (data, status, headers, config) {
        })
    };

    //查询渠道数据
    $scope.searchChannel = function (start, end) {

    };

    //获取指定日期相关数据
    $scope.getSpecifyTime = function (start, end) {
        var uriData = $scope.selUrl;
        uriData += 'start=' + (start.getTime()) / 1000 + '&end=' + Math.round((end.getTime()) / 1000);
        $http({
            method: 'get',
            url: uriData,
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
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

    //切换
    $scope.currentWay = '类型数据';
    $scope.flagOfWay = true;
    $scope.changeWay = function () {
        $scope.flagOfWay = !$scope.flagOfWay;
        $scope.showTable = !$scope.showTable;
        if(!!$scope.flagOfWay){
            $scope.currentWay = '类型数据';
        }else{
            $scope.currentWay = '渠道数据';
        }
    }
}]);