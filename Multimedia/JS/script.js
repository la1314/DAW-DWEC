function init() {

  let video = document.getElementById('video');
  agregarVDefecto();
  agregarLista(6);

  agregarListenerControles();

}

//Añade el video por defecto en el reproductor
function agregarVDefecto() {

  video.src = 'VIDEOS/thewae.mp4';
  video.type = 'video/ogg';
  video.addEventListener('click', playPause);

}

//TODO
function agregarLista(nVideos) {

  let lista = document.getElementById('lista');

  for (let index = 0; index < nVideos; index++) {

    let videoLista = document.createElement('videos');
    videoLista.style.backgroundImage = 'url('+arrayIMG[index]+')';
    videoLista.setAttribute('name', arrayVideos[index]);
    videoLista.addEventListener('click', reproducir);
    videoLista.classList.add('videos');
    lista.appendChild(videoLista);

  }

}

//Función que añade a los determinados crontroles del reproductor sus respectivos lister
function agregarListenerControles() {

  let divSilenciar = document.getElementById('silenciar');
  divSilenciar.addEventListener('click', silence);

  let divRetroceder = document.getElementById('retroceder');
  divRetroceder.addEventListener('click', retroceder);

  let divPlayPause = document.getElementById('playPause');
  divPlayPause.addEventListener('click', playPause);

  let divAdelantar = document.getElementById('adelantar');
  divAdelantar.addEventListener('click', adelantar);

  let divReiniciar = document.getElementById('reiniciar');
  divReiniciar.addEventListener('click', reiniciar);

  let divBajarVol = document.getElementById('bajarVol');
  divBajarVol.addEventListener('click', bajarVol);

  let divSubirVol = document.getElementById('subirVol');
  divSubirVol.addEventListener('click', subirVol);
}

//Funcion que comprueba si el video actual está muteado, de estarlo lo muteado en caso contrario quita el mute
function silence() {

  if (video.muted) {

    video.muted = false;

  } else {
    video.muted = true;
  }

}

//Funcion que retrocede el video en 10 seg
function retroceder() {

  tiempoActual = video.currentTime;
  video.currentTime = tiempoActual - 10;
}

//Función que dependiendo si el video actual se encuentra pausado reproducirá el video actual, por el contrario lo pausará
function playPause() {

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//Funcion que adelanta el video en 10 seg
function adelantar() {

  tiempoActual = video.currentTime;
  video.currentTime = tiempoActual + 10;
}

//Reinicia el video actual y lo vuelve a reproducir
function reiniciar() {

  video.load();
  playPause();
}

//Función que baja el volumen al video si el valor de este se encuentra por encima de 0, si el video esta muted está función lo desmueteara también
function bajarVol() {

  if (video.muted) {
    silence();
  }

  if (video.volume > 0) {
    video.volume = Math.round((video.volume - 0.1) * 10) / 10;
  }
}

//Función que sube el volumen al video si el valor de este se encuentra por debajo de 1, si el video esta muted está función lo desmueteara también
function subirVol() {

  if (video.muted) {
    silence();
  }

  if (video.volume < 1) {
    video.volume = Math.round((video.volume + 0.1) * 10) / 10;
  }
}

function reproducir() {
  
  video.src = this.getAttribute('name');

}

function lanzarPublicidad() {
  //TODO
}

//Función que cambia los controles por clones sin listeners
function deshabilitarBotones() {

  var controles = document.getElementById('controles'),
    controlesClon = controles.cloneNode(true);
  controles.parentNode.replaceChild(controlesClon, controles);
}

function barraProgresion() {
  //TODO
}


window.onload = init;


let arrayVideos = new Array();

arrayVideos.push('VIDEOS/thewae.mp4');
arrayVideos.push('VIDEOS/cuchillo.mp4');
arrayVideos.push('VIDEOS/excitante.mp4');
arrayVideos.push('VIDEOS/thewae.mp4');
arrayVideos.push('VIDEOS/cuchillo.mp4');
arrayVideos.push('VIDEOS/excitante.mp4');

let arrayIMG = new Array();
arrayIMG.push('http://i3.ytimg.com/vi/hLTgQ5SC-PU/maxresdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/id1Hc9eqZ-s/hqdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/FDF4MNhvr80/maxresdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/hLTgQ5SC-PU/maxresdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/id1Hc9eqZ-s/hqdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/FDF4MNhvr80/maxresdefault.jpg');
