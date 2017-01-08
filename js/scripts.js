'use strict'

/*================MAP=================*/
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.939168, 30.328262],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {

        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: "img/icecream-marker.png",
            // Размеры метки.
            iconImageSize: [218, 142],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-47, -142]
        });

    myMap.geoObjects.add(myPlacemark);

});

/*================ MAP END =================*/

function Element(selector) {
    this.elem = document.querySelector( '.' + selector);
    this.status = 'disabled';
}

Element.prototype.show = function() {
    this.elem.classList.remove('hide');
    this.elem.style.cssText = 'animation: show_gently; animation-duration: 0.3s;';
    this.status = 'active';
}

Element.prototype.hide = function() {
    this.elem.style.cssText = 'animation: hide_gently; animation-duration: 0.3s;';
    this.status = 'disabled';
    var self = this;
    setTimeout(function () {
        self.elem.classList.add('hide');
    }, 300);
}

Element.prototype.popupsManager = function() {
    if (this.status == 'disabled') {
        this.show();
    } else {
        this.hide();
    }
}

var search = new Element('user-panel__search-field');
var userLogin = new Element('user-panel__login-form-block');
var basketPreview = new Element('user-panel__list-goods');

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
});