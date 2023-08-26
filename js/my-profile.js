document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
  
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('usuarioLogueado');
      window.location.href = 'index.html';
    });
  });