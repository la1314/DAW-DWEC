function comprobarFormulario(evento) {

    let correcto = true;

    if (nombre && apellido && email && dni && password && repassword && ip) {

        registro();

    } else {

        let mensaje = "Hay errores en: \n";

        if (!nombre && nombreValor != null) {
            mensaje += " Nombre \n";
        }
        if (!apellido && apellidoValor != null) {
            mensaje += " Apellido \n"
        }
        if (!email && emailValor != null) {
            mensaje += " e-mail \n"
        }
        if (!dni && dniValor != null) {
            mensaje += " DNI \n"
        }
        if (!password && passwordValor != null) {
            mensaje += " Password \n"
        }
        if (!repassword && repasswordValor != null) {
            mensaje += " Repetir password \n"
        }
        if (!ip && ipValor != null) {
            mensaje += " IP \n"
        }



        if (mensaje == "Hay errores en: \n") {
            alert("Faltan casillas por rellenar")
        } else {
            alert(mensaje);
        }

        correcto = false;
    }

    return correcto;

}


function registro() {

    let formulario = new FormData(document.getElementsByName('formularioRegistro')[0]);

    // Obtener la instancia del objeto XMLHttpRequest
    peticion_http = new XMLHttpRequest();

    // Preparar la función de respuesta
    peticion_http.onreadystatechange = mostrar;

    // Realizar petición HTTP

    peticion_http.open('POST', 'registro.php');
    peticion_http.send(formulario);

    function mostrar() {
        if (peticion_http.readyState == 4 && peticion_http.status == 200) {

            if (peticion_http.responseText == "OK") {
                alert("OK, registrado, PAPU ");
            }
        }
    }
}


function comprobarNombre(event) {

    let correcto = false;
    let comprobacion = this.value;
    let patron = /^[A-Za-zÁÉÍÓÚáéíóú+\s]+$/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        this.value = "¡ERROR!";

    } else {
        correcto = true;
    }

    nombre = correcto;
    nombreValor = this;

}


function comprobarApellido() {

    let correcto = false;
    let comprobacion = this.value;
    let patron = /^[A-Za-zÁÉÍÓÚáéíóú+\s]+$/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        this.value = "¡ERROR!";

    } else {
        correcto = true;
    }

    apellido = correcto;
    apellidoValor = this;

}

function comprobarEmail() {

    let correcto = false;
    let comprobacion = this.value;
    let patron = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        this.value = "¡ERROR!";

    } else {
        correcto = true;
    }

    emailValor = this;
    email = correcto;

}

function comprobarDNI() {

    let correcto = false;
    let comprobacion = this.value;
    patron = /\d{8}[a-z A-Z]/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        this.value = "¡ERROR!";

    } else {
        correcto = true;
    }

    dniValor = this;
    dni = correcto;

}

function comprobarPassword() {

    let correcto = false;
    let comprobacion = this.value;
    let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        this.value = "¡ERROR!";

    } else {
        correcto = true;
    }

    passwordValor = this;
    password = correcto;

}

function comprobarRepassword() {

    let correcto = false;
    let comprobacion = this.value;
    let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    if (patron.test(comprobacion) && passwordValor.value == comprobacion) {

        correcto = true;

    } else {

        if (comprobacion != "") {
            this.value = "¡ERROR!";
        }

    }

    repasswordValor = this;
    repassword = correcto;

}

function comprobarIP() {

    let comprobacion = this.value;
    let patron = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    let correcto = false;

    if (!patron.test(comprobacion) && comprobacion != "") {

        this.value = "¡ERROR!";

    } else {
        correcto = true;
    }

    ipValor = this;
    ip = correcto;
}

function agregarListeners() {

    document.querySelector('input[name="Nombre"]').addEventListener('blur', comprobarNombre);
    document.querySelector('input[name="Apellido"]').addEventListener('blur', comprobarApellido);
    document.querySelector('input[name="email"]').addEventListener('blur', comprobarEmail);
    document.querySelector('input[name="DNI"]').addEventListener('blur', comprobarDNI);
    document.querySelector('input[name="Password"]').addEventListener('blur', comprobarPassword);
    document.querySelector('input[name="RePassword"]').addEventListener('blur', comprobarRepassword);
    document.querySelector('input[name="IP"]').addEventListener('blur', comprobarIP);
    document.getElementById('boton').addEventListener("click", comprobarFormulario);
}

function init() {


    agregarListeners()


}

let nombre = "";
let apellido = "";
let email = "";
let dni = "";
let password = "";
let repassword = "";
let ip = "";

let nombreValor = null;
let apellidoValor = null;
let emailValor = null;
let dniValor = null;
let passwordValor = null;
let repasswordValor = null;
let ipValor = null;



window.onload = init;
