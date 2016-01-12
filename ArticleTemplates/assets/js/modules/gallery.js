define([
	'bean'
], function (
	bean
) {
	'use strict';

	var galleryRows,
		PROPS = {
			minImagesPerRow: 2,
			maxImagesPerRow: 3
		};

	function init() {		
		addImagesToRows();
		addFlexClass();
		adjustHeights();

		bean.on(window, 'resize', window.ThrottleDebounce.debounce(100, false, adjustHeights));
    }

    function addImagesToRows() {
    	var i,
			images = document.body.getElementsByClassName('gallery__image-container'),
			rows = [
				[]
			],
			currentRow = 0;

		for (i = images.length - 1; i >= 0; i--) {
			if (rows[0].length === PROPS.maxImagesPerRow) {
				rows.unshift([]);
			}

			rows[0].unshift(images[i]);

			if (i === 0 && rows[0].length < PROPS.minImagesPerRow && rows.length > 1) {
				rows[0].push(rows[1].shift());
			} 
		}

		galleryRows = rows;
    }

    function addFlexClass() {
    	var i, j;

    	console.log("addFlexClass", galleryRows);

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