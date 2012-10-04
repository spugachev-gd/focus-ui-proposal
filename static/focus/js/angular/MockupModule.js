angular.module('MockupModule', []).
    filter('maybe_link', function(){
        return function(x){
            if (x.length == 2){
                return '<a href="' + x[0] + '">' + x[1] +'</a>';
            } else {
                return x[0];
            }
        }
    }).
    directive('cbIpWidget', function factory(){
        var directiveDefinitionObject = {
            template: '<div class="cb-ip-widget"><input type="text" ng-model="g1">. <input type="text" ng-model="g2">.<input type="text" ng-model="g3">.<input type="text" ng-model="g4"></div>',
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
    }).
    directive('cbIntrangeWidget', function factory(){
        var directiveDefinitionObject = {
            template: ' \
                <div> \
                    <input type="text" \
                        name="{{ x.key }}" \
                        value="" \
                        ng-model="query_parts[x.key]" \
                        ng-change="build_query()"> \
                </div> \
                <div class="">Cost Range: <span class="amount" style="font-weight: bold; color:#f6931f;"></span></div> \
                <div class="slider"></div>',
            link: function link(scope, element, attrs){
                console.log('scope', scope)
                console.log('element', element)
                console.log('attrs', attrs)
                var options = scope.$eval(attrs.cbIntrangeOptions)
                console.log('options', options)


                var $x = $(element);
                var $a = $x.find('.amount')
                var $s = $x.find('.slider')
                console.log('$a', $a)
                console.log('$s', $s)
                $x.slider({
                    range: true,
                    min: options.min,
                    max: options.max,
                    values: [options.min, options.max],
                    slide: function slide(event, ui){

                        $a.html(options.amount_template.replace('%min%', ui.values[0]).replace('%max%', ui.values[1]))
                        var amount = ui.values[0] + '-' + ui.values[1]
                        var expression = scope.$eval(attrs.cbIntrangeWidget) + '="' + amount + '"'
                        console.log(expression)
                        scope.$eval(expression)

                    }
                })
                if ($x.size()){
                    var $a = $($x.attr('data-amount-container-selector'))
                    var $v = $($x.attr('data-value-input-selector'))

                }


            }

        }
        return directiveDefinitionObject;
    })