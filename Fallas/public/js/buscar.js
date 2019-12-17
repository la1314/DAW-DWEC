// Simple script to use with datosAbiertos

// Author : Angel Berlanas Vicente
//         <berlanas_ang@gva.es>
// This script is licensed under GPLv3 or higher


// Algunos valores

const recargaElectricaURL = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
let fallasValencia;
let tipo;

// Esta es la funcion de filtrado para
// obtener tan solo los elementos que cumplen
// una serie de requisitos.

function filtroLetra(elemento) {
    let letra = document.querySelector(`input[name="calle"]`).value;
    return elemento.properties.calle.startsWith(letra);
}


// Pasa a mayuscula el texto de propio input
// se lanza cada vez que se realiza una insercion en
// el texto del nombre.
function toUpp() {
    document.querySelector(`input[name="calle"]`).value = document.querySelector(`input[name="calle"]`).value.toUpperCase();
}


function buscar() {

    //  console.log(fallasValencia);

    // Obtenemos el JSON que esta definido   

    tipo = this.value;

    // console.log(tipo);

    // console.log(resultado[0]);

    let myNode = document.querySelector(".resultados");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    // Una vez tenemos el listado filtrado pasamos a crear
    // cada uno de los <li> que representan


    // Por cada uno de ellos

    fallasValencia.forEach(falla => {

        // Creamos el cuadro de cada falla
        let cuadro = document.createElement('div');
        let boceto = document.createElement('div');
        let divNombre = document.createElement('div');
        let nombre = document.createElement('p');
        let ubicacion = document.createElement('button');

        cuadro.classList.add('cuadrado');
        boceto.classList.add('imagenes');
        divNombre.classList.add('nombres');
        ubicacion.classList.add('botones');

        if (tipo == 'children') {
            boceto.style.backgroundImage = 'url("' + falla.properties.boceto_i + '")';

        } else {
            boceto.style.backgroundImage = 'url("' + falla.properties.boceto + '")';
        }

        nombre.innerHTML = falla.properties.nombre;
        ubicacion.innerHTML = "Ubicación";

        divNombre.appendChild(nombre);
        cuadro.appendChild(boceto);
        cuadro.appendChild(divNombre);
        cuadro.appendChild(ubicacion);

        document.querySelector(".resultados").appendChild(cuadro);
    });



}

//TODO
function filtroDesde() {

    console.log(this.value);

    //let respaldo = fallasValencia.features.filter(falla.properties.anyo_fundacion > this.value);
    let respaldo = fallasValencia.filter( año => año.properties.anyo_fundacion > this.value  );

    console.log(respaldo);
    
        let myNode = document.querySelector(".resultados");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        respaldo.forEach(falla => {

            // Creamos el cuadro de cada falla
            let cuadro = document.createElement('div');
            let boceto = document.createElement('div');
            let divNombre = document.createElement('div');
            let nombre = document.createElement('p');
            let ubicacion = document.createElement('button');

            cuadro.classList.add('cuadrado');
            boceto.classList.add('imagenes');
            divNombre.classList.add('nombres');
            ubicacion.classList.add('botones');

            if (tipo == 'children') {
                boceto.style.backgroundImage = 'url("' + falla.properties.boceto_i + '")';

            } else {
                boceto.style.backgroundImage = 'url("' + falla.properties.boceto + '")';
            }

            nombre.innerHTML = falla.properties.nombre;
            ubicacion.innerHTML = "Ubicación";

            divNombre.appendChild(nombre);
            cuadro.appendChild(boceto);
            cuadro.appendChild(divNombre);
            cuadro.appendChild(ubicacion);

            document.querySelector(".resultados").appendChild(cuadro);
        });


}

function init() {

    // Binding de los eventos correspondientes.

    // Click en el boton de buscar
    // document.querySelector(`input[type="button"]`).addEventListener("click", buscar);
    // Texto cambia en el <input>
    // document.querySelector(`input[type="text"]`).addEventListener("input", toUpp);

    const fetchPromesa = fetch(recargaElectricaURL);
    // Cuando se resuelva la promesa
    fetchPromesa.then(response => {
        // la pasamos a JSON
        return response.json();

        // Y entonces
    }).then(respuesta => {

        fallasValencia = respuesta.features
        buscar();

    });


    document.querySelectorAll('input[name="tipoFalla"]').forEach(radius => radius.addEventListener('change', buscar));
    document.querySelector('input[name="fechaDesde"]').addEventListener('change', filtroDesde);


}

// The mother of the lamb.
window.onload = init;
