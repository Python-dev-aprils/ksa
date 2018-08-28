var routerApp = angular.module('myApp', [ 'ui.router',"oc.lazyLoad"]);
/*var loadJS = function(moduleName, files){
    return ['$ocLazyLoad', function ($ocLazyLoad) {  
        return $ocLazyLoad.load(
            {
                name: moduleName,  //module name is "store"
                files: files
            }
        )
    }]
}*/
routerApp.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {
    $urlRouterProvider.otherwise('/index');
    //$urlRouterProvider.when("", "/login");
}]);

routerApp.run(['$rootScope','$window','$state',  "$location",'$log',"$templateCache", '$timeout',function($rootScope,$window, $state,$location, $log, $templateCache,$timeout){
    $rootScope.isLogin = false;
    $rootScope.alarmLevelArray = [];
    $rootScope.STATE = $state;

    $("#slides").slidesjs({
        width: 728,
        height: 305,
        play: {
            interval: 3000,
            auto: true,
            pauseOnHover: true,
            restartDelay: 1500
        },
        navigation:{
            active:true
        },
        pagination:{
            active:false
        }
    });
    $("#slides").slidesjs('play');
}]);

