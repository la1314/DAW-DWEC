function crearPersonaje() {

  if (comprobarVacios()) {

    let personaje = {
      "nombre": devolverValor('nombre'),
      "apellidos": devolverValor('apellidos'),
      "familia": devolverValor('casa'),
      "padres": devolverValor('padres'),
      "titulo": devolverValor('titulo'),
      "imagen": devolverValor('imagen')
    }

    consulta(personaje);

  }

}

function consulta(personaje) {
  // Obtener la instancia del objeto XMLHttpRequest
  peticion_http = new XMLHttpRequest();

  // Preparar la función de respuesta
  peticion_http.onreadystatechange = mostrar;

  // Realizar petición HTTP
  peticion_http.open('GET', path);
  peticion_http.send('');

  function mostrar() {

    if (peticion_http.readyState == 4 && peticion_http.status == 200) {
      let data = JSON.parse(peticion_http.responseText);
      data['got'].push(personaje);
      console.log(data);

      jsonStr = JSON.stringify(data);
      console.log(jsonStr);
    }
  }
}

function comprobarVacios() {

  let inputs = document.querySelectorAll('input');
  let creable = true;

  inputs.forEach((item, i) => {
      if (item.value == '' || item.value == 'img/') {
        let error = document.getElementById('e'+item.id);
        error.style.visibility = 'visible';
        creable = false;
      }else {
        let error = document.getElementById('e'+item.id);
        error.style.visibility = 'hidden';
      }

  });

  return creable;
}

function devolverValor(id) {
  return document.getElementById(id).value;
}

function init() {

  document.querySelector('button').addEventListener('click', crearPersonaje);

}

let archivo;
const path = 'got.json';

window.onload = init;
