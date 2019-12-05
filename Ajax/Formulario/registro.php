<?php

    $servidor = "localhost";
    $username = "miusuario";
    $password = "mipassword";
    $basedatos = "bdprueba";
    # Crear conexión
    $conn = mysqli_connect($servidor, $username, $password, $basedatos);

    # Comprobar conexión
    if (!$conn) {
        die("Conexi&ocacuten fallida: " . mysqli_connect_error());
    }

    $consulta = "SELECT * from empleados;";
    $result = mysqli_query($conn, $consulta);
    


?>