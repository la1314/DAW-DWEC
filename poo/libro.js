class Lobro {

    constructor (titulo, autor, pais, isbn) {

        this.titulo = titulo;
        this.autor = autor;
        this.pais = pais;
        this.isbn = isbn;
    }

    get GetTitulo(){
        return this.titulo;
    }
    
    get GetAutor(){
        return this.autor;
    }

    get GetPais(){
        return this.pais;
    }

    get GetIsbn(){
        return this.isbn;
    }

    set SetTitulo(titulo){
        this.titulo = titulo;
    }

    set SetAutor(autor){
        this.autor = autor;
    }

    set SetPais(pais){
        this.pais = pais;
    }

    set SetIsbn(isbn){
        this.isbn = isbn;
    }

}