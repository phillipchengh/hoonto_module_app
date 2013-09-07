'use strict';

function mods_list_ctrl($scope, Node_Module) {
	$scope.mod_panel = [];
	$scope.mod_name = "";
	$scope.mod_desc = "";
	$scope.mod_date = "";
	$scope.mod_offset = 0;
	$scope.mod_list = Node_Module.query({mod_offset: $scope.mod_offset},
		function success() {
			for (var i = 0; i < $scope.mod_list.length; i++) {
				$scope.mod_list[i].mod_index = i;
				$scope.mod_list[i].panel_button = "Add";
				$scope.mod_list[i].more_button = "More";
				$scope.mod_list[i].detail_show = false;
			}
	}, function error() {
		console.log("error worked");
	});

	$scope.button_class = function(mod) {
		if (mod.panel_button === "Add") {
			return "btn btn-info";
		} else {
			return "btn btn-inverse";
		}
	}

	$scope.post_mod = function() {
		Node_Module.save({name: $scope.mod_name, description: $scope.mod_desc},
			function(data) {
				console.log(data, status, headers, config);
				//$scope.mod_list[$scope.mod_list.length] = data;
				$scope.mod_list[$scope.mod_list.length] = {name: $scope.mod_name, description: $scope.mod_desc};
			},
			function(data, status, headers, config) {
				alert("You submitted an explosion.");
				console.error(data);
		});
		//this.mod_list = Node_Module.query();
	};

	$scope.more_toggle = function(mod) {
		if ($scope.mod_list[mod.mod_index].more_button === "More") {
			$scope.mod_list[mod.mod_index].detail_show = true;
			$scope.mod_list[mod.mod_index].more_button = "Less"
		} else {
			$scope.mod_list[mod.mod_index].detail_show = false;
			$scope.mod_list[mod.mod_index].more_button = "More"
		}
	}

	$scope.panel_op = function(mod) {
		console.log($scope.mod_list[mod.mod_index].panel_button);
		if ($scope.mod_list[mod.mod_index].panel_button === "Add") {
			$scope.mod_panel.push(mod);
			$scope.mod_list[mod.mod_index].panel_button = "Remove";
		} else if ($scope.mod_list[mod.mod_index].panel_button === "Remove") {
			$scope.mod_panel.splice($scope.mod_panel.indexOf(mod), 1);
			$scope.mod_list[mod.mod_index].panel_button = "Add";			
		}
	};

	$scope.remove_from_panel = function(mod) {
		$scope.mod_panel.splice($scope.mod_panel.indexOf(mod), 1);
		$scope.mod_list[mod.mod_index].panel_button = "Add";
	};

	$scope.show_more_mods = function() {
		$scope.mod_offset += 5;
		Node_Module.query({mod_offset: $scope.mod_offset},
			function success(data) {
				if (data.length < 1) {
					return;
				}
				for (var i = 0; i < data.length; i++) {
					data[i].mod_index = i;
					data[i].panel_button = "Add";
					data[i].more_button = "More";
					data[i].detail_show = false;
				}
				$scope.mod_list = $scope.mod_list.concat(data);
			}, function error() {
				console.log("error worked");
		});
		// });
	};
}

function mods_detail_ctrl($scope, $routeParams, Node_Module) {
	//$scope.mod_list = 
}