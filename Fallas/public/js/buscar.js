// Simple script to use with datosAbiertos

// Author : Angel Berlanas Vicente
//         <berlanas_ang@gva.es>
// This script is licensed under GPLv3 or higher


// Algunos valores
const fallasValenciaURL = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
let fallasValencia;
let estadoActual;
let ipHost;
let ubicaciones = new Array();

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
    secciones.push('FC');
  }

  secciones.unshift('Todas');
  return secciones;
}

//Función que obtiene la ip pública del cliente
function getIPAddress() {
  $.getJSON("https://jsonip.com?callback=?", function(data) {
    ipHost = data.ip;
  });
};

// Elimina un elemento de un arrray
function removerItem(vector, item) {
  return vector.filter(function(e) {
    return e !== item;
  });
};

// Crea cuadros tomando en cuenta la demografia seleccionada tomando como base los datos pasados
function creacionCuadros(demografia, datosFalla) {

  let myNode = document.querySelector(".resultados");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  iterador = 0;
  ubicaciones = [];


  datosFalla.forEach(falla => {

    // guardamos los datos de la ubicación en un objeto para crear el mapa posteriormente
    let ubicacionFalla = new Object();
    ubicacionFalla.nombre = falla.properties.nombre;
    ubicacionFalla.longitud = falla.geometry.coordinates[0];
    ubicacionFalla.latitud = falla.geometry.coordinates[1];
    ubicaciones.push(ubicacionFalla);

    // Creamos el cuadro de cada falla
    let cuadro = document.createElement('div');
    let boceto = document.createElement('div');
    let divNombre = document.createElement('div');
    let nombre = document.createElement('p');
    let ubicacion = document.createElement('button');
    let puntuacion = document.createElement('button');

    cuadro.classList.add('cuadrado');
    boceto.classList.add('imagenes');
    divNombre.classList.add('nombres');
    ubicacion.classList.add('botonesFallas');
    puntuacion.classList.add('botonesFallas');
    nombre.id = 'C' + iterador;

    if (demografia == 'children') {
      boceto.style.backgroundImage = 'url("' + falla.properties.boceto_i + '")';
    } else if (demografia == 'adult') {
      boceto.style.backgroundImage = 'url("' + falla.properties.boceto + '")';
    }

    nombre.innerHTML = falla.properties.nombre;
    //TODO implementar ubicacion
    ubicacion.innerHTML = "Ubicación";
    ubicacion.value = iterador;
    ubicacion.addEventListener('click', crearMapa);

    // Apartado putnuación
    puntuacion.innerHTML = 'Crear Puntuación';
    puntuacion.name = 'C' + iterador;
    puntuacion.value = 1;
    puntuacion.addEventListener('click', crearPuntuacion);


    divNombre.appendChild(nombre);
    cuadro.appendChild(boceto);
    cuadro.appendChild(divNombre);
    cuadro.appendChild(ubicacion);
    cuadro.appendChild(puntuacion);

    document.querySelector(".resultados").appendChild(cuadro);
    iterador++;
  });
}

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

    if (secciones[i] == 'FC') {
      opcion.innerHTML = 'Fuera del concurso';
    } else if (secciones[i] == 'E') {
      opcion.innerHTML = 'Sección especial';
    } else if (secciones[i] == 'Todas') {
      opcion.innerHTML = secciones[i];
    } else {
      opcion.innerHTML = 'Sección: ' + secciones[i];
    }

    opciones.appendChild(opcion);
    opcion.click;

  }

  //Dibujamos el cuadro de fallas
  creacionCuadros(demografia, estadoActual);
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


//funcion que se lanza para listar todas las fallas sin ningún tipo de filtro aplicado tomando en cuenta la demografia seleccionada
function porDefecto(datos) {

  buscar(datos, returnDemografia());
}

function porDefecto() {

  buscar(fallasValencia, returnDemografia());
}

//Lista los datos actuales dependiendo de de la demografia seleccionada
function filtroDemografia() {

  buscar(estadoActual, this.value);
}


//Apartado AJAX realizar todas las peticiones y luego ponerme con las puntuaciones

function crearPuntuacion() {

  let falla = document.getElementById(this.name);
  let nombre = falla.innerHTML;
  let puntos = this.value;

  let puntuacion = JSON.stringify({
    'idFalla': nombre,
    'ip': ipHost,
    'puntuacion': puntos
  });

  //  Realizar petición HTTP
  comprobarVotacion(puntuacion);
}

//Comprueba que la ip no ha votado a la falla actual
function comprobarVotacion(puntuacion) {

  let query = 'http://localhost:3000/api/puntuaciones/encontrar';
  let xhr = new XMLHttpRequest();

  xhr.open("POST", query, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {

      if (xhr.responseText == "") {
        //No existe por lo que se procede a crear la puntuacion
        crearVotacion(puntuacion)
      }
    }
  };

  xhr.send(puntuacion);

}

//Añade a la base de datos la votación
function crearVotacion(puntuacion) {

  let query = 'http://localhost:3000/api/puntuaciones'

  let xhr = new XMLHttpRequest();

  xhr.open("POST", query, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {

    if (xhr.readyState === 4 && xhr.status === 200) {
      //Añadido
    }
  };

  xhr.send(puntuacion);
}

//Ubicación, se requiera de coordenadas, nombre y div contenedor del mapa
function crearMapa(){

  eliminarMapa();

  let nombre = ubicaciones[this.value].nombre;
  let longitud = ubicaciones[this.value].longitud;
  let latitud = ubicaciones[this.value].latitud;
  
  let divMapa = document.createElement('div');
  divMapa.id = 'map';
  document.getElementById('busqueda').appendChild(divMapa);

  let firstProjection  = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';
	let secondProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
  let iarCoordinate = [longitud, latitud];

  coordenadas = proj4(firstProjection, secondProjection, iarCoordinate);

	let mapa = L.map('map').setView([coordenadas[1], coordenadas[0]], 16);
	let tilerMapUrl = 'https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=FeZF25xvZUuP463NS59g';
        L.tileLayer(tilerMapUrl, {
            attribution: 'ÒwÓ > UwU',
		}).addTo(mapa);
		
	L.marker(coordenadas).addTo(mapa);
  
  var punto = new L.Marker([coordenadas[1], coordenadas[0]]);
  punto.addTo(mapa);
  punto.bindPopup(nombre);
}

function eliminarMapa(){
  
  let div = document.getElementById('map');

  if (div !== null) {

    div.parentNode.removeChild(div);

  }
}

function init() {

  const fetchPromesa = fetch(fallasValenciaURL);
  // Cuando se resuelva la promesa
  fetchPromesa.then(response => {
    // la pasamos a JSON
    return response.json();

    // Y entonces
  }).then(respuesta => {

    fallasValencia = respuesta.features
    porDefecto(fallasValencia);
    getIPAddress();

  });

  // Binding de los eventos correspondientes.
  document.querySelectorAll('input[name="tipoFalla"]').forEach(radius => radius.addEventListener('change', filtroDemografia));
  document.querySelector('input[name="fechaDesde"]').addEventListener('change', filtroDesde);
  document.querySelector('input[name="fechaHasta"]').addEventListener('change', filtroHasta);
  document.querySelector('button[name="reinicio"]').addEventListener('click', porDefecto);
  document.getElementById('sections').addEventListener('change', mostrarSeccion);
}

// The mother of the lamb.
window.onload = init;
