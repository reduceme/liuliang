app.controller('addTypeController', ['$scope', '$http', 'mainService', function ($scope, $http, mainService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';

    $scope.getCategoryList = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'category/',
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
            // console.log($scope.categoryList);
        }).error(function (data, status, headers, config) {
        })
    }
    $scope.getCategoryList();

    $scope.newType = '';
    $scope.addType = function () {
        $http({
            method: 'post',
            url: $scope.testUrl + 'category/',
            data: {
                name: $scope.newChannel
            },
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            // console.log($scope.newChannel);
            $scope.getCategoryList();
        }).error(function (data, status, headers, config) {
        })
    };

}]);