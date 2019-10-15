window.onload = function () {

  var pantallaTexto;

  //Se guardan las clases en un vector a las cuales luego se les añadira un EventListener
  var vectorBotones = document.getElementsByClassName("boton");
  var pantalla = document.getElementsByTagName("input");

  var devolverValor = function () {

    let cadena = pantalla[0].value;
    let valor = this.innerText;
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
    vectorBotones[i].addEventListener('mousedown', asignarSombra, false);
    vectorBotones[i].addEventListener('mouseup', quitarSombra, false);
  }

  document.addEventListener("keydown", devolverValorKey, false);

  function devolverValorKey(e) {
    let keyCode = e.key;
    let cadena = pantalla[0].value;

    if (keyCode == "Enter") {
      keyCode = "=";
      cadena += keyCode;
    } else if (keyCode == "Backspace") {
      keyCode = "«";
      cadena += keyCode;
     
    }else if (keyCode == "*") {
      keyCode = "x";
      cadena += keyCode;
     
    }else if (keyCode == "+" || keyCode == "-" || keyCode == "/" || keyCode == "%"  || keyCode == "." || keyCode == "C") {
      cadena += keyCode;
    }

    if (keyCode >= 0 || keyCode <= 9) {
      cadena += keyCode;
    }

    cadena = comprobarValor(cadena, keyCode);
    pantalla[0].value = cadena;

  }

}

//Función que se encarga de comprobar el caracter que se va añadir a la cadena cumple los requisitos necesarios
function comprobarValor(value, caracter) {

  let cadena = value;
  if (cadena.length == 2 && (cadena.substring(0, 1) == 0)) {
    cadena = value.substring(1);
  }

  if (cadena.length == 1 && isNaN(cadena.substring(0, 1))) {
    cadena = 0;
  }

  if (cadena.length > 1 && (cadena.substring(0, cadena.length - 1) == "Infinity" || cadena.substring(0, cadena.length - 1) == "-Infinity" ) ) {
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
        cadena = asignarOperacion(cadena, caracter);
        break;
      case "-":
        cadena = asignarOperacion(cadena, caracter);
        break;
      case "+":
        cadena = asignarOperacion(cadena, caracter);
        break;
      case "/":
        cadena = asignarOperacion(cadena, caracter);
        break;
      case "=":
        cadena = calcular(cadena);
        break;
      case "%":
        cadena = asignarOperacion(cadena, caracter);
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

//Función que se lanza al encontrarse con el simbolo o tecla de eliminar cada caracter
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

function asignarOperacion(operando, caracter){

  if (operando.substring(operando.length - 2, operando.length - 1) == ")") {
    operando = operando.substring(0, operando.length - 1) + caracter;
  } else if (isNaN(operando.substring(operando.length - 2, operando.length - 1))) {
    operando = operando.substring(0, operando.length - 2) + caracter;
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
  if (operando.substring(0, operando.length - 1).includes(".")) {
    operando = operando.substring(0, operando.length - 1);
  }

  return operando;
}

function calcular(cadena) {

  cadena = cadena.replace("x", "*");
  cadena = cadena.replace("%", "/100*");

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

