// class declaration
class Cliente {

    #nombre

    constructor(nombre, saldo) {
        this.#nombre = nombre
        this.saldo = saldo
    }

    mostrarInformacion() {
        return `Nombre: ${this.#nombre}, tu saldo es de: ${this.saldo}`
    }

    static bienvenida() {
        return `Bienvenido al Curso JS`
    }
}

const cliente = new Cliente('Glenn', 15000)
console.log(cliente.mostrarInformacion());


