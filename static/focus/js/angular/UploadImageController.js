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

    //Image Upload Behaviour
    $scope.canSubmit = false;
    $scope.doSubmit = function doSubmit(){
        if ($scope.type == 'solid'){
            window.localStorage['additional_image_name'] = $scope.solid_name
        } else {
            window.localStorage['additional_image_name'] = $scope.amazon_name
        }
        window.location = '/dev/spawn_vm.html'
    }
}
