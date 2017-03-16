app.controller('appDetailsController', ['$scope', '$http', 'uploadService', 'mainService', function ($scope, $http, uploadService, mainService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';
    $scope.channelList = '';
    $scope.categoryList = [];
    $scope.category_id = '';
    $scope.page = 0;
    $scope.pageSize = 15;
    $scope.startPage = $scope.page * $scope.pageSize;
    $scope.endPage = ($scope.page + 1) * $scope.pageSize;

    //获取下拉列表信息
    $scope.selectedCategory = 0;
    $scope.categoryID = [];
    $scope.getCategoryList = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'category/',
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
            for (var i = 0; i < $scope.categoryList.length; i++) {
                $scope.categoryID[i] = $scope.categoryList[i].id;
                $scope.categoryList[i].create_at = mainService.timeConvert($scope.categoryList[i].create_at);
            }
            $scope.showApps();
        }).error(function (data, status, headers, config) {
        });
    };
    $scope.getCategoryList();

    //选择性别
    $scope.sexList = [
        {id: 1, name: "男", value: 1},
        {id: 2, name: "女", value: 2},
        {id: 3, name: "全选", value: 3}
    ];

    $scope.selectedType = {id: 3, name: "全选", value: 3};

    $scope.currentSex = 0;
    $scope.change = function (id) {
        $scope.currentSex = id;
    };

    //排序方式
    $scope.orderList = [
        {id: 1, name: "按总下载量排序", value: 1},
        {id: 2, name: "按总打开次数排序", value: 2},
        {id: 3, name: "按总广告点击次数排序", value: 3},
        {id: 4, name: "按总捆绑包下载量排序", value: 4}
    ];

    $scope.orderStatus = {
        '1': 'install_count',
        '2': 'install_count',
        '3': 'ad_click_count',
        '4': 'apk_download',
        '5': 'create_at'
    };

    $scope.orderType = {id: 1, name: "按总下载量排序", value: 1};

    $scope.currentOrder = [];
    $scope.orderChange = function (id) {
        $scope.currentOrder = id;
    };

    $scope.orderFunc = function () {
        if ($scope.currentOrder === 1) {
            return 'install_count';
        } else if ($scope.currentOrder === 2) {
            return 'install_count';
        } else if ($scope.currentOrder === 3) {
            return 'ad_click_count';
        } else if ($scope.currentOrder === 4) {
            return 'apk_download';
        } else {
            return 'create_at';
        }
    };

    $scope.addApk = [
        {id: 1, name: "开", value: 1},
        {id: 2, name: "关", value: 2}
    ];
    $scope.selectedApkList = {id: 2, name: "关", value: 2};

    $scope.changeApk = function (idx) {
        $scope.channelListInner[idx].auto_download = !$scope.channelListInner[idx].auto_download;
    };

    $scope.changeAd = function (idx) {
        $scope.adInfo[idx].auto_download = !$scope.appList[idx].auto_download;
    };

    $scope.temp = [];
    $scope.installCountBubbleSort = 0;
    $scope.appIdList = [];
    $scope.search = function (start, end) {
        start = $scope.startTime;
        end = $scope.endTime;
        $scope.appIdList = [];
        $scope.installSum = 0;
        $scope.openInstallSum = 0;
        $scope.adClickSum = 0;
        $scope.apkDownloadSum = 0;
        var uriData = $scope.testUrl + 'category/' + $scope.selectedCategory + '/apps?';
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
            $scope.channelList = data.data;
            for (var j = 0; j < $scope.channelList.length; j++) {
                $scope.channelList[j].create_at = mainService.timeConvert($scope.channelList[j].create_at);
                $scope.appIdList.push($scope.channelList[j].id)
            }

        }).error(function (data, status, headers, config) {
        })
    };

//    获取全部app
    $scope.appList = [];
    $scope.count = [];
    $scope.appCount = 0;

    $scope.appID = [];
    $scope.showApps = function () {
        for (var i in $scope.categoryID) {
            var fn = function (index) {
                $http({
                    method: 'get',
                    url: $scope.testUrl + 'category/' + $scope.categoryID[index] + '/apps',
                }).success(function (data, status, headers, config) {
                    if(data.code != 0){
                        alert(data.code);
                        return;
                    }
                    $scope.appList[index] = data.data;
                    $scope.categoryList[index].count = $scope.appList[index].length;
                    $scope.appCount += $scope.appList[index].length;
                }).error(function (data, status, headers, config) {
                    alert(data.error);
                });
            };
            fn(i);
        }
    };

    //模态框 修改 显示渠道信息
    uploadService.getUploadFile($("#launchUpload"), 1);

    $("#launchUpload").on('fileuploaded', function (event, data, previewId, index) {
        for (var key in data.response.data) {
            $scope.$apply(function () {
                $scope.updateApp.splash_img = data.response.data[key];
                $scope.check = false;
            })
        }
    });

    //获取当前app信息
    $scope.channelListInner = [];
    $scope.currentApp = {
        name: '',
        id: ''
    };
    $scope.currentChannel = {
        id: ''
    };
    $scope.currentAppID = "";
    $scope.installInnerSum = 0;
    $scope.openInstallInnerSum = 0;
    $scope.adClickInnerSum = 0;
    $scope.apkDownloadInnerSum = 0;

    $scope.showChannel = function (id, name) {
        $scope.currentApp.name = name;
        $scope.currentApp.id = id;
        $scope.currentAppID = id;
        $scope.installInnerSum = 0;
        $scope.openInstallInnerSum = 0;
        $scope.adClickInnerSum = 0;
        $scope.apkDownloadInnerSum = 0;
        $http({
            method: 'get',
            url: $scope.testUrl + 'apps/' + id + '/channels',
        }).success(function (data, status, headers, config) {
            $scope.channelListInner = data.data;
            console.log($scope.channelListInner);
            for (var i = 0; i < $scope.channelList.length; i++) {
                $scope.channelListInner[i].isSelected = false;
                $scope.installInnerSum += $scope.channelList[i].install_count;
                $scope.openInstallInnerSum += ($scope.channelList[i].open_count + $scope.channelList[i].install_count);
                $scope.adClickInnerSum += $scope.channelList[i].ad_click_count;
                $scope.apkDownloadInnerSum += $scope.channelList[i].apk_download;
            }
        }).error(function (data, status, headers, config) {
        });
    };


//    获取指定app详细信息
    $scope.currentAppInfo = [];
    $scope.getAppInfo = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + '/apps/' + $scope.currentAppID
        }).success(function (data, status, headers, config) {
            $scope.currentAppInfo = data.data;
        }).error(function (data, status, headers, config) {
        });
    };


    $scope.adInfo = [];
    $scope.CurrentAdInfo = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + '/apps/' + $scope.currentAppID + '/channels'
        }).success(function (data, status, headers, config) {
            $scope.adInfo = data.data;
        }).error(function (data, status, headers, config) {
        })
    };

//    获取广告列表
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
                $scope.adList[i].isSelected = false;
                $scope.adList[i].create_at = mainService.timeConvert($scope.adList[i].create_at);
            }
        }).error(function (data, status, headers, config) {
        })
    };
    $scope.getAdList();

    //获取广告库
    $scope.selectedAdList = [];
    $scope.getSelectedAdList = function () {
        $scope.selectedAdList = [];
        for (var i = 0; i < $scope.adList.length; i++) {
            if ($scope.adList[i].isSelected) {
                $scope.selectedAdList.push({
                    id: $scope.adList[i].id,
                    isSelected: $scope.adList[i].isSelected,
                    name: $scope.adList[i].name
                })
            }
        }
    };

    $scope.getAdChangeale = function () {
        $scope.selectedAdList = [];
        $scope.getSelectedAdList();
    };

    $scope.selectedCategory = '';
    $scope.updateApp = {
        category_id: $scope.chooseCategory,
        sex: '',
        name: '',
        splash_img: ''
    };

    $scope.update = function () {
        var uriData = $scope.testUrl + 'apps/' + $scope.currentAppID;
        $http({
            method: 'put',
            url: uriData,
            data: $scope.updateApp,
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, config, headers) {
        }).error(function (data, status, headers, config) {
        })
    };

//    获取捆绑库
    $scope.selectedApkList = [];
    $scope.getSelectedApkList = function () {
        $scope.selectedApkList = [];
        for (var i = 0; i < $scope.apkList.length; i++) {
            if ($scope.apkList[i].isSelected) {
                $scope.selectedApkList.push({
                    id: $scope.apkList[i].id,
                    isSelected: $scope.apkList[i].isSelected,
                    name: $scope.apkList[i].name
                })
            }
        }
        console.log($scope.selectedApkList);
    };

    $scope.getChangeale = function () {
        $scope.selectedApkList = [];
        $scope.getSelectedApkList();
    };

    $scope.apkList = [];
    $scope.getApkList = function () {
        $scope.getSelectedApkList();
        $http({
            method: 'get',
            url: $scope.testUrl + 'apks/',
            data: {
                name: $scope.newChannel
            },
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            $scope.apkList = data.data;
            for (var i = 0; i < $scope.apkList.length; i++) {
                $scope.apkList[i].isSelected = false;
            }
            $scope.getSelectedApkList();
        }).error(function (data, status, headers, config) {
        })
    };
    $scope.getApkList();


//    捆绑库全部打开
    $scope.openCurrentApk = function (id) {
        $scope.channelListInner.filter(function (item) {
            return item.auto_download;
        }).forEach(function (item) {
            $http({
                method: 'post',
                url: $scope.testUrl + 'channels/apks?app_id=' + $scope.currentAppID + '&channel_id=' + item.id,
                data: JSON.stringify({
                    auto_download: true, apks: $scope.selectedApkList.map(function (apk) {
                        return apk.id;
                    })
                }),
                headers: {
                    'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
                }
            }).success(function (data, status, headers, config){
                if(data.code != 0){
                    alert(data.code);
                    return;
                }
            }).error(function (data, status, headers, config) {
                alert(data.error);
            })
        });
    };

    $scope.openCurrentAd = function (id) {
        $scope.adInfo.filter(function (item) {
            return item.auto_download
        }).forEach(function (item) {
            $http({
                method: 'post',
                url: $scope.testUrl + 'channels/ads?app_id=' + $scope.currentAppID + '&channel_id=' + item.id,
                data: JSON.stringify({
                    show_ad: true, ads: $scope.selectedAdList.map(function (ad) {
                        return ad.id
                    })
                }),
                headers: {
                    'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
                }
            }).success(function (data, status, headers, config) {
            }).error(function (data, status, headers, config) {
            })
        })
    };

    $scope.showChannelTemp = function (id, name) {
        $scope.currentApp.name = name;
        $scope.currentApp.id = id;
        $scope.currentAppID = id;
        $http({
            method: 'get',
            url: $scope.testUrl + 'apps/18' + '/channels',
        }).success(function (data, status, headers, config) {
            $scope.channelListTemp = data.data;
        }).error(function (data, status, headers, config) {
        });
    };

    $scope.openAllAd = function () {
        $scope.showChannelTemp();
        for (var i in $scope.appIdList) {
            for (var j in $scope.channelListTemp) {
                $http({
                    method: 'post',
                    url: $scope.testUrl + 'channels/ads?app_id=' + $scope.appIdList[i] + '&channel_id=' + $scope.channelListTemp[j].id,
                    data: JSON.stringify({
                        show_ad: true, ads: $scope.selectedAdList.map(function (ad) {
                            return ad.id
                        })
                    }),
                    headers: {
                        'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
                    }
                }).success(function (data, status, headers, config) {
                }).error(function (data, status, headers, config) {
                })
            }
        }
    };

    $scope.closeAllAd = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'category/ads?status=disable',
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
        })
    };

    $scope.openAllApk = function () {
        $scope.showChannelTemp();
        for (var i in $scope.appIdList) {
            for (var j = 0; j < $scope.channelListTemp.length; j++) {
                $http({
                    method: 'post',
                    url: $scope.testUrl + 'channels/apks?app_id=' + $scope.appIdList[i] + '&channel_id=' + $scope.channelListTemp[j].id,
                    data: JSON.stringify({
                        auto_download: true, apks: $scope.selectedApkList.map(function (ad) {
                            return ad.id
                        })
                    }),
                    headers: {
                        'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
                    }
                }).success(function (data, status, headers, config) {
                }).error(function (data, status, headers, config) {
                })
            }
        }
    };

    $scope.closeAllApk = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'category/apk?status=disable',
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
        })
    };
}]);