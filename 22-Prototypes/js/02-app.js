// Object constructor
function Cliente(nombre, saldo) {
    this.nombre = nombre
    this.saldo = saldo
}

const glenn = new Cliente('Glenn', 13)

function formatearCliente(cliente) {
    const { nombre, saldo } = cliente
    return `El cliente ${nombre} tiene un saldo de $ ${saldo}`
}

console.log(formatearCliente(glenn));


function Empresa(nombre, saldo, categoria) {
    this.nombre = nombre
    this.saldo = saldo
    this.categoria = categoria
}

const cg = new Empresa('CG', 15, 'Seguridad')

function formatearEmpresa(empresa) {
    const { nombre, saldo, categoria } = empresa
    return `El Cliente ${nombre} tiene un saldo de $${saldo} y pertenece a la categoría ${categoria}`
}

console.log(formatearEmpresa(cg));
