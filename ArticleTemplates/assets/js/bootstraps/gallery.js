/*global window,document,console,define */
define([
    'bean',
    'modules/$',
    'modules/collagePlus',
    'modules/gallery'
], function (
    bean,
    $,
    collagePlus,
    gallery
) {
    'use strict';

    var modules = {
        initialiseGallery: function () {
            gallery.init();
        }
    },

    ready = function () {
        if (!this.initialised) {
            this.initialised = true;
            modules.initialiseGallery();

        }
    };

    return {
        init: ready
    };
});