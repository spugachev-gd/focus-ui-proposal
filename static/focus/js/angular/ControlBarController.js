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
        }
    }

}