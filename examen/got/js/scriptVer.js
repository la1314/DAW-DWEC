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

function crearFicha(datos) {

  let contenedor = document.getElementById('contenedorFichas');

  console.log(datos);

  datos.forEach((item, i) => {

    let ficha = document.createElement('div');
    let imagen = document.createElement('img');
    let fNombre = document.createElement('div');
    let fApellido = document.createElement('div');
    let nombre = document.createElement('div');
    let apellido = document.createElement('div');
    let fPadres = document.createElement('div');
    let fCasa = document.createElement('div');
    let padres = document.createElement('div');
    let casa = document.createElement('div');
    let fTitulo = document.createElement('div');
    let titulo = document.createElement('div');

    ficha.classList.add('datos');
    imagen.classList.add('img-thumbnail', 'foto');
    fNombre.classList.add('small', 'cabecera');
    fApellido.classList.add('medium', 'cabecera');
    nombre.classList.add('small', 'dato');
    apellido.classList.add('medium', 'dato');
    fPadres.classList.add('medium', 'cabecera');
    fCasa.classList.add('small', 'cabecera');
    padres.classList.add('medium', 'dato');
    casa.classList.add('small', 'dato');
    fTitulo.classList.add('big', 'cabecera');
    titulo.classList.add('big', 'dato');

    imagen.id = "imagen"+i;
    imagen.src = item.imagen;
    fNombre.innerHTML = 'Nombre';
    fApellido.innerHTML = 'Apellidos';
    nombre.innerHTML = item.nombre;
    apellido.innerHTML = item.apellidos;
    fPadres.innerHTML = 'Padres';
    fCasa.innerHTML = 'Casa';
    padres.innerHTML = item.padres;
    casa.innerHTML = item.familia;
    fTitulo.innerHTML = 'Titulo';
    titulo.innerHTML = item.titulo;


    //ficha.appendChild(imagen);
    ficha.appendChild(fNombre);
    ficha.appendChild(fApellido);
    ficha.appendChild(nombre);
    ficha.appendChild(apellido);
    ficha.appendChild(fPadres);
    ficha.appendChild(fCasa);
    ficha.appendChild(padres);
    ficha.appendChild(casa);
    ficha.appendChild(fTitulo);
    ficha.appendChild(titulo);
    contenedor.appendChild(ficha);
  });
}

function init() {

  consulta();

}

const path = 'got.json';

window.onload = init;
