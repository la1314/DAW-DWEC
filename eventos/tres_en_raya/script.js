const fila = 3;
const col = 3;
const classCuadrado = "cuadrado";
const classUWU = "uwu";
const classOWO = "owo";
const classTocado = "tocado";
const classLibre = "libre";
const classTocadoUWU = "marcaUWU";
const classTocadoOWO = "marcaOWO";

function crearMapa(fila, col) {

    let contenedor = document.getElementById("_contenedor");

    while (contenedor.firstChild) {

        contenedor.removeChild(contenedor.firstChild)

    }

    for (let f = 0; f < fila; f++) {
        for (let c = 0; c < col; c++) {
            addNodos(f, c, classCuadrado);
        }
    }

    listener();
}

function addNodos(fila, col, clase) {

    var nodo = document.createElement("div");
    nodo.id = fila + "-" + col;
    nodo.classList.add(clase);
    nodo.classList.add(classLibre);
    document.getElementById("_contenedor").appendChild(nodo);
}

function listener() {

    cuadrados = document.querySelectorAll('.cuadrado');
    cuadrados.forEach(element => element.addEventListener('click', owo));
}

function uwu() {

    let cuadrados = document.getElementsByClassName(classLibre);

    if (cuadrados.length != 0) {
        let indexRandom = Math.floor(Math.random() * cuadrados.length);
        let div = document.createElement("div");
        div.classList.add(classUWU);

        let id = cuadrados[indexRandom].id;
        let nodo = document.getElementById(id);
        nodo.appendChild(div);
        nodo.classList.remove(classLibre);
        nodo.classList.add(classTocado);
        nodo.classList.add(classTocadoUWU);

    }
}

function owo() {

    if (!this.firstChild) {
        let div = document.createElement("div");
        div.classList.add(classOWO);
        this.appendChild(div);
        this.classList.remove(classLibre);
        this.classList.add(classTocado);
        this.classList.add(classTocadoOWO);

        
    }
}

function comprobarVictoria() {

    let ganador = false;

    if (!ganador) {
        ganador = comprobarFilas(classTocadoOWO);
    }

    if (!ganador) {
        ganador = comprobarColumnas(classTocadoOWO);
    }

    if (ganador) {

        console.log("Ha ganado OWO");

    } else {

        if (!ganador) {
            ganador = comprobarFilas(classTocadoUWU);
        }

        if (!ganador) {
            ganador = comprobarColumnas(classTocadoUWU);
        }

        if (ganador) {

            console.log("Ha ganado UWU");
        }
    }

};

function comprobarFilas(clase) {

    let booleano = false;
    let contador = 0;

    for (let index = 0; index < fila; index++) {
        for (let index2 = 0; index2 < col; index2++) {

            let id = index + "-" + index2;
            let nodo = document.getElementById(id);

            if (nodo.className.includes(clase)) {

                contador++;


            } else {
                contador = 0;
            }
        }
        if (contador == 3) {
            booleano = true;
        }
    }

    return booleano;

}

function comprobarColumnas(clase) {

    let booleano = false;
    let contador = 0;

    for (let index = 0; index < fila; index++) {
        for (let index2 = 0; index2 < col; index2++) {

            let id = index2 + "-" + index;
            let nodo = document.getElementById(id);

            if (nodo.className.includes(clase)) {

                contador++;

            } else {
                contador = 0;
            }
        }
        if (contador == 3) {
            booleano = true;
        }
    }

    return booleano;
}

function comprobarDiagonales(clase) {

}

function init() {
    crearMapa(fila, col);
    document.getElementById('_contenedor').addEventListener('click', uwu);
    window.addEventListener('click', comprobarVictoria);
}

window.onload = init;
