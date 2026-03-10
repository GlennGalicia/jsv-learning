// object constructor
function Cliente(nombre, saldo) {
    this.nombre = nombre
    this.saldo = saldo
}

function Persona(nombre, saldo, telefono) {
    Cliente.call(this, nombre, saldo)
    this.telefono = telefono
}

// heredar funciones y constructor de Cliente
Persona.prototype = Object.create(Cliente.prototype)
Persona.prototype.constructor = Cliente

Cliente.prototype.tipoCliente = function () {
    let tipo

    if (this.saldo > 10000) {
        tipo = 'Gold'
    } else if (this.saldo > 5000) {
        tipo = 'Platinum'
    } else {
        tipo = 'Normal'
    }
    return tipo
}

Cliente.prototype.nombreClienteSaldo = function () {
    return `Nombre: ${this.nombre} Saldo: ${this.saldo}, Tipo Cliente: ${this.tipoCliente()}`
}

Cliente.prototype.retiraSaldo = function (retiro) {
    this.saldo -= retiro
}

Persona.prototype.mostrarTelefono = function () {
    return `El teléfono de esta persona es: ${this.telefono}`
}

// instancias
const persona1 = new Persona('persona 1', 13000, 5522991360)


// imprimir
console.log(persona1);
console.log(persona1.nombreClienteSaldo());
console.log(persona1.mostrarTelefono());

