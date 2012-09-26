function SearchableTableController($scope){
    $scope.query = '';

    $scope.builder_shown = false
    $scope.query_parts = {};
    $scope.query_parts.toString = function(){
        var r = []
        for (i in this){
            if (i != 'toString'){
                r.push(i + ':' + this[i])
            }
        }
        return r.join(' ')
    }

    $scope.build_query = function(){
        $scope.query = $scope.query_parts.toString();
    }


    $scope.fields_selections = ['id', 'cost', 'ip'];
    $scope.is_visible = function(_key){
        return $scope.fields_selections.indexOf(_key) != -1;
    }
    $scope.update_fields_selections = function(){
        
    }

    $scope.columns_selector_shown = false;
    $scope.change_columns = function(){

    }

    $scope.selected_area_shown = false;
    $scope.all_selectable_selected = false;
    $scope.select_all_selectable = function(){}
    $scope.unselect_all_selectable = function(){}

    $scope.saved_searches_shown = false;

    $scope.newSearch = function(){
        if ($scope.new_search_name){
            $scope.saved_searches.push({name: $scope.new_search_name, query: $scope.query})
            $scope.new_search_name = '';
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
