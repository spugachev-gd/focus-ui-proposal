$(function() {
    $(".chzn-select").chosen({allow_single_deselect: true});
    $(".help-tooltip").tooltip();
    $("[rel=tooltip]").tooltip();
    $(".daterange").daterangepicker({
        ranges: {
            'Today': ['today', 'today'],
            'Yesterday': ['yesterday', 'yesterday'],
            'Last 7 Days': [Date.today().add({ days: -6 }), 'today'],
            'Last 30 Days': [Date.today().add({ days: -29 }), 'today'],
            'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
            'Last Month': [Date.today().moveToFirstDayOfMonth().add({ months: -1 }), Date.today().moveToFirstDayOfMonth().add({ days: -1 })]
        }
    });
});

function Validator(){

    this.regexps = {
        'ip': {'re': /^\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b$/,
               'message': 'Please, enter valid IP address.'},
        'email': {'re': /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  'message': 'Please, enter valid email address.'},
        'daterange': {'re': /^\d{1,2}\/\d{1,2}\/\d{1,4} - \d{1,2}\/\d{1,2}\/\d{1,4}$/,
                      'message': 'Date range is not valid'}
    }

    this.validate_data = function(_data, regex){
        var result = {'success': this.regexps[regex]['re'].test(_data)}
        if (!result['success']){
            result['message'] = this.regexps[regex]['message'];
        }
        return result;
    }

    this.email = function(_data){ return this.validate_data(_data, 'email'); };
    this.ip = function(_data){ return this.validate_data(_data, 'ip'); };
    this.daterange = function(_data){ return this.validate_data(_data, 'daterange'); };
}

(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);