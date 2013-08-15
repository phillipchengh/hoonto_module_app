'use strict';

angular.module('mod_services', ['ngResource'])
.factory('Node_Module', function($resource) {
	return $resource('query/', {}, {
		query: {method: 'GET', params: {}, isArray: true},
		save: {method: 'POST', params: {mod_name: '@mod_name', mod_desc: '@mod_desc'}}
	});
});
