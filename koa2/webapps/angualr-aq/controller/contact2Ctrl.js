!(function(app) {
app.controller('contact2Ctrl', ['$scope', "$state", function($scope , $state) {

	$scope.goIndex = function(m) {
		$state.go(''+m+'');
	}
}]);

})(routerApp)