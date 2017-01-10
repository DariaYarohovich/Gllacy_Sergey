'use strict'


function Element(selector) {
    this.elem = document.querySelector( '.' + selector);
    this.status = 'disabled';
}

Element.prototype.show = function() {
    this.elem.classList.remove('hide');
    this.elem.style.cssText = 'animation: show_gently; animation-duration: 0.3s;';
    this.status = 'active';
};

Element.prototype.hide = function() {
    this.elem.style.cssText = 'animation: hide_gently; animation-duration: 0.3s;';
    this.status = 'disabled';
    var self = this;
    setTimeout(function () {
        self.elem.classList.add('hide');
    }, 300);
};

Element.prototype.popupsManager = function() {
    if (this.status == 'disabled') {
        this.show();
    } else {
        this.hide();
    }
};

function InputElement(selector) {
    Element.apply(this, arguments);

    var hintOnInput;
};

InputElement.prototype = Object.create(Element.prototype);
InputElement.prototype.constructor = InputElement;

InputElement.prototype.inFocus = function() {
    if (this.elem.placeholder) {
        this.hintOnInput = document.createElement('p');
        this.hintOnInput.className = 'input-hint';
        this.hintOnInput.innerHTML = this.elem.placeholder;
        this.elem.parentElement.insertBefore(this.hintOnInput, this.elem);

        this.elem.placeholder = '';
    }
};

InputElement.prototype.outOfFocus = function() {
    this.elem.placeholder = this.hintOnInput.innerHTML;
    this.elem.parentElement.removeChild(this.hintOnInput);
};

var search = new Element('user-panel__search-field');
var userLogin = new Element('user-panel__login-form-block');
var basketPreview = new Element('user-panel__list-goods');
var feedbackForm = new Element('feedback-block');
var popupBg = new Element('popup-background');

function checkTarget(target, cssSelector) {
    if (~target.parentElement.className.indexOf(cssSelector) ||
        ~target.className.indexOf(cssSelector)) {
        return true;
    }
};

document.addEventListener("click", function(event) {
    var target = event.target;

    if (checkTarget(target, 'user-panel__search')) {
        search.popupsManager();
    }

    if (checkTarget(target, 'user-panel__user-login')) {
        userLogin.popupsManager();
    }

    if (checkTarget(target, 'user-panel__user-cart')) {
        basketPreview.popupsManager();
    }

    if(checkTarget(target, 'map__button')) {
        feedbackForm.show();
        popupBg.show();
    }

    if(checkTarget(target, 'feedback-block__close') || checkTarget(target, 'popup-background')) {
        feedbackForm.hide();
        popupBg.hide();
    }
});

var feedbackFormInput1 = new InputElement('feedback-block__input_first');
var feedbackFormInput2 = new InputElement('feedback-block__input_second');

var loginFormInput1 = new InputElement('user-panel__login-form-input_first');
var loginFormInput2 = new InputElement('user-panel__login-form-input_second');


document.addEventListener("focusin", function(event) {
    var target = event.target;

    if(checkTarget(target, 'feedback-block__input_first')) {
        feedbackFormInput1.inFocus();
    }

    if(checkTarget(target, 'feedback-block__input_second')) {
        feedbackFormInput2.inFocus();
    }

    if(checkTarget(target, 'user-panel__login-form-input_first')) {
        loginFormInput1.inFocus();
    }

    if(checkTarget(target, 'user-panel__login-form-input_second')) {
        loginFormInput2.inFocus();
    }

});

document.addEventListener("focusout", function(event) {
    var target = event.target;

    if(checkTarget(target, 'feedback-block__input_first')) {
        feedbackFormInput1.outOfFocus();
    }

    if(checkTarget(target, 'feedback-block__input_second')) {
        feedbackFormInput2.outOfFocus();
    }

    if(checkTarget(target, 'user-panel__login-form-input_first')) {
        loginFormInput1.outOfFocus();
    }

    if(checkTarget(target, 'user-panel__login-form-input_second')) {
        loginFormInput2.outOfFocus();
    }
});