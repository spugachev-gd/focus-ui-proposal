function ChangePasswordController($scope){
    $scope.new_password = '';
    $scope.repeat_password = '';

    $scope.wha = function(){
        return $scope.new_password == $scope.repeat_password;
    }

    $scope.password_match = function(){
        return $scope.wha() && ($scope.new_password != '');
    }
    $scope.$on('hideAllWindows', function(){

    });
}
