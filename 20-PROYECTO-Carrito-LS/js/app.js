// variables
const carrito = document.querySelector('#carrito')
const contenedorCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []

cargarEventListeners()

function cargarEventListeners() {
    // Cuando agregas un curso presionando "Añadir carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Muestra los cursos de LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
        carritoHTML()
    })

    // Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []
        limpiarHTML()
    })
}

// Funciones
function agregarCurso(event) {
    event.preventDefault()
    // ** Event bubbling with delegation ** //
    if (event.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = event.target.parentElement.parentElement
        leerCursoSeleccionado(cursoSeleccionado)
    }
}

function eliminarCurso(event) {
    const cursoId = event.target.getAttribute('data-id')

    // Eliminar del arreglo de articuloCarrito por data-id
    // ** Array method para retornar arreglo de datos ** //
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

    carritoHTML()
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerCursoSeleccionado(curso) {

    // ** Object Literal ** //
    const infoCurso = {
        img: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        price: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // busca dentro del carrito de artilos si existe el curso por añadir
    // ** Array method para buscar info en un arreglo de objetos ** //
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso // retorna el objeto actualizado
            } else {
                return curso // retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos]
    } else {
        // Añadimos articulo a carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML()
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML()

    // Recorrer el carrito y genera HTML
    articulosCarrito.forEach(curso => {
        // ** Destructuring de un objeto ** //
        const { img, title, price, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td><img src="${img}" width="100"></td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id=${id}> X</a></td>
        `
        // Añadir HTML del carrito en el tbody
        contenedorCursos.appendChild(row)
    })

    // Añadir el carrito de compras al storage
    sincronizarStorage()
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

// Eliminar los cursos del tbody
function limpiarHTML() {
    // forma lenta
    //contenedorCursos.innerHTML = ''

    while (contenedorCursos.firstChild) {
        contenedorCursos.removeChild(contenedorCursos.firstChild)
    }
}
