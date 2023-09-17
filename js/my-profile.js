document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
  
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('loggedUser');
      window.location.href = 'index.html';
    });
  });