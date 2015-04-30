(function () {
    'use strict';
    function apiFactory ($http, $location, apiConfig) {
        function getResource (resourceName) {
            var protocol = apiConfig.protocol || $location.protocol();
            var host = apiConfig.host || $location.host();
            var port = apiConfig.port || 80;
            var prefix = apiConfig.prefix || '';
            return protocol+'://'+host+':'+port+prefix+'/'+resourceName;
        }
        return function (resource) {
            var out = {};
            ['get', 'post', 'put', 'delete'].forEach(function (method) {
                out[method] = function () {
                    var config = {};
                    angular.extend(config, {
                        withCredentials: true,
                        method: method,
                        data: arguments[0] || undefined,
                        url: getResource(resource)
                    }, arguments[1] || {});
                    return $http(config);
                };
            });
            return out;
        };
    }
    apiFactory.$inject = ['$http', '$location', 'Phonebook.apiConfig'];

    angular.module('Phonebook')
        .factory('Phonebook.api', apiFactory)
        .value('Phonebook.apiConfig', {
            port: 3000,
            prefix: ''
        });
})();