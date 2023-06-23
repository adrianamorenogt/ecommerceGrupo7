
const baseDeDatos = [
    {
        id: 1,
        nombre: 'ALICATES Y PINZAS',
        precio: 69.303,
        imagen: 'https://belltec.com.co/c/11-category_default/alicates-y-pinzas.jpg'
    },
    {
        id: 2,
        nombre: 'CAJAS Y SOPORTES P/HERRAMIENTAS',
        precio: 94.505,
        imagen: 'https://belltec.com.co/c/30-category_default/cajas-y-soportes-p-herramientas.jpg'
    },
    {
        id: 3,
        nombre: 'EXTRACTORES',
        precio: 114.005,
        imagen: 'https://belltec.com.co/c/59-category_default/extractores.jpg'
    },
    {
        id: 4,
        nombre: 'PRENSA PLANA PARA TALADRO DE BANCO NO.3 - 75 MM',
        precio: 74.599,
        imagen: 'https://belltec.com.co/7935-home_default/prensa-plana-para-taladro-de-banco-no3-75-mm.jpg'
    },  {
        id: 5,
        nombre: 'ENGRAPADORA/CLAVADORA ELECTRICA STANLEY 120 VOL.',
        precio: 289.909,
        imagen: 'https://belltec.com.co/9154-home_default/engrapadoraclavadora-electrica-stanley-120-vol-tre550-.jpg://belltec.com.co/c/11-category_default/alicates-y-pinzas.jpg'
    },
    {
        id: 6,
        nombre: 'JUEGO DESTORNILLADOR X 39 PZS. PRETUL JUDA-39P',
        precio: 47.599,
        imagen: 'https://belltec.com.co/11179-home_default/juego-x-39-pzs-pretul-juda-39p.jpghttps://belltec.com.co/c/30-category_default/cajas-y-soportes-p-herramientas.jpg'
    },
    {
        id: 7,
        nombre: 'ARRANCADOR DE BATERIAS 7AH PLOMO ACIDO HYUNDAI HYJS750',
        precio: 529.999,
        imagen: 'https://belltec.com.co/c/59-category_dhttps://belltec.com.co/11217-home_default/juego-destornilladores-joyero-x-43pzs-truper-joy-43.jpgefault/extractores.jpg'
    },
    {
        id: 8,
        nombre: 'PRENSA PLANA PARA TALADRO DE BANCO NO.3 - 75 MM',
        precio: 74.599,
        imagen: 'https://belltec.com.co/7935-home_default/https://belltec.com.co/7989-home_default/arrancador-de-baterias-7ah-plomo-acido-hyundai-hyjs750.jpgprensa-plana-para-taladro-de-banco-no3-75-mm.jpg'
    }

];

let carrito = [];
const valor = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${valor}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}
/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${valor}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();


