var module = angular.module('MockupModule', [])

function doMaybeLink(x){
    if (x.length == 2){
        if (x[0] == 'binstatus'){
            console.log('binstatus!')
            if (Math.random() > 1/2){
                return '<div style="width: 40px; height: 40px; padding: 10px;"><div style="margin: 10px; width: 20px; height: 20px; background-color: green;text-indent: -100px; border-radius: 10px; overflow: hidden;">OK</div></div>'
            } else {
                return '<div style="width: 40px; height: 40px; padding: 10px;"><div style="margin: 10px; width: 20px; height: 20px; background-color: red;text-indent: -100px; border-radius: 10px; overflow: hidden;">FAIL</div></div>'
            }
        } else {
            if (x[0].endsWith('.html')){
                return '<a href="' + x[0] + '">' + x[1] +'</a>';
            } else if (x[0] == 'boolean') {
                if (x[1] == true){
                    return '<i class="icon icon-check"></i>'
                } else {
                    return ''
                }
            }
        }
    } else {
        return x[0];
    }
}

module.filter('maybe_link', function(){
    return doMaybeLink
})

module.filter('maybe_link_array', function(){
    return function(x){
        return doMaybeLink(x[1])
    }
})

module.directive('cbIpWidget', function factory(){
    var directiveDefinitionObject = {
        template: ' \
        <div class="cb-ip-widget"> \
            <input type="text" ng-model="g1">fonny. \
            <input type="text" ng-model="g2">. \
            <input type="text" ng-model="g3">. \
            <input type="text" ng-model="g4"> \
        </div>',
        link: function link(scope, element, attrs) {
            var groups = {
                g1: '',
                g2: '',
                g3: '',
                g4: ''
            }
            function buildIpFromGroups(){
                if (scope.g1 != undefined && scope.g2 != undefined && scope.g3 != undefined && scope.g4 != undefined){
                    var ip = scope.g1 + '.' + scope.g2 + '.' + scope.g3 + '.' + scope.g4;
                    // twisted way to change a model, but cbIpWidget can be an expression;
                    // the only thing we hope for is it can serve as a left side value
                    var expression = attrs.cbIpWidget + '="' + ip + '"'
                    scope.$eval(expression)
                }
            }
            function isValidIpGroup(g){
                if (g != ''){
                    if (/^\d+$/.exec(g)){
                        var x = parseInt(g)
                        if (!isNaN(x)){
                            if (0 <= x && x <= 255){
                                return true
                            }
                        }
                    }
                }
                return false
            }
            ['g1', 'g2', 'g3', 'g4'].forEach(function(x){
                scope.$watch(x, function(newValue, oldValue){
                    if (newValue != oldValue){
                        if (newValue == ''){
                            groups[x] = scope[x]
                        } else if (isValidIpGroup(newValue)){
                            groups[x] = scope[x]
                            buildIpFromGroups()
                        } else {
                            scope[x] = groups[x]
                        }
                    }
                })
            })
            // watch ip changed in parent scope
            scope.$watch(attrs.cbIpWidget, function watchParentScopeIPModel(value){
                var m = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.exec(value);
                if (m){
                    scope.g1 = m[1]
                    scope.g2 = m[2]
                    scope.g3 = m[3]
                    scope.g4 = m[4]
                }
            })
        }
    };
    return directiveDefinitionObject;
})
module.directive('cbIntrangeWidget', function factory(){
    var directiveDefinitionObject = {
        template: ' \
            <div ><div class="slider"></div></div>\
            <div style="margin-top: 15px;">Cost Range: <span style="font-weight: bold; color:#f6931f;">{{ amount }}</span></div>\
            ',
        link: function link(scope, element, attrs){
            var options = scope.$eval(attrs.cbIntrangeOptions)
            function updateAmount(min, max, now){
                scope.amount = options.amount_template.replace('%min%', min).replace('%max%', max)
                var expression = attrs.cbIntrangeWidget + '="' + scope.amount + '"'
                if (now){
                    scope.$eval(expression)
                } else {
                    scope.$apply(expression)
                }
            }
            updateAmount(options.min, options.max, true)
            $(element).find('.slider').slider({
                range: true,
                min: options.min,
                max: options.max,
                values: [options.min, options.max],
                slide: function slide(event, ui){
                    updateAmount(ui.values[0], ui.values[1], false)
                }
            })
        }
    }
    return directiveDefinitionObject;
})
module.directive('cbPasswordStrength', function(){
    function isMixedCaseAlphanumeric(x){
        return /[a-z]/.exec(x) && /[A-Z]/.exec(x) && /[0-9]/.exec(x)
    }
    function isLongEnough(x){
        return x.length >= 6;
    }
    function measureEntropy(x){
        // http://en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength
        var HvsL = [
            [6, 32],
            [7, 40],
            [11, 64],
            [14, 80],
            [17, 96],
            [22, 128],
            [27, 160],
            [33, 192],
            [38, 224],
            [43, 256],
            [65, 384],
            [86, 512],
            [172, 1024]
        ]
        var H = HvsL[0][1];
        var L = x.length;
        for (var i=0; i<HvsL.length; i++){
            if (L >= HvsL[i][0]){
                H = HvsL[i][1]
            } else {
                break
            }
        }
        return [H, HvsL[HvsL.length-1][1]];
    }

    var directiveDefinitionObject = {
        template: '<div class="progress" style="width: {{ barWidth }}px;" ng-show="!error_message"> \
            <div class="bar bar-danger" style="width: {{ danger }}%;"></div> \
        <div class="bar bar-warning" style="width: {{ warning}}%;"></div> \
        <div class="bar bar-success" style="width: {{ success }}%;"></div> \
    </div>\
    <div ng_show="error_message">{{ error_message }}</div>',
        link: function link(scope, element, attrs){
            scope.barWidth = 128;
            scope.danger = 0;
            scope.warning = 0;
            scope.success = 0;

            scope.$watch(attrs.cbPasswordStrength, function cbPasswordStrength(value){
                var dangerWidth = 20,
                    warningWidth = 36,
                    successWidth = 44;
                if (!isLongEnough(value)){
                    scope.error_message = 'Password must be 6 chars minimum.'
                    scope.danger = 0;
                    scope.warning = 0;
                    scope.success = 0;
                } else if (!isMixedCaseAlphanumeric(value)){
                    scope.error_message = 'Password must be mixed-case alphanumeric.'
                    scope.danger = 0;
                    scope.warning = 0;
                    scope.success = 0;
                } else {
                    var x = measureEntropy(value);


                    var H = x[0],
                        maxEntropy = x[1];
                    // log2(x) = ln(x) / log(2)
                    // logarithmic curve is more smooth
                    H =  Math.log(x[0]) / Math.LN2;
                    maxEntropy = Math.log(x[1]) / Math.LN2;

                    // x / barWidth = H / maxEntropy; w = x / bw * 100 => w = H / me * 100
                    var w = Math.ceil((H  / maxEntropy) * 100);

                    scope.danger = 0;
                    scope.warning = 0;
                    scope.success = 0;
                    if (w < dangerWidth){
                        scope.danger = w;
                    } else {
                        scope.danger = dangerWidth;
                    }
                    if ((w >= dangerWidth) && (w <= (dangerWidth + warningWidth))){
                        scope.warning = w - dangerWidth;
                    } else if (w > dangerWidth + warningWidth){
                        scope.warning = warningWidth;
                    }
                    if (w >= (dangerWidth + warningWidth) && w < (dangerWidth + warningWidth + successWidth)) {
                        scope.success = w - (dangerWidth + warningWidth)
                    } else if (w == 100){
                        scope.success = successWidth;
                    }
                    scope.error_message = ''
                }
            })
        }
    };
    return directiveDefinitionObject
})
module.directive('cbDisabled', function factory(){
    return function link(scope, element, attrs){
        scope.$watch(attrs.cbDisabled, function(value){
            if (value){
                $(element).attr('disabled', 'true')
            } else {
                $(element).removeAttr('disabled')
            }
        })
    }
})
module.directive('chosen',function(){
    var linker = function(scope, element ,attrs) {
        scope.$watch('recipientsList',function(){
            element.trigger('liszt:updated');
        })
        if (scope.x){
            $(element).attr('data-placeholder', scope.x.placeholder)
        }

        element.chosen();
    };

    return {
        restrict:'A',
        link: linker
    }
})
module.directive('cbDaterange', function factory(){
    return {
        template: '<input type="text"  ng-model="value" class="daterange" placeholder="{{ x.placeholder }}">',
        link: function link(scope, element, attrs)
        {
            function updateValue(value, now){
                var expression = attrs.cbDaterange + '="' + value + '"'
                if (now){
                    scope.$eval(expression)
                } else {
                    scope.$apply(expression)
                }
            }
            $(element).find('input.daterange').daterangepicker({
                ranges: {
                    'Today': ['today', 'today'],
                    'Yesterday': ['yesterday', 'yesterday'],
                    'Last 7 Days': [Date.today().add({ days: -6 }), 'today'],
                    'Last 30 Days': [Date.today().add({ days: -29 }), 'today'],
                    'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                    'Last Month': [Date.today().moveToFirstDayOfMonth().add({ months: -1 }), Date.today().moveToFirstDayOfMonth().add({ days: -1 })]
                }
            }, function callback(start, end){
                var value = start.toString('MM/dd/yyyy') + '-' + end.toString('MM/dd/yyyy')
                updateValue(value, false)
            });

            scope.$watch(attrs.cbDaterange, function(value){
                scope.value = value
            })

        }
    }
})

module.directive('ngSecgroupbehaviour', function factory(){
    return function link(scope, element, attrs){
        scope.$watch(attrs.ngSecgroupbehaviour, function(value){
            if (!scope.done){
                $(element).val(value)
            }
        })
    }
})

module.directive('myFollowCss', function(){
    return function(scope, element, attrs){
        setTimeout(function(){
            var properties = JSON.parse(attrs['myFollowCss'])
            var $me = $(element);
            for (selector in properties){
                var $x = $(selector);
                if ($x.length){
                    properties[selector].forEach(function(name){
                        $me.css(name, $x.css(name))
                    })
                }
            }
        }, 100)
    }
})

function getHumanReadableLifespan(minutes){
    return (minutes).minutesAfter(new Date()).relative()
}

module.directive('slider', function(){
    return function(scope, element, attrs){
        var init = 10000
        $(element).slider({
            range: "max",
            min: 1,
            max: 100500,
            value: init,
            slide: function( event, ui ) {
                scope.$apply('human_readable_lifespan="' + getHumanReadableLifespan(ui.value) + '"')
            }
        })
        scope.human_readable_lifespan = getHumanReadableLifespan(init)
    }
})

