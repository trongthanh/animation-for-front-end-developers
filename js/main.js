/* © 2016 NauStud.io
 * @author Thanh Tran
 */
(function() {
	'use strict';

	// For fun, displaying Nau ASCII Art:
	var NAU_ASCII_ART = '   _.._             _.._           .--┐\n .`--.  \'.        .\'  .-`\'.       |   |\n.   .-\\   \\  (`) .   /-.   \\      |   |\n|   |  \\   \\     |   |  \\   \\     |   |\n|   |   \\   \\    |   |   \\   \\    |   |\n|   |    \\   \\   |   |    \\   \\   |   |\n|   |     \\   \\  |   |     \\   \\  |   |\n|   |      \\   `-/   |      \\   \\-\'   |\n|   |       \\_.-`   ,\'  (`)  \\   `-._.\'\n└--`         `-...-`          `-...-`\nNau Studio';
	console.log(NAU_ASCII_ART);

	var slideCount = 0;
	var currentSlide = 1; // 1-based
	var Story = new TimelineMax({
		paused: true
	});

	$.ready()
	.then(function() {
		'use strict';

		// Create a timeline for each Slide
		$$('.slide').forEach(function(el) {
			slideCount++;
			var label = labelOf(slideCount);
			console.log('slide', label, 'created');

			Story
				.addLabel(label)
				.staggerFrom(el.children, 0.5, {opacity: 0, x: '500px'}, 0.1)
				.to(el, 0, {zIndex: 1})
				.addLabel('mid' + label)
				.staggerTo(el.children, 0.5, {zIndex: -1, opacity: 0, x: '-500px'}, 0.1)
				.to(el, 0, {zIndex: 0});

			// store the timeline label for later retrieval
			el._.tlLabel = label;

		});

		// bind events
		$('.js-next').addEventListener('click', function(event) {
			event.preventDefault();
			if (!Story.isActive()) {
				playNext();
			}
		});

		$('.js-back').addEventListener('click', function(event) {
			event.preventDefault();
			if (!Story.isActive()) {
				playBack();
			}
		});

		// framerate slide
		$$('.js-play-framerate')._.events({
			'click': function(event) {
				event.preventDefault();
				var player = $('#frameratePlayer');
				var videoFile = event.currentTarget.hash.substr(1);
				console.log('play:', videoFile);

				player.src = videoFile;
				player.play();

			}
		});

		$('body')._.events({
			'keydown': function(event) {
				switch (event.which || event.keyCode) {
					case 37: // left
					case 38: // up
						playBack();
						break;

					case 39: // right
					case 40: // down
						playNext();
						break;

					default: return; // exit this handler for other keys
				}
				event.preventDefault();
			}
		});

		// check hash
		var hash = location.hash;
		var slideNum = hash.substr(1);

		if (!slideNum || isNaN(slideNum)) {
			slideNum = 1;
		} else {
			slideNum = parseInt(slideNum);
		}

		currentSlide = slideNum;
		play(currentSlide);

		// show body now:
		document.body.style.visibility = 'visible';
	});

	function play(slide) {
		var fromPos = (slide > 1) ? 'slide' + slide : 0;
		var toPos = labelOf(slide, 'mid');

		console.log('Play from', fromPos, 'to', toPos);
		window.location.hash = slide;
		Story.tweenFromTo( fromPos, toPos );
	}

	function playNext() {
		currentSlide++;

		if (currentSlide > slideCount) {
			// keep current slide not overflow the slideCount
			currentSlide = slideCount;
		}

		var label = labelOf(currentSlide, 'mid');
		console.log('playto:', label, currentSlide);
		window.location.hash = currentSlide;
		Story.tweenTo(label);
	}

	function playBack() {
		currentSlide--;
		var label;

		if (currentSlide < 1) {
			// reverse to the start of first slide
			label = labelOf(1);
			// keep current slide not lower than 0
			currentSlide = 0;
		} else {
			label = labelOf(currentSlide, 'mid');
		}
		console.log('playto:', label, currentSlide);
		window.location.hash = currentSlide;
		Story.tweenTo(label);
	}

	/**
	 * Function use as timeline action to pause in the middle
	 * Trick learn from: http://greensock.com/forums/topic/7199-stop-animation-after-playing-a-label
	 *
	 * @return {void}
	 */
	// function pause() {
	// 	Story.pause();
	// 	console.log('Story paused at', currentSlide);
	// }


	/**
	 * Convenient function to get slide label based on slide number
	 * @param  {Number} num [description]
	 * @param  {String} prefix [description]
	 * @return {String}     [description]
	 */
	function labelOf(num, prefix) {
		return prefix ? (prefix + 'slide' + num) : ('slide' + num);
	}

	//export
	window.Story = Story;
}());
