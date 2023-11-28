document.addEventListener('DOMContentLoaded', function () {
    console.log("se activo el submit");

var formulario = document.getElementById('excursionForm');
var nombreInput = document.getElementById('nombre');
var emailInput = document.getElementById('email');
var telefonoInput = document.getElementById('telefono');
var motivoInput = document.getElementById('motivo');
var mensajeExito = document.getElementById('mensajeExito');

formulario.addEventListener('submit', function (event) {
    console.log("se activo el submit");
  // Validación del nombre
  if (nombreInput.value === '') {
    mostrarError('Por favor, ingrese su nombre.', nombreInput);
    event.preventDefault();
    return;
  }

  // Validación del email
  if (emailInput.value === '') {
    mostrarError('Por favor, ingrese su correo electrónico.', emailInput);
    event.preventDefault();
    return;
  }

  // Validación del teléfono
  if (telefonoInput.value === '') {
    mostrarError('Por favor, ingrese su número de teléfono.', telefonoInput);
    event.preventDefault();
    return;
  }

  // Validación del motivo
  if (motivoInput.value === '') {
    mostrarError('Por favor, ingrese el motivo de su solicitud.', motivoInput);
    event.preventDefault();
    return;
  }
  // Si todas las validaciones son exitosas, mostrar mensaje de éxito
  event.preventDefault();
  mostrarExito();

  console.log("llegue a comprobar todo")
  //event.preventDefault();
});

// Función para mostrar mensajes de error
function mostrarError(mensaje, elemento) {
  var errorDiv = document.createElement('div');
  errorDiv.className = 'error';
 
  errorDiv.textContent = mensaje;

  // Insertar el mensaje de error después del elemento correspondiente
  elemento.parentNode.insertBefore(errorDiv, elemento.nextSibling);
}

// Función para mostrar mensaje de éxito y reiniciar el formulario
function mostrarExito() {
    console.log("llegue al exito")
   mensajeExito.style.display = 'block';
   formulario.style.display = 'none';
  setTimeout(function () {
    mensajeExito.style.display = 'none';
    formulario.reset(); // Reinicia el formulario borrando los datos
    formulario.style.display = 'block';
  }, 3000);
  }
});