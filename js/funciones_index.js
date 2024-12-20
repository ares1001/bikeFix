document.addEventListener("DOMContentLoaded", () => {
    const bikesContainer = document.querySelector("#bikes-container");

    // Función para obtener las bicicletas y mostrar las cards
    function fetchBikes() {
        fetch('https://dummyjson.com/products?limit=12')
            .then(response => response.json())
            .then((data) => {
                // Obtengo los productos del JSON
                const bikes = data.products;
                console.log(bikes)
                // Limpio el contenedor
                bikesContainer.innerHTML = "";

                // Itero sobre los productos y creo las tarjetas
                bikes.forEach((bike) => {
                    const cardDiv = document.createElement("div");
                    cardDiv.className = "col-md-4";

                    // HTML de la tarjeta
                    cardDiv.innerHTML = `
                        <div class="card mt-3">
                            <img src="${bike.thumbnail}" class="card-img-top" alt="${bike.title}" style="height:200px">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${bike.title}</h5>
                                <p class="card-text">${bike.description}</p>
                                <p class="card-text fw-bold">$${bike.price}</p>
                                <button class="btn btn-outline-info">Agregar al carrito</button>
                            </div>
                        </div>
                    `;

                    // Botón para agregar al carrito
                    const botonAdd = cardDiv.querySelector("button");
                    botonAdd.addEventListener("click", () => {
                        agregarAlCart(bike);
                    });

                    // Agrego la tarjeta al contenedor
                    bikesContainer.appendChild(cardDiv);
                });
            })
            .catch((error) => console.log("Error al cargar los datos:", error));
    }

    // Función para agregar al carrito
    function agregarAlCart(bike) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(bike);
        
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${bike.title} ha sido agregado al carrito`);
    }

    // Llamo a la función para obtener las bicicletas
    fetchBikes();
});
