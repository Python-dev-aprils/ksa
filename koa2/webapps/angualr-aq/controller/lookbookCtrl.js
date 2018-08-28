 !(function(app) {
 app.controller('lookbookCtrl', ['$scope', "$state", function($scope , $state) {

	$scope.goIndex = function(m) {
		$state.go(''+m+'');
	}
}]);

})(routerApp)
