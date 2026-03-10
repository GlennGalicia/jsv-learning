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

class Empresa extends Cliente {
    constructor(nombre, saldo, telefono, categoria) {
        super(nombre, saldo)
        this.telefono = telefono
        this.categoria = categoria
    }
}

const cliente = new Cliente('Glenn', 15000)
const empresa = new Empresa('Chiquistrikis', 1500000, 5522991361, 'Gato')

console.log(cliente);
console.log(empresa);
console.log(empresa.mostrarInformacion());


