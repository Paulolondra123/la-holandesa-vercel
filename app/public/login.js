const form_login = document.getElementById('login-form');
form_login.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3009/La_holandesa/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      await Swal.fire({
        title: "Logueado correctamente!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      verificarAutenticacion();
    } else {
      Swal.fire({
        title: "Error",
        text: data.error || 'Credenciales incorrectas',
        icon: "error",
        timer: 3000
      });
    }

  } catch (err) {
    console.error('Error al enviar la solicitud:', err);
    Swal.fire({
      title: "Error",
      text: 'Error al enviar la solicitud',
      icon: "error",
      timer: 3000
    });
  }
});

const verificarAutenticacion = async () => {
  try {
    const response = await fetch('http://localhost:3009/La_holandesa/verify-auth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const { perfil } = data;
      if (perfil === 'VENDEDOR') {
        window.location.href = "/frond/Y.vendedor/index.html";
      } else if (perfil === 'ADMINISTRADOR') {
        window.location.href = "/frond/X.admin/index.html";
      } 
    } else {
      console.log('Usuario no autenticado');
    }
  } catch (err) {
    console.error('Error al verificar la autenticación:', err);
  }
};
