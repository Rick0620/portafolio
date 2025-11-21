// Aplicando expresiones de funciones invocadas inmediatamente (IIFE). Por lo tanto, la siguiente función se llama automáticamente.
(function () {
    let navbar = document.querySelector('#navbar');
    let hamburger = document.querySelector('#hamburger');
    hamburger.addEventListener('click', () => {
        // Se añade y remueve una clase.
        navbar.classList.toggle('open');
    });
})();