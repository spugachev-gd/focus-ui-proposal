function MetadataController($scope){
    $scope.pairs = []
    $scope.show_add=false

    $scope.add = function(){
        if ($scope.name && $scope.value){
            $scope.pairs.push({'name': $scope.name, 'value': $scope.value})
            $scope.show_add = true
            $scope.name = ''
            $scope.value = ''
        }
        
    }
    $scope.removePair = function(name){
        $scope.pairs.splice(
            $scope.pairs.findIndex(function(n){return n.name == name})
        )
    }
}
function ExistingPairController($scope){
    $scope.disabled = true
    
    $scope.editPair = function(){
        $scope.__name = angular.copy($scope.x.name)
        $scope.__value = angular.copy($scope.x.value)
        $scope.disabled = false
    }

    $scope.restorePair = function(){
        $scope.x.name = angular.copy($scope.__name)
        $scope.x.value = angular.copy($scope.__value)
        $scope.disabled = true
    }
}
