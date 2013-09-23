'use strict';

function mods_list_ctrl($scope, Node_Module) {
	$scope.mod_panel = [];
	$scope.mod_name = "";
	$scope.mod_desc = "";
	$scope.mod_date = "";
	$scope.mod_offset = 0;
	$scope.mod_order = "Downloads";
	$scope.views = {"List": "active", "Detail": "disabled", "Compare": "disabled"};
	$scope.view_state = "List";
	$scope.detail_mod;
	Node_Module.query({mod_offset: $scope.mod_offset, mod_order: $scope.mod_order},
		function success(data) {
			$scope.set_mod_info(data, 0);
			$scope.mod_list = data;
			$scope.detail_mod = $scope.mod_list[0];
	}, function error() {
		console.log("Could not query initial modules.");
	});

	$scope.set_mod_info = function(data, offset) {
		for (var i = 0; i < data.length; i++) {
			var panel_index = $scope.panel_contains(data[i].name);
			if (panel_index === -1) {
				data[i].mod_index = i + offset;
				data[i].more_button = "More";
				data[i].show_more = false;
				data[i].panel_button = "Add";
				data[i].bg_color = {backgroundColor: 'yellow'};
			} else {
				$scope.mod_panel[panel_index].mod_index = i;
				$scope.mod_panel[panel_index].more_button = "More";
				$scope.mod_panel[panel_index].show_more = false;
				data[i] = $scope.mod_panel[panel_index];
			}
		}
	}

	$scope.button_class = function(mod) {
		if (mod.panel_button === "Add") {
			return "btn btn-info";
		} else {
			return "btn btn-inverse";
		}
	}

	$scope.item_selected = function(mod) {
		console.log("item_selected_style");
		if ($scope.detail_mod === mod) {
			return {backgroundColor: '#6199bd'};
		}
		return "";
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

	$scope.change_view = function(view) {
		if ($scope.view_state === view) {
			return;
		}
		if (($scope.mod_panel.length < 1) && (view === "Detail")) {
			return;
		}
		if (($scope.mod_panel.length < 2) && (view === "Compare")) {
			return;
		}
		if ($scope.views[$scope.view_state] === "active") {
			$scope.views[$scope.view_state] = "";
		}
		$scope.view_state = view;
		$scope.views[$scope.view_state] = "active";
	}

	$scope.order_by = function(order) {
		if ($scope.mod_order === order) {
			return;
		}
		$scope.mod_offset = 0;
		$scope.mod_order = order;
		Node_Module.query({mod_offset: $scope.mod_offset, mod_order: $scope.mod_order},
		function success(data) {
			$scope.set_mod_info(data, 0);
			$scope.mod_list = data;
		}, function error() {
			console.log("Could not query initial modules.");
		});
	}

	$scope.more_toggle = function(mod) {
		if ($scope.mod_list[mod.mod_index].more_button === "More") {
			$scope.mod_list[mod.mod_index].show_more = true;
			$scope.mod_list[mod.mod_index].more_button = "Less"
		} else {
			$scope.mod_list[mod.mod_index].show_more = false;
			$scope.mod_list[mod.mod_index].more_button = "More"
		}
	}

	$scope.add_to_panel = function(mod) {
		if (($scope.mod_panel.length >= 0) && ($scope.views["Detail"] === "disabled")) {
			$scope.views["Detail"] = "";
		}
		if (($scope.mod_panel.length >= 1) && ($scope.views["Compare"] === "disabled")) {
			$scope.views["Compare"] = "";
		}
		$scope.mod_list[mod.mod_index].panel_button = "Remove";
		$scope.mod_panel.push(mod);
		return ($scope.mod_panel.length-1);
	}

	$scope.remove_from_panel = function(mod) {
		if (($scope.mod_panel.length <= 2) && ($scope.views["Compare"] !== "disabled")) {
			$scope.views["Compare"] = "disabled";
		}
		if (($scope.mod_panel.length === 1) && ($scope.view_state === "Compare")) {
			$scope.change_view("Detail");
		}
		if ($scope.mod_panel.length <= 1) {
			$scope.views["Detail"] = "disabled";
		}
		if (($scope.mod_panel.length <= 1) && ($scope.view_state !== "List")) {
			$scope.change_view("List");
		}
		$scope.mod_list[mod.mod_index].panel_button = "Add";
		if (mod === $scope.detail_mod) {
			$scope.next_detail($scope.detail_mod);
		}
		$scope.mod_panel.splice($scope.mod_panel.indexOf(mod), 1);
	};

	$scope.panel_op = function(mod) {
		if ($scope.panel_contains(mod.name) === -1) {
			var panel_index = $scope.add_to_panel(mod);
			return panel_index;			
		} else {
			$scope.remove_from_panel(mod);
			return -1;			
		}
		// if ($scope.mod_list[mod.mod_index].panel_button === "Add") {
		// 	var panel_index = $scope.add_to_panel(mod);
		// 	return panel_index;
		// } else if ($scope.mod_list[mod.mod_index].panel_button === "Remove") {
		// 	$scope.remove_from_panel(mod);
		// 	return -1;
		// }
	};

	$scope.panel_contains = function(mod_name) {
		for (var i = 0; i < $scope.mod_panel.length; i++) {
			if ($scope.mod_panel[i].name === mod_name) {
				return i;
			}
		}
		return -1;
	}

	$scope.prev_detail = function(mod) {
		if ($scope.mod_panel.length < 2) {
			return;
		}

		var panel_index = $scope.panel_contains(mod.name);
		panel_index = (panel_index === 0) ? ($scope.mod_panel.length-1) : (panel_index-1);
		$scope.detail_mod = $scope.mod_panel[panel_index];
	}

	$scope.next_detail = function(mod) {
		if ($scope.mod_panel.length < 2) {
			return;
		}
		var panel_index = $scope.panel_contains(mod.name);
		panel_index = (panel_index === $scope.mod_panel.length-1) ? (0) : (panel_index+1);
		$scope.detail_mod = $scope.mod_panel[panel_index];
	}

	$scope.select_detail = function(mod) {
		if ($scope.view_state !== "Detail") {
			$scope.go_to_detail(mod);
		} else {
			$scope.detail_mod = $scope.mod_panel[$scope.mod_panel.indexOf(mod)];
		}
	}

	$scope.go_to_detail = function(mod) {
		var panel_index = $scope.panel_contains(mod.name);
		if (panel_index === -1) {
			panel_index = $scope.panel_op(mod);
		}
		$scope.detail_mod = $scope.mod_panel[panel_index];
		$scope.change_view("Detail");
	}

	$scope.show_more_mods = function() {
		$scope.mod_offset = $scope.mod_list.length;
		Node_Module.query({mod_offset: $scope.mod_offset, mod_order: $scope.mod_order},
			function success(data) {
				if (data.length < 1) {
					return;
				}
				var offset = $scope.mod_list.length;
				$scope.set_mod_info(data, offset);
				$scope.mod_list = $scope.mod_list.concat(data);
			}, function error() {
				console.log("Could not query more modules.");
		});
	};

}

function mods_detail_ctrl($scope, $routeParams, Node_Module) {
}