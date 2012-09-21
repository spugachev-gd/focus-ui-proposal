$(function() {
    $(".datepicker").datepicker();
    $(".chzn-select").chosen({allow_single_deselect: true});
    $(".help-tooltip").tooltip();
});

function UploadImageController($scope, $log){
    $scope.$log = $log;
    $scope.type = 'solid'//'amazon_like';

    $scope.set_solid = function(e){
        $scope.solid_url = e.currentTarget.title;
        $scope.solid_name = e.currentTarget.text;
    }

    $scope.set_amazon = function(e){
        $scope.amazon_name = e.currentTarget.text;
        $scope.amazon_kernel_url = e.currentTarget.attributes['data-kernel'].textContent;
        $scope.kernel_selection = '-1';
        $scope.amazon_initrd_url = e.currentTarget.attributes['data-initrd'].textContent;
        $scope.initrd_selection = '-1';
        $scope.amazon_rootfs_url = e.currentTarget.attributes['data-rootfs'].textContent;
    }
}

function SearchableTableController($scope){
    $scope.query = '';

    //$scope.builder_shown = true
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

    $scope.columns_selector_shown = false;
    //$scope.columns_selector_shown = true;
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

    $scope.selectedUp = function(){
        function getIndex(x){
            var index =  -1;
            for (var i=0; i<$scope.shown_columns.length; i++){
                var v = $scope.shown_columns[i];
                if (v.key == x){
                    index = i;
                    break;
                }
            }
            return index;
        }
        function up_one(i){
            var t = $scope.shown_columns[i-1];
            $scope.shown_columns[i-1] =  $scope.shown_columns[i];
            $scope.shown_columns[i] = t;
        }
        if ($scope.selected_shown.length){
            var indexes = [];
            for (var i=0; i<$scope.selected_shown.length; i++){
                var index = getIndex($scope.selected_shown[i]);
                if (index > 0){
                    indexes.push(index);
                } else {
                    indexes = [];
                    break;
                }
            }
            if (indexes.length){
                for(var i=0; i<indexes.length;i++){
                    up_one(indexes[i]);
                }
            }
        }
    }

    $scope.selectedShow = function(){
        function getIndex(x){
            var index =  -1;
            for (var i=0; i<$scope.shown_columns.length; i++){
                var v = $scope.shown_columns[i];
                if (v.key == x){
                    index = i;
                    break;
                }
            }
            return index;
        }
        if ($scope.selected_hidden){
            var indexes = [];
            for (var i=0; i<$scope.selected_shown.length; i++){
                var index = getIndex($scope.selected_shown[i]);
                if (index > -1){
                    indexes.push(index);
                }
            }
            if (indexes.length){
                for(var i=0; i<indexes.length;i++){
                    $scope.shown_columns.push($scope.hidden_columns.splice(i, 1));

                }
            }
        }
    }
    $scope.selectedHide = function(){
        function getIndex(x){
            var index =  -1;
            for (var i=0; i<$scope.shown_columns.length; i++){
                var v = $scope.shown_columns[i];
                if (v.key == x){
                    index = i;
                    break;
                }
            }
            return index;
        }
        if ($scope.selected_shown){
            var indexes = [];
            for (var i=0; i<$scope.selected_shown.length; i++){
                var index = getIndex($scope.selected_shown[i]);
                if (index > -1){
                    indexes.push(index);
                }
            }
            if (indexes.length){
                for(var i=0; i<indexes.length;i++){
                    $scope.hidden_columns.push($scope.shown_columns.splice(indexes[i], 1));
                }
            }
        }
        console.log($scope.hidden_columns)
    }
    $scope.selectedDown = function(){
        function getIndex(x){
            var index =  -1;
            for (var i=0; i<$scope.shown_columns.length; i++){
                var v = $scope.shown_columns[i];
                if (v.key == x){
                    index = i;
                    break;
                }
            }
            return index;
        }
        function down_one(i){
            var t = $scope.shown_columns[i+1];
            $scope.shown_columns[i+1] =  $scope.shown_columns[i];
            $scope.shown_columns[i] = t;
        }
        if ($scope.selected_shown.length){
            var indexes = [];
            for (var i=0; i<$scope.selected_shown.length; i++){
                var index = getIndex($scope.selected_shown[i]);
                if (index > 0 && index < $scope.shown_columns.length - 1){
                    indexes.push(index);
                } else {
                    indexes = [];
                    break;
                }
            }
            if (indexes.length){
                for(var i=0; i<indexes.length;i++){
                    down_one(indexes[i]);
                }
            }
        }
    }
}