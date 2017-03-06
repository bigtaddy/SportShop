(function (global, ng) {
    'use strict';

    var shopApp = ng.module('shopApp', ['ngRoute']);

    shopApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/parts/catalog/catalog.html',
            controller:'CatalogController',
            controllerAs: 'vm'
        }).otherwise({redirectTo: '/'});

    }]);

      //  ng.bootstrap(document, ['shopApp']);

})(window, angular);
