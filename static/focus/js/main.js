$(function() {
    $(".chzn-select").chosen({allow_single_deselect: true});
    $(".help-tooltip").tooltip();
    $(".daterange").daterangepicker();
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
