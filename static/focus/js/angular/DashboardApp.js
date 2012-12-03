var links_data = [
        {
            "key": "Virtual Machines",
            "links": [
                {
                    "title": "Spawn",
                    "full_title": "Spawn VM",
                    "img": "static/focus/img/thumbs/spawn_vm.png",
                    "small": "static/focus/img/thumbs/small/spawn_vm.png",
                    "href": "spawn_vm.html"
                },
                {
                    "title": "Manage",
                    "full_title": "Manage VMs",
                    "img": "static/focus/img/thumbs/manage.png",
                    "small": "static/focus/img/thumbs/small/manage.png",
                    "href": "manage_vms.html"
                },
                {
                    "title": "Types of",
                    "full_title": "Types of VM",
                    "img": "static/focus/img/thumbs/flavors.png",
                    "small": "static/focus/img/thumbs/small/flavors.png",
                    "href": "flavors.html"
                }
            ]
        },
        {
            "key": "Images",
            "links": [
                {
                    "title": "Register",
                    "full_title": "Register an Image",
                    "img": "static/focus/img/thumbs/upload.png",
                    "small": "static/focus/img/thumbs/small/upload.png",
                    "href": "upload_image.html"
                },
                {
                    "title": "Manage",
                    "full_title": "Manage Images",
                    "img": "static/focus/img/thumbs/manage.png",
                    "small": "static/focus/img/thumbs/small/manage.png",
                    "href": "manage_images.html"
                }
            ]
        },
        {
            "key": "Projects",
            "links": [
                {
                    "title": "Summary",
                    "full_title": "Projects Summary",
                    "img": "static/focus/img/thumbs/summary.png",
                    "small": "static/focus/img/thumbs/small/summary.png",
                    "href": "projects.html"
                },
                {
                    "title": "Security Groups",
                    "full_title": "Security Groups",
                    "img": "static/focus/img/thumbs/security_groups.png",
                    "small": "static/focus/img/thumbs/small/security_groups.png",
                    "href": "security_groups.html"
                },
                {
                    "title": "Billing",
                    "full_title": "Billing",
                    "img": "static/focus/img/thumbs/billing.png",
                    "small": "static/focus/img/thumbs/small/billing.png",
                    "href": "billing.html"
                },
                {
                    "title": "Members",
                    "full_title": "Members",
                    "img": "static/focus/img/thumbs/members.png",
                    "small": "static/focus/img/thumbs/small/members.png",
                    "href": "members.html"
                },
                {
                    "title": "Audit",
                    "full_title": "Audit",
                    "img": "static/focus/img/thumbs/audit.png",
                    "small": "static/focus/img/thumbs/small/audit.png",
                    "href": "audit.html"
                },
                {
                    "title": "Invite",
                    "full_title": "Invite a Member",
                    "img": "static/focus/img/thumbs/invite.png",
                    "small": "static/focus/img/thumbs/small/invite.png",
                    "href": "invite.html"
                }
            ]
        },
        {
            "key": "Personal Settings",
            "links": [
                {
                    "title": "SSH Keys",
                    "full_title": "SSH Keys",
                    "img": "static/focus/img/thumbs/terminal.png",
                    "small": "static/focus/img/thumbs/small/terminal.png",
                    "href": "ssh.html"
                },
                {
                    "title": "Credentials",
                    "full_title": "Crdentials",
                    "img": "static/focus/img/thumbs/credentials.jpg",
                    "small": "static/focus/img/thumbs/small/credentials.jpg",
                    "href": "credentials.html"
                },
                {
                    "title": "Notifications",
                    "full_title": "Notifications",
                    "img": "static/focus/img/thumbs/notifications.png",
                    "small": "static/focus/img/thumbs/small/notifications.png",
                    "href": "notifications.html"
                },
                {
                    "title": "Avatar",
                    "full_title": "Avatar",
                    "img": "static/focus/img/thumbs/avatar.png",
                    "small": "static/focus/img/thumbs/small/avatar.png",
                    "href": "avatar.html"
                },
                {
                    "title": "Change Password",
                    "full_title": "Change Password",
                    "img": "static/focus/img/thumbs/change_password.png",
                    "small": "static/focus/img/thumbs/small/change_password.png",
                    "href": "change_password.html"
                }
            ]
        }
    ];

function supports_html5_storage(window) {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

angular.module('dashboard.service', []);

angular.module('dashboard.directive', []).
    directive('dashboardAccordionLink', function(){
        return function (scope, element, attrs){
            var link = scope.$eval(attrs.dashboardAccordionLink)
            $(element).
                data('_link', link.href).
                draggable({
                    containment: '.all-links',
                    revert: true,
                    helper: "clone",
                    appendTo: "body"        
                })
        }}).
    directive('dashboardCellLink', function(){
        return function (scope, element, attrs){
            $(element).
                data('_cell', true).
                draggable({
                    containment: '.all-links',
                    revert: true
                })
        }
    }).
    directive('dashboardCellBox', function($window){
        return function(scope, element, attrs){
            var $x = $(element)
            $x.droppable({
                hoverClass: "drop-hover",
                drop: function (event, ui){
                    var index = scope.$eval('$index');
                    if (angular.isDefined(ui.draggable.data('_link'))){
                        var href = ui.draggable.data('_link')
                        scope.$apply(
                            'cells.employ("' + href  + '", ' + index + ')')
                    } else if(angular.isDefined(ui.draggable.data('_cell'))){
                        var href = ui.draggable.attr('href')
                        var from_index = scope.$eval('cells.get_index_for("' + href + '")') 
                        scope.$apply('cells.transfer(' + from_index + ', ' + index + ')')
                    } else {
                        console.log('unknown draggable')
                    }
                    $window.localStorage['dashboard.cells'] = angular.toJson(
                        scope.$eval('cells').map(function(n){
                            return n.href || false
                        })
                    )
                }
            })
        }
    }).
    directive('dashboardLinkUnpin', function (){
        return function(scope, element, attrs){
            $(element).click(function (e){
                e.preventDefault()
                var href = attrs.dashboardLinkUnpin;
                var index = scope.$eval('cells.get_index_for("' + href + '")')
                scope.$apply('cells.purge(' + index + ')')
                scope.$apply('links.mark_employed("' + href + '", false)')
            })
        }
    }).
    directive('dashboardLinkPin', function (){
        return function(scope, element, attrs){
            $(element).click(function (e){
                e.preventDefault()
                var href = attrs.dashboardLinkPin;
                var index = scope.$eval('cells.closest_spare(0, true)')
                console.log(href, index)
                scope.$apply('cells.employ("' + href  + '", ' + index + ')')
            })
        }
    })

angular.module('dashboard.filter', [])
angular.module('DashboardApp', [
    'dashboard.service',
    'dashboard.directive',
    'dashboard.filter',
    'ui'
]);

function Links(self){
    self.mark_employed = function(href, employed){
        for (var i=0; i<self.length; i++){
            for (var j=0; j<self[i].links.length; j++){
                if (self[i].links[j].href == href){
                    self[i].links[j].employed = employed
                    return employed
                }
            }
        }
    }
    
    self.for_href = function(href){
        for (var i=0; i<self.length; i++){
            for (var j=0; j<self[i].links.length; j++){
                if (self[i].links[j].href == href){
                    return self[i].links[j]
                }
            }
        }
    }

    return self
}

function Cells($window, maxCount, links){
    var self = new Array(maxCount)
    if (angular.isDefined($window.localStorage['dashboard.cells'])){
        var stored = angular.fromJson(
            $window.localStorage['dashboard.cells'])
    } else {
        var stored = ['spawn_vm.html', 'manage_vms.html', 'flavors.html', 'upload_image.html', 'manage_images.html']
    }
    for (var i=0; i<self.length; i++){
        if (angular.isDefined(stored[i]) && angular.isDefined(links.mark_employed(stored[i], true))){
            self[i] = links.for_href(stored[i])
        } else {
            self[i] = false
        }
    }

    self.serialize = function(){
        $window.localStorage['dashboard.cells'] = angular.toJson(
            self.map(function(n){
                if (n){
                    return n.href
                } else {
                    return undefined
                }
            })
        )
    }

    self.employ = function(href, index){
        var currentIndex = self.findIndex(function(n){
            return n && n.href == href
        })
        if (currentIndex != -1){
            if (index != currentIndex){
                if (!self.is_spare(index)){
                    links.mark_employed(self[index].href, false)
                }
                self.move(currentIndex, index)
            }
        } else {
            if (!self.is_spare(index)){
                self.purge(index)
            }
            self.embed(href, index)
        }
    }

    self.is_spare = function(index){
        return !self[index]
    }
    
    self.closest_spare = function(index, inclusive){
        var i, stopIndex;
        if (inclusive){
            i = index;
        } else {
            i = index + 1;
        }
        if (inclusive){
            stopIndex = index - 1;
            if (stopIndex == -1){
                stopIndex = maxCount - 1;
            }
        } else {
            stopIndex = index;
        }
        while(true){
            if (i == stopIndex){
                break
            }
            if (i == maxCount) {
                i = 0
            }
            if (self.is_spare(i)){
                return i
            }
            i++;
        }
    }

    self.move = function(i, j){
        self[j] = self[i]
        self[i] = false
        self.serialize();
    }

    self.purge = function(index){
        links.mark_employed(self[index], false)
        self[index] = false
        self.serialize();
    }

    self.embed = function(href, index){
        links.mark_employed(href, true)
        self[index] = links.for_href(href)
        self.serialize();
    }

    self.transfer = function(i, j){
        if (self[i]){
            if (self[j]){
                var x = self[j]
                self[j] = self[i]
                self[i] = x
            } else {
                self.move(i, j)
            }
        }
        self.serialize();
    }


    self.get_index_for = function(href){
        return self.findIndex(function(n){
            return n.href == href
        })
    }

    return self
}

var DashboardController = function($scope, $window){
    if (!supports_html5_storage($window)){
        console.log('Unsupported browser')
    }
    $scope.links = Links(links_data);
    $scope.cells = Cells($window, 15, $scope.links)
};

