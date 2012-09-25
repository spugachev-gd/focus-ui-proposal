angular.module('MockupModule', []).
    filter('maybe_link', function(){
        return function(x){
            if (x.length == 2){
                return '<a href="' + x[0] + '">' + x[1] +'</a>';
            } else {
                return x[0];
            }
        }
    })