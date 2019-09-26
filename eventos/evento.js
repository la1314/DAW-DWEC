var nombre;
var apellido;
var email;
var dni;
var password;
var repassword;
var ip;

function formulario(){

    nombre = document.getElementById("_nombre").value;

   if (!comprobarNombre(nombre)) {
       alert("1");
       document.getElementById("_nombre").innerHTML = "Nombre incorrecto";
   } 

}

function comprobarNombre(comprobacion){

    let correcto = true;
    let patron = /\d/;
    
    if (comprobacion.match(patron)) {
        correcto = false;
    }
    
    return correcto;

}