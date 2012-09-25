/**
 * Created with PyCharm.
 * User: peroksid
 * Date: 9/25/12
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */
function ChangeColumnWindowController($scope){
    function getIndex(a, b){
        return a.findIndex(function(x){return x.key == b})
    }
    $scope.selectedUp = function(){
        function up_one(i){
            var t = $scope.shown_columns[i-1];
            $scope.shown_columns[i-1] =  $scope.shown_columns[i];
            $scope.shown_columns[i] = t;
        }
        if ($scope.selected_shown.length){
            var indexes = [];
            for (var i=0; i<$scope.selected_shown.length; i++){
                var index = getIndex($scope.shown_columns, $scope.selected_shown[i]);
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
    $scope.selectedDown = function(){
        function down_one(i){
            var t = $scope.shown_columns[i+1];
            $scope.shown_columns[i+1] =  $scope.shown_columns[i];
            $scope.shown_columns[i] = t;
        }
        if ($scope.selected_shown.length){
            var indexes = [];
            for (var i=$scope.selected_shown.length-1; i>= 0; i--){
                var index = getIndex($scope.shown_columns, $scope.selected_shown[i]);
                if (index > -1 && index < $scope.shown_columns.length - 1){
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

    function toggle(_a, _b, _c){
        return function(){
            if ($scope[_a]){
                var counter = 0;
                $scope[_a].map(function(i){
                    return $scope[_b].findIndex(function(j){
                        return j.key == i;
                    })
                }).forEach(function(i){
                        $scope[_c].push($scope[_b].splice(i - counter, 1)[0]);
                    counter += 1;
                })
            }
        }
    }
    $scope.selectedShow = toggle('selected_hidden', 'hidden_columns', 'shown_columns');
    $scope.selectedHide = toggle('selected_shown', 'shown_columns', 'hidden_columns');


}