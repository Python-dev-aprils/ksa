!(function(app) {
app.controller('indexCtrl', ['$scope', "$state", function($scope, $state) {

	$scope.goIndex = function(m) {
		$state.go('' + m + '');
	}
	$("#slides").slidesjs({
		width: 728,
		height: 305,
		play: {
			interval: 3000,
			auto: true,
			pauseOnHover: true,
			restartDelay: 1500
		},
		navigation: {
			active: true
		},
		pagination: {
			active: false
		}
	});
	$("#slides").slidesjs('play');
}]);

})(routerApp)