import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import Accordion from './global/header-footer';
import PasswordShow from './password';
import orderQuick from './quick-order';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';

export default class Global extends PageManager {
    onReady() {
        const {
            channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage, showAdminBar,
        } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        Accordion();
        PasswordShow();
        orderQuick();
        mobileMenuToggle();
        privacyCookieNotification();
        if (showAdminBar) {
            adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        }
        loadingProgressBar();
        svgInjector();

        /* BundleB2B */
        const $body = $('body');
        const B3StorefrontURL = 'https://cdn.bundleb2b.net/b3-auto-loader.js';
        $body.append(`<script src="${B3StorefrontURL}"></script>`);
        window.b3themeConfig = window.b3themeConfig || {};
        window.b3themeConfig.useContainers = {
            'pdp.shoppinglist.container': '',
        };
        window.b3themeConfig.useStyles = {};
        window.b3themeConfig.useJavaScript = {
            shoppinglists: {
                overwrite: false,
            },
            shoppinglist: {
                overwrite: true,
            },
            login: {
                callback(instance) {
                    const {
                        context: {
                            inDevelopment,
                        },
                        isB2BUser,
                    } = instance;
                    if (inDevelopment) {
                        console.log(instance.name, instance);
                    }

                    const showBCOrdersContent = () => {
                        const style = `
                            <style>
                                .page_type__account_orderstatus .body .container .account {
                                    display: block !important;
                                }
                            </style>
                        `;
                        $('head').append(style);
                    };

                    if (!isB2BUser) {
                        showBCOrdersContent();
                    }
                },
            },
            orders: {
                callback(instance) {
                    const {
                        context: {
                            inDevelopment,
                        },
                        isB2BUser,
                    } = instance;

                    if (inDevelopment) {
                        console.log(instance.name, instance);
                    }

                    const fixClasslist = () => {
                        $('.order-lists-wrap').addClass('account');
                    };

                    const showB3OrdersContent = () => {
                        const style = `
                            <style>
                                .page_type__account_orderstatus .body .container .order-lists-wrap {
                                    display: block !important;
                                }
                            </style>
                        `;
                        $('head').append(style);
                    };

                    if (isB2BUser) {
                        fixClasslist();
                        showB3OrdersContent();
                    }
                },
            },
        };
        /* BundleB2B */

        this.handleWishlist();
        // common JS
        $(document).on("mouseover", '.ss__result.product', function () {
            $('.ss__result.product').removeClass("opacity-100");
            $('.ss__result.product').addClass("opacity-60");
            $(this).addClass("opacity-100");
            $(this).removeClass("opacity-60");
        });
        $(document).on("mouseout", '.ss__result.product', function () {
            $('.ss__result.product').addClass("opacity-100");
            $('.ss__result.product').removeClass("opacity-60");
        });
        $(document).on("mouseover", '.productGrid .product', function () {
            $('.productGrid .product').removeClass("opacity-100");
            $('.productGrid .product').addClass("opacity-60");
            $(this).addClass("opacity-100");
            $(this).removeClass("opacity-60");
        });
        $(document).on("mouseout", '.productGrid .product', function () {
            $('.productGrid .product').addClass("opacity-100");
            $('.productGrid .product').removeClass("opacity-60");
        });
        $(document).on('click', '.ss__result-actions--add-to-wishlist-btn', function (event) {
            event.preventDefault();
            let url = $(this).attr('href');
            var current_this = $(this);
            current_this.parents('.ss__add-to-cart-container').find('.ajax-add-to-cart-btn').text('Adding to  wishlist...');
            $.ajax({
                url,
                contentType: 'application/json',
                method: 'POST',
            }).done((data) => {
                current_this.addClass('active');
                current_this.parents('.ss__add-to-cart-container').find('.ajax-add-to-cart-btn').text('Add to cart');
            }).fail((e) => {
                console.log('failed');
                current_this.parents('.ss__add-to-cart-container').find('.ajax-add-to-cart-btn').text('Add to cart');
            });
        });
    }
    handleWishlist() {
        $('body').on('click', 'a.create-wishlist[data-wishlist]', (e) => {
            e.preventDefault();
            window.location.href = '/wishlist.php?action=addwishlist';
        });

        $(".wishlist-popup .close-popup").on('click', () => {
            $(".wishlist-popup").addClass('hide');
        });
        $('body').on('click', '[data-wishlist-add] [data-dropdown-content] input', (e) => {
            e.preventDefault();
            var wishlist_name = $(e.target)[0].value;
            var wishlist_id = $(e.target)[0].getAttribute('formaction').split('add&wishlistid=')[1].split('&product')[0];
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
                    $('.wishlist-popup a').attr('href', '/wishlist.php?action=viewwishlistitems&wishlistid=' + wishlist_id);
                    $('.wishlist-popup').removeClass('hide');
                });
        });
    }
}
