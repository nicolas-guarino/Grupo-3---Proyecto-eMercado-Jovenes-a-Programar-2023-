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
    const loggedUser = localStorage.getItem("loggedUser");
    const displayUser = document.getElementById("userDisplayed");

    if (loggedUser) {
        userDisplayed.innerHTML = `Hola: ${loggedUser}`;
    } else {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'login.html';
    }
});