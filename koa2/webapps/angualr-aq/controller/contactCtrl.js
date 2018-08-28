!(function(app) {
app.controller('contactCtrl', ['$scope', "$state", function($scope , $state) {

	$scope.goIndex = function(m) {
		$state.go(''+m+'');
	}
}]);

})(routerApp)