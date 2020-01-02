// Simple script to use with datosAbiertos

// Author : Angel Berlanas Vicente
//         <berlanas_ang@gva.es>
// This script is licensed under GPLv3 or higher


// Algunos valores
const fallasValenciaURL = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
let fallasValencia;
let estadoActual;

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

//funcion que se lanza para listar todas las fallas sin ningún tipo de filtro aplicado tomando en cuenta la demografia seleccionada
function porDefecto(datos) {
  buscar(datos, returnDemografia());
}

//funcioón que se encarga de dibujar los cuardros de las fallas a este se le pasa como parámetros los datos a dibujar y la demografia de a seleccionar para mostrarlos por pantalla
// cada vez que se llama a esta función guarda en la variable estadoActual los datos de datosFalla puesto que las diferentes opciones toman como base estos datos para ir filtrandolos

function buscar(datosFalla, demografia) {

  // console.log(tipo);
  // console.log(resultado[0]);

  estadoActual = datosFalla;

  let myNode = document.querySelector(".resultados");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  //Dibujamos el cuadro de fallas
  datosFalla.forEach(falla => {

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

    if (demografia == 'children') {
      boceto.style.backgroundImage = 'url("' + falla.properties.boceto_i + '")';
    } else if (demografia == 'adult') {
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

//funcion que filtra estadoActual dependiendo a la demografia para obtener las fallas que han sido creadas desde el valor actual de la opción
function filtroDesde() {

  let demografia = returnDemografia();
  let respaldo;

  if (demografia == 'adult') {
    respaldo = estadoActual.filter(año => año.properties.anyo_fundacion > this.value);
  } else {
    respaldo = estadoActual.filter(año => año.properties.anyo_fundacion_i > this.value);
  }

  buscar(respaldo, demografia);

}

//funcion que filtra estadoActual dependiendo a la demografia para obtener las fallas que han sido creadas hsata el valor actual de la opción
function filtroHasta() {

  let demografia = returnDemografia();
  let respaldo;

  if (demografia == 'adult') {
    respaldo = estadoActual.filter(año => año.properties.anyo_fundacion < this.value);
  } else {
    respaldo = estadoActual.filter(año => año.properties.anyo_fundacion_i < this.value);
  }

  buscar(respaldo, demografia);
}

//Devuelve el tipo de demografia seleccionado actualmente en las opciones
function returnDemografia() {

  let radius = document.querySelectorAll('input[name="tipoFalla"]');
  let demografia;
  for (var i = 0; i < radius.length; i++) {
    if (radius[i].checked == true) {
      demografia = radius[i].value;
    }
  }
  return demografia;

}

//Lista los datos actuales dependiendo de de la demografia seleccionada
function filtroDemografia() {

  buscar(estadoActual, this.value);

}

function init() {

  // Binding de los eventos correspondientes.

  // Click en el boton de buscar
  // document.querySelector(`input[type="button"]`).addEventListener("click", buscar);
  // Texto cambia en el <input>
  // document.querySelector(`input[type="text"]`).addEventListener("input", toUpp);

  const fetchPromesa = fetch(fallasValenciaURL);
  // Cuando se resuelva la promesa
  fetchPromesa.then(response => {
    // la pasamos a JSON
    return response.json();

    // Y entonces
  }).then(respuesta => {

    fallasValencia = respuesta.features
    porDefecto(fallasValencia);

  });


  document.querySelectorAll('input[name="tipoFalla"]').forEach(radius => radius.addEventListener('change', filtroDemografia));
  document.querySelector('input[name="fechaDesde"]').addEventListener('change', filtroDesde);
  document.querySelector('input[name="fechaHasta"]').addEventListener('change', filtroHasta);

}

// The mother of the lamb.
window.onload = init;
