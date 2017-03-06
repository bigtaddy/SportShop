(function (global, ng) {
    'use strict';

    var PRODUCT_TYPES = [
        'men',
        'women',
        'children'
    ];

    function CatalogController ($scope, CatalogFactory) {
        var _this = this;
        var filterProductsRequest = null;
        var catalogListElement = document.querySelector('.catalog-list');
        var cartElement = document.querySelector('.nav-menu-item-cart');
        var checkedProductTypes = PRODUCT_TYPES.slice();

        _this.products = [];

        this.filtersClickHandler = function filtersClickHandler (event, productType) {
            var filterCheckbox = event.currentTarget.querySelector('.catalog-filter-checkbox');

            var productTypeIndex = checkedProductTypes.indexOf(productType);

            if (!~productTypeIndex) {
                checkedProductTypes.push(productType);
                filterCheckbox.classList.add('checked');
            } else {
                checkedProductTypes.splice(productTypeIndex, 1);
                filterCheckbox.classList.remove('checked');
            }

            filterProducts(checkedProductTypes);
        };

        this.filterButtonClickHandler = function filterButtonClickHandler () {
            checkedProductTypes = PRODUCT_TYPES.slice();
            initFilterCheckboxes();
            filterProducts(checkedProductTypes);
        };

        function filterProducts (checkedProductTypes) {
            if (filterProductsRequest) {
                filterProductsRequest.cancel();
            }

            filterProductsRequest = CatalogFactory.getProductsByTypes(checkedProductTypes);
            filterProductsRequest.promise.then(function (result) {
                _this.products = result;
            });
        }

        function initFilterCheckboxes () {
            var filterCheckboxElements = document.querySelectorAll('.catalog-filter-checkbox');

            for (var i = 0; i < filterCheckboxElements.length; i++) {
                if (!!~checkedProductTypes.indexOf(filterCheckboxElements[i].dataset.productType)) {
                    filterCheckboxElements[i].classList.add('checked');
                }
            }

        }


        function catalogListClickHandler (event) {
            var catalogItemElement = event.target.closest('.catalog-item');

            if (catalogItemElement) {
                if (catalogItemElement.classList.contains('selected')) {
                    catalogItemElement.classList.remove('selected');

                    var selectedItem = document.querySelector('.catalog-item.selected');

                    if (!selectedItem) {
                        cartElement.classList.remove('active');
                    }
                } else {
                    cartElement.classList.add('active');
                    catalogItemElement.classList.add('selected');
                }
            }
        }

        function addListeners () {
            catalogListElement.addEventListener('click', catalogListClickHandler.bind(_this), false);
        }

        addListeners();
        initFilterCheckboxes();
        filterProducts(checkedProductTypes);

        $scope.$on('destroy', function () {
            if (filterProductsRequest) {
                filterProductsRequest.cancel();
            }
        });
    }

    ng.module('shopApp').controller('CatalogController', [
        '$scope',
        'CatalogFactory',
        CatalogController
    ]);
})(window, angular);
