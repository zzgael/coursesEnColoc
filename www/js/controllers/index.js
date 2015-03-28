controllers.controller("IndexCtrl", ['$rootScope', "$scope", "$stateParams", "$q", "$location", "$window", "Logger", '$ionicLoading', "$ionicSideMenuDelegate", '$ionicScrollDelegate', '$timeout', 'config', '$ionicModal','indexService','$cordovaPush','PushService','$ionicPlatform',
    function($rootScope, $scope, $stateParams, $q, $location, $window, Logger, $ionicLoading, $ionicSideMenuDelegate, $ionicScrollDelegate, $timeout, config, $ionicModal, indexService, $cordovaPush, PushService, $ionicPlatform) {
	
	//Push notification - initialize device id 
	$ionicPlatform.ready(function () {
		PushService.getDeviceId();
	});

	
	$scope.data = {};
	$scope.getData = function(){
		indexService.getDataFromServer().then(function(resp){
			$scope.data = resp;
		});
	};
	
	}
]);
