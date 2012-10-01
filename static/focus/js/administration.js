function big(x){
    x.__small_top = x.css('top')
    x.__small_left = x.css('left')
    x.css('top', '0px').css('left', '0px')
}
function small(x){
    x.css('top', x.__small_top).css('left', x.__small_left)
}

jQuery(function($){
    var path;
    try {
        path = /([^/]+\.html)/.exec(window.location.pathname)[1];
    } catch(e) {
        path = 'index.html'
    }

    $('.sidemenu a[href="'+ path +'"]').parent().addClass('active');


    $(".banana-container").draggable({
        handle: '.banana-header span b',
        grid: [50, 20],
        containment: $('.banana-area')
    });
    $('.banana-acceptor').droppable({
        hoverClass: 'dashed',
        drop: function(event, ui){
            var x = ui.draggable.clone(true)
            ui.draggable.remove()
            $(this).html(x);
            big(x)
        }
    })
    $(document).on('click', '.banana-acceptor .banana-header .close', function(){
        var x = $(this).parent().parent().clone(true);
        $(this).parent().parent().remove();
        small(x);
        $('.banana-shop').append(x)
    })
});
