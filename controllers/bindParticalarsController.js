app.controller('bindParticalarsController', ['$scope', '$http', 'mainService',function ($scope, $http, mainService) {

    $scope.bindParticalarsList = [
        {
            'package_name': '哈哈哈',
            'url': 'www.baidu.com',
            'pic': '1.jpg',
            'package_name_en': 'package',
            'download_count': '22',
            'status': '开',
            'selected': true
        }, {
            'package_name': '1',
            'url': 'www.google.com',
            'pic': '2.jpg',
            'package_name_en': 'package',
            'download_count': '23',
            'status': '关',
            'selected': false
        }, {
            'package_name': '2',
            'url': 'cn.bing.com',
            'pic': '3.jpg',
            'package_name_en': 'package',
            'download_count': '24',
            'status': '关',
            'selected': true
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
            $scope.bindParticalarsList[idx].selected = true;
        }else if($scope.currentDrowDown === 2){
            $scope.bindParticalarsList[idx].selected = false;
        }else{
            return;
        }
        console.log($scope.bindParticalarsList[idx]);

    };
}]);