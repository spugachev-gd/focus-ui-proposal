function DeletableLi($scope){
    $scope.show = true;
    $scope.delete = function(){
        $scope.show = false;
    }
}
function ControlBarController($scope, $log) {
    $scope.$log = $log;

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

    $scope.query = '';
    $scope.query_fields = {'name': '', 'id': ''};

    $scope.change_field = function(){
        $log.info($scope.query_fields)
        for (var key in $scope.query_fields){
            var val = $scope.query_fields[key];
            if (val){
                var pattern = "((?:\\s+" + key + ":)|(?:^" + key + ":))";
                var match = RegExp(pattern).exec($scope.query)
                if (match){
                    var pattern = "(?:" + pattern + ")\\S+"
                    $log.info(pattern)
                    $scope.query = $scope.query.replace(RegExp(pattern), match[1] + val);
                } else {
                    $scope.query += " " + key + ":" + val;
                }
            } else {

            }

        }
        $scope.show_query_builder = false;
    }
}
