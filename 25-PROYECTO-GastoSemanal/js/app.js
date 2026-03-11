// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoLista = document.querySelector('#gastos ul')

// Eventos
eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
    formulario.addEventListener('submit', agregarGasto)
}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
    }

    agregarGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        this.calcularRestante()
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - gastado
    }

    eliminarGasto(gastoId) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== gastoId)
        this.calcularRestante()
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        const { presupuesto, restante } = cantidad
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
    }
    imprimirAlerta(message, type) {

        // Crear alerta
        const divMensaje = document.createElement('DIV')
        divMensaje.classList.add('text-center', 'alert')

        if (type === 'error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }

        divMensaje.textContent = message

        // Insertar alerta al HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario)

        // Eliminar alerta
        setTimeout(() => {
            divMensaje.remove()
        }, 3000);
    }

    listadoGastos(gastos) {

        // limpiar html
        this.limpiarHTML()

        // iterear sobre gastos
        gastos.forEach(gasto => {
            const { id, cantidad, nombre } = gasto

            // crear elemento  LI
            const nuevoGasto = document.createElement('LI')
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
            nuevoGasto.setAttribute('data-id', id)

            // agregar el HTML del gasto
            nuevoGasto.innerHTML = `
                ${nombre} <span class='badge badge-primary badge-pill'>$ ${cantidad}</span>
            `
            // boton para eliminar el gasto
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.textContent = 'Borrar'
            btnBorrar.onclick = () => {
                eliminarGasto(id)
            }
            nuevoGasto.appendChild(btnBorrar)

            // añadir el HTML
            gastoLista.appendChild(nuevoGasto)
        })
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj
        const restanteDiv = document.querySelector('.restante')

        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning')
            restanteDiv.classList.add('alert-danger')
        } else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-success')
            restanteDiv.classList.add('alert-warning')
        } else {
            restanteDiv.classList.remove('alert-warning', 'alert-danger')
            restanteDiv.classList.add('alert-success')
        }

        // total menor a 0
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error')
            formulario.querySelector('button[type="submit"]').disabled = true
        } else {
            formulario.querySelector('button[type="submit"]').disabled = false
        }
    }

    limpiarHTML() {
        while (gastoLista.firstChild) {
            gastoLista.removeChild(gastoLista.firstChild)
        }
    }
}

// Definicion e Instancia
let presupuesto
const ui = new UI()


// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?')

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload()
    }

    presupuesto = new Presupuesto(presupuestoUsuario)
    ui.insertarPresupuesto(presupuesto)
}

function agregarGasto() {

    // leer datos del formulario
    const nombre = document.querySelector('#gasto').value
    const cantidad = Number(document.querySelector('#cantidad').value)

    // validar datos
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son Obligatorios.', 'error')
        return
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error')
        return
    }

    // generar un object literal para un gasto
    const gasto = { nombre, cantidad, id: Date.now() }

    // añadir gasto al arreglo de gastos
    presupuesto.agregarGasto(gasto)

    // mensaje exitoso
    ui.imprimirAlerta('Gasto agregado correctamente')

    // mostrar gastos en pantalla
    const { gastos, restante } = presupuesto
    ui.listadoGastos(gastos)

    // actualizar monto restante
    ui.actualizarRestante(restante)

    // actualizar colores del cuadro restante
    ui.comprobarPresupuesto(presupuesto)

    // reiniciar formulario
    formulario.reset()
}

function eliminarGasto(gastoId) {

    // eliminar gasto del objeto
    presupuesto.eliminarGasto(gastoId)

    // elimina gasto del UI HTML
    const { gastos, restante } = presupuesto
    ui.listadoGastos(gastos)

    // actualizar monto restante
    ui.actualizarRestante(restante)

    // actualizar colores del cuadro restante
    ui.comprobarPresupuesto(presupuesto)
}
