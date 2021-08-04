$(function () {
  $('.menu-nav__popup').on('click', function (e) {
    e.preventDefault();
    $('.menu').toggleClass('menu--active');
    $('main').toggleClass('main--active');
  });

  $('.menu-nav__btn--find').on('click', function (e) {
    e.preventDefault();
    $('.header__popup').toggleClass('header__popup--active');
  });

  $('.menu__link').on('click', function () {
    $('.menu__link').removeClass('.menu__link--active');
    $(this).toggleClass('.menu__link--active');
  });

  // $('.store-features__items').slick({
  //   centerMode: true,
  //   centerPadding: '0px',
  //   arrows: false,
  //   slidesToShow: 4,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   responsive: [
  //     {
  //       breakpoint: 1201,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '10px',
  //         slidesToShow: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 769,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '10px',
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 561,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '50px',
  //         slidesToShow: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 426,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '10px',
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // });

});
