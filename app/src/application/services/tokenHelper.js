// tokenHelper.js

export const obtenerTokenre = () => {
    // Hacer una solicitud HTTP al servidor para obtener el token
    const token = localStorage.getItem("token");
    if (!token) {
      // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
      window.location.href = "http://localhost:3009/login";
      return; // Detener la ejecución del código
    }
    return token;
  };