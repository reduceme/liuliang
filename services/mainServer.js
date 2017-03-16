app.factory("mainService", ["$q", "$http", "$location", function ($q, $http, $location) {
    function login(username, password) {
        window.__storage.username = username;
        var deferred = $q.defer();
        var promise = deferred.promise;
        // window.url = "http://127.0.0.1:11010/v1/";
        window.url = 'http://dzt.mmilove.com:8866/';
        $http({
            method: 'post',
            url: window.url + 'login',
            // url: "http://127.0.0.1:8866/login",
            data: {
                "username": username,
                "password": password
            }
        }).success(function (data, status, headers, config) {
            if (data.code == -1) {
                alert("账号或密码不正确！");
            } else {
                deferred.resolve(data.token);
            }
        }).error(function (data, status, headers, config) {
            deferred.reject(data);
        });
        return promise;
    }

    function isLoged(token, path) {
        if (token != "" && token) {
            var flag = true;
            $location.path(path);
        } else {
            $location.path("/login");
        }
        return flag;
    }

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
        return d.getFullYear() + "-" + formatTime((d.getMonth() + 1)) + "-" + formatTime(d.getDate()) + " " + formatTime(d.getHours()) + ":" + formatTime(d.getMinutes());
    };

    var showPopover = function (status, element, ngClass) {
        var flag = true;
        ngClass = true;
        if (!status) {
            flag = true;
            element.popover("show");
            ngClass = true;
        } else {
            flag = false;
        }
        return flag;
    };

    return {
        login: login,
        isLoged: isLoged,
        timeConvert: timeConvert,
        showPopover: showPopover
    }
}]);