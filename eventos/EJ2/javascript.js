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

function oneclick(ob){

  ob.style.webkitBoxShadow = "0px 0px 0px 0px rgba(0,0,0,0)";
  ob.style.mozBoxShadow = "0px 0px 0px 0px rgba(0,0,0,0)";
  ob.style.boxShadow = "0px 0px 0px 0px rgba(0,0,0,0)";
}

function twoclick(ob){

  ob.style.transition = "box-shadow 1s";
  ob.style.webkitBoxShadow = "inset 0px 0px 35px -2px rgba(0,0,0,0.75)";
  ob.style.mozBoxShadow = "inset 0px 0px 35px -2px rgba(0,0,0,0.75)";
  ob.style.boxShadow = "inset 0px 0px 35px -2px rgba(0,0,0,0.75)";
}

function eliminar(ob, caja){

    caja.style.transition = "1s";
    caja.style.width = "0px";
    caja.style.height = "0px";
    ob.style.transition = "1s";
    ob.style.display = "none";
    
    padre = ob.parentNode;
    setTimeout(function(){padre.remove()}, 900);

}



