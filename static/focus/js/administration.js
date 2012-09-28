jQuery(function($){
    var path = /([^/]+\.html)/.exec(window.location.pathname)[1];
    $('.sidemenu a[href="'+ path +'"]').parent().addClass('active');


    $(".banana-container").draggable({
        handle: '.banana-header span b',
        grid: [50, 20],
        containment: $('.banana-area')
    });
    $('.banana-acceptor').droppable({
        hoverClass: 'dashed',
        drop: function(event, ui){
            $(this).html(ui.draggable);
            ui.draggable.css('top', '0px').css('left', '0px')
        }
    })
});
