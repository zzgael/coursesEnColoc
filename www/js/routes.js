app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
	$stateProvider.state('Shopencoloc', {
		url : '/Shopencoloc',
		abstract: true,
		templateUrl : 'templates/side.html',
	}).state('Shopencoloc.login', {
		url : '/login',
		views: {
	        'menuContent' :{
	        	controller : "LoginCtrl",
	    		templateUrl : 'templates/login.html'
	        }
	      }
	}).state('Shopencoloc.courses', {
		url : '/courses',
		views: {
			'menuContent' :{
				controller : 'CoursesCtrl',
				templateUrl : 'templates/courses.html'
			}
		}
	}).state('Shopencoloc.profile', {
		url : '/profile',
		views: {
			'menuContent' :{
				controller : 'ProfileCtrl',
				templateUrl : 'templates/profile.html'
			}
		}
	})
	;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/Shopencoloc/courses');

});