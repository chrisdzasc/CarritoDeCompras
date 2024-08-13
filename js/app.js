// Variables
const carrito = document.querySelector('#carrito'); // Seleccionar el div de carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // Seleccionar el tbody donde van a ir los cursos.
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); // Seleccionar el boton de vaciar carrito.
const listarCursos = document.querySelector('#lista-cursos'); // Seleccionar el div de lista-cursos.

let articulosCarrito = [];

// Event Listeners
cargarEventListener();
function cargarEventListener() {

    // Cuando se agrega un curso al carrito.
    listarCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML(); // Eliminamos todo el HTML
    });
}


// Funciones
function agregarCurso(e) {

    e.preventDefault(); // Prevenir la acción Default

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Leer el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(cursoSeleccionado) {
    
    // Crear un objeto con el contenido del curso actual
    const inforCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === inforCurso.id );
    
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === inforCurso.id ) {

                let precioCurso = Number(inforCurso.precio.slice(1, inforCurso.precio.length));

                curso.cantidad++;

                curso.precio = `$${precioCurso * curso.cantidad}`;

                return curso; // Retorna el objeto actualizado.
            } else {
                return curso; // Retorna los objetos que no son los duplicados.
            }
        })

        articulosCarrito = [...cursos];

    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, inforCurso];
    }

    carritoHTML();
}

// Muestra el carrito de comprar en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('TR');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>

            <td>
                ${curso.titulo}
            </td>

            <td>
                ${curso.precio}
            </td>

            <td>
                ${curso.cantidad}
            </td>
            
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbdoy
function limpiarHTML() {

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}