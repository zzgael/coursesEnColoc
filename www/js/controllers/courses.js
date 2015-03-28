controllers.controller('CoursesCtrl', function($scope, $state, $ionicModal, $http, CoursesResource) {
  	$scope.courses = [];
  	$scope.refreshCourses = function (callback)  {
  		$scope.courses = CoursesResource.query(callback);  
  		//if(!$scope.courses.length)
  	} 

  	$scope.refreshCourses();


	$scope.create = function(course) {
	  var newCourse = new CoursesResource(angular.extend({
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