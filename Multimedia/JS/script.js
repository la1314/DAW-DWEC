function init() {

    let video = document.getElementById('video');
    agregarVDefecto();
    agregarLista(6);

}

function agregarVDefecto(){

    video.src = 'VIDEOS/thewae.mp4';
    video.type = 'video/ogg';

}

function agregarLista(nVideos) {


    let lista = document.getElementById('lista');


    for (let index = 0; index < nVideos; index++) {

        let video = document.createElement('div');
        video.style.backgroundImage = 'url("'+ArrayVideos[index]+'")';
        video.classList.add('videos');
        lista.appendChild(video);

    }

}


function silence() {
    
}

function playPause() {
    //TODO
}

function retroceder() {
    //TODO
}

function adelantar() {
    //TODO
}

function reiniciar() {
    //TODO
}

function bajarVol() {
    //TODO
}

function subirVol() {
    //TODO
}

function reproducir() {
    //TODO
}

function lanzarPublicidad() {
    //TODO
}

function deshabilitarBotones() {
    //TODO
}

function barraProgresion() {
    //TODO
}

window.onload = init;


let ArrayVideos = new Array();

ArrayVideos.push('http://i.ytimg.com/vi/hLTgQ5SC-PU/sddefault.jpg');
ArrayVideos.push('http://i.ytimg.com/vi/hLTgQ5SC-PU/sddefault.jpg');
ArrayVideos.push('http://i.ytimg.com/vi/hLTgQ5SC-PU/sddefault.jpg');
ArrayVideos.push('http://i.ytimg.com/vi/hLTgQ5SC-PU/sddefault.jpg');
ArrayVideos.push('http://i.ytimg.com/vi/hLTgQ5SC-PU/sddefault.jpg');
ArrayVideos.push('http://i.ytimg.com/vi/hLTgQ5SC-PU/sddefault.jpg');

