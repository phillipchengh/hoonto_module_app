'use strict';

angular.module('mod_services', ['ngResource'])
.factory('Node_Module', function($resource) {
	return $resource('data/:mod_id', {}, {
		query: {method: 'GET', params: {mod_id: '@mod_id'}, isArray: true}
		//save: {method: 'POST', params: {mod_id: '@mod_id'}}
	});
});
