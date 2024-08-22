export default function (orderQuick) {
    $("[data-btn-quick-order]").click(function(e) {
        var sku = $('[data-quick-sku]')[0].value;
        var quantity = $('[data-quick-quantity]')[0].value;
        return $.get({
            url:"/cart.php?action=add&sku="+sku+"&qty="+quantity+"",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function(data) {
            if($(data).find("[data-cart-status] .alertBox-message").length > 0){
                $('.quick-error').css('display', 'block')
                return Promise.reject($(data).find("[data-cart-status] .alertBox-message").text())
            }
        })
        .done(function(data, status) {
            $('[data-cart-preview]').click()
            console.log('first item complete with status ' + status);
        })
        .fail(function(error) {
            console.error(error);
        })
    });
}
