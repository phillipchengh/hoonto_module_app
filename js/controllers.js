'use strict';

function mods_list_ctrl($scope, Node_Module) {
	$scope.mods = Node_Module.query({mod_id:'mods.json'});
	$scope.mod_name = "";
	$scope.mod_id = "";
	$scope.post_mod = function() {
		alert("You submitted " + this.mod_name + " with id: " + this.mod_id);
		//this.mods = Node_Module.query({mod_id:'mods.json'});
		var index = this.mods.length;
		this.mods[index] = new Object();
		this.mods[index].name = this.mod_name;
		this.mods[index].id = this.mod_id;
		this.mods.$save();
	};
}

function mods_detail_ctrl($scope, $routeParams, Node_Module) {
	//$scope.mods = 
}