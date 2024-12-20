// Seleccionar el botón del menú hamburguesa y la barra de navegación
const menuButton = document.querySelector('.menu-hamburguesa');
const navbar = document.querySelector('.navbar');

// Escuchar el clic en el menú hamburguesa y agregar/quitar la clase 'active'
menuButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
});
