function CheckOneController($scope){
    function emitChange(){
        var message;
        if ($scope.checked_all){
            message = 'was_selected'
        } else {
            message = 'was_unselected'
        }
        $scope.$emit(message)
    }
    $scope.$on('all_checked_changed', function(event){
        $scope.checked_all = event.targetScope.all_checked_checkbox
        emitChange();
    })
    $scope.changeObserved = function changeObserved(){
        emitChange()
    }
}