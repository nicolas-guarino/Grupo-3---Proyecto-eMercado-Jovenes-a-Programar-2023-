document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('email')
    const emailProfile = document.getElementById('emailProfile')
    if (email) {
        emailProfile.value = email;
    }
})

/*área para la selección de la imagen de usuario*/

document.addEventListener('DOMContentLoaded', function () {
    // Aquí se carga la imagen de perfil almacenada en localStorage al cargar la página
    const storedImage = localStorage.getItem('userProfileImage');
    const userProfileImage = document.getElementById('userProfileImage');

    if (storedImage) {
      document.getElementById('userProfileImage').src = storedImage;
    }

    if (storedImage) {
        userProfileImage.src = storedImage;
      } else {
        // Mostramos el ícono de usuario por defecto
        userProfileImage.src = '../img/user.png'; 
      }
  
    // Aqui se maneja el cambio de imagen cuando se selecciona un nuevo archivo
    const imagenInput = document.getElementById('imagen');
    imagenInput.addEventListener('change', function () {
      const file = imagenInput.files[0];
      if (file) {
        // Con esto, mostramos la imagen seleccionada
        const reader = new FileReader();
        reader.onload = function (e) {
          const userProfileImage = document.getElementById('userProfileImage');
          userProfileImage.src = e.target.result;
  
          // Almacenamos la imagen en localStorage
          localStorage.setItem('userProfileImage', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

});

// Función para cerrar sesión y borrar la imagen del localStorage
function logout() {
    localStorage.removeItem('userProfileImage');
  }
