(function (global, ng) {
    'use strict';

    function CatalogFactory ($http, $q) {

        var baseUrl = 'app/resources/products/';

        function mapProducts (data, destination) {
            destination = destination || [];

            data.forEach(function (product) {
                destination.push(new Product(product));
            });

            return destination;
        }

        function getProducts (productTypes) {
            var defer = $q.defer();
            var result = [];
            var promises = productTypes.map(function (productType) {
                return $http.get(baseUrl + productType + '.json')
            });

            var cancel = function () {
                defer.resolve();
            };


            $q.all(promises).then(function (promises) {
                promises.forEach(function (promise) {
                    mapProducts(promise.data, result);
                });

                defer.resolve(result);
            });

            return {
                promise: defer.promise,
                cancel: cancel
            };
        }

        this.getProductsByTypes = function getProductsByTypes (productTypes) {
            return getProducts(productTypes);
        };

        return this;
    }

    ng.module('shopApp').factory('CatalogFactory', [
        '$http',
        '$q',
        CatalogFactory
    ]);

})(window, angular);
