// Simple script to use with datosAbiertos

// Author : Angel Berlanas Vicente
//         <berlanas_ang@gva.es>
// This script is licensed under GPLv3 or higher


// Algunos valores

const recargaElectricaURL = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";

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

    // Obtenemos el JSON que esta definido
    const fetchPromesa = fetch(recargaElectricaURL);

    // Cuando se resuelva la promesa
    fetchPromesa.then(response => {
        // la pasamos a JSON
        return response.json();
        // Y entonces
    }).then(respuesta => {
        // Filtramos los resultados con el filtro definido anteriormente

        // const resultado=respuesta.features.filter(filtroLetra);
        const resultado = respuesta.features
        console.log(resultado[0]);

        // Una vez tenemos el listado filtrado pasamos a crear
        // cada uno de los <li> que representan
     

        // Por cada uno de ellos
        /*
        resultado.forEach( falla => {

            // Creamos un <li>
            let calleli = document.createElement("li");

            // Creamos el cuadro de cada falla
            let cuadro = document.createElement('div');
            let boceto = document.createElement('img');
            let nombre = document.createElement('div');
            let ubicacion = document.createElement('button');

            boceto.src = falla.properties.boceto;
            nombre.innerHTML = falla.properties.nombre;
            ubicacion.value = "Ubicación";

            cuadro.classList.add('cuadrado');
            cuadro.appendChild(boceto);
            cuadro.appendChild(nombre);
            cuadro.appendChild(ubicacion);
            calleli.appendChild(cuadro);

            // Lo anyadimos
            listado.appendChild(calleli);
        });
        */

        for (let index = 0; index < 9; index++) {

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
            

             boceto.style.backgroundImage = 'url("'+resultado[index].properties.boceto+'")' ;
             nombre.innerHTML = resultado[index].properties.nombre;
             ubicacion.innerHTML = "Ubicación";
 
             divNombre.appendChild(nombre);
             cuadro.appendChild(boceto);
             cuadro.appendChild(divNombre);
             cuadro.appendChild(ubicacion);
             
             console.log(document.querySelector(".resultados"));
             
             document.querySelector(".resultados").appendChild(cuadro);
         
        }

        // Establecemos el listado en la Web
        
        
    });

}

function init() {

    // Binding de los eventos correspondientes.

    // Click en el boton de buscar
    // document.querySelector(`input[type="button"]`).addEventListener("click", buscar);
    // Texto cambia en el <input>
    // document.querySelector(`input[type="text"]`).addEventListener("input", toUpp);
    buscar();

}

// The mother of the lamb.
window.onload = init;
