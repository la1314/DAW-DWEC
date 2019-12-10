<?php

    $servidor = "localhost";
    $username = "registro";
    $password = "patata";
    $basedatos = "usuarios";

    # Crear conexión
    $conn = mysqli_connect($servidor, $username, $password, $basedatos);

    # Comprobar conexión
    if (!$conn) {
        die("Conexi&ocacuten fallida: " . mysqli_connect_error());
    }

    $nombre = $_POST['Nombre'];
    $apellido = $_POST['Apellido'];
    $email = $_POST['email'];
    $dni = $_POST['DNI'];
    $contrasenya = md5($_POST['Password']);
    $ip = $_POST['IP'];

    #echo($nombre . " " .$apellido . " $email " . $dni. " " .$contrasenya. " " . $ip);

    $consulta = "INSERT INTO users VALUES('$dni', '$nombre', '$apellido', '$email', '$contrasenya', '$ip');";
    mysqli_query($conn, $consulta);
    mysqli_close($conn);
    echo("OK");
?>