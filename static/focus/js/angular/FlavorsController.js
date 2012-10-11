/**
 * Created with PyCharm.
 * User: peroksid
 * Date: 10/11/12
 * Time: 10:31 AM
 * To change this template use File | Settings | File Templates.
 */
function FlavorsController($scope){
    $scope.selected_flavor = $.QueryString['type']
    $scope.flavor_options = [
        {
            k: '',
            v: ''
        },
        {
            k: '1',
            v: 'm1.tiny'
        },
        {
            k: '2',
            v: 'm1.small'
        },
        {
            k: '3',
            v: 'm1.medium'
        },
        {
            k: '4',
            v: 'm1.large'
        },
        {
            k: '5',
            v: 'm1.xlarge'
        },
    ]
}