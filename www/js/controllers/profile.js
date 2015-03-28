controllers.controller('ProfileCtrl', function($scope) {
  $scope.settings = {
    prenom: window.localStorage['prenom']
  };

  $scope.savePrenom = function () {
  	window.localStorage['prenom'] = $scope.settings.prenom;
  };
});
