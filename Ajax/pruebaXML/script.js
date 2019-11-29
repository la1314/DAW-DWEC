function descargar() {
    // Obtener la instancia del objeto XMLHttpRequest
    peticion_http = new XMLHttpRequest();

    // Preparar la función de respuesta
    peticion_http.onreadystatechange = mostrar;

    // Realizar petición HTTP

    peticion_http.open('GET', 'xml.php', true);
    peticion_http.send(null);

    function mostrar() {
        if (peticion_http.readyState == 4 && peticion_http.status == 200) {

            let xmlDoc = peticion_http.responseXML;
            console.log(xmlDoc);
            
            //document.getElementById("nombre").innerHTML = peticion_http.responseXML;
            
        }
    }
}


function init(){

    document.getElementById('consultar').addEventListener('click', descargar);

}

window.onload = init;
