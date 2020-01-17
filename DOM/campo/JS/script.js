function cargar() {

    document.querySelectorAll('.banquillo').forEach(elemento => {

        elemento.addEventListener("dragover", allowDrop);
        elemento.addEventListener("drop", drop);  
    });

    document.querySelectorAll('.jugador').forEach(
        elemento => elemento.addEventListener("dragstart", drag)
    );


}

function allowDrop(ev) {

    //Permitir que reciba algún elemento
    ev.preventDefault();

}

function drag(ev) {

    //Indicamos que valor y tipo de información vamos a arrastrar. En este caso texto e ID del elemento.
    //ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {

    //Evitamos el comportamiento normal del navegador, que sería abrir el elemento en una nueva pestaña.
    ev.preventDefault();

    //Guardamos el elemento, llamado "text" en una variable.
    var data = ev.dataTransfer.getData("text");

    // console.log(data);


    //Colgamos el elemeto arrastrado y soltado en el nuevo destino.
    ev.target.appendChild(document.getElementById(data));

}
window.addEventListener("load", cargar);