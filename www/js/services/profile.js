app.service('ProfileService', ['$http', '$q', '$rootScope', 'Logger', 'config', '$angularCacheFactory',
                     function($http, $q, $rootScope, Logger, config, $angularCacheFactory){
	
	this.getData = function(params){
		return $rootScope.triggerAjax('data', params, false, null);
	};
	
}]);
