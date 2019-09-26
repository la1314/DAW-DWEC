export default class Cliente {

    constructor (nombre, direccion, dni, telefono) {

        this.nombre = nombre;
        this.direccion = direccion;
        this.dni = dni;
        this.telefono = telefono;
    }

    getNombre(){
        return this.nombre;
    }
    
    getDireccion(){
        return this.direccion;
    }

    getDni(){
        return this.dni;
    }

    getTelefono(){
        return this.telefono;
    }

   
    setNombre(value){
        this.nombre = value;
    }

    setDireccion(value){
        this.direccion = value;
    }


   setDni(value){
        this.dni = value;
    }


    setTelefono(value){
        this.telefono = value;
    }

    toString(){
        return this.nombre + " " + this.direccion + " " + this.dni + " " + this.telefono;
    }

}