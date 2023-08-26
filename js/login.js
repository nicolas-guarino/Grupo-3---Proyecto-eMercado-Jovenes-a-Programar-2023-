const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Mover la obtención de los valores dentro del evento click
    const username = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username === '' || email === '' || password === '') {
        alert('Todos los campos deben estar llenos');
    } else if (!email.includes('@')) { // Cambié username a email para verificar el formato del correo electrónico
        alert('El campo de correo electrónico debe contener "@"');
    } else if (password.length < 6) {
        alert('La constraseña debe contener al menos 6 caracteres')
    } else {
        localStorage.setItem('usuarioLogueado', username);
        window.location.href = 'index.html';
    }
});


// btn.addEventListener('click', function(e) {
//     e.preventDefault();
//     if (user.value === '' || pass.value === '') {
//         alert('Todos los campos deben estar llenos');
//     } else if (!user.value.includes('@')) {
//         alert('El campo de usuario debe contener "@"');
//     } else {
//         localStorage.setItem('usuarioLogeado', user.value)
//         window.location.href = 'index.html';
//     }
// });