// object constructor
function Cliente(nombre, saldo) {
    this.nombre = nombre
    this.saldo = saldo
}

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

// instanca
const glenn = new Cliente('Glenn', 13000)

// imprimir
console.log(glenn);
console.log(glenn.tipoCliente());
console.log(glenn.nombreClienteSaldo());
glenn.retiraSaldo(6000)
console.log(glenn.nombreClienteSaldo());




