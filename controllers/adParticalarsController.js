app.controller('adParticalarsController', ['$scope', '$http', 'mainService',function ($scope, $http, mainService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';
    // $scope.selUrl = 'http://127.0.0.1:8866/category/stats?';
    $scope.selUrl = 'http://dzt.mmilove.com:8866/category/stats?';

//    particalarsList
    $scope.adParticalarsList = [
        {
            'ad_name': '999感冒灵',
            'url': 'www.baidu.com',
            'goal': '赚钱',
            'style': '广告',
            'show_count': '23',
            'click_count': '23',
            'click_rate': '1',
            'target': '23',
            'status': '开',
            'selected': true,
        }, {
            'ad_name': '眼药水',
            'url': 'www.google.com',
            'goal': '赚钱',
            'style': '广告',
            'show_count': '23',
            'click_count': '23',
            'click_rate': '1',
            'target': '23',
            'status': '关',
            'selected': false,
        }, {
            'ad_name': '眼药水1',
            'url': 'www.google.com',
            'goal': '赚钱',
            'style': '广告',
            'show_count': '23',
            'click_count': '23',
            'click_rate': '1',
            'target': '23',
            'status': '关',
            'selected': false,
        }
    ];

//    操作下拉框
    $scope.drowDown = [
        {id: 1, value: 1, name: "开启", selected: true},
        {id: 2, value: 2, name: "关闭", selected: false}
    ];

    $scope.currentDrowDown = "";
    $scope.changeDrowDowm = function (idx, data) {
        // $scope.adParticalarsList[idx].selected = !$scope.adParticalarsList[idx].selected;
        $scope.currentDrowDown = data;
        if($scope.currentDrowDown === 1){
            $scope.adParticalarsList[idx].selected = true;
        }else if($scope.currentDrowDown === 2){
            $scope.adParticalarsList[idx].selected = false;
        }else{
            return;
        }
        console.log($scope.adParticalarsList[idx]);

    };

    /*$scope.changeAd = function (idx) {
        $scope.adInfo[idx].auto_download = !$scope.appList[idx].auto_download;
    };*/

    /*$scope.changeApk = function (idx) {
     $scope.channelListInner[idx].auto_download = !$scope.channelListInner[idx].auto_download;
     };*/

}]);