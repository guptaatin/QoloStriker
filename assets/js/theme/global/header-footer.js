export default function (Accordion) {
    $('.footer-info-content .footer-info-heading').on('click', function(){
        if ($(this).closest('.footer-info-content').hasClass('active')){
            $(this).closest('.footer-info-content').removeClass('active');
            return false;
        }
        $('.footer-info-content').removeClass('active');
        $(this).closest('.footer-info-content').addClass('active');
    })
    $('.navPages-item.has-dropdown .main-item').on('click', function(event){
        event.preventDefault();
        if ($(this).closest('.navPages-item.has-dropdown').hasClass('active')){
            $(this).closest('.navPages-item.has-dropdown').removeClass('active');
            return false;
        }
        $('.navPages-item.has-dropdown').removeClass('active');
        $(this).closest('.navPages-item.has-dropdown').addClass('active');
    })
    $('.accordion-heading').on('click', function(){
        if ($(this).closest('.accordion-wrapper').hasClass('active')){
            $(this).closest('.accordion-wrapper').removeClass('active');
            return false;
        }
        $('.accordion-wrapper').removeClass('active');
        $(this).closest('.accordion-wrapper').addClass('active');
    })
    $('.navigation-faq a').on('click', function(){
        if ($(this).hasClass('active')){
            $(this).removeClass('active');
            return false;
        }
        $('.navigation-faq a').removeClass('active');
        $(this).addClass('active');
    })
    $('.home-product-carousel').slick({
        infinite: true,
        slidesToShow: 1,
        arrows: true,
        dots: true,
        mobileFirst: true,
        prevArrow:"<button class='slick-prev' aria-label='Previous' type='button'></button>",
        nextArrow:"<button class='slick-next' aria-label='Next' type='button'></button>",
        responsive: [
            {
                "breakpoint": 1000,
                "settings": {
                    "slidesToShow": 4,
                    "slidesToScroll": 1
                }
            },
            {
                "breakpoint": 550,
                "settings": {
                    "slidesToShow": 3,
                    "slidesToScroll": 1
                }
            }
        ]
    });
}
