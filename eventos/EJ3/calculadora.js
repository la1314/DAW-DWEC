window.onload = function () {

    var pantallaTexto;

    //Se guardan las clases en un vector a las cuales luego se les añadira un EventListener
    var vectorBotones = document.getElementsByClassName("boton");
    var pantalla = document.getElementsByTagName("input");


    var devolverValor = function () {


        let cadena = pantalla[0].value;
        let valor = this.innerText;
        cadena += valor;
        cadena = comprobarValor(cadena);

        // pasarlo a una funcion la cual comprobara el valor y devolvera la cadena
        // dentro de dicha funcio habrá un Switch case para determinar los caracteres

       // administrarCaracter(valor, cadena);

        pantalla[0].value = cadena;

    };

    // Itera añadiendo un event listener a cada boton
    for (var i = 0; i < vectorBotones.length; i++) {
        vectorBotones[i].addEventListener('click', devolverValor, false);
    }


}

//Funcion que verificara los valores dentro de la pantalla para que sean correctos a la hora de imprimirlos
function comprobarValor(value) {

    let cadena = value;
    let primerCaracter = value.substring(0, 1);

    if (cadena.length > 0 && (primerCaracter == "" || primerCaracter == 0)) {
        cadena = value.substring(1);
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

function administrarCaracter(caracter, cadena) {

    switch (caracter) {
        case "«":
            cadena = borrarCaracter(cadena);
            break;
        case value:

            break;
        case "C":
            cadena = limpiarPantalla()
            break;
        case "%":

            break;
        case "/":

            break;
        case "-":

            break;
        case "+":

            break;
        case "x":

            break;
        case ".":

            break;
        case "()":

            break;
        case "=":

            break;

        default:
            break;
    }

}