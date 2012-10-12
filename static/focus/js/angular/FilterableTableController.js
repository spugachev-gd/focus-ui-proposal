/**
 * Created with PyCharm.
 * User: peroksid
 * Date: 10/12/12
 * Time: 12:08 PM
 * To change this template use File | Settings | File Templates.
 */
function FilterableTableController($scope){

    function getEntry(x, key){
        var entry = x.filter(function(m){
            return m[0] == key
        })[0]
        return entry[1]
    }

    function getStr(x){
        var result;
        if (x.length == 1){
            result = x[0]
        } else {
            result = x[1]
        }
        return result;
    }

    $scope.results = $scope.mockup_data;
    $scope.doFiltering = function(){
        $scope.results = $scope.mockup_data;
        if ($scope.main || ($scope.project && $scope.project.length)){
            var matchers = []
            if ($scope.main){
                matchers.push(function mainMatcher(n){
                    return $scope.filters[0][1].some(function(m){// name and descrition OR email and real name
                        return getStr(getEntry(n, m)).has($scope.main)
                    })
                })
            }
            if ($scope.project){
                matchers.push(function projectMatcher(n){
                    return $scope.project.some(function(m){
                        return getStr(getEntry(n, 'project')).has(m)
                    })
                })
            }
            $scope.results = $scope.mockup_data.filter(function(n){
                return matchers.all(function(m){
                    return m(n)
                })
            })
        } else {
            $scope.results = $scope.mockup_data;
        }

    }
}