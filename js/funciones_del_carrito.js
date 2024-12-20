document.addEventListener("DOMContentLoaded" , ()=>
    {
        const cartStorage=JSON.parse(localStorage.getItem('cart')) || []
        const cartTable = document.getElementById('carrito-items');
        const totales=document.getElementById('total')
        let total= 0;




//cargar productos en la tabla del carro
cartStorage.forEach(item => 
    {

const row = document.createElement('tr');



//producto

var celda=document.createElement('td');
celda.textContent=item.title
row.appendChild(celda)

//precio
var precioCelda=document.createElement('td');
precioCelda.textContent=`$${item.price}`;
row.appendChild(precioCelda)

//cantidad
var cantidadCelda=document.createElement('td');
cantidadCelda.textContent=1
row.appendChild(cantidadCelda)

//Subtotal
const subtotal=item.price;
const subtotalCelda=document.createElement('td');
subtotalCelda.textContent=`${subtotal}`;
row.appendChild(subtotalCelda)


//agregar fila a la tabla

cartTable.appendChild(row)

total += subtotal;

})

totales.textContent=total.toFixed(2)

 // Botón para limpiar el carrito y volver al inicio
 document.getElementById('limpiar-carrito').addEventListener('click', () => 
    {
        localStorage.removeItem('cart'); 
        window.location.href = 'index.html'; 
    });

    // Botón para finalizar la compra con sweet Alert
    document.getElementById('finalizar-compra').addEventListener('click', () => 
    {
        Swal.fire({
            title: 'Compra Procesada',
            text: 'En breve le enviaremos los datos para recibir su pedido',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Limpiar el carrito después de finalizar la compra
        localStorage.removeItem('cart'); 
        
        // Redirigir al inicio despues de 4 segundos
        setTimeout(() => {
        window.location.href = 'index.html'; 
        }, 4000);     
    });














    })