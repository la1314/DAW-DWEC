window.onload = function() {

  var pantallaTexto;

  //Se guardan las clases en un vector a las cuales luego se les añadira un EventListener
  var vectorBotones = document.getElementsByClassName("boton");
  var pantalla = document.getElementsByTagName("input");

  var devolverValor = function() {

    let cadena = pantalla[0].value;
    let valor = this.innerText;
    if (valor == "x") {
      valor = "*";
    }
    cadena += valor;

    cadena = comprobarValor(cadena, valor);
    pantalla[0].value = cadena;

  };

  function asignarSombra() {
    this.classList.remove("quitarSombra");
    this.classList.add("sombraBotones");
  }

  function quitarSombra() {
    this.classList.remove("sombraBotones");
    this.classList.add("quitarSombra");
  }

  // Itera añadiendo un event listener a cada boton
  for (var i = 0; i < vectorBotones.length; i++) {
    vectorBotones[i].addEventListener('click', devolverValor, false);
    vectorBotones[i].addEventListener('click', asignarSombra, false);
    vectorBotones[i].addEventListener('mouseout', quitarSombra, false);
  }

}

//Funcion que verificara los valores dentro de la pantalla para que sean correctos a la hora de imprimirlos
function comprobarValor(value, caracter) {

  let cadena = value;
  if (cadena.length == 2 && (cadena.substring(0, 1) == 0)) {
    cadena = value.substring(1);
  }

  if (cadena.length == 1 && isNaN(cadena.substring(0, 1))) {
    cadena = 0;
  }

  if (cadena.length > 1 && cadena.substring(0, cadena.length - 1) == "Infinity") {
    cadena = caracter;
  }

  if (cadena.length > 1 || caracter == ".") {
    switch (caracter) {
      case "«":
        cadena = borrarCaracter(cadena);
        break;
      case "C":
        cadena = limpiarPantalla();
        break;
      case "*":
        cadena = asignarMultiplicacion(cadena);
        break;
      case "-":
        cadena = asignarResta(cadena);
        break;
      case "+":
        cadena = asignarSuma(cadena);
        break;
      case "/":
        cadena = asignarDivision(cadena);
        break;
      case "=":
        cadena = calcular(cadena);
        break;
      case "%":
        cadena = asignarPorcentaje(cadena);
        break;
      case "()":
        cadena = asignarParentesis(cadena);
        break;
      case ".":
        cadena = asignarPunto(cadena);
        break;
    }
  }

  return cadena;

}

//Función que se lanza al encontrarse con el simbolo o tecla de eliminar caeda caracter
function borrarCaracter(cadena) {

  if (cadena.length > 2) {
    cadena = cadena.substring(0, cadena.length - 2);
  } else {
    cadena = "0";
  }

  return cadena;
}

function limpiarPantalla() {
  return "0";
}

function asignarSuma(operando) {

  if (operando.substring(operando.length - 2, operando.length - 1) == ")") {
    operando = operando.substring(0, operando.length - 1) + "+";
  } else if (isNaN(operando.substring(operando.length - 2, operando.length - 1))) {
    operando = operando.substring(0, operando.length - 2) + "+";
  }

  return operando;

}

function asignarResta(operando) {
  if (operando.substring(operando.length - 2, operando.length - 1) == ")") {
    operando = operando.substring(0, operando.length - 1) + "-";
  } else if (isNaN(operando.substring(operando.length - 2, operando.length - 1))) {
    operando = operando.substring(0, operando.length - 2) + "-";
  }
  return operando;
}

function asignarMultiplicacion(operando) {

  if (operando.substring(operando.length - 2, operando.length - 1) == ")") {
    operando = operando.substring(0, operando.length - 1) + "*";
  } else if (isNaN(operando.substring(operando.length - 2, operando.length - 1))) {
    operando = operando.substring(0, operando.length - 2) + "*";
  }
  return operando;
}

function asignarDivision(operando) {
  if (operando.substring(operando.length - 2, operando.length - 1) == ")") {
    operando = operando.substring(0, operando.length - 1) + "/";
  } else if (isNaN(operando.substring(operando.length - 2, operando.length - 1))) {
    operando = operando.substring(0, operando.length - 2) + "/";
  }
  return operando;
}

// Tuinki del futuro se encargara de esta pedazo de mierda ÒwÓ
function asignarPorcentaje(operando) {

  if (isNaN(operando.substring(operando.length - 2, operando.length - 1))) {
    operando = operando.substring(0, operando.length - 2) + "%";
  }
  return operando;
}

// Falta que los parentesis no entren en comflicto con las operaciones de arriba cuando ya hay un parentesis asignado
function asignarParentesis(operando) {
  if (isNaN(operando.substring(operando.length - 3, operando.length - 2))) {
    operando = operando.substring(0, operando.length - 2);
  } else {
    operando = "(" + operando.substring(0, operando.length - 2) + ")";
  }
  return operando;
}

function asignarPunto(operando) {

    if (operando == 0) {
      operando += ".";
    }

    if (operando.substring(0, operando.length-1).includes(".")) {
      operando = operando.substring(0, operando.length-1);
    }

    return operando;
}

function calcular(cadena) {

  if (!isNaN(cadena.substring(cadena.length - 2, cadena.length - 1))) {
    cadena = cadena.substring(0, cadena.length - 1);
    cadena = eval(cadena);

  } else if (cadena.substring(cadena.length - 2, cadena.length - 1) == ")") {
    cadena = cadena.substring(0, cadena.length - 1);
    cadena = eval(cadena);
  } else {
    cadena = cadena.substring(0, cadena.length - 1);

  }

  return cadena;
}
