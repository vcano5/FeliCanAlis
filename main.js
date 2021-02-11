function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

var i = -1;
var pausado = true;


	var videos = [];
	$.getJSON('https://felicanal.herokuapp.com/api/videos', (data) => {
		videos = data.sort( () => .5 - Math.random() );;	
		console.log(videos)
	})

	function cambiarVideo(direccion) {
		if(pausado == true) {
			document.querySelector('video#contenido').style.filter = 'blur(0px)';
		}
		pausado = false;

		if(direccion == false && i < 1) {
			return;
		}
		else if(direccion == true && i >= videos.length -1) {
			alert('Ya viste todos los videos disponibles.')
			return
		}
		else if(direccion == false) {
			i -= 1;
			if(!desliza) {
				desliza = true;
				document.querySelector('img#swipeupsvg').style.display = "none";
				document.querySelector('span#desliza').style.display = 'none';
			}
			var video = document.querySelector('video#contenido');
			var division = document.querySelector('div#panel');
			division.style.display = 'none';
			video.style.display = 'none';
			let videoInfo = videos[i];
			var videoURL = videoInfo.videoUrl;
			video.setAttribute('src', videoURL);
			video.addEventListener('loadeddata', () => {
				document.querySelector('#nombre').innerHTML = `${videoInfo.nombre}`
				document.querySelector('#desc').innerHTML = `${videoInfo.descripcion}`
				document.querySelector('#desc').setAttribute('title', videoInfo.descripcion)
				division.style.display = '';
				video.style.display = ''; 
			})
		}
		else {
			i += 1;
			if(!desliza) {
				desliza = true;
				document.querySelector('img#swipeupsvg').style.display = "none";
				document.querySelector('span#desliza').style.display = 'none';
			}
			var video = document.querySelector('video#contenido');
			var division = document.querySelector('div#panel');
			division.style.display = 'none';
			video.style.display = 'none';
			let videoInfo = videos[i];
			var videoURL = videoInfo.videoUrl;
			video.setAttribute('src', videoURL);
			video.addEventListener('loadeddata', () => {
				document.querySelector('#nombre').innerHTML = `${videoInfo.nombre}`
				document.querySelector('#desc').innerHTML = `${videoInfo.descripcion}`
				document.querySelector('#desc').setAttribute('title', videoInfo.descripcion)
				division.style.display = '';
				video.style.display = ''; 
			})
		}
	}

	function pausarVideo() {
		pausado = true;
		var video = document.querySelector('video#contenido');
		video.pause();

		video.style.filter = 'blur(10px)';
	}
	
	function resumirVideo() {
		pausado = false;
		var video = document.querySelector('video#contenido');
		video.play();
		video.style.filter = 'blur(0px)';
	}

	let hammer = new Hammer(document.querySelector('div#slider'));
	hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	hammer.on('swipeup', function(e){
		e.preventDefault();
		cambiarVideo(true)
	});
	hammer.on('swipedown', function(e){
		e.preventDefault();
		cambiarVideo(false)
	});

	hammer.on('tap', function(e) {
		console.log(e)
		if(pausado && i >= 0) {
			resumirVideo();
		}
		else {
			pausarVideo();
		}
		e.preventDefault();
	})

	var desliza = false;

	setTimeout(() => {
		if(!desliza) {
			desliza = true;
			document.querySelector('img#swipeupsvg').style.display = "none";
			document.querySelector('span#desliza').style.display = 'none';
		}
	}, 15000)


	var bv = document.querySelector('video#contenido');
	bv.addEventListener('ended', () => {
		cambiarVideo(true);
	})