function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
var dashboardCellsCount = 8;
angular.module('dashboard.service', []).
    factory('buttonsPosition', ['$window', function($window){
        if (!supports_html5_storage()) { 
            alert('Use some modern browser');
            return false; 
        }
        function buttonsPositionService(){
            this.load = function(){
                /*
                  loads combined info about button positions from window 
                  variable and local datastore 
                */
                if (typeof(localStorage['dashboard.cells']) == 'undefined'){
                    localStorage['dashboard.cells'] = JSON.stringify(new Array(dashboardCellsCount))
                }
                var cells = JSON.parse(localStorage['dashboard.cells']);
                var result = {
                    accordion: [],
                    quick_links: new Array(dashboardCellsCount)
                }
                for (i=0; i<$window.quick_links.length;i++){
                    var key = $window.quick_links[i].key
                    result.accordion.push({
                        key: key,
                        links: []
                    })
                    var x = $window.quick_links[i];
                    for (j=0; j<x.links.length; j++){
                        var seen = false;
                        x.links[j].group_key = key;
                        for (k=0; k<cells.length; k++){
                            if (x.links[j].href == cells[k]){
                                result.quick_links[k] = x.links[j]
                                seen = true;
                                break;
                            }
                        }
                        if (!seen){
                            result.accordion[
                                result.accordion.length-1
                            ].links.push(x.links[j])
                        }
                    }
                }
                this.data = result;
            }
            this.ensureCellExists = function(index){
                var L = index + 1
                if (localStorage['dashboard.cells'] == undefined){
                    var cells = new Array(L);
                    localStorage['dashboard.cells'] = JSON.stringify(cells);
                } else {
                    var cells = JSON.parse(localStorage['dashboard.cells']);
                    var L = cells.length
                    var D = cells - L;
                    if (D > 0){
                        for (i=0; i<D-1; i++){
                            cells.push(undefined);
                        }
                    }
                    localStorage['dashboard.cells'] = JSON.stringify(cells);
                }             
            }
            this.set = function(index, value){
                this.ensureCellExists(index);
                var cells = JSON.parse(localStorage['dashboard.cells'])
                cells[index] = value
                localStorage['dashboard.cells'] = JSON.stringify(cells);             
            }
            this.unset = function(index){
                this.ensureCellExists(index);
                var cells = JSON.parse(localStorage['dashboard.cells'])
                cells[index] = undefined
                localStorage['dashboard.cells'] = JSON.stringify(cells);
            }
            this.load()
        }
        return new buttonsPositionService()
    }]);

angular.module('dashboard.directive', []).
    directive('myDraggableLink', function factory(){
        return function link(scope, element, attrs){
            var $x = $(element);
            var $p = $x.parents('.links-repo')
            $x.draggable({
                revert: true,
                scope: 'cell',
                containment: '.all-links',
                scroll: false,
                // overflow: hidden prevents the link from going abroad
                start: function(event, ui){
                    $p.find('.accordion-body.collapse.in').css('overflow', 'visible');
                },
                stop: function(event, ui){
                    $p.find('.accordion-body.collapse.in').css('overflow', 'hidden');
                }
            })
        }
    }).
    directive('myDroppableRepo', ['buttonsPosition', function factory(buttonsPosition){
        return function (scope, element, attrs){
            var $x = $(element);
            $x.droppable({
                scope: 'repo',
                activeClass: 'can-be-dropped',
                drop: function (event, ui){
                    /* call service to remove the link from cells */
                    /* say controller to update the var with linkss */
                    ui.draggable.parent().addClass('droppable-empty');
                    buttonsPosition.unset(ui.draggable.attr('data-cell-id'));
                    $a = $('<a>').
                        attr('href', ui.draggable.attr('href')).
                        attr('data-img-src', ui.draggable.attr('data-img-src')).
                        attr('data-group-key', ui.draggable.attr('data-group-key')).                 
                        html(ui.draggable.attr('title')).draggable({
                            revert: true,
                            scope: 'cell',
                            containment: '.all-links',
                            scroll: false,
                            // overflow: hidden prevents the link from going abroad
                            start: function(event, ui){
                                $p.find('.accordion-body.collapse.in').css('overflow', 'visible');
                            },
                            stop: function(event, ui){
                                $p.find('.accordion-body.collapse.in').css('overflow', 'hidden');
                            }
                        })
                    // fold all groups
                    // unfile correct group
                    // insert the link in correct group to right place
                    var group_key = ui.draggable.attr('data-group-key');
                    $x.find('.accordion-group').each(function(){

                        var $z = $(this);
                        var $b = $z.find('.accordion-body')
                        if ($z.find('.accordion-toggle b').text().trim() == group_key.trim()){
                            $b.addClass('in')
                            $b.find('.accordion-inner').append('<p>').append($a)
                        } else {
                            $b.removeClass('in')
                        }
                    });
                    // open correct accordion group
                    // remove draggable
                    setTimeout(function(){
                        ui.draggable.remove()
                    }, 100)
                    
                }
            })
        }
    }]).
    directive(
        'myDroppableCell', 
        [
            'buttonsPosition', 
            function factory(buttonsPosition){
                return function link(scope, element, attrs){
                    var $x = $(element);
                    var cell_id = scope.$eval(attrs['myDroppableCell']);
                    $x.droppable({
                        activeClass: 'can-be-dropped',
                        scope: 'cell',
                        drop: function(event, ui){
                            var title = ui.draggable.html();
                            var $a = $('<a class="thumbnail">' + 
                                       '<img>' +
                                       '<div class="caption">' +
                                       '<h5 class="nobr"/>' +
                                       '</div>' +
                                       '</a>').
                                attr('href', ui.draggable.attr('href')).
                                attr('data-cell-id', cell_id).
                                attr('title', title).
                                attr('data-img-src', ui.draggable.attr('data-img-src')).
                                attr('data-group-key', ui.draggable.attr('data-group-key')).draggable({
                                    revert: true,
                                    scope: 'repo',
                                    containment: $('.all-links'),
                                    scroll: false
                                });
                                
                            $a.find('img').
                                attr('src', ui.draggable.attr('data-img-src')).
                                attr('title', title);
                            $a.find('h5').html(title);
                            $x.
                                removeClass('droppable-empty').
                                html($a);
                            buttonsPosition.set(cell_id, $a.attr('href'))
                            setTimeout(
                                function(){ui.draggable.remove()}, 
                                1)
                        },
                        out: function(event, ui){

                        }
                    })
                }
            }
        ]).
    directive('myDraggableCellLink', function factory(){
        return function link(scope, element, attrs){
            $(element).draggable({
                revert: true,
                scope: 'repo',
                containment: $('.all-links')
            });
        }
    }).
    directive('myDashboardButtons', function factory(){
        return function link(scope, element, attrs){
            /* 
               setup accordion, droppables, UI/UX;
               do it here because we have the DOM element here
               and can manipulate it legally
            */
        }
    });
angular.module('dashboard.filter', []).
    filter('isUndefined', function(){
        return function(value){
            return typeof(value) == 'undefined'
        }
    }).
    filter('myLinkOrNothing', function (){
        return function (value, arg){
            return typeof(value) 
        }
    });
angular.module('DashboardApp', [
    'dashboard.service',
    'dashboard.directive',
    'dashboard.filter',
    'ui'
]).
    run(function(){
    });

var DashboardController = function($scope, buttonsPosition){
    /* saves button position defined by a place a button was dropped */
    $scope.accordion = buttonsPosition.data.accordion
    $scope.quick_links = buttonsPosition.data.quick_links
};
DashboardController.$inject = ['$scope', 'buttonsPosition'];
