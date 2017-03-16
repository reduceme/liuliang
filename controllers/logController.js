app.controller("logController", function ($scope, $location, mainService) {
    // $scope.username = "superadmin";
    // $scope.password = "superadmin";

    $scope.login = function () {
        mainService.login($scope.username, $scope.password).then(function (result) {
            $scope.$emit("to-home", result);
            $location.path("/home");
        }, function (error) {
        })
    };
});

