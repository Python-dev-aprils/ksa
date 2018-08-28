!(function(app) {
app.controller('aboutCtrl', ['$scope', '$timeout', '$rootScope', '$http', '$state', function($scope, $timeout, $rootScope, $http, $state) {

	$scope.goIndex = function(m) {
		$state.go(''+m+'');
	}

}]);

})(routerApp)