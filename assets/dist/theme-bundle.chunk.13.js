(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ 650:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContactUs; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(112);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var ContactUs = /*#__PURE__*/function (_PageManager) {
  function ContactUs() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(ContactUs, _PageManager);
  var _proto = ContactUs.prototype;
  _proto.onReady = function onReady() {
    this.registerContactFormValidation();
  };
  _proto.registerContactFormValidation = function registerContactFormValidation() {
    var formSelector = 'form[data-contact-form]';
    var contactUsValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      submit: formSelector + " input[type=\"submit\"]",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__[/* announceInputErrorMessage */ "b"]
    });
    var $contactForm = $(formSelector);
    contactUsValidator.add([{
      selector: formSelector + " input[name=\"contact_email\"]",
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].email(val);
        cb(result);
      },
      errorMessage: this.context.contactEmail
    }, {
      selector: formSelector + " textarea[name=\"contact_question\"]",
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].notEmpty(val);
        cb(result);
      },
      errorMessage: this.context.contactQuestion
    }]);
    $contactForm.on('submit', function (event) {
      contactUsValidator.performCheck();
      if (contactUsValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  return ContactUs;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ })

}]);
//# sourceMappingURL=theme-bundle.chunk.13.js.map
