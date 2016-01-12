define([
    'bean'
], function(
    bean
) {
    'use strict';

    var galleryRows,
        galleryProps = {
            minImagesPerRow: 2,
            maxImagesPerRow: 3
        };

    function init() {
        addImagesToRows();
        addFlexClass();
        adjustHeights();
        showImages();

        bean.on(window, 'resize', window.ThrottleDebounce.debounce(100, false, resizeHandler));
        bean.on(window, 'scroll', window.ThrottleDebounce.debounce(100, false, scrollHandler));
    }

    function resizeHandler() {
        adjustHeights();
        showImages();
    }

    function scrollHandler() {
        showImages();
    }

    function showImages() {
        var i, j;

        for (i = 0; i < galleryRows.length; i++) {
            for (j = 0; j < galleryRows[i].length; j++) {
                if (!galleryRows[i][j].classList.contains("loaded") && isImageInView(galleryRows[i][j])) {
                    loadImage(galleryRows[i][j]);
                }
            }
        }
    }

    function isImageInView(imageContainer) {
        var rect = imageContainer.getBoundingClientRect();

        return rect.top <= window.innerHeight;
    }

    function loadImage(imageContainer) {
        var img = document.createElement("img");

        img.src = imageContainer.dataset.url;

        if (!img.complete) {
            img.onload = onImageLoaded.bind(null, imageContainer);
        } else {
            onImageLoaded(imageContainer);
        }
    }

    function onImageLoaded(imageContainer) {
        var image = imageContainer.getElementsByClassName("gallery__image")[0];

        image.style.backgroundImage = "url('" + imageContainer.dataset.url + "')";

        imageContainer.classList.add("loaded");
    }

    function addImagesToRows() {
        var i,
            images = document.body.getElementsByClassName('gallery__image-container'),
            rows = [
                []
            ],
            currentRow = 0;

        for (i = images.length - 1; i >= 0; i--) {
            if (rows[0].length === galleryProps.maxImagesPerRow) {
                rows.unshift([]);
            }

            rows[0].unshift(images[i]);

            if (i === 0 && rows[0].length < galleryProps.minImagesPerRow && rows.length > 1) {
                rows[0].push(rows[1].shift());
            }
        }

        galleryRows = rows;
    }

    function addFlexClass() {
        var i, j;

        for (i = 0; i < galleryRows.length; i++) {
            for (j = 0; j < galleryRows[i].length; j++) {
                galleryRows[i][j].classList.add("gallery__image-container--flex" + galleryRows[i].length);
            }
        }
    }

    function adjustHeights() {
        var i, j, rowHeights = [];

        for (i = 0; i < galleryRows.length; i++) {
            for (j = 0; j < galleryRows[i].length; j++) {
                if (!rowHeights[i]) {
                    rowHeights.push(galleryRows[i][j].offsetWidth);
                }
                galleryRows[i][j].style.height = rowHeights[i] + "px";
            }
        }
    }

    return {
        init: init
    };
});