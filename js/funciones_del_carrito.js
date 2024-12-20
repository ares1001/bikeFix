document.addEventListener("DOMContentLoaded", () => {
    const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('carrito-items'); // Tabla del carrito
    const totales = document.getElementById('total'); // Total del carrito
    const cartCounter = document.getElementById('carrito-contador'); // Contador del carrito
    let total = 0;

    // Función para actualizar el contador del carrito
    function actualizarContadorCarrito() {
        if (cartCounter) {
            cartCounter.textContent = cartStorage.length; // Cantidad de productos en el carrito
        }
    }

    // Función para actualizar el carrito en localStorage
    function actualizarLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cartStorage));
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(index) {
        cartStorage.splice(index, 1); // Eliminar el producto del array
        actualizarLocalStorage(); // Actualizar localStorage
        renderizarCarrito(); // Volver a dibujar la tabla del carrito
        actualizarContadorCarrito(); // Actualizar el contador
    }

    // Renderizar la tabla del carrito
    function renderizarCarrito() {
        if (cartTable) {
            cartTable.innerHTML = ''; // Limpiar la tabla
            total = 0; // Reiniciar el total

            cartStorage.forEach((item, index) => {
                const row = document.createElement('tr');

                // Producto
                const celda = document.createElement('td');
                celda.textContent = item.title;
                row.appendChild(celda);

                // Precio
                const precioCelda = document.createElement('td');
                precioCelda.textContent = `$${item.price}`;
                row.appendChild(precioCelda);

                // Cantidad
                const cantidadCelda = document.createElement('td');
                cantidadCelda.textContent = 1;
                row.appendChild(cantidadCelda);

                // Subtotal
                const subtotal = item.price;
                const subtotalCelda = document.createElement('td');
                subtotalCelda.textContent = `$${subtotal}`;
                row.appendChild(subtotalCelda);

                // Botón de eliminación
                const eliminarCelda = document.createElement('td');
                const eliminarBtn = document.createElement('button');
                eliminarBtn.textContent = 'x'; // Cruz como botón
                eliminarBtn.classList.add('btn', 'btn-danger', 'btn-xs');
                eliminarBtn.addEventListener('click', () => eliminarProducto(index)); // Agregar evento
                eliminarCelda.appendChild(eliminarBtn);
                row.appendChild(eliminarCelda);

                // Agregar fila a la tabla
                cartTable.appendChild(row);

                total += subtotal;
            });

            if (totales) {
                totales.textContent = total.toFixed(2); // Actualizar el total
            }
        }
    }

    // Botón para limpiar el carrito y volver al inicio
    const limpiarCarritoBtn = document.getElementById('limpiar-carrito');
    if (limpiarCarritoBtn) {
        limpiarCarritoBtn.addEventListener('click', () => {
            localStorage.removeItem('cart');
            cartStorage.length = 0; // Vaciar el array
            actualizarContadorCarrito();
            renderizarCarrito();
            window.location.href = 'index.html';
        });
    }

    // Botón para finalizar la compra con Sweet Alert
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Compra Procesada',
                text: 'En breve le enviaremos los datos para recibir su pedido',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            // Limpiar el carrito después de finalizar la compra
            localStorage.removeItem('cart');
            cartStorage.length = 0; // Vaciar el array
            actualizarContadorCarrito();

            // Redirigir al inicio después de 4 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 4000);
        });
    }

    // Inicializa el contador y renderiza el carrito
    actualizarContadorCarrito();
    renderizarCarrito();
});
