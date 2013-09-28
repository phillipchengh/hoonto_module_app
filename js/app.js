'use strict';

angular.module('mod_module', ['mod_services'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {templateUrl: 'module_list.html', controller: mods_list_ctrl}).
		// when('/submit', {templateUrl: '/module_submit.html', controller: mods_submit_ctrl}).
		otherwise({redirectTo: '/'});
}]);