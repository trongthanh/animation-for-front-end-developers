/* © 2016 NauStud.io
 * @author Thanh Tran
 */


$.ready()
.then(function() {
	'use strict';
	// For fun, displaying Nau ASCII Art:
	var NAU_ASCII_ART = '   _.._             _.._           .--┐\n .`--.  \'.        .\'  .-`\'.       |   |\n.   .-\\   \\  (`) .   /-.   \\      |   |\n|   |  \\   \\     |   |  \\   \\     |   |\n|   |   \\   \\    |   |   \\   \\    |   |\n|   |    \\   \\   |   |    \\   \\   |   |\n|   |     \\   \\  |   |     \\   \\  |   |\n|   |      \\   `-/   |      \\   \\-\'   |\n|   |       \\_.-`   ,\'  (`)  \\   `-._.\'\n└--`         `-...-`          `-...-`\nNau Studio';
	console.log(NAU_ASCII_ART);

	TweenMax.from($('h1'), 0.5, {
		top: '-400px',
		opacity: 0

	});

	var Story = new TimelineMax({
		paused: true
	});


	// Create a timeline for each Slide
	$$('.slide').forEach(function(el) {
		var slideTl = new TimelineMax();

		slideTl
			.from(el, 0.5, {opacity: 0, x: '-20%'})
			.to(el, 0.5, {opacity: 0, x: '-80%', delay: 2});

		// store the timeline to slide for later retrieval
		el._.slideTl = slideTl;
		Story.add(slideTl);

	});


	//export
	window.Story = Story;


	// show body now:
	document.body.style.visibility = 'visible';
});
