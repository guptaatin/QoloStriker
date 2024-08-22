export default function (PasswordShow) {
    $(".password-show").click(function() {
        $(this).toggleClass("show");
        var input = $(this)[0].parentElement.querySelector('input');
        if ($(this).hasClass("show")){
            input.setAttribute("type", "text");
        } else {
            input.setAttribute("type", "password");
        }
    });
    if(document.querySelector('.navBar--account .navBar-item.is-active') != undefined){
        document.querySelector('.navBar--account .navBar-item.is-active').scrollIntoView(0, 100)
    }
}
