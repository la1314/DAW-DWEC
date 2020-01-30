//Se llama al cargarse el HTML
//Añade eventos y todo lo necesario para crear el campo de futbol
function cargar() {

    document.querySelectorAll('.banquillo').forEach(elemento => {

        elemento.addEventListener("dragover", allowDrop);
        elemento.addEventListener("drop", drop);
    });

    promesaJugadores();
    promesaSecciones();

}

function mostrarValor(e) {

    //console.log(this.value);
}

function promesaJugadores() {
    Promise.resolve(agregarJugadores()).then(function (value) {
        document.querySelectorAll('.jugador').forEach(
            elemento => elemento.addEventListener("dragstart", drag)
        );

    });

}

function promesaSecciones() {

    Promise.resolve(agregarSecciones()).then(function (value) {

        let posiciones = document.querySelectorAll('.posicion');
        posiciones.forEach(
            (elemento, index) => {

                elemento.id = "P" + index;

                elemento.addEventListener("dragover", allowDrop);
                elemento.addEventListener("drop", drop);
                elemento.addEventListener('drop', mostrarValor);
            }
        );

    });
}

function agregarJugadores() {

    let zona = "ZonaI";

    document.querySelectorAll('.banquillo').forEach(
        banquillo => {

            banquillo.name = zona;
            for (let index = 0; index < 11; index++) {

                let jugador = document.createElement('div');
                jugador.classList.add('jugador');
                jugador.draggable = true;


                jugador.name = zona;



                jugador.id = banquillo.id + "-" + index;
                jugador.innerHTML = "Jugador";
                banquillo.appendChild(jugador);
            }

            zona = "ZonaD";
        }
       
    );

}

//Función que añade a las 12 seciones del campo los 
//respectivos div para organizar las posiciones de los jugadores
function agregarSecciones() {

    let campo = document.getElementById('campo');

    for (let index = 0; index < 12; index++) {

        let seccion = document.createElement('div');
        seccion.classList.add('seccion');

        agregarPorision(index, seccion);

        //Pensar en la implementacón de esta pedazo de mierda
        if (index < 6) {
            seccion.name = "ZonaI";
        } else {
            seccion.name = "ZonaD";
        }

        campo.appendChild(seccion);

    }
}

//Función que dependiendo del valor del index asigna un valor identificativo al
// div posición para usarlo posteriomente para cambiar la posición del jugador
// soltado dentro de este div
function agregarPorision(index, seccion) {

    let posicion = document.createElement('div');
    posicion.classList.add('posicion');

    if (index == 0 || index == 11) {

        posicion.value = "Portero";
        seccion.appendChild(posicion);
        seccion.classList.add('center');

    } else if (index == 1 || index == 10) {

        posicion.value = "Lateral Izquierdo";
        seccion.appendChild(posicion);

        posicion = document.createElement('div');
        posicion.classList.add('posicion');
        posicion.value = "Lateral Derecho";
        seccion.appendChild(posicion);

        seccion.classList.add('between');

    } else if (index == 2 || index == 9) {

        posicion.value = "Defensa Central";
        seccion.appendChild(posicion);

        posicion = document.createElement('div');
        posicion.classList.add('posicion');
        posicion.value = "Defensa Central";
        seccion.appendChild(posicion);

        seccion.classList.add('between');

    } else if (index == 3 || index == 8) {

        posicion.value = "Defensor de Medio Campo";
        seccion.appendChild(posicion);
        seccion.classList.add('center');

    } else if (index == 4 || index == 7) {

        posicion.value = "Lateral Volante Izquierdo";
        seccion.appendChild(posicion);

        posicion = document.createElement('div');
        posicion.classList.add('posicion');
        posicion.value = "Lateral Volante Derecho";
        seccion.appendChild(posicion);
        seccion.classList.add('between');

    } else if (index == 5 || index == 6) {

        posicion.value = "Mediocentro Izquierdo";
        seccion.appendChild(posicion);

        posicion = document.createElement('div');
        posicion.classList.add('posicion');
        posicion.value = "Delantero centro";
        seccion.appendChild(posicion);

        posicion = document.createElement('div');
        posicion.classList.add('posicion');
        posicion.value = "Mediocentro Derecho";
        seccion.appendChild(posicion);
        seccion.classList.add('between');
    }
}

function allowDrop(ev) {

    //Permitir que reciba algún elemento
    ev.preventDefault();

}

function drag(ev) {

    //Indicamos que valor y tipo de información vamos a arrastrar. En este caso texto e ID del elemento.
    //ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {

    //Evitamos el comportamiento normal del navegador, que sería abrir el elemento en una nueva pestaña.
    ev.preventDefault();

    //Guardamos el elemento, llamado "text" en una variable.
    var data = ev.dataTransfer.getData("text");

    let jugador = document.getElementById(data).name;
    let seccion;

    if (this.className.includes('banquillo')) {
        seccion = this.name;
    } else {
        seccion = document.getElementById(this.id).parentNode.name;
    }
  
    console.log(seccion + "--" + jugador);

    if (jugador == seccion) {
        //Colgamos el elemeto arrastrado y soltado en el nuevo destino.
        ev.target.appendChild(document.getElementById(data));
    }

}
window.addEventListener("load", cargar);