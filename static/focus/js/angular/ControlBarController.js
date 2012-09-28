function ControlBarController($scope){
    $scope.shown = {
        'columns': false,
        'builder': false,
        'saved_searches': false
    }
    $scope.toggleShown = function(name){
        if ($scope.shown[name]){
            $scope.shown[name] = false;
        } else {
            for (i in $scope.shown){
                $scope.shown[i] = false;
            }
            $scope.shown[name] = true;
            var window_parent_position = $("."+ name +"_lever").offset();
            $("."+ name +"_window").css('top', window_parent_position['top'])
            if (name == 'columns'){
                $("."+ name +"_window").css('left', window_parent_position['left'] - 490);
            }
            if (name == 'saved_searches'){
                $("."+ name +"_window").css('left', window_parent_position['left']);
            }
            if (name == 'builder'){
                $("."+ name +"_window").css('left', window_parent_position['left'] - 414);
            }
      }
    }
}
