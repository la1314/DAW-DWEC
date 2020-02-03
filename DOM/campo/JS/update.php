<?php

$servidor = "192.168.4.65";
$username = "miusuario";
$password = "mipassword";
$basedatos = "bdprueba";

# Crear conexión
$conn = mysqli_connect($servidor, $username, $password, $basedatos);

# Comprobar conexión
/* if (!$conn) {

    echo mysqli_connect_error();
} */
$posicion = $_POST['posicion'];
$id = $_POST['id'];

$consulta = "UPDATE jugadores set equipo = '$posicion' where id = $id ";
mysqli_query($conn, $consulta);

mysqli_close($conn);

//Print array in JSON format
echo 'Actualizado, perro';
//echo 'OK';