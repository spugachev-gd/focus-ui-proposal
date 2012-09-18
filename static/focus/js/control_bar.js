function ControlBarController($scope) {
    $scope.query = '';
    $scope.show_save_search_form = false;
    $scope.show_change_columns_form = false;
    $scope.show_query_builder = false;


    $scope.hidden_columns = ['moar', 'moarmoar']
    $scope.shown_columns = ['foo', 'bar', 'bazz']
    $scope.selected_shown = null;
    $scope.selected_hidden = null;
    $scope.hide_column = function(){
        if ($scope.selected_shown){
            var r = []
            for (i = 0; i < $scope.shown_columns.length; i++){
                if ($scope.selected_shown.indexOf($scope.shown_columns[i]) == -1){
                    r.push($scope.shown_columns[i])
                } else {
                    $scope.hidden_columns.push($scope.shown_columns[i])
                }
            }
            $scope.shown_columns = r;
            $scope.selected_shown = null
        }
    }
    $scope.show_column = function(){
        if ($scope.selected_hidden){
            var r = []
            for (i = 0; i < $scope.hidden_columns.length; i++){
                if ($scope.selected_hidden.indexOf($scope.hidden_columns[i]) == -1){
                    r.push($scope.hidden_columns[i])
                } else {
                    $scope.shown_columns.push($scope.hidden_columns[i])
                }
            }
            $scope.hidden_columns = r;
            $scope.selected_hidden = null
        }
    }
    $scope.column_up = function(){
        if ($scope.selected_shown){
            if ($scope.shown_columns[0] != $scope.selected_shown[0]){
                $scope.shown_columns.push($scope.shown_columns.shift())
            }
        }
    }
    $scope.column_down = function(){
        if ($scope.selected_shown){
            if ($scope.shown_columns[$scope.shown_columns.length - 1] != $scope.selected_shown[$scope.selected_shown.length - 1]){
                $scope.shown_columns.unshift($scope.shown_columns.pop())
            }
        }
    }
    $scope.add_to_query = function(wha){
        $scope.query = $scope.query + ' ' + wha + ':'
    }
}
