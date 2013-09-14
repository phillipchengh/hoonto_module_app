'use strict';

function mods_list_ctrl($scope, Node_Module) {
	$scope.mod_panel = [];
	$scope.mod_name = "";
	$scope.mod_desc = "";
	$scope.mod_date = "";
	$scope.mod_offset = 0;
	$scope.mod_order = "Downloads";
	$scope.views = {"List": "active", "Detail": "", "Compare": "disabled"};
	$scope.view_state = "List";
	$scope.mod_list = Node_Module.query({mod_offset: $scope.mod_offset, mod_order: $scope.mod_order},
		function success() {
			for (var i = 0; i < $scope.mod_list.length; i++) {
				$scope.mod_list[i].mod_index = i;
				$scope.mod_list[i].panel_button = "Add";
				$scope.mod_list[i].more_button = "More";
				$scope.mod_list[i].show_more = false;
			}
	}, function error() {
		console.log("Could not query initial modules.");
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

	$scope.change_view = function(view) {
		if ($scope.view_state === view) {
			return;
		}
		if (($scope.mod_panel.length < 2) && (view === "Compare")) {
			alert("Need at least two items to compare!")
			return;
		}
		$scope.views[$scope.view_state] = "";
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
			for (var i = 0; i < data.length; i++) {
				data[i].mod_index = i;
				data[i].panel_button = "Add";
				data[i].more_button = "More";
				data[i].show_more = false;
			}
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

	$scope.remove_from_panel = function(mod) {
		if (($scope.mod_panel.length < 3) && ($scope.views["Compare"] !== "disabled")) {
			$scope.views["Compare"] = "disabled";
		}
		if (($scope.mod_panel.length < 3) && ($scope.view_state === "Compare")) {
			$scope.change_view("List");
		}
		$scope.mod_panel.splice($scope.mod_panel.indexOf(mod), 1);
		$scope.mod_list[mod.mod_index].panel_button = "Add";
	};

	$scope.panel_op = function(mod) {
		if ($scope.mod_list[mod.mod_index].panel_button === "Add") {
			$scope.mod_panel.push(mod);
			$scope.mod_list[mod.mod_index].panel_button = "Remove";
			if (($scope.mod_panel.length > 1) && ($scope.views["Compare"] === "disabled")) {
				$scope.views["Compare"] = "";
			}
		} else if ($scope.mod_list[mod.mod_index].panel_button === "Remove") {
			$scope.remove_from_panel(mod);
		}
	};

	$scope.show_more_mods = function() {
		$scope.mod_offset = $scope.mod_list.length;
		Node_Module.query({mod_offset: $scope.mod_offset, mod_order: $scope.mod_order},
			function success(data) {
				if (data.length < 1) {
					return;
				}
				var index_offset = $scope.mod_list.length;
				for (var i = 0; i < data.length; i++) {
					data[i].mod_index = i + index_offset;
					data[i].panel_button = "Add";
					data[i].more_button = "More";
					data[i].show_more = false;
				}
				$scope.mod_list = $scope.mod_list.concat(data);
			}, function error() {
				console.log("Could not query more modules.");
		});
	};
}

function mods_detail_ctrl($scope, $routeParams, Node_Module) {
}