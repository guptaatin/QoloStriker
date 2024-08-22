import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';

export const CartPreviewEvents = {
    close: 'closed.fndtn.dropdown',
    open: 'opened.fndtn.dropdown',
};

export default function (secureBaseUrl, cartId) {
    const loadingClass = 'is-loading';
    const $cart = $('[data-cart-preview]');
    const $cartMobile = $('.cart-preview');
    const $cartDropdown = $('#cart-preview-dropdown');
    const $cartDropdownMobile = $('#cart-preview-dropdown-mobile');
    const $cartLoading = $('<div class="loadingOverlay"></div>');

    const $body = $('body');

    if (window.ApplePaySession) {
        $cartDropdown.addClass('apple-pay-supported');
    }

    $(document).on("click", ".ajax-add-to-cart-btn", function (event) {
        event.preventDefault();
        var $this = $(this);
        var a = $this.attr('href');
        $this.text('Adding to  cart...');

        var request = $.ajax({
            url: a,
            type: "POST",
            dataType: "html"
        });

        request.done(function (msg) {
            console.log('calling the resposen of the data');
            $cart.click();
            $this.text('Added');
            setTimeout(function () {

                $this.text('Add to cart');
            }, 2500);
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Something went wrong");
        });

    });

    $body.on('cart-quantity-update', (event, quantity) => {
        $cart.attr('aria-label', (_, prevValue) => prevValue.replace(/\d+/, quantity));

        // if (!quantity) {
        //     $cart.addClass('navUser-item--cart__hidden-s');
        // } else {
        //     $cart.removeClass('navUser-item--cart__hidden-s');
        // }
        $('.cart-quantity')
            .text(quantity)
            .toggleClass('countPill--positive', quantity > 0);
        if (utils.tools.storage.localStorageAvailable()) {
            localStorage.setItem('cart-quantity', quantity);
        }
    });
    $body.click(function (event) {
        if (event.target.classList.value == 'popup-overlay' || event.target.classList.value == 'close-cart-popup') {
            $('body').removeClass('open-cart-popup');
            $('#cart-preview-dropdown-mobile').removeClass('is-open');
        }
    });

    let quantity = 0;

    if (cartId) {
        // Get existing quantity from localStorage if found
        if (utils.tools.storage.localStorageAvailable()) {
            if (localStorage.getItem('cart-quantity')) {
                quantity = Number(localStorage.getItem('cart-quantity'));
                $body.trigger('cart-quantity-update', quantity);
            }
        }

        // Get updated cart quantity from the Cart API
        const cartQtyPromise = new Promise((resolve, reject) => {
            utils.api.cart.getCartQuantity({ baseUrl: secureBaseUrl, cartId }, (err, qty) => {
                if (err) {
                    // If this appears to be a 404 for the cart ID, set cart quantity to 0
                    if (err === 'Not Found') {
                        resolve(0);
                    } else {
                        reject(err);
                    }
                }
                resolve(qty);
            });
        });
        // If the Cart API gives us a different quantity number, update it
        cartQtyPromise.then(qty => {
            quantity = qty;
            $body.trigger('cart-quantity-update', quantity);
        });

    } else {
        $body.trigger('cart-quantity-update', quantity);
    }
    $cartMobile.click(function (event) {
        // Get updated cart quantity from the Cart API
        const cartQtyPromise = new Promise((resolve, reject) => {
            utils.api.cart.getCartQuantity({ baseUrl: secureBaseUrl, cartId }, (err, qty) => {
                if (err) {
                    // If this appears to be a 404 for the cart ID, set cart quantity to 0
                    if (err === 'Not Found') {
                        resolve(0);
                    } else {
                        reject(err);
                    }
                }
                resolve(qty);
            });
        });
        // If the Cart API gives us a different quantity number, update it
        cartQtyPromise.then(qty => {
            quantity = qty;
            $body.trigger('cart-quantity-update', quantity);
        });
        if ($cartDropdownMobile.hasClass('is-open') && event.target.tagName === 'SPAN') {
            $('body').removeClass('open-cart-popup');
            $('#cart-preview-dropdown-mobile').removeClass('is-open');
            return;
        }
        const options = {
            template: 'common/cart-preview',
        };
        event.preventDefault();
        $cartDropdownMobile
            .addClass(loadingClass)
            .html($cartLoading);
        $cartLoading
            .show();
        $('body').addClass('open-cart-popup');
        utils.api.cart.getContent(options, (err, response) => {
            $cartDropdownMobile
                .removeClass(loadingClass)
                .html(response);
            $cartDropdownMobile.addClass('is-open');
            $cartLoading
                .hide();
        });
    });
    $cart.click(function (event) {
        // Get updated cart quantity from the Cart API
        const cartQtyPromise = new Promise((resolve, reject) => {
            utils.api.cart.getCartQuantity({ baseUrl: secureBaseUrl, cartId }, (err, qty) => {
                if (err) {
                    // If this appears to be a 404 for the cart ID, set cart quantity to 0
                    if (err === 'Not Found') {
                        resolve(0);
                    } else {
                        reject(err);
                    }
                }
                resolve(qty);
            });
        });
        // If the Cart API gives us a different quantity number, update it
        cartQtyPromise.then(qty => {
            quantity = qty;
            $body.trigger('cart-quantity-update', quantity);
        });
        if ($cartDropdown.hasClass('is-open') && event.target.tagName === 'SPAN') {
            $('#cart-preview-dropdown-mobile').removeClass('is-open');
            return;
        }
        const options = {
            template: 'common/cart-preview',
        };

        // Redirect to full cart page
        //
        // https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
        // In summary, we recommend looking for the string 'Mobi' anywhere in the User Agent to detect a mobile device.
        // if (/Mobi/i.test(navigator.userAgent)) {
        //     return event.stopPropagation();
        // }

        event.preventDefault();

        $cartDropdown
            .addClass(loadingClass)
            .html($cartLoading);
        $cartLoading
            .show();
        utils.api.cart.getContent(options, (err, response) => {
            $cartDropdown
                .removeClass(loadingClass)
                .html(response);
            $cartDropdown.addClass('is-open');
            $cartLoading
                .hide();
            $('.close-cart-popup').click(function () {
                $('#cart-preview-dropdown').removeClass('is-open');
            });
        });
    });
}
