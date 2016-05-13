define(function () {
	'use strict';

	var modules = {
	    isElementInViewport: function (el) {
            var rect = el.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }, 

        isElementPartiallyInViewport: function(el) {
            var rect = el.getBoundingClientRect(),
                windowHeight = (window.innerHeight || document.documentElement.clientHeight),
                windowWidth = (window.innerWidth || document.documentElement.clientWidth),
                vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0),
                horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

            return (vertInView && horInView);
        },

        signalDevice: function (messageName) {
            var path = 'x-gu://',
                url = path + messageName,
                iframe = document.createElement('iframe');

            iframe.style.display = 'none';
            iframe.src = url;

            modules.doIframeMessage(iframe);
        },

        doIframeMessage: function (elem) {
            document.documentElement.appendChild(elem);
            document.documentElement.removeChild(elem);
        },

        isOnline: function () {
            return !document.body.classList.contains('offline') && navigator.onLine;
        },

        getClosestParentWithClass: function (elem, className) {
            while (elem && (!elem.classList || !elem.classList.contains(className))) {
                elem = elem.parentNode;
            }

            return elem;
        },

        getClosestParentWithTag: function (elem, tagName) {
            while (elem && (elem.tagName !== tagName)) {
                elem = elem.parentNode;
            }

            return elem;
        },

        getClosestParentWithData: function (elem, dataKey, dataVals) {
            if (typeof dataVals === 'string') {
                dataVals = [dataVals];
            }

            while (elem && (!elem.dataset || dataVals.indexOf(elem.dataset[dataKey]) === -1)) {
                elem = elem.parentNode;
            }

            return elem;
        },

        getStringFromUnicodeVal: function (unicodeVal) {
            return String.fromCharCode(unicodeVal);
        }
	};

	return modules;
});