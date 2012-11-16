'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    	when('/', {
    		templateUrl: 'partials/index',
    		controller: IndexCtrl
    	}).
    	when('/addPost', {
    		templateUrl: 'partials/addPost',
    		controller: AddDebateCtrl
    	}).
    	when('/readPost/:id', {
    		templateUrl: 'partials/readPost',
    		controller: ReadDebateCtrl
    	}).
    	when('/editPost/:id', {
    		templateUrl: 'partials/editPost',
    		controller: EditPostCtrl
    	}).
    	when('/deletePost/:id', {
    		templateUrl: 'partials/deletePost',
    		controller: DeletePostCtrl
    	}).
    	otherwise({
    		redirectTo: '/'
    	});
    $locationProvider.html5Mode(true);
  }]);