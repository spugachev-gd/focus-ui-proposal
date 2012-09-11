jQuery(function($){
    $('.user_avatar .controls').mouseenter(function(){
        $('form.user_avatar').addClass('active');
    });
    $('.user_avatar .controls').mouseleave(function() {
        $('form.user_avatar').removeClass('active');
    });
    $('.change_avatar_trigger').click(function(){
        $('.avatar_chooser').css("display", "block");
    });
});
