$(window).on('load', function() {
  $('.loading').fadeIn(300);
  $('.loader-bg').delay(1500).fadeOut(600);
});

$('.top-kv').slick({
    autoplay:true,
    autoplaySpeed:4000,
    dots:true,
    fade: true,
    slidesToShow: 1,
    speed: 2000,
});

$(window).on('load scroll', function(){
  if ($(window).scrollTop() < 200) {
    $('.slick-next, .slick-prev, .slick-dots').fadeIn(400);
  } else {
    $('.slick-next, .slick-prev, .slick-dots').fadeOut(400);
  }
});

$('.gnav-sp').on('click', function(){
  $('.gnav-sp-inner').toggleClass('is-active');
  $(this).toggleClass('is-active');
});

$(function(){
    $('.js-menu-link').each(function(){
        $(this).on('click',function(){
            $("+.menu-content",this).slideToggle();
            return false;
        });
    });
});

$('.menu-link').click(function() {
  $(this).children('.menu-link-icon').toggleClass('is-open');
});
