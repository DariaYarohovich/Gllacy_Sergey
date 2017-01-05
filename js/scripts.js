'use strict'

function Element(selector) {
    this.elem = document.querySelector( '.' + selector);
    this.status = 'disabled';

}


Element.prototype.show = function() {
    this.elem.classList.remove('hide');
    this.elem.style.cssText = 'animation: show_gently; animation-duration: 0.6s;';
    this.status = 'active';
}

Element.prototype.hide = function() {
    this.elem.style.cssText = 'animation: hide_gently; animation-duration: 0.6s;';
    this.status = 'disabled';
    var self = this;
    setTimeout(function () {
        self.elem.classList.add('hide');
    }, 600);

}

var search = new Element('user-panel__search-field');

document.addEventListener("click", function(event) {
    var target = event.target;

    if (~target.className.indexOf('user-panel__search')) {
        if (search.status == 'disabled') {
            search.show();
        } else {
            search.hide();
        }
    }






});