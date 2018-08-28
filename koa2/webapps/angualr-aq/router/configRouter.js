routerApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', {
        url: '/index',
        views: {
            '': {
                templateUrl: 'template/index.html',
                controller:'indexCtrl',
                resolve: {
                  /*  load : loadJS("indexModule",['controller/indexCtrl.js'])*/
                }
            }
        }
    })
    .state('about', {
        url: '/about',
        views: {
            '': {
                templateUrl: 'template/about.html',
                controller:'aboutCtrl',
                resolve: {
               /*     load : loadJS("aboutModule",['controller/aboutCtrl.js'])*/
                }
            }
        }
    })
    .state('collection', {
        url: '/collection',
        views: {
            '': {
                templateUrl: 'template/collection.html',
                controller:'collectionCtrl',
                resolve: {
                  /*  load : loadJS("collectionModule",['controller/collectionCtrl.js'])*/
                }
            }
        }
    })
    .state('contact', {
        url: '/contact',
        views: {
            '': {
                templateUrl: 'template/contact.html',
                controller:'contactCtrl',
                resolve: {
                   /* load : loadJS("contactModule",['controller/contactCtrl.js'])*/
                }
            }
        }
    })
    .state('contact2', {
        url: '/contact2',
        views: {
            '': {
                templateUrl: 'template/contact2.html',
                controller:'contact2Ctrl',
                resolve: {
                   /* load : loadJS("contact2Module",['controller/contact2Ctrl.js'])*/
                }
            }
        }
    })
    .state('lookbook', {
        url: '/lookbook',
        views: {
            '': {
                templateUrl: 'template/lookbook.html',
                controller:'lookbookCtrl',
                resolve: {
                   /* load : loadJS("lookbookModule",['controller/lookbookCtrl.js'])*/
                }
            }
        }
    })
    .state('newsletter', {
        url: '/newsletter',
        views: {
            '': {
                templateUrl: 'template/newsletter.html',
                controller:'newsletterCtrl',
                resolve: {
                   /* load : loadJS("newsletterModule",['controller/newsletterCtrl.js'])*/
                }
            }
        }
    })


}]);
