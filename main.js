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
		//document.querySelector('div#botones').style.display = 'none';
		
		
		timeline.restart();
		pausarVideo();

	  }
	  
	  if (!isTurnedOn) {
		//document.querySelector('div#botones').style.display = '';
		timeline.reverse();
		cambiarVideo();
	  }
	  
	  isTurnedOn = !isTurnedOn;
	}
	
	// Initialize
	$(document).ready(buildTimeline);
	// Bindings
	$(document).on('click', SELECTOR_SWITCHER_TV, function() {
	  toggleSwitcherTV();
	});
  })();

var rawbase = 'https://raw.githubusercontent.com/';
var jsonloc = ''
var videos = []

document.querySelector('button#prev').addEventListener('click', () => {
 	cambiarVideo()
})

document.querySelector('button#next').addEventListener('click', () => {
	cambiarVideo()
})

function cambiarVideo() {
	var video = document.querySelector('video#videoLocoChon');
	video.style.display = 'none';
	var audio = new Audio('./tvc.mp3')
	audio.volume = Math.random() * 0.3;
	audio.pitch
	audio.play();
	video.setAttribute('src',videos[Math.floor(Math.random() * videos.length)]);
	setTimeout(() => {
		video.style.display = ''; 
	}, Math.floor(Math.random() * 2500))
}

function pausarVideo() {
	var video = document.querySelector('video#videoLocoChon');
	video.pause();
}