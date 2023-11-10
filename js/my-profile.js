document.addEventListener('DOMContentLoaded', () => {
  let email = localStorage.getItem('email')
    let emailProfile = document.getElementById('email')
    if (email) {
        emailProfile.value = email;
    }

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('profile-form');
    const guardarButton = document.getElementById('guardar');

    // Agregamos eventos de escucha para la validación en tiempo real
    Array.from(form.elements).forEach((element) => {
      if (element.required) {
        element.addEventListener('input', function () {
          if (element.checkValidity()) {
            element.classList.remove('is-invalid');
            element.classList.add('is-valid');
          } else {
            element.classList.remove('is-valid');
            element.classList.add('is-invalid');
          }
        });
      }
    });

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

    guardarButton.addEventListener('click', function (event) {
        event.preventDefault(); // Con esto prevenimos el envío del formulario por defecto
    
        // Validamos los campos requeridos al hacer clic en "Guardar Cambios"
        Array.from(form.elements).forEach((element) => {
          if (element.required) {
            if (element.checkValidity()) {
              element.classList.remove('is-invalid');
              element.classList.add('is-valid');
            } else {
              element.classList.remove('is-valid');
              element.classList.add('is-invalid');
            }
          }
        });
         // Verifica si todos los campos requeridos están válidos
        const allFieldsValid = Array.from(form.elements).every((element) => {
       return !element.required || element.checkValidity();
        });

    if (allFieldsValid) {
    // Recargamos la página
      window.location.reload();
  }
    });
});

