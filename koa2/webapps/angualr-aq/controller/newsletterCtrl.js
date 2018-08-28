!(function(app) {
app.controller('newsletterCtrl', ['$scope', "$state", function($scope , $state) {

	$scope.goIndex = function(m) {
		$state.go(''+m+'');
	}
}]);

})(routerApp)