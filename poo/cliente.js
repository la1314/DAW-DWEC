class Cliente {

    constructor (nombre, direccion, dni, telefono) {

        this.nombre = nombre;
        this.direccion = direccion;
        this.dni = dni;
        this.telefono = telefono;
    }

    get GetNombre(){
        return this.nombre;
    }
    
    get GetDireccion(){
        return this.direccion;
    }

    get GetDni(){
        return this.dni;
    }

    get GetTelefono(){
        return this.telefono;
    }

    set SetNombre(nombre){
        this.nombre = nombre;
    }

    set SetDireccion(direccion){
        this.direccion = direccion;
    }

    set SetDni(dni){
        this.dni = dni;
    }

    set SetTelefono(telefono){
        this.telefono = telefono;
    }

}