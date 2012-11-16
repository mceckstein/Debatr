'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
	$http.get('/api/getAllDebates').
	success(function(data, status, headers, config) {
		$scope.debates = data.debates;
	});
}

function AddDebateCtrl($scope, $http, $location) {
	$scope.form = {};
	$scope.submitDebate = function() {
		$http.post('/api/addDebate', $scope.form).
		success(function(data) {
			$location.url('/readPost/' + data.id);
		});
	};
}

function ReadDebateCtrl($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $scope.form.id = $routeParams.id;
    $http.get('/api/readDebate/' + $routeParams.id).
    success(function(data) {
        $scope.debate = data.debate;
        $scope.yays = [];
        $scope.nays = [];

        data.responses.forEach(function(response) {
            if (response.isYay) {
                $scope.yays.push(response);
            }
            else {
                $scope.nays.push(response);
            }
        });
    });

    $scope.addYayResponse = function() {
        var newResponse = {
            "debateId": $scope.form.id,
            "user": $scope.form.username,
            "text": $scope.form.text,
            "isYay": true
        };
        $http.post('/api/addDebateResponse/' + $scope.form.id, newResponse).success(function(data) {
           window.location.reload();
        });
    };

    $scope.addNayResponse = function() {
        var newResponse = {
            "debateId": $scope.form.id,
            "user": $scope.form.username,
            "text": $scope.form.text,
            "isYay": false
        };
        $http.post('/api/addDebateResponse/' + $scope.form.id, newResponse).success(function(data) {
            window.location.reload();    
        });
    };
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
	$scope.form = {};
	$http.get('/api/question/' + $routeParams.id).
	success(function(data) {
		$scope.question = data.question;
	});

	$scope.editPost = function() {
		$http.put('/api/question/' + $routeParams.id, $scope.question).
		success(function(data) {
			$location.url('/readPost/' + $routeParams.id);
		});
	};
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
	$http.get('/api/question/' + $routeParams.id).
	success(function(data) {
		$scope.form = data.post;
	});

	$scope.deletePost = function() {
		$http.delete('/api/question/' + $routeParams.id).
		success(function(data) {
			$location.url('/');
		});
	};

	$scope.home = function() {
		$location.url('/');
	};
}