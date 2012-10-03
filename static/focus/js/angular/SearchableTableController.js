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

    $scope.already_selected_controls = []
    $scope.visibleControls = function(){
        return $scope.shown_columns.union($scope.hidden_columns).filter(
            function(i){
                return -1 == $scope.already_selected_controls.findIndex(
                    function(j){
                        return j.key == i.key
                        }
                )
            }
        )
    }
    $scope.addField = function(key){
        if (key){
            var foo = $scope.shown_columns.union($scope.hidden_columns).filter(function(x){return x.key == key})[0]
            $scope.already_selected_controls.push(foo)
            // timeout because browser rerenders page a little bit later after the model is changed
            setTimeout(function(){
                { // text
                    $('a[rel=tooltip]').tooltip();
                }
                { // money range
                    var $x = $('.money_range_slider');

                    if ($x.size()){
                        var $a = $($x.attr('data-amount-container-selector'))
                        var $v = $($x.attr('data-value-input-selector'))
                        $x.slider({
                            range: true,
                            min: $x.attr('data-range-options-min'),
                            max:  $x.attr('data-range-options-max'),
                            values: [$x.attr('data-range-options-min'), $x.attr('data-range-options-max')],
                            slide: function(event, ui){
                                $a.html('$' + ui.values[0] + '-$' + ui.values[1])
                                //$v.val(ui.values[0] + '-' + ui.values[1])
                                $scope.query_parts[key] = ui.values[0] + '-' + ui.values[1]
                                console.log($scope.query_parts)
                                console.log($scope)
                            }
                        })
                    }
                }
            }, 40);


        }
    }
    $scope.update_fields_selections = function(){
        if (this.foo){
            this.already_selected_controls.push(this.foo)
            // timeout because browser rerenders page a little bit later after the model is changed
            setTimeout(function(){
                $('a[rel=tooltip]').tooltip();
            }, 500);
        }

    }
    $scope.unselectControl = function(key){
        delete($scope.query_parts[key])
        $scope.build_query()
        $scope.already_selected_controls = $scope.already_selected_controls.filter(function(x){return x.key != key})
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

