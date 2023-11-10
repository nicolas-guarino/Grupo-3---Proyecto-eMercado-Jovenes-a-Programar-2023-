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
        userProfileImage.src = 'img/user.png'; 
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

// VALIDACIONES //
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function (event) {
      let valid = true;
  
      function showError(element, message) {
        element.classList.add('is-invalid');
        element.nextElementSibling.innerText = message;
        valid = false;
      };
  
      function showSuccess(element) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        element.nextElementSibling.innerText = '';
      };
  
      const nombre = document.getElementById('nombre');
      const segundoNombre = document.getElementById('segundo-nombre');
      const apellido = document.getElementById('apellido');
      const segundoApellido = document.getElementById('segundo-apellido');
      const email = document.getElementById('email');
      const telefono = document.getElementById('telefono');
      let check = 0;

      if (nombre.value.trim() === '') {
        showError(nombre, 'Este campo no puede estar vacío.');
      } else {
        showSuccess(nombre)
        check = 1;
      }
  
      if (apellido.value.trim() === '') {
        showError(apellido, 'Este campo no puede estar vacío.');
        check -= 1;
      } else {
        showSuccess(apellido);
      }

      if (email.value.trim() === '') {
        showError(email, 'Este campo no puede estar vacío.');
        check -= 1;
      } else {
        showSuccess(email);
      }

      if (!valid) {
        event.preventDefault();
      }
      if (check == 1) {
        // ALMACENAR LOS DATOS EN LOCALSTORAGE //
        localStorage.setItem('nombre', nombre.value);
        localStorage.setItem('segundoNombre', segundoNombre.value);
        localStorage.setItem('apellido', apellido.value);
        localStorage.setItem('segundoApellido', segundoApellido.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('telefono', telefono.value);
        alert("Cambios guardados");
      }
    });
  })
