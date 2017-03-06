(function (global, ng) {
    'use strict';

    function BannerScrollController ($scope, $element) {
        var requestAnimationFrameId = null;
        var element = $element[0];
        var speedFactor = 0.7;

        function clickHandler () {
            var pageYOffset = window.pageYOffset;
            var targetElement = document.querySelector('.catalog');
            var top = targetElement.getBoundingClientRect().top;
            var start = null;

            function step (time) {
                if (start === null) {
                    start = time
                }

                var progress = time - start;
                var currentScroll = pageYOffset + progress * speedFactor;

                window.scrollTo(0, currentScroll);

                if (currentScroll < pageYOffset + top) {
                    requestAnimationFrame(step)
                }
            }

            requestAnimationFrameId = requestAnimationFrame(step);
        }

        element.addEventListener('click', clickHandler, false);

        $scope.$on('destroy', function () {
            cancelAnimationFrame(requestAnimationFrameId);
        });
    }

    ng.module('shopApp').controller('BannerScrollController', [
        '$scope',
        '$element',
        BannerScrollController
    ]);

    function BannerScroll () {
        return {
            restrict: 'A',
            replace: false,
            bindToController: {},
            controllerAs: 'vm',
            controller: 'BannerScrollController',
            scope: {}
        };
    }

    ng.module('shopApp').directive('bannerScroll', [BannerScroll]);

})(window, angular);
