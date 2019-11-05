const fila = 3;
const col = 3;
const classCuadrado = "cuadrado";
const classUWU = "uwu";
const classOWO = "owo";
const classTocado = "tocado";
const classLibre = "libre";

window.onload = function () {

    crearMapa(fila, col);

}

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
    }
}

function owo() {

    if (!this.firstChild) {
        let div = document.createElement("div");
        div.classList.add(classOWO);
        this.appendChild(div);
        this.classList.remove(classLibre);
        this.classList.add(classTocado);
        comprobarVictoria(classOWO);
        uwu();
    }
}

function comprobarVictoria(clase){

     comprobarFilas(clase);
    
};

function comprobarFilas(clase){

    let contador;

    for (let index = 0; index < fila; index++) {
        for (let index = 0; index < col; index++) {
            
            let id = fila + "-" + col;
            let nodo = document.getElementById(id);

            if (nodo.firstElementChild) {

                let hijo = nodo.firstChild.classList;

                if (hijo == clase) {
                    contador++;
                    console.log(contador);
                    
                }else{
                    contador = 0;
                }

            }else{
                contador = 0;
            }
            
        }
    }
   
}

function comprobarColumnas(clase){

    for (let index = 0; index < fila; index++) {
        for (let index = 0; index < col; index++) {
            
            
        }
    }
}

function comprobarDiagonales(clase){

}