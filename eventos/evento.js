var nombre;
var apellido;
var email;
var dni;
var password;
var repassword;
var ip;

var nombreValor = null;
var apellidoValor  = null;
var emailValor = null;
var dniValor = null;
var passwordValor = null;
var repasswordValor = null;
var ipValor = null;

function comprobarFormulario(){

    let correcto = true;

    if (nombre && apellido && email && dni && password && ip) {
        alert("Todo Correcto");
        
    } else {
        
        alert("Hay errores")

        if(!nombre && nombreValor != null){
            nombreValor.style.backgroundColor = "red";
            alert("Nombre");
        }
        if(!apellido && apellidoValor != null ){
            apellidoValor.style.backgroundColor = "red";
        }
        if(!email && emailValor != null){
            emailValor.style.backgroundColor = "red";
        }
        if(!dni && dniValor != null){
            dniValor.style.backgroundColor = "red";
        }
        if(!password && passwordValor != null){
            passwordValor.style.backgroundColor = "red";
        }
        if(!ip && ipValor != null){
            ipValor.style.backgroundColor = "red";
        }

        correcto = false;
    }

    return correcto;

}

function comprobarNombre(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /^[A-Za-zÁÉÍÓÚáéíóú+\s]+$/;

    if (patron.test(comprobacion)) {
        
        ob.style.backgroundColor = "white";
        correcto = true;
    
    }

    nombre = correcto;
    nombreValor = ob;
}


function comprobarApellido(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /^[A-Za-zÁÉÍÓÚáéíóú+\s]+$/;

    if (patron.test(comprobacion)) {
        
        ob.style.backgroundColor = "white";
        correcto = true;
    
    }

    apellido = correcto;
    apellidoValor = ob;

}

function comprobarEmail(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    
    if (patron.test(comprobacion)) {

        correcto = true;
        ob.style.backgroundColor = "white";
    }

    emailValor = ob;
    email = correcto;

}

function comprobarDNI(ob){

    let correcto = false;
    let comprobacion = ob.value;
    patron = /\d{8}[a-z A-Z]/;

    if (patron.test(comprobacion)) {

        correcto = true;
        ob.style.backgroundColor = "white";

    }

    dniValor = ob;
    dni = correcto;

}

function comprobarPassword(ob){

    let correcto = false;
    let comprobacion = ob.value;
    let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,15}/;

    if (patron.test(comprobacion)) {

        correcto = true;
        ob.style.backgroundColor = "white";

    }

    passwordValor = ob;
    password = correcto;

}

function comprobarIP(ob){

    let comprobacion = ob.value;
    let patron = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/ ;
    let correcto = false;
    if (patron.test(comprobacion)) {

        correcto = true;
        ob.style.backgroundColor = "white";
    }

    ipValor = ob;
    ip = correcto;
}
