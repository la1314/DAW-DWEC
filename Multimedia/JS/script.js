function init() {

  let video = document.getElementById('video');
  agregarVDefecto();
  agregarLista(6);

  agregarListenerControles();

}

//Añade el video por defecto en el reproductor
function agregarVDefecto() {

  video.src = arrayVideos[3];
  video.type = 'video/mp4';
  
  lanzarPublicidad();

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

  video.addEventListener('click', playPause);

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

  video.currentTime -= 10;
  console.log(video.currentTime)
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

 
  video.currentTime +=  10;
  console.log(video.currentTime)
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
  lanzarPublicidad();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function lanzarPublicidad() {
  
  deshabilitarBotones();
  let publicidad = document.createElement('div');
  let boton = document.createElement('BUTTON');
  let texto = document.createElement('div');
  let texto2 = document.createElement('div');
  texto.classList.add('textPublicidad');
  texto2.classList.add('textPublicidad');
  texto.innerHTML = "Publicidad de furros: ";
  boton.innerText = "X";
  boton.classList.add("cerrar");
  publicidad.id = "publicidad";
  publicidad.appendChild(boton);
  publicidad.appendChild(texto);
  publicidad.appendChild(texto2);
  document.getElementById('caja').appendChild(publicidad);

  for (let index = 3; index >= 0; index--) {
    
    await sleep(1000);
    
    texto2.innerHTML = index;
    
  }

  boton.addEventListener('click', quitarPublicidad);
  texto2.innerHTML = "Ya puede cerrar la publicidad"

}

function quitarPublicidad(){

  agregarListenerControles();
  document.getElementById("publicidad").remove();
}

//Función que cambia los controles por clones sin listeners
function deshabilitarBotones() {

  var controles = document.getElementById('controles'),
  controlesClon = controles.cloneNode(true);
  controles.parentNode.replaceChild(controlesClon, controles);
  video.removeEventListener('click', playPause);
}

function barraProgresion() {
  
    

}


window.onload = init;


let arrayVideos = new Array();

arrayVideos.push('VIDEOS/thewae.mp4');
arrayVideos.push('VIDEOS/cuchillo.mp4');
arrayVideos.push('VIDEOS/excitante.mp4');
arrayVideos.push('VIDEOS/ratas.mp4');
arrayVideos.push('VIDEOS/ng_dracukeo.mp4');
arrayVideos.push('VIDEOS/cristal.mp4');

let arrayIMG = new Array();
arrayIMG.push('http://i3.ytimg.com/vi/hLTgQ5SC-PU/maxresdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/id1Hc9eqZ-s/hqdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/FDF4MNhvr80/maxresdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/EhVB22S1Zqk/maxresdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/oXiHccFlT4g/hqdefault.jpg');
arrayIMG.push('http://i3.ytimg.com/vi/z1eawSot7C0/maxresdefault.jpg');
