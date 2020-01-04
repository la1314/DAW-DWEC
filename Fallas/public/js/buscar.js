// Simple script to use with datosAbiertos

// Author : Angel Berlanas Vicente
//         <berlanas_ang@gva.es>
// This script is licensed under GPLv3 or higher


// Algunos valores
const fallasValenciaURL = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
let fallasValencia;
let estadoActual;

//Función que ordena de forma alfanumérica los elementos de un array
function sortAlphaNum(a, b) {
  let reA = /[^a-zA-Z]/g;
  let reN = /[^0-9]/g;
  var aA = a.replace(reA, "");
  var bA = b.replace(reA, "");
  if (aA === bA) {
    var aN = parseInt(a.replace(reN, ""), 10);
    var bN = parseInt(b.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}

//Función que elimina los elementos duplicados de un array
Array.prototype.unique = function(a) {
  return function() {
    return this.filter(a)
  }
}(function(a, b, c) {
  return c.indexOf(a, b + 1) < 0
});

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

//Guarda en un array las secciones disponibles dependiendo a la demografia seleccionada
function filtroSecciones(datos) {

  let secciones = new Array();
  let demografia = returnDemografia();
  let fcBoolean = false;
  let eBoolean = false;

  if (demografia == 'children') {
    datos.forEach(seccion => secciones.push(seccion.properties.seccion_i));
  } else if (demografia == 'adult') {
    datos.forEach(seccion => secciones.push(seccion.properties.seccion));
  }

  secciones = secciones.unique();

  if (secciones.includes('FC')) {
    secciones = removerItem(secciones, 'FC');
    fcBoolean = true;
  }

  if (secciones.includes('E')) {
    secciones = removerItem(secciones, 'E');
    eBoolean = true;
  }

  if (demografia == 'children') {
    secciones.sort((a, b) => a - b);

  } else if (demografia == 'adult') {
    secciones = secciones.sort(sortAlphaNum);
  }

  if (eBoolean) {
    secciones.unshift('E');
  }

  if (fcBoolean) {
    secciones.unshift('FC');
  }

  secciones.unshift('Todas');
  return secciones;
}

// Elimina un elemento de un arrray
function removerItem(vector, item) {
  return vector.filter(function(e) {
    return e !== item;
  });
};

//funcioón que se encarga de dibujar los cuardros de las fallas a este se le pasa como parámetros los datos a dibujar y la demografia de a seleccionar para mostrarlos por pantalla
// cada vez que se llama a esta función guarda en la variable estadoActual los datos de datosFalla puesto que las diferentes opciones toman como base estos datos para ir filtrandolos

function buscar(datosFalla, demografia) {

  estadoActual = datosFalla;
  let secciones;

  //console.log(datosFalla[0]);
  secciones = filtroSecciones(estadoActual);

  let opciones = document.getElementById('sections');

  while (opciones.firstChild) {
    opciones.removeChild(opciones.firstChild);
  }

  opciones.addEventListener('change', mostrarSeccion);

  for (var i = 0; i < secciones.length; i++) {

    let opcion = document.createElement('option');
    opcion.value = secciones[i];
    opcion.innerHTML = secciones[i];
    opciones.appendChild(opcion);
    opcion.click;

  }

  //Dibujamos el cuadro de fallas
  creacionCuadros(demografia, estadoActual);


}

// Crea cuadros tomando en cuenta la demografia seleccionada tomando como base los datos pasados
function creacionCuadros(demografia, datosFalla) {

  let myNode = document.querySelector(".resultados");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  datosFalla.forEach( falla => {
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
    ubicacion.addEventListener('click', function() {
      console.log(falla.properties.seccion)
    });
    //TODO implementar ubicacion

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

//Muestra la las secciones seleccionadas de los datos de estadoActual
function mostrarSeccion() {

  let respaldo, demografia, seleccionado;
  demografia = returnDemografia();
  seleccionado = this.value;

  if (seleccionado == 'Todas') {
    respaldo = estadoActual;
  } else {
    if (demografia == 'adult') {
      respaldo = estadoActual.filter(seccion => seccion.properties.seccion == seleccionado);
    } else {
      respaldo = estadoActual.filter(seccion => seccion.properties.seccion_i == seleccionado);
    }
  }

  creacionCuadros(demografia, respaldo);

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
  document.getElementById('sections').addEventListener('change', mostrarSeccion);

}

// The mother of the lamb.
window.onload = init;
