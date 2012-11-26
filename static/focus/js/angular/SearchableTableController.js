function SearchableTableController($scope){
    $scope.query = '';

    $scope.builder_shown = false
    $scope.query_parts = {};

    $scope.build_query = function(){
        var r = []
        for (i in $scope.query_parts){
            if (i != 'toString'){
                r.push(i + ':' + $scope.query_parts[i])
            }
        }
        $scope.query = r.join(' ')
    }

    $scope.already_selected_controls = [{key: 'name', title: 'Name', type: 'text', placeholder: 'Enter Name', help: 'Help!'}]
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



    $scope.selectedNumber = 0
    $scope.checkedAll = function checkedAll(){
        $scope.all_selected = false
        $scope.$broadcast('all_checked_changed')
    }
    $scope.$on('was_selected', function(){
        $scope.selectedNumber += 1
    })
    $scope.$on('was_unselected', function(){
        $scope.selectedNumber -= 1
    })
}

