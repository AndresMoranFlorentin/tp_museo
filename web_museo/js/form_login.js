var volver = document.getElementById("cancelar");

// Función que te lleva a la página anterior al hacer clic en el botón
function volverAtras() {
  // Usar el método history.back() para volver a la página anterior
  window.history.back();
}

// Agregar un evento de click al botón y asignarle la función volverAtras
volver.addEventListener("click", volverAtras);