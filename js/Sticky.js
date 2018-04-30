
$(window).scroll(function(){
    var sticky = $('.sticky_nav_bar'),
        scroll = $(window).scrollTop(),
        social = $('.footer_social'),
        arrow = $('#pagedown'),
        contact = $('#get_in_touch');
        navbar = $('.sticky_nav_bar');

    if (scroll >= $(document).height()/3 - 130) {
        sticky.addClass('sticky');
        social.show(1000);
        arrow.fadeOut(900);
    }
    else {
        sticky.removeClass('sticky');
        social.hide(1000);
        arrow.fadeIn(900);
    }
    if (scroll >= $(document).height()/2 +  350)contact.fadeOut(900);
    else contact.fadeIn(900);
});

jQuery(document).ready(function ($) {

    $("#pagedown").click(function(e) {
        // Prevent a page reload when a link is pressed
        e.preventDefault();
        $("html, body").animate({ scrollTop: $(document).height()/3 }, 1000);
        $('#pagedown').fadeOut(900);
    });
    $("#get_in_touch").click(function(e) {
        // Prevent a page reload when a link is pressed
        e.preventDefault();
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });

});


