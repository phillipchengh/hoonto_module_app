'use strict';

function mods_list_ctrl($scope, Node_Module) {
	$scope.mods = Node_Module.query();
	//$scope.mods = Node_Module.query({mod_id:'mods.json'});
	$scope.mod_name = "";
	$scope.mod_desc = "";
	$scope.post_mod = function() {
		//alert("You submitted " + this.mod_name + " with desc: " + this.mod_desc);
		//this.mods = Node_Module.query({mod_id:'mods.json'});
		Node_Module.save({mod_name: this.mod_name, mod_desc: this.mod_desc});
		this.mods = Node_Module.query();
	};
}

function mods_detail_ctrl($scope, $routeParams, Node_Module) {
	//$scope.mods = 
}