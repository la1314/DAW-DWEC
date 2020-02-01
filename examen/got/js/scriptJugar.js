function comprobar() {

  let contenedores = document.querySelectorAll('.contenedorJuego');
  let aciertos = 0;
  let fallos = 0;

  contenedores.forEach((item, i) => {

      if (item.value == item.lastChild.value) {
        aciertos++;
      }else {
        fallos++;
      }
  });

  alert('Has tenido '+ aciertos + ' aciertos y ' + fallos + ' fallos, Puto');
}

function crearFicha(datos){

  let contenedor = document.getElementById('contenedorFotos');

  datos.forEach((item, i) => {

    let juego = document.createElement('div');
    let imagen = document.createElement('img');
    let select = document.createElement('select');
    let defecto = document.createElement('option');

    juego.classList.add('col-ms-6', 'col-sm-3', 'contenedorJuego');
    imagen.classList.add('img-thumbnail');
    select.classList.add('form-control');

    juego.value = item.familia;
    imagen.id = 'imagen' + i;
    imagen.src = item.imagen;
    defecto.innerHTML = 'Selecciona familia...';
    select.appendChild(defecto);

    datos.forEach((valor, e) => {

      let opcion = document.createElement('option');
      opcion.value = valor.familia;
      opcion.innerHTML = valor.familia;
      select.appendChild(opcion);
    });

    juego.appendChild(imagen);
    juego.appendChild(select);
    contenedor.appendChild(juego);


  });

  //console.log(datos);
}


function consulta() {
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
      crearFicha(data.got);
    }
  }
}

function init() {

  document.getElementById('comprobar').addEventListener('click', comprobar);
  consulta();

}

const path = 'got.json';

window.onload = init;
