/* variables */

/*
esta variable "carrito " es el contenedor
de la tabla donde se muestran los cursos guardados
*/
const carrito = document.querySelector('#carrito')


/* 
esta variable "contenedorCarrito" guarda el el tbody de una tabla, que es la tabla donde se muestran los cursos
*/

const contenedorCarrito = document.querySelector('#lista-carrito tbody')


/* 
esta "vaciarCarritoBtn" guarda el boton que esta en la tabla de cursos, 
*/

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')


/* 
esta variable de "listaCursos" es el contenedor, de todos los cursos de la pagina
*/
const listaCursos = document.querySelector('#lista-cursos')

/*
articulosCarrito es un arreglo que va guardar los objetos con informacion del curso
*/
let articulosCarrito = []


/* llamar la funcion "cargarEventListeners" */
cargarEventListeners()

/* Crear una funcion que cargue todos los event listeners */

function cargarEventListeners() {

    /* cuando se agrega un curso presionando "Agregar al carrito" */
    /* osea cuando exista un evento click en los cursos */
    listaCursos.addEventListener('click', agregarCurso)
    
    /* elimina cursos del carrito */
    carrito.addEventListener('click', eliminarCurso)

    /* vaciar el carrito */
    vaciarCarritoBtn.addEventListener('click', () => {

        /* reiniciar el arreglo */
        articulosCarrito = []

        
        /* limpiar el html */
        limpiarHTML()
        
    })


}



/* 
Funciones
*/

function agregarCurso(e) {


    /* 
    e.preventDefault() => metodo para previnir el evento, como el click en un enlace, se evita que se recargue la pagina
    */
    e.preventDefault()


    if (e.target.classList.contains('agregar-carrito')) {

        /* 
        cursoSeleccionado => variable para acceder a la card, de nuestro curso
        */
        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCursos(cursoSeleccionado);

    }
}

/* eliminar curso del carrito */
function eliminarCurso(e) {
    
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')
        console.log(cursoId);

        /* elimina del arreglo por data-id */

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)


        /* iterar sobre el carrito y mostrar su html */
        carritoHTML()

    }
}






/*
leer el contenido del HTML al que le dimos click y extrae la informacion del curso
*/
function leerDatosCursos(curso) {
    /* console.log(curso); */


    /* crear un objeto con el contenido del curso actual */

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    /* Revisa si un elemneto ya existe en el carrito */
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

    if (existe) {
        /* actualizar la cantidad */
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++

                /* este regresa el objeto actualizado  */
                return curso;
            }
            else {
                /*
                este regresa el objeto sin modificar porque no encontro, coincidencias
                */
                return curso;
            }
        })

        articulosCarrito = [...cursos]
    }
    else {
        /* agregar el curso al carrito */
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    /* 
    agrega elementos al arreglo de carrito, segun yo, hacen esto de agregar elementos al carrtio, por ese tema de la "mutabilidad" por eso utilizan el spreadOperator y no el metodo push
    */


    console.log(articulosCarrito);

    carritoHTML()


}




/* muestra el carrtio de compras en el html */

function carritoHTML() {

    /* limpiar el html */

    limpiarHTML()

    /* recore el carrtio y genera el html */
    articulosCarrito.forEach(curso => {

        /* utilizar desctructuring */
        const { imagen, titulo, precio, cantidad, id } = curso

        /* const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
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
                <a href="#" class="borrar-curso" data-id=${id}>
                    X
                </a>
            </td>
            
        `
        

        contenedorCarrito.append(row) */

        contenedorCarrito.insertAdjacentHTML('beforeend', `
            <td>
                <img src="${imagen}" width="100">
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
                <a href="#" class="borrar-curso" data-id="${id}">
                    X
                </a>
            </td>
        `)
    })
}




/* elimina los cursos del tbody */

function limpiarHTML() {
    /* forma lenta */
    /* contenedorCarrito.innerHTML=`` */


    /* con mayor performance */
    /* while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(
            contenedorCarrito.firstChild
        )
    } */

    [...contenedorCarrito.children].forEach(elementoHTML => {
        elementoHTML.remove()
    })

}


/* 
Las funciones de tipo expresion
*/