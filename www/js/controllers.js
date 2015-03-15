angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CoursesCtrl', function($scope, $state, $ionicModal, $http, Courses) {
  	$scope.courses = [];
  	$scope.refreshCourses = function (callback)  {
  		$scope.courses = Courses.query(callback);  
  	} 

  	$scope.refreshCourses();


	$scope.create = function(course) {
	  var newCourse = new Courses(angular.extend({
	  		username : window.localStorage['prenom']
	  	},course
	  ));
	  newCourse.$save().then(function (returnedCourse) {
		  $scope.courses.push(returnedCourse);	  
		  $scope.closeModal();
		  //$scope.nouvelleCourse.item = "";
	  });
	}

	$scope.remove = function (course) {
		course.$remove().then(function() {
		  $scope.refreshCourses();
		});
	}

	$scope.refresh = function() {
	    $scope.refreshCourses(function () {
	       $scope.$broadcast('scroll.refreshComplete');
	    });
	};

	$ionicModal.fromTemplateUrl('templates/add-course.html', {
	   scope: $scope,
	   animation: 'slide-in-up'
	 }).then(function(modal) {
	   $scope.modal = modal;
	 });
	 $scope.openModal = function() {
	   $scope.modal.show();
	 };
	 $scope.closeModal = function() {
	   $scope.modal.hide();
	 };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Courses) {
  $scope.course = Courses.get($stateParams.courseId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    prenom: window.localStorage['prenom']
  };

  $scope.savePrenom = function () {
  	window.localStorage['prenom'] = $scope.settings.prenom;
  };
});
