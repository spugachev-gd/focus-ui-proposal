function ControlBarController($scope, $rootScope){
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
    $scope.bringMockupRows = function bringMockupRows(rows){
        $rootScope['mockup_rows'] = rows
    }

    $scope.saved_searches_shown = false;

    $scope.newSearch = function(){
        console.log('here inside')
        if ($scope.new_search_name){
            $scope.saved_searches.push({name: $scope.new_search_name, query: $scope.query})
            $scope.new_search_name = '';
            console.log('here')
        }
    }
    $scope.applySearch = function(query){
        $scope.query = query;
    }
    $scope.deleteSearch = function(name){
        var r = [];
        for (var i=0; i<$scope.saved_searches.length; i++){
            var s = $scope.saved_searches[i];
            if (s.name != name){
                r.push(s)
            } else if($scope.query == s.query) {
                $scope.query = '';
            }
        }
        $scope.saved_searches = r;
    }
    $scope.doSearch = function(){
        $scope.builder_shown = false;
        $scope.columns_selector_shown = false;
        $scope.saved_searches_shown = false;
    }
}
