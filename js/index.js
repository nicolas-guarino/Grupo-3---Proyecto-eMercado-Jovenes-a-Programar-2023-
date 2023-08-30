document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const mostrarUsuario = document.getElementById("verUsuario");

    if (usuarioLogueado) {
        mostrarUsuario.textContent = `Hola: ${usuarioLogueado}`;
    } else {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'login.html';
    }
});