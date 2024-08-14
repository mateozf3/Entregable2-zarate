const productosDOM = document.getElementById('productos')
const carritoDOM = document.getElementById('carrito-items')
const carrito = JSON.parse(localStorage.getItem('carrito')) || []

const productos = [
    { id: 1, nombre: 'fideos lucchetti ', precio: 3500, imagen: 'https://http2.mlstatic.com/D_NQ_NP_781118-MLA48094698059_112021-O.webp' },
    { id: 2, nombre: 'Harina', precio: 2500, imagen: 'https://http2.mlstatic.com/D_NQ_NP_830636-MLA51660206118_092022-O.webp' },
    { id: 3, nombre: 'Yerba Mate', precio: 4300, imagen: 'https://http2.mlstatic.com/D_NQ_NP_777702-MLU77600732003_072024-O.webp' },
    { id: 4, nombre: 'Azúcar marolio', precio: 3200, imagen: 'https://http2.mlstatic.com/D_NQ_NP_963908-MLA46942809946_082021-O.webp' },
    { id: 5, nombre: 'Aceite Natura', precio: 5450, imagen: 'https://http2.mlstatic.com/D_NQ_NP_998175-MLA48095267643_112021-O.webp' },
    { id: 6, nombre: 'Sal', precio: 3000, imagen: 'https://http2.mlstatic.com/D_NQ_NP_886564-MLA46931429259_072021-O.webp' },
    { id: 7, nombre: 'Leche iloay', precio: 3200, imagen: 'https://http2.mlstatic.com/D_NQ_NP_920071-MLU74272825068_022024-O.webp' },
    { id: 8, nombre: 'Café la virginia', precio: 3500, imagen: 'https://http2.mlstatic.com/D_NQ_NP_676350-MLU70065237611_062023-O.webp' },
];

const crearCardProducto = (producto) => {
    const contenedor = document.createElement('div')
    const nombre = document.createElement('h3')
    const imagen = document.createElement('img')
    const precio = document.createElement('p')
    const boton = document.createElement('button')

    contenedor.classList.add('contenedor')
    imagen.classList.add('imagen')
    boton.classList.add('boton')

    nombre.innerText = producto.nombre
    precio.innerText = `$${producto.precio}`
    imagen.src = producto.imagen
    boton.innerText = 'Agregar al Carrito'

    boton.addEventListener('click', () => agregarAlCarrito(producto))

    contenedor.appendChild(imagen)
    contenedor.appendChild(nombre)
    contenedor.appendChild(precio)
    contenedor.appendChild(boton)

    return contenedor;
}

const mostrarProductos = () => {
    productos.forEach(producto => {
        const productoDOM = crearCardProducto(producto)
        productosDOM.appendChild(productoDOM)
    })
}

const agregarAlCarrito = (producto) => {
    const encontrado = carrito.find(item => item.id === producto.id)
    if (encontrado) {
        encontrado.cantidad += 1
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarCarrito()
}

const mostrarCarrito = () => {
    carritoDOM.innerHTML = ''

    if (carrito.length === 0) {
        carritoDOM.innerHTML = '<p>El carrito está vacío.</p>'
        return
    }

    carrito.forEach(item => {
        const contenedor = document.createElement('div')
        const nombre = document.createElement('h3')
        const precio = document.createElement('p')
        const cantidad = document.createElement('p')
        const botonEliminar = document.createElement('button')

        contenedor.classList.add('contenedor')
        botonEliminar.classList.add('boton')
        botonEliminar.style.backgroundColor = '#ff5722'
        botonEliminar.innerText = 'Eliminar'

        nombre.innerText = item.nombre
        precio.innerText = `$${item.precio}`
        cantidad.innerText = `Cantidad: ${item.cantidad}`

        botonEliminar.addEventListener('click', () => eliminarDelCarrito(item.id))

        contenedor.appendChild(nombre)
        contenedor.appendChild(precio)
        contenedor.appendChild(cantidad)
        contenedor.appendChild(botonEliminar)

        carritoDOM.appendChild(contenedor)
    })

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    const totalDOM = document.createElement('h3')
    totalDOM.innerText = `Total: $${total}`
    carritoDOM.appendChild(totalDOM)
}
const eliminarDelCarrito = (id) => {
    const index = carrito.findIndex(item => item.id === id)
    if (index !== -1) {
        carrito.splice(index, 1)
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarCarrito()
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos()
    mostrarCarrito()
});