//  Constructores
function Seguro(brand, year, type) {
    this.brand = brand
    this.year = year
    this.type = type
}

function UI() { }

// Llenar las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20
    const selectYear = document.querySelector('#year')

    for (let i = max; i > min; i--) {
        const option = document.createElement('OPTION')
        option.value = i
        option.textContent = i
        selectYear.appendChild(option)
    }
}

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (type, message) => {

    const div = document.createElement('DIV')
    div.classList.add('mensaje', 'mt-10')

    if (type === 'error')
        div.classList.add('error')
    else
        div.classList.add('correcto')

    div.textContent = message

    // insertar en HTML
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 3000);
}

// Instancias
const ui = new UI()


document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones()
})

// Eventos
eventListeners()

function eventListeners() {

    const formulario = document.querySelector('#cotizar-seguro')
    formulario.addEventListener('submit', cotizarSeguro)

}

function cotizarSeguro(e) {
    e.preventDefault()

    // leer la marca seleccionada
    const brand = document.querySelector('#marca').value

    // leer el year seleccionado
    const year = document.querySelector('#year').value

    // leer tipo de seguro seleccionado
    const type = document.querySelector('input[name="tipo"]:checked').value

    if (brand === '' || year === '' || type === '') {
        ui.mostrarMensaje('error', 'Todos los campos son obligatorios.')
        return
    }

    ui.mostrarMensaje('correcto', 'Cotizando...')

    // Instanciar el Seguro



    // Utilizar el prototype que va a cotizar
}
