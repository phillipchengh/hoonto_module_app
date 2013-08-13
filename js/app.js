'use strict';

angular.module('mod_module', ['mod_services'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {templateUrl: 'module_list.html', controller: mods_list_ctrl}).
		//when('/node_modules:module_id', {templateUrl: '/module_detail.html', controller: mods_detail_ctrl}).
		otherwise({redirectTo: '/'});
}]);