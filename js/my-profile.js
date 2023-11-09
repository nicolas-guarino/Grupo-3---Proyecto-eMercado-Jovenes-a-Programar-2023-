document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('email')
    const emailProfile = document.getElementById('emailProfile')
    if (email) {
        emailProfile.value = email;
    }
})