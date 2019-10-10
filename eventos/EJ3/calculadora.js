window.onload = function () {

    //Se guardan las clases en un vector a las cuales luego se les añadira un EventListener
    var vectorBotones = document.getElementsByClassName("boton");
    var pantalla = document.getElementsByTagName("input");


    var devolverValor = function() {
        
        let valor = this.innerText;
        
        pantalla[0].value += valor;

    };

    // Itera añadiendo un event listener a cada boton
   for (var i = 0; i < vectorBotones.length; i++) {
        vectorBotones[i].addEventListener('click', devolverValor, false);
    }


   

  

    var escribir = function(valor){

        this.value += valor;

    }

}

