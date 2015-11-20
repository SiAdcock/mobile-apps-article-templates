/*global window,document,console,define */
define([
    'bean',
    'bonzo',
    'modules/$',
    'modules/twitter',
    'modules/witness',
    'modules/outbrain'
], function (
    bean,
    bonzo,
    $,
    twitter,
    witness,
    outbrain
) {
    'use strict';

    var modules = {
        insertOutbrain: function () {
            window.articleOutbrainInserter = function () {
                outbrain.load();
            };
            window.applyNativeFunctionCall('articleOutbrainInserter');
        },
        
        formatImmersive : function(){
            if (!$('.immersive').length) {
                return false;
            }

            var viewPortHeight = bonzo.viewport().height,
                bgHeight = (viewPortHeight - $('body').css('margin-top').replace('px','')) + 'px',
                pageOffset = viewPortHeight * 0.75,
                progressBar = $('.progress__bar');

            // Override tone to feature for all immersive pages
            document.body.className = document.body.className.replace( /(tone--).+?\s/g , 'tone--feature1 ' );

            // set header image height to viewport height
            $('.article__header-bg, .article__header-bg .element > iframe').css('height', bgHeight);
            
            // TODO: This is just not a fix, we actually need for the embed to be sent through with prefixed & unprefixed styles
            var iframe = $('.article__header-bg .element > iframe');
            if (iframe) {
                var newSrc = iframe[0].srcdoc
                    .replace("transform: translate(-50%, -50%);", "-webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);")
                    .replace(/-webkit-animation/g, "animation")
                    .replace(/animation/g, "-webkit-animation")
                    .replace(/@keyframes/g, "@-webkit-keyframes");
                iframe[0].srcdoc = newSrc;
            }
            
            // for each element--immersive add extra classes depending on siblings
            $('figure.element--immersive').each(function(){
                if($(this).next().hasClass('element-pullquote')){
                    $(this).next().addClass('quote--image');
                    $(this).addClass('quote--overlay').data('data-thing', '');
                }
                
                if($(this).next()[0].tagName === "H2"){
                    $(this).next().addClass('title--image');
                    $(this).addClass('title--overlay');
                    $(this).next().next().addClass('has__dropcap');
                }
            });

            // find all the section seperators & add classes
            $('.article h2').each(function() {
                if ($(this).html() === '* * *') {
                    $(this).html('').addClass('section__rule').next().addClass('has__dropcap');
                }
            });

            // create chapter markers
            var articleHeight = $('.article').offset().height; // measure article height after other adjustments so it is accurate
            modules.addProgressBarChapters(progressBar, articleHeight);

            // store all pullquotes top offset for later
            $('.element-pullquote').each(function(){
               var $this = $(this),
                    offset = $this.offset().top;
               $this.attr('data-offset', offset);
            });

            // set up click event for displaying figcaption
            bean.on(window, 'click.quote-overlay', $('.quote--overlay'), function(e) {
                e.preventDefault();
                $(this.querySelector('figcaption')).toggleClass('display');
            });

            // set up on scroll event for sliding pullquote into view and updating progress bar
            bean.on(window, 'scroll.immersive', window.ThrottleDebounce.debounce(10, false, function () {
                // slide pull-quotes into view
                $('.element-pullquote').each(function(){
                    var $this = $(this),
                        dataOffset = $this.attr('data-offset');

                    if(window.scrollY >= (dataOffset - pageOffset)) {
                        $this.addClass('animated').addClass('fadeInUp');
                    }
                });

                // update progress bar
                modules.updateProgressBar(progressBar, articleHeight);
            }));

            // add a resize / orientation event to redraw the chapter positions for new article height
            bean.on(window, 'resize.cards orientationchange.cards', window.ThrottleDebounce.debounce(100, false, function () {
                // remeasure article height 
                articleHeight = $('.article').offset().height; // measure article height after other adjustments so it is accurate

                // empty the progress bar div 
                progressBar.html('');

                // redraw chapter markets
                modules.addProgressBarChapters(progressBar, articleHeight);

                // update progress position
                modules.updateProgressBar(progressBar, articleHeight);

                // set header image height to new viewport height
                viewPortHeight = bonzo.viewport().height;
                bgHeight = (viewPortHeight - $('body').css('margin-top').replace('px','')) + 'px';
                $('.article__header-bg, .article__header-bg .element > iframe').css('height', bgHeight);
                
            }));

            // call updateProgressBar on first load
            modules.updateProgressBar(progressBar, articleHeight);
        },

        addProgressBarChapters: function(progressBar, articleHeight) {
            $('.article h2').each(function() {
                var chapterPosition = Math.floor(($(this).offset().top / articleHeight) * 100) + "%",
                    thisChapter = '<div style="left:'+ chapterPosition + ';" class="progress__chapter"></div>';
                progressBar.append(thisChapter);
            });
        },

        updateProgressBar: function(progressBar, articleHeight) {
            var scrollPosition = (window.scrollY / articleHeight * 100) + "%";
            progressBar.css('width', scrollPosition);
        }
    },

    ready = function () {
        if (!this.initialised) {
            this.initialised = true;
            twitter.init();
            twitter.enhanceTweets();
            witness.duplicate();
            modules.insertOutbrain();
            modules.formatImmersive();
        }
    };

    return {
        init: ready
    };
});
