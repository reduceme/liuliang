app.controller('addAppController', ['$scope', '$http', 'mainService', 'uploadService', function ($scope, $http, mainService, uploadService) {
    // $scope.testUrl = 'http://10.10.30.238:8866/';
    // $scope.testUrl = 'http://127.0.0.1:8866/';
    $scope.testUrl = 'http://dzt.mmilove.com:8866/';
    $scope.selectedCategory = 0;
    $scope.check = true;

    //获取下拉列表信息
    $scope.getCategoryList = function () {
        $http({
            method: 'get',
            url: $scope.testUrl + 'category/',
        }).success(function (data, status, headers, config) {
            $scope.categoryList = data.data;
            // console.log($scope.categoryList);
        }).error(function (data, status, headers, config) {
        })
    };
    $scope.getCategoryList();

    // 选择性别
    $scope.sexList = [
        {id: 1, name: "男", value: 1},
        {id: 2, name: "女", value: 2},
        {id: 3, name: "全选", value: 3}
    ];

    $scope.selectedType = {id: 3, name: "全选"};

    $scope.currentSex = 0;
    $scope.change = function (id) {
        $scope.currentSex = id;
    };

    //上传图片
    uploadService.getUploadFile($("#launchUpload"), 1);

    $("#launchUpload").on('fileuploaded', function (event, data, previewId, index) {
        for (var key in data.response.data) {
            $scope.$apply(function () {
                $scope.newApp.splash_img = data.response.data[key];
                $scope.check = false;
                // console.log($scope.newApp);
            })
        }
    });

    //添加新app
    $scope.newApp = {
        category_id: $scope.selectedCategory,
        sex: '',
        name: '',
        splash_img: ''
    };
    $scope.backId = '';
    $scope.addApp = function () {
        $scope.newApp.category_id = $scope.selectedCategory;
        $http({
            method: 'post',
            url: $scope.testUrl + 'apps/',
            data: $scope.newApp,
            headers: {
                'Authorization': 'c3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW4tc3VwZXJhZG1pbi1zdXBlcmFkbWluLXN1cGVyYWRtaW7UHYzZjwCyBOmACZjs+EJ+'
            }
        }).success(function (data, status, headers, config) {
            $scope.backId = data.data;
            // console.log(data);
        }).error(function (data, status, headers, config) {
        })
    };
}]);