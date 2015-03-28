//http://forum.ionicframework.com/t/how-to-show-a-modal-while-receive-notifications/3294/12
app.service('PushService', ['$q', '$rootScope', '$ionicPlatform', '$cordovaPush', '$cordovaDialogs', 'Logger', function ($q, $rootScope, $ionicPlatform, $cordovaPush, $cordovaDialogs, Logger) {

	var deferred;
	
	//trigger once device id is received
	$rootScope.$on('device_id_received', function(event, args) {
		if(deferred){
			deferred.resolve({"deviceId" : args.data});
		}
	});
	
	//Get deviceId for push notifications - handled for both IOS and Android
    this.getDeviceId = function(){
		deferred = $q.defer();
		try{
			var androidConfig = {
			    "senderID":"498265655559",//replace with actual deviceId. Otherwise onNotification will not be triggered
			    "ecb":"onNotification"
			  };
				
			  var iosConfig = {
			    "badge":"true",
			    "sound":"true",
			    "alert":"true",
			    "ecb":"onNotification"
			  };
			  var config = $ionicPlatform.is("android") ? androidConfig : iosConfig;
			
			  //Remove this once senderID is added
			  if(config.senderID === "replace_with_sender_id"){
				  alert("Please pass your GCM app ID to get device id.");
			  }
			  $cordovaPush.register(config).then(function(result) {
				  if((result) !== "OK"){
					  $rootScope.$broadcast('device_id_received', {data : result});
				  }
			  }, function(err) {
				  $rootScope.$broadcast('device_id_received', {data : null});
			  });
			}catch(err){
				Logger.log(err);
				$rootScope.$broadcast('device_id_received', {data : null});
			}
		  return deferred.promise;
	};
    this.onNotification = function (event) {
    	$ionicPlatform.is("android") ? this.onNotificationGCM(event) : this.onNotificationAPN(event); 
    };
    this.onNotificationGCM = function (e) {

        switch( e.event )
        {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                $rootScope.$broadcast('device_id_received', {data : e.regid});
            }
        break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if ( eval(e.foreground) )
            {
                // if the notification contains a soundname, play it.
                var my_media = new Media("/android_asset/www/"+e.soundname);
                my_media.play();
                
                if (e.message) {
                	alert(e.message).then(function(){
		            	$rootScope.$broadcast('show_notification', {"data" : e.payload.params});
		            });
    	        }else{
    	        	$rootScope.$broadcast('show_notification', {"data" : e.payload.params});
    	        }
            }
            else
            {  
            	$rootScope.$broadcast('show_notification', {"data" : e.payload.params});
            }
            
        break;

        case 'error':
            
        break;

        default:
            
        break;
      }

    };
    this.onNotificationAPN = function (event) {
    	try{
	    	if (event.badge) {
	            $cordovaPush.setBadgeNumber(event.badge);
	        }
	    	if (eval(event.foreground)) {
		        if (event.alert){
		            alert(event.alert).then(function(){
		            	$rootScope.$broadcast('show_notification', {data : event});
		            });
		        }
		
		        if (event.sound){
		            $cordovaDialogs.beep(1);
		        }
	    	}else{
	    		$rootScope.$broadcast('show_notification', {data : event});
	    	}
    	}catch(err){
    		Logger.error(err);
    	}
    };
}]);

function onNotification(event) {
    var injector = angular.element(document.body).injector();
    injector.invoke(function (PushService) {
        PushService.onNotification(event);
    });
}