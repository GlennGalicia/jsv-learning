// Object literal

const cliente = {
    nombre: 'Glenn',
    saldo: 500
}

console.log(cliente);

// Object constructor

function Cliente(nombre, saldo) {
    this.nombre = nombre,
        this.saldo = saldo
}

const glenn = new Cliente('Glenn Fernano', 13)

console.log(glenn);
