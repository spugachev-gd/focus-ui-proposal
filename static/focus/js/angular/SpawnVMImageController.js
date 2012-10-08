/**
 * Created with PyCharm.
 * User: peroksid
 * Date: 10/5/12
 * Time: 4:04 PM
 * To change this template use File | Settings | File Templates.
 */
function SpawnVMImageController($scope){
    $scope.images = [
        {
            v: ''
        },
        {
            'v': '50e2761f-b93e-4277-af4e-17afef999296',
            't': 'mini image'
        }
    ]
    console.log(window.localStorage)
    if (window.localStorage['additional_image_name']){
        $scope.images.push(
            {
                'v': window.localStorage['additional_image_name'],
                't': window.localStorage['additional_image_name']
            })
        $scope.image_selected =  window.localStorage['additional_image_name']
        $(window).unload(function(){
            window.localStorage.removeItem('additional_image_name')
        })
    }
}

