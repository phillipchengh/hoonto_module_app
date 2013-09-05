'use strict';

function mods_list_ctrl($scope, Node_Module) {
	$scope.mods = Node_Module.query();
	//$scope.mods = Node_Module.query({mod_id:'mods.json'});
	$scope.mod_name = "";
	$scope.mod_desc = "";
	$scope.mod_date = "";
	$scope.post_mod = function() {
		//this.mods = Node_Module.query({mod_id:'mods.json'});
		Node_Module.save({name: $scope.mod_name, description: $scope.mod_desc},
			function(data) {
				console.log(data, status, headers, config);
				//$scope.mods[$scope.mods.length] = data;
				$scope.mods[$scope.mods.length] = {name: $scope.mod_name, description: $scope.mod_desc};
			},
			function(data, status, headers, config) {
				alert("You submitted an explosion.");
				console.error(data);
			});
		//this.mods = Node_Module.query();
	};
}

function mods_detail_ctrl($scope, $routeParams, Node_Module) {
	//$scope.mods = 
}