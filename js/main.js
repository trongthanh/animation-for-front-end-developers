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
	var Story = new TimelineLite({
		paused: true
	});

	$.ready()
	.then(function() {
		'use strict';

		TweenMax.from($('h1'), 0.5, {
			top: '-400px',
			opacity: 0

		});

		// Create a timeline for each Slide
		$$('.slide').forEach(function(el) {
			var slideTl = new TimelineLite();
			slideCount++;

			slideTl
				.from(el, 0.5, {opacity: 0, x: '-20%', onComplete: pause})
				.to(el, 0.5, {opacity: 0, x: '-80%', onReverseComplete: pause});

			// store the timeline to slide for later retrieval
			el._.slideTl = slideTl;
			Story.add(slideTl, labelOf(slideCount));

		});

		// bind events
		$('.js-next').addEventListener('click', function(event) {
			event.preventDefault();
			if (!Story.isActive()) {
				// auto play until next pause action
				Story.play();
				currentSlide++;
			}
		});

		$('.js-back').addEventListener('click', function(event) {
			event.preventDefault();
			if (!Story.isActive()) {
				Story.reverse();
				currentSlide--;
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

		// check hash
		var hash = location.hash;
		var slideNum = hash.substr(1);

		if (isNaN(slideNum)) {
			slideNum = 1;
		} else {
			slideNum = parseInt(slideNum);
		}

		currentSlide = slideNum;
		Story.play(labelOf(currentSlide));

		// show body now:
		document.body.style.visibility = 'visible';
	});

	/**
	 * Function use as timeline action to pause in the middle
	 * Trick learn from: http://greensock.com/forums/topic/7199-stop-animation-after-playing-a-label
	 *
	 * @return {void}
	 */
	function pause() {
		Story.pause();
		console.log('Story paused at', currentSlide);
	}


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
