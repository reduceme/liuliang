app.controller('mainController', function ($scope, $location, mainService) {
    // serviceUrl = "";
    if (!window.__storage) {
        window.__storage = {};
    }
    $scope.isLogin = false;
    $scope.token = '';
    $scope.isNavbarShow = !$scope.isLogin;
    $scope.isSidebarFlod = $scope.isLogin;
    $scope.userid = "";

    if (!$scope.token) {
        $location.path('/log');
    }
    $scope.$on('to-home', function (event, data) {
        $scope.token = data;
        window.__token = data;
        console.log(data);
        $scope.isLogin = true;
        $scope.userid = window.__storage.username;
    });

    $scope.toggleSidebarStatus = function () {
        $scope.isSidebarFlod = !$scope.isSidebarFlod;
    };
    $scope.collapseContentNavbar = function () {
        $scope.isNavbarShow = !$scope.isNavbarShow;
    };
    $scope.isFocus = false;
    $scope.sidebarList = [{
        name: "库添加",
        id: 1,
        icon: 'fa fa-user',
        isSelected: false,
    }, {
        name: "数据管理",
        id: 2,
        icon: 'fa fa-cogs',
        isSelected: false,
    }, {
        name: "广告管理",
        id: 3,
        icon: 'fa fa-link',
        isSelected: false
    }];
    $scope.navbarList = [{
        id: 1,
        list: [{
            name: '类型添加',
            isSelected: false,
            view: '/add-type'
        }, {
            name: 'app添加',
            isSelected: false,
            view: '/add-app'
        }, {
            name: '渠道添加',
            isSelected: false,
            view: '/add-channel'
        }, {
            name: '广告库添加',
            isSelected: false,
            view: '/add-ad'
        }, {
            name: '捆绑库添加',
            isSelected: false,
            view: '/add-bind'
        }]
    }, {
        id: 2,
        list: [{
            name: '总览',
            isSelected: false,
            view: '/pandect'
        }, {
            name: 'app详情',
            isSelected: false,
            view: '/app-details'
        }, {
            name: '广告详情',
            isSelected: false,
            view: '/ad-particalars'
        }, {
            name: '捆绑详情',
            isSelecten: false,
            view: '/bind-particalars'
        }, {
            name: '日报',
            isSelected: false,
            view: '/daily'
        }, {
            name: '类型数据',
            isSelected: false,
            view: '/data-type'
        }]
    },{
        id: 3,
        list: [{
            name: '添加广告',
            isSelected: false,
            view: '/ad-manage'
        }]
    }];
    $scope.selectedNavtitle = [{
        name: '',
        list: []
    }];
    $scope.selectedSidetitle = "";
    $scope.changeNavbar = function (id, name) {
        $scope.isNavbarShow = false;
        for (var i = 0; i < $scope.navbarList.length; i++) {
            $scope.sidebarList[i].isSelected = false;
            if ($scope.navbarList[i].id == id) {
                $scope.selectedNavtitle.list = $scope.navbarList[i].list;
                $scope.sidebarList[i].isSelected = true;
            }
        }
        $scope.selectedNavtitle.name = name;
    };

    $scope.changeView = function (list, name) {
        $scope.selectedSidetitle = name;
        for (var i = 0; i < list.length; i++) {
            list[i].isSelected = false;
            if (list[i].name == name) {
                list[i].isSelected = true;
                $location.path(list[i].view);
            }
        }
    };
});