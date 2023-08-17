const user = document.getElementById('username')
const pass = document.getElementById('password') 
const btn = document.getElementById('loginBtn')


btn.addEventListener('click', function(e) {
    e.preventDefault();
    if (user.value === '' || pass.value === '') {
        alert('Todos los campos deben estar llenos');
    } else if (!user.value.includes('@')) {
        alert('El campo de usuario debe contener "@"');
    } else {
        localStorage.setItem('usuarioLogeado', user.value)
        window.location.href = 'index.html';
    }
});