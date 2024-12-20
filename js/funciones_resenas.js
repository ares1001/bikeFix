document.addEventListener("DOMContentLoaded", () => {
    const resenasContainer = document.querySelector("#resenas-container");

    // Función para obtener las bicicletas y mostrar las cards
    function fetchResenas() {
        fetch('https://dummyjson.com/comments?limit=5')
            .then(response => response.json())
            .then((data) => {
                // Obtengo los productos del JSON
                const comentarios = data.comments;
                console.log(comentarios)
                // Limpio el contenedor
                resenasContainer.innerHTML = "";

                // Itero sobre los productos y creo las tarjetas
                comentarios.forEach((resena) => {
                    const cardDiv = document.createElement("div");
                    cardDiv.className = "col-md-4";

                    // HTML de la tarjeta
                    cardDiv.innerHTML = `
                    <div class="card-resenas text-center mx-auto">
                        <div class="card-body">
                            <h5 class="card-title">${resena.body}</h5>
                            <p class="card-text"> ${Array(resena.likes).fill('<i class="fa-solid fa-star"></i>').join("")}
                </p>                            
                <p class="card-text fw-bold">${resena.user.username}</p>
                        </div>
                    </div>
                `;
                resenasContainer.appendChild(cardDiv);
                
                });
            })
            .catch((error) => console.log("Error al cargar los datos:", error));
    }

fetchResenas()
});