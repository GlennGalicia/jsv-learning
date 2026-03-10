// class declaration
class Cliente {
    constructor(nombre, saldo) {
        this.nombre = nombre
        this.saldo = saldo
    }

    mostrarInformacion() {
        return `Nombre: ${this.nombre}, tu saldo es de: ${this.saldo}`
    }

    static bienvenida() {
        return `Bienvenido al Curso JS`
    }
}

// class expression
const Cliente2 = class {
    constructor(nombre, saldo) {
        this.nombre = nombre
        this.saldo = saldo
    }

    mostrarInformacion() {
        return `Nombre: ${this.nombre}, tu saldo es de: ${this.saldo}`
    }
}

const cliente = new Cliente('Glenn', 15000)
const cliente2 = new Cliente2('Makuyl', 15000)

console.log(cliente);
console.log(cliente.mostrarInformacion());
console.log(cliente2);
console.log(cliente2.mostrarInformacion());

console.log(Cliente.bienvenida());
