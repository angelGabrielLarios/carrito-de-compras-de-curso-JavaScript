/* mis variables */


const tablaCursos = document.querySelector('#tabla-cursos')

const listaCursos = document.querySelector('#listaCursos')

const tbody = document.querySelector('#tabla-cursos tbody')

const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito')

let articulosCarrito = []


const formatearCantidad = numero => {
    const formateado = numero.toLocaleString("en", {
        style: "currency",
        currency: "MXN"
    });

    return formateado
}


const calcularTotalPagar = () => {
    const total = articulosCarrito
        .map(curso => curso.total())
        .reduce((acc, value) => acc + value)

    return total
}

const agregarTotalHTML = (precio) => {
    const contenedor = document.querySelector('.total-a-pagar')
    if (contenedor.classList.contains('d-none')) {
        contenedor.classList.replace('d-none', 'd-block')
    }
    const totalPrecio = document.querySelector('#total-precio')
    totalPrecio.textContent = formatearCantidad(precio)
}

const agregarCarrito = nuevoCurso => {
    articulosCarrito = [...articulosCarrito, nuevoCurso]
}

const agregarCurso = event => {
    const btnAgregarCarrito = event.target
    if (btnAgregarCarrito.classList.contains('btn-agregar-carrito')) {
        const cardCurso = btnAgregarCarrito.parentElement.parentElement
        leerDatosCursos(cardCurso)
        carritoHTML()

    }
}

const leerDatosCursos = cardCurso => {
    const dataCurso = {
        imagen: cardCurso.querySelector('.card-img-top').src,
        titulo: cardCurso.querySelector('.card-title').textContent.replace(/(\r\n|\n|\r)/gm, "").trim(),
        precio: parseFloat(cardCurso.querySelector('.precio').textContent.replace(/(\r\n|\n|\r)/gm, "").trim()),
        cantidad: 1,
        total: function () {
            return this.precio * this.cantidad
        }

    }

    /* comprobar si esta repetido */
    const posicionRepetida = articulosCarrito.findIndex(curso => curso.titulo === dataCurso.titulo)
    if (posicionRepetida !== -1) {
        const actualizado = articulosCarrito.map(curso => curso)
        actualizado[posicionRepetida].cantidad++
        articulosCarrito = [...actualizado]

    }
    else {
        agregarCarrito(dataCurso)
    }

    const precio = calcularTotalPagar()
    agregarTotalHTML(precio)


}

const carritoHTML = () => {
    limpiarHTML()
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad } = curso
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>
                <img src="${imagen}" width="50">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                ${curso.total()}
            </td>
            <td>
                <button
                    class="btn btn-outline-danger d-flex align-items-center justify-content-center p-0">
                    <i class="fa-solid fa-delete-left btn-eliminar-curso p-2"></i>
                </button>
            </td>
            
        `
        tbody.append(tr)
    })

}

const limpiarHTML = () => {
    [...tbody.children].forEach(elementHTML => {
        elementHTML.remove()
    })
}

const eliminarCurso = event => {
    event.preventDefault()
    const btnEliminarCurso = event.target
    if (btnEliminarCurso.classList.contains('btn-eliminar-curso')) {
        const cursoTituloEliminar = btnEliminarCurso.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim()
        console.log(cursoTituloEliminar)
        articulosCarrito = articulosCarrito.filter(curso => curso.titulo !== cursoTituloEliminar)
        carritoHTML()
        const precio = calcularTotalPagar()
        agregarTotalHTML(precio)
    }
}




/* funcion que escuche los event listener */
const cargarEventListeners = () => {
    listaCursos.addEventListener('click', agregarCurso)
    tablaCursos.addEventListener('click', eliminarCurso)
    btnVaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []
        limpiarHTML()

    })
}


cargarEventListeners()

