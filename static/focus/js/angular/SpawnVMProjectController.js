/**
 * Created with PyCharm.
 * User: peroksid
 * Date: 10/12/12
 * Time: 10:47 AM
 * To change this template use File | Settings | File Templates.
 */
function SpawnVMProjectController($scope){
    $scope.projects = [
        'IT',
        'OSCORE'
    ]
    $scope.selected_project = $.QueryString['project']
}