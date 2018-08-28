!(function(app) {
app.controller('collectionCtrl', ['$scope', "$state", function($scope , $state) {

	$scope.goIndex = function(m) {
		$state.go(''+m+'');
	}
}]);

})(routerApp)