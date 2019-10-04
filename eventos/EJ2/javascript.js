function redondear(ob){

    ob.style.transition = "1s";
    ob.style.borderRadius = "200px 200px 200px 200px";
    ob.style.mozBorderRadius = "200px 200px 200px 200px";
    ob.style.webkitBorderRaius = "200px 200px 200px 200px";
    ob.style.border = "0px solid #000000";
}

function cuadrado(ob){

    quitarRedondeo(ob);
    ob.style.webkitBoxShadow = "10px 10px 4px 0px rgba(102,102,102,0.96)";
    ob.style.mozBoxShadow = "10px 10px 4px 0px rgba(102,102,102,0.96)";
    ob.style.boxShadow = "10px 10px 4px 0px rgba(102,102,102,0.96)";
}

function quitarRedondeo(ob){

    ob.style.borderRadius = null;
    ob.style.mozBorderRadius = null;
    ob.style.webkitBorderRaius = null;
    ob.style.border = null;

}

function eliminar(ob){

    let padre = ob.parentNode();
 
}