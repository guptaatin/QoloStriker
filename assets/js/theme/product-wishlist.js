export default function (wishlistItemAdd) {
    $(".wishlist-popup .close-popup").on('click', () => {
        $(".wishlist-popup").addClass('hide')
    });
    $('body').on('click', '[data-wishlist-add] [data-dropdown-content] input', (e) => {
        e.preventDefault()
        var wishlist_name = $(e.target)[0].value;
        var wishlist_id = $(e.target)[0].getAttribute('formaction').split('add&wishlistid=')[1].split('&product')[0]
        $.ajax({
            url: $(e.target)[0].getAttribute('formaction'),
            type: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .done(() => {
            $('.wishlist-popup .wishlist-popup-header h6 span').text(wishlist_name);
            $('.wishlist-popup a').attr('href','/wishlist.php?action=viewwishlistitems&wishlistid=' + wishlist_id)
            $('.wishlist-popup').removeClass('hide');
        });
    });
}
