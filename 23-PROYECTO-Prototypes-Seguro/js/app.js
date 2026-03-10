//  Constructores
function Seguro(brand, year, type) {
    this.brand = brand
    this.year = year
    this.type = type
}

Seguro.prototype.cotizarSeguro = function () {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */

    let cantidad
    const base = 2000

    switch (this.brand) {
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.year

    // Cada año que la diferencia es mayor, el costo reducira 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100

    /*
        Si el seguro es básico se multiplica por un 30% más
        Si el seguro es completo se multiplica por un 50% más
    */

    if (this.type === 'basico')
        cantidad *= 1.30
    else
        cantidad *= 1.50

    return cantidad
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

UI.prototype.mostrarResultado = (seguro, total) => {

    // Destructuring
    const { brand, year, type } = seguro
    let textBrand

    switch (brand) {
        case '1':
            textBrand = 'Americano'
            break;
        case '2':
            textBrand = 'Asiatico'
            break;
        case '3':
            textBrand = 'Europeo'
            break;
        default:
            break;
    }
    // Crear resultado
    const div = document.createElement('DIV')
    div.classList.add('mt-10')
    div.innerHTML = `
        <p class='header'>Tu Resultado</p>
        <p class='font-bold'>Marca: <span class="font-normal">${textBrand}</span></p>
        <p class='font-bold'>Año: <span class="font-normal">${year}</span></p>
        <p class='font-bold'>Tipo: <span class="font-normal capitalize">${type}</span></p>
        <p class='font-bold'>Total: <span class="font-normal">$ ${total}</span></p>
    `

    // Mostrar spinner
    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block'

    setTimeout(() => {
        spinner.style.display = 'none'
        document.querySelector('#resultado').appendChild(div)
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

    // Ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div')
    if (resultados != null) {
        resultados.remove()
    }

    // Instanciar el Seguro
    const seguro = new Seguro(brand, year, type)
    const total = seguro.cotizarSeguro()

    // Utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro, total)
}
