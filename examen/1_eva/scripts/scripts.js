function init() {

    var teclado = document.getElementById("teclado");

    let ultimaLetraUsada = document.getElementById('letra');
    ultimaLetraUsada.innerText += "_";


    crearDivTitulo();
    ocultarExtremidades();

    for (let teclaActual = 65; teclaActual <= 90; teclaActual++) {
        let tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        tecla.addEventListener('click', pulsarTecla);
        teclado.appendChild(tecla);

    }

}

//Ocultar extermindades

function ocultarExtremidades() {
    let extremidades = document.querySelectorAll('.extremidad');
    extremidades.forEach(element => element.style.visibility = "hidden");
}

//Muestra una extremidad cuando es llamada y aumenta el número de fallos
// Si fallos llega a 10 crea div de fallo para reiniciar partida
function mostrarExtremidad() {

    let extremidades = document.querySelectorAll('.extremidad');
    extremidades[fallos].style.visibility = "visible"
    
    if (fallos < 10) {
        fallos++;
    }
    
    if (fallos == 10) {
        crearBotonFallo();
    }
    
}

function crearBotonFallo(){

    let div = document.createElement('div');
    let divDerrota = document.createElement('div');
    let divTexto = document.createElement('div');
    let divBoton = document.createElement('button');

    div.id = 'divCajas';
    divDerrota.id = 'derrota';
    divTexto.classList.add('textoCaja');
    divTexto.innerText = "Eres una mierda de LOSER";
    divBoton.classList.add('reiniciar');
    divBoton.addEventListener('click', reiniciar);
    divBoton.innerText = "Volver a Jugar";
    divDerrota.appendChild(divTexto);
    divDerrota.appendChild(divBoton);
    div.appendChild(divDerrota);
    document.getElementById('contenedor').appendChild(div);
}

function crearBotonVictoria(){
    let div = document.createElement('div');
    let divVictoria = document.createElement('div');
    let divTexto = document.createElement('div');
    let divBoton = document.createElement('button');

    div.id = 'divCajas';
    divVictoria.id = 'victoria';
    divTexto.classList.add('textoCaja');
    divTexto.innerText = "Has ganado, tienes un total de " + parseInt(puntosDIV) + " puntos";
    divBoton.classList.add('reiniciar');
    divBoton.addEventListener('click', reiniciar);
    divBoton.innerText = "Volver a Jugar";
    divVictoria.appendChild(divTexto);
    divVictoria.appendChild(divBoton);
    div.appendChild(divVictoria);
    document.getElementById('contenedor').appendChild(div);
}

//Reiniciar el juego cuando es llamado
function reiniciar(){
    location.reload();
}

//Crea un div nuevo para la película a adivinar y añade una película escogida aleatoriamente
function crearDivTitulo() {

    let tituloPreguntar = document.createElement("div");
    tituloPreguntar.id = 'pregunta';
    obtenerPelicula(tituloPreguntar);

    document.getElementById('titulo').appendChild(tituloPreguntar);


}

//Funcion llamada por crearDivTitulo para obtener una pelicula aleatoria y acultarla con "_"
function obtenerPelicula(div) {

    // se obtiene una posición aleatoria del array de películas
    let indexRandom = Math.floor(Math.random() * arrayPeliculas.length);

    // Se guarda la pelicula en una variable global para ser usada posteriormente
    tituloAdivinar = arrayPeliculas[indexRandom];

    let arrayLetras = tituloAdivinar.split("");

    // se relleva el innerText con _ cuando se topa con una letra y espacios en blancos cuando no hay una letra
    for (let index = 0; index < arrayLetras.length; index++) {

        if (arrayLetras[index] == " ") {
            div.innerText += ' ';
        } else {
            div.innerText += '_';
        }

    }

}


//Función que se llama al clickar sobre un boton de una letra
function pulsarTecla() {

    let letra = this.innerText;
    
    
    let letrasUsadas = document.getElementById('letrasUsadas');
    let ultimaLetraUsada = document.getElementById('letra');
    let cadenaUltimaLetra = ultimaLetraUsada.innerText;
    ultimaLetraUsada.innerText = cadenaUltimaLetra = cadenaUltimaLetra.substring(0, cadenaUltimaLetra.length - 1);
    ultimaLetraUsada.innerText += letra;

    if (!letrasUsadas.innerText.includes(letra)) {

        letrasUsadas.innerText += letra;

        //se comprueba la letra admitida
        comprobarLetra(letra);
    }
}

//Funcio que se llama al presionar una tecla, sólo escribe cuando la tecla presionada
// es perteneciente al abecedario
function presionarTecla(e) {

    let codigo = e.keyCode;
   
    

    if (codigo >= 65 && codigo <= 90) {

        let letra = String.fromCharCode(e.keyCode);
        console.log(letra);
        
        
        
        let letrasUsadas = document.getElementById('letrasUsadas');
        let ultimaLetraUsada = document.getElementById('letra');
        let cadenaUltimaLetra = ultimaLetraUsada.innerText;
        ultimaLetraUsada.innerText = cadenaUltimaLetra = cadenaUltimaLetra.substring(0, cadenaUltimaLetra.length - 1);
        ultimaLetraUsada.innerText += letra;
        console.log(letrasUsadas.innerText);
        if (!letrasUsadas.innerText.includes(letra)) {

            console.log(letra);
            letrasUsadas.innerText += letra;
            //se comprueba la letra admitida
            comprobarLetra(letra);
        }
    }
}

//Comprueba si la letra pasada existe en el título guardado

function comprobarLetra(letra) {

    if (tituloAdivinar.includes(letra.toUpperCase())) {

        let letras = tituloAdivinar.split("");

        let divPregunta = document.getElementById('pregunta');
        let cadenaPregunta = divPregunta.innerText.split("");
        for (let index = 0; index < letras.length; index++) {

            if (letras[index] == letra.toUpperCase()) {

                cadenaPregunta[index] = letra.toUpperCase();

                // Se suman 100 puntos por letra salvo que salte un fallo
                puntuacion(puntosSumar);
            }
        }

        divPregunta.innerText = "";
        let cadena = "";

        for (let index = 0; index < cadenaPregunta.length; index++) {
                
            
            cadena += cadenaPregunta[index];
            
        }
        divPregunta.innerText = cadena;

        if (divPregunta.innerText == tituloAdivinar) {
            crearBotonVictoria();
        }

    } else {
        //LAMAR A FUNCION ESTA MAL
        // llamar a funcion restar puntos
        puntosSumar -= 100;
        mostrarExtremidad(fallos);
        puntuacion(puntosSumar);

    }
}


//Asigna puntuación dependiendo del valor que se le pase respetando los ceros delante del string del juego
function puntuacion(puntos) {

    let puntosReales = parseInt(puntosDIV);

    if (puntos > 0) {

        puntosReales += puntos;

    } else {
        puntos = Math.abs(puntos);
        puntosReales -= puntos;
    }

    if (puntosReales < 0) {
        puntosReales = 0;
    }

    //Se determina cuantos ceros tendra el String del div de puntuación
    let cerosDelante = 5 - puntosReales.toString().length;
    puntosDIV = "";

    for (let index = 0; index < cerosDelante; index++) {
        puntosDIV += "0";
    }

    puntosDIV += "" + puntosReales;

    let divPuntuacion = document.querySelector('div[id="score"] div');
    divPuntuacion.innerText = puntosDIV;
}


//Se añade un Listener cuando se detecta que se ha precionado una tecla
window.addEventListener('keydown', presionarTecla);



const arrayPeliculas = new Array();
let tituloAdivinar;
let puntosDIV = "00000";
let puntosSumar = 1000;
let fallos = 0;
arrayPeliculas.push("UN SANTA NO TAN SANTO");
arrayPeliculas.push("UN PADRE EN APUROS");
arrayPeliculas.push("EL GRINCH");
arrayPeliculas.push("SOLO EN CASA");

window.onload = init;