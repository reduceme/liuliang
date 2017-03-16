app.controller('pandectController', ['$scope', '$http', 'uploadService', function ($scope, $http, uploadService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';
    // $scope.selUrl = 'http://127.0.0.1:8866/category/stats?';
    $scope.selUrl = 'http://dzt.mmilove.com:8866/category/stats?';
    function getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }

    $scope.showTable = false;
    $scope.showCharts = false;
    $scope.showbtn = false;
    $scope.categoryID = [];
    $scope.categoryName = [];

    $scope.selectedCategory = 0;
    $scope.categoryID = [];
    $scope.categoryType = [];
    $scope.getCategory = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'category/',
        }).success(function (data, status, headers, config) {
            $scope.categoryType = data.data;
            for (var i = 0; i < $scope.categoryType.length; i++) {
                $scope.categoryID[i] = $scope.categoryType[i].id;
                $scope.categoryType[i].create_at = getLocalTime($scope.categoryType[i].create_at);
            }
        }).error(function (data, status, headers, config) {
        });
    };


    $scope.tempId = 0;
    $scope.getId = function (id) {
        $scope.tempId = id;
    };

    $scope.getCategory();
    $scope.selectCategory = [];

    $scope.getCategoryList = function () {
        $http({
            method: 'get',
            url: $scope.selUrl,
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
        }).error(function (data, status, headers, config) {
        });
    };
    $scope.getCategoryList();

    $scope.getChannel = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'channels/',
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            $scope.channelList = data.data;
            console.log($scope.channelList);
        })
    };

    $scope.getChannel();

    $scope.selectedChannel = 0;
    $scope.change = function (id) {
        $scope.selectedChannel = id;
    };

    $scope.appCountSum = 0;
    $scope.installCountSum = 0;
    $scope.openSum = 0;
    $scope.apkDownloadSum = 0;
    $scope.adOpenTime = 0;
    $scope.searchCategory = function (start, end) {
        start = $scope.startTime;
        end = $scope.endTime;
        $scope.appCountSum = 0;
        $scope.installCountSum = 0;
        $scope.openSum = 0;
        $scope.apkDownloadSum = 0;
        $scope.adOpenTime = 0;
        var uriData = $scope.selUrl;
        if (start) {
            uriData += 'start=' + start.getTime() / 1000;
            if (end) {
                uriData += '&end=' + (end.getTime() + 86400000) / 1000;
            }
            uriData += '&sex=' + $scope.currentSex;
        } else if (end) {
            uriData += 'end=' + (end.getTime() + 86400000) / 1000 + '&sex=' + $scope.currentSex;
        } else {
            uriData += 'sex=' + $scope.currentSex;
        }
        $http({
            method: 'get',
            url: uriData
        }).success(function (data, status, headers, config) {
            if(data.code != 0){
                alert(data.error);
                return;
            }
            $scope.selectCategory = [];
            $scope.categoryList = data.data;
            for (var i in $scope.categoryList) {
                if ($scope.categoryList[i].category.id == $scope.tempId) {
                    $scope.selectCategory = $scope.selectCategory.concat($scope.categoryList[i]);
                }
            }
            if ($scope.startTime && $scope.endTime) {
                $scope.showTable = true;
                $scope.showbtn = true;
            }
        }).error(function (data, status, headers, config) {
            alert(data.error);
        })
    };

//    根据时间获取每天的数据
    $scope.statsList = [];
    $scope.selectSpecificInfo = [];
    $scope.start = '';
    $scope.end = '';
    $scope.fetchStatistics = function () {
        var formatTime = function (data) {
            if (data < 10) {
                return "0" + data;
            }
            else {
                return data;
            }
        };

        var timeConvert = function (timestamp) {
            var d = new Date(timestamp * 1000);
            return d.getFullYear() + "-" + formatTime((d.getMonth() + 1)) + "-" + formatTime(d.getDate());
        };

        var internal = 24 * 60 * 60;
        $scope.start = $scope.startTime.getTime() / 1000;
        $scope.end = $scope.endTime.getTime() / 1000 + internal;
        for (var i = $scope.start; i < $scope.end; i += internal) {
            $scope.statsList = [];
            var fn = function (_s, _e) {
                $http({
                    method: 'get',
                    url: $scope.testUrl + 'category/stats?start=' + _s + '&end=' + _e,
                }).success(function (data, status, headers, config) {
                    $scope.selectSpecificInfo = [];
                    $scope.statsList.push({start: timeConvert(_s), end: timeConvert(_e), data: data.data});
                    for (var i in $scope.statsList) {
                        for (var j = 0; j < $scope.statsList[i].data.length; j++) {
                            if ($scope.statsList[i].data[j].category.id == $scope.tempId) {
                                $scope.selectSpecificInfo = $scope.selectSpecificInfo.concat($scope.statsList[i].data[j]);
                                $scope.selectSpecificInfo[i].start = $scope.statsList[i].start;
                            }
                        }
                    }
                    console.log($scope.selectSpecificInfo);
                    /*$scope.selectSpecificInfo.sort(function(x, y){
                        return x[6].localeCompare(y[6]);
                    });
                    console.log($scope.selectSpecificInfo);*/
                    $scope.splitArr();
                }).error(function (data, status, headers, config) {
                });
            };
            var s = i;
            var e = i + internal;

            fn(s, e);
        }
    };

    $scope.fnShowCharts = function () {
        if ($scope.showCharts === false && $scope.showTable === true) {
            $scope.showCharts = !$scope.showCharts;
            $scope.showTable = !$scope.showTable;
        }
    };

    $scope.fnShowTable = function () {
        if ($scope.showCharts === true && $scope.showTable === false) {
            $scope.showCharts = !$scope.showCharts;
            $scope.showTable = !$scope.showTable;
        }
    };

    $scope.startArr = [];
    $scope.installArr = [];
    $scope.openTimeArr = [];
    $scope.adClickArr = [];
    $scope.apkDownloadArr = [];
    $scope.categoryNameArr = [];
    $scope.splitArr = function () {
        $scope.startArr = [];
        $scope.installArr = [];
        $scope.openTimeArr = [];
        $scope.adClickArr = [];
        $scope.apkDownloadArr = [];
        $scope.categoryNameArr = [];
        for (var i in $scope.selectSpecificInfo) {
            $scope.startArr.push($scope.selectSpecificInfo[i].start);
            $scope.installArr.push($scope.selectSpecificInfo[i].install_count);
            $scope.openTimeArr.push($scope.selectSpecificInfo[i].open_count);
            $scope.adClickArr.push($scope.selectSpecificInfo[i].ad_click_count);
            $scope.apkDownloadArr.push($scope.selectSpecificInfo[i].apk_download);
            $scope.categoryNameArr.push($scope.selectSpecificInfo[i].category.name);
        }
        $scope.echarts();
    };

//    图标绘制
    $scope.echarts = function () {
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            title: {},
            tooltip: {},
            //数据说明
            legend: {
                data: ['打开次数']
            },
            //X轴
            xAxis: {
                data: $scope.startArr
            },
            //Y轴
            yAxis: {},
            series: [
                {
                    name: '导流app下载量',
                    type: 'line',
                    data: $scope.apkDownloadArr
                },
                {
                    name:'导流app打开次数',
                    type:'line',
                    data: $scope.openTimeArr
                },
                {
                    name: '广告展示数',
                    type: 'line',
                    data: $scope.openTimeArr
                }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

}]);