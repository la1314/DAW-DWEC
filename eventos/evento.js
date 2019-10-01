var nombre = "";
var apellido = "";
var email = "";
var dni = "";
var password = "";
var repassword = "";
var ip = "";

var nombreValor = null;
var apellidoValor  = null;
var emailValor = null;
var dniValor = null;
var passwordValor = null;
var repasswordValor = null;
var ipValor = null;

function comprobarFormulario(){

    let correcto = true;

    if (nombre && apellido && email && dni && password && repassword && ip) {

        alert("Todo Correcto");

    } else {

        let mensaje = "Hay errores en: \n";

        if(!nombre && nombreValor != null){
          mensaje+= " Nombre \n";
        }
        if(!apellido && apellidoValor != null ){
          mensaje+= " Apellido \n"
        }
        if(!email && emailValor != null){
          mensaje+= " e-mail \n"
        }
        if(!dni && dniValor != null){
          mensaje+= " DNI \n"
        }
        if(!password && passwordValor != null){
          mensaje+= " Password \n"
        }
        if(!repassword && repasswordValor != null){
          mensaje+= " Repetir password \n"
        }
        if(!ip && ipValor != null){
          mensaje+= " IP \n"
        }

        if ( mensaje == "Hay errores en: \n") {
          alert("Faltan casillas por rellenar")
        } else {
          alert(mensaje);
        }



        correcto = false;
    }

    return correcto;

}

function comprobarNombre(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /^[A-Za-zÁÉÍÓÚáéíóú+\s]+$/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        ob.value = "¡ERROR!";

    }else {
          correcto = true;
    }

    nombre = correcto;
    nombreValor = ob;
}


function comprobarApellido(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /^[A-Za-zÁÉÍÓÚáéíóú+\s]+$/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        ob.value = "¡ERROR!";

    }else {
          correcto = true;
    }

    apellido = correcto;
    apellidoValor = ob;

}

function comprobarEmail(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        ob.value = "¡ERROR!";

    }else {
          correcto = true;
    }

    emailValor = ob;
    email = correcto;

}

function comprobarDNI(ob){

    let correcto = false;
    let comprobacion = ob.value;
    patron = /\d{8}[a-z A-Z]/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        ob.value = "¡ERROR!";

    }else {
          correcto = true;
    }

    dniValor = ob;
    dni = correcto;

}

function comprobarPassword(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    if (!patron.test(comprobacion) && comprobacion != "") {

        ob.value = "¡ERROR!";

    }else {
          correcto = true;
    }

    passwordValor = ob;
    password = correcto;

}

function comprobarRepassword(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    if (patron.test(comprobacion) && passwordValor.value == comprobacion) {

        correcto = true;

    }else {

        if (comprobacion != "") {
            ob.value = "¡ERROR!";
        }

    }

    repasswordValor = ob;
    repassword= correcto;

}

function comprobarIP(ob){

    let comprobacion = ob.value;
    let patron = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/ ;
    let correcto = false;

    if (!patron.test(comprobacion) && comprobacion != "") {

        ob.value = "¡ERROR!";

    }else {
          correcto = true;
    }

    ipValor = ob;
    ip = correcto;
}
