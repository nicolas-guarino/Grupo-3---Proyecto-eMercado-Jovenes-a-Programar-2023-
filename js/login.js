const registerBtn = document.getElementById('registerBtn');
const showPassword = document.getElementById("show-password");
const passwordField = document.getElementById("password");

showPassword.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type)
})

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    if (username === '' || email === '' || password === '') {
        alert('Todos los campos deben estar llenos');
    } else if (!email.includes('@')) {
        alert('El campo de correo electrónico debe contener "@"');
    } else if (password.length < 6) {
        alert('La constraseña debe contener al menos 6 caracteres')
    } else {
        localStorage.setItem('loggedUser', username);
        window.location.href = 'index.html';
    }
});
