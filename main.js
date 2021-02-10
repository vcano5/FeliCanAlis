(function() {

	var videos = {};
	$.getJSON('https://felicanal.herokuapp.com/api/videos', (data) => {
		for(video of data) {
			videos[video['_id']] = video;
		}
	})

	function cambiarVideo() {
		//console.log(videos)
		if(Object.keys(videos).length > 0) {
			if(!desliza) {
				desliza = true;
				document.querySelector('img#swipeupsvg').style.display = "none";
				document.querySelector('span#desliza').style.display = 'none';
			}
			var video = document.querySelector('video#contenido');
			var division = document.querySelector('div#panel');
			division.style.display = 'none';
			video.style.display = 'none';
			var audio = new Audio('./tvc.mp3')
			audio.volume = Math.random() * 0.3;
			audio.pitch
			//console.log(videos);
			let x = Math.floor(Math.random() * Object.keys(videos).length);
			let id = Object.keys(videos)[x];
			let videoInfo = videos[id];
			var videoURL = videoInfo.videoUrl;
			video.setAttribute('src', videoURL);
			video.addEventListener('loadeddata', () => {
				//console.log(videoInfo)
				document.querySelector('#nombre').innerHTML = `${videoInfo.nombre}`
				document.querySelector('#desc').innerHTML = `${videoInfo.descripcion}`
				document.querySelector('#desc').setAttribute('title', videoInfo.descripcion)
				division.style.display = '';
				video.style.display = ''; 
				delete videos[id];
			})
		}
		else {
			alert('Ya viste todos los videos disponibles 😢')
		}
		
	}

	function pausarVideo() {
		var video = document.querySelector('video#contenido');
		video.pause();
	}

	let hammer = new Hammer(document.querySelector('div#slider'));
	hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	hammer.on('swipeup', function(e){
		e.preventDefault();
		cambiarVideo()
	});

	var desliza = false;

	setTimeout(() => {
		if(!desliza) {
			desliza = true;
			document.querySelector('img#swipeupsvg').style.display = "none";
			document.querySelector('span#desliza').style.display = 'none';
		}
	}, 10000)


	var bv = document.querySelector('video#contenido');
	bv.addEventListener('ended', () => {
		cambiarVideo();
	})

})();