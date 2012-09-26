jQuery(function($){
    $('.back_panel').mouseenter(function() {
        $('.back_panel').stop().animate({
            "opacity": "1"
        }, 500);
    });
    $('.back_panel').mouseleave(function() {
        $('.back_panel').stop().animate({
            "opacity": "0.2"
        }, 500);
    });
})
