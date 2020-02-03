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

$consulta = "SELECT * from jugadores;";
$result = mysqli_query($conn, $consulta);

//Initialize array variable
$dbdata = array();

//Fetch into associative array
while ($row = $result->fetch_assoc()) {
    $dbdata[] = $row;
}

mysqli_close($conn);

//Print array in JSON format
echo json_encode($dbdata);
//echo 'OK';