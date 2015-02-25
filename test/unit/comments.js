define([
	'modules/comments',
	'bonzo',
	'bean',
	'modules/$'
], function(Comments, bonzo, bean, $){

	describe('Comments', function(){
		var sandbox;

		before(function(){
			sandbox = bonzo(bonzo.create('<div id="sandbox" style="visibility:hidden;"></div>'));
			sandbox.appendTo(document.body);
		});

		it('exists', function(){
			expect(Comments).to.be.defined;
		});

		if (navigator.userAgent.indexOf('PhantomJS') < 0) {
			it('keeps the recommend button "blue" after clicked', function(done){
				recommend = bonzo(bonzo.create('<a class="comment__recommend touchpoint touchpoint--secondary touchpoint--small" href="x-gu://recommendcomment/48001935"><span class="touchpoint__button" data-icon="" aria-hidden="true"></span><span class="touchpoint__label comment__recommend__count">1 <span class="screen-readable">recommendations. Tap to recommend.</span></span></a>'));
				recommend.appendTo(sandbox);
				Comments.modules.setupChecked();
				bean.fire(recommend[0], 'click');
				setTimeout(function(){
					expect(recommend.hasClass('comment__recommend--checked')).to.be.true;
					done();
				}, 0);
			});
		}

		afterEach(function(){
			sandbox.empty();
		});

		after(function(){
			sandbox.remove();
		});

	});

});
