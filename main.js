(function() {
	var SELECTOR_SCREEN_ELEMENT = '.screen';
	var SELECTOR_SWITCHER_TV = '#switcher-tv';
	
	var isTurnedOn = true;
	
	var timeline;
	
	function buildTimeline() {
	  timeline = new TimelineMax({
		paused: true
	  });
	  
	  timeline
	  .to(SELECTOR_SCREEN_ELEMENT, .2, {
		width: '100vw',
		height: '2px',
		background: '#ffffff',
		ease: Power2.easeOut
	  })
	  .to(SELECTOR_SCREEN_ELEMENT, .2, {
		width: '0',
		height: '0',
		background: '#ffffff'
	  });
	}
	
	function toggleSwitcherTV() {
	  if (isTurnedOn) {	
		timeline.restart();
		pausarVideo();

	  }
	  
	  if (!isTurnedOn) {

		timeline.reverse();
		cambiarVideo();
	  }
	  
	  isTurnedOn = !isTurnedOn;
	}
	$(document).ready(buildTimeline);
	$(document).on('click', SELECTOR_SWITCHER_TV, function() {
	  toggleSwitcherTV();
	});
})();


var videos;
$.getJSON('https://felicanal.herokuapp.com/api/videos', (data) => {
	videos = data;
})

function cambiarVideo() {
	if(!desliza) {
		desliza = true;
		document.querySelector('span#desliza').style.display = 'none';
	}
	var video = document.querySelector('video#videoLocoChon');
	var division = document.querySelector('div#panel');
	division.style.display = 'none';
	video.style.display = 'none';
	var audio = new Audio('./tvc.mp3')
	audio.volume = Math.random() * 0.3;
	audio.pitch
	console.log(videos);
	var x = Math.floor(Math.random() * videos.length);
	var videoURL = videos[x].videoUrl;

	video.setAttribute('src', videoURL);
	video.addEventListener('loadeddata', () => {
		document.querySelector('#nombre').innerHTML = `${videos[x].nombre}`
		document.querySelector('#desc').innerHTML = `${videos[x].descripcion}`
		division.style.display = '';
		video.style.display = ''; 
	})
}

function pausarVideo() {
	var video = document.querySelector('video#videoLocoChon');
	video.pause();
}

let hammer = new Hammer(document.querySelector('video#videoLocoChon'));
hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
hammer.on('swipeup', function(e){
	e.preventDefault();
    cambiarVideo()
});

var desliza = false;

setTimeout(() => {
	if(!desliza) {
		desliza = true;
		document.querySelector('span#desliza').style.display = 'none';
	}
}, 5000)