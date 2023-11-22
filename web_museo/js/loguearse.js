var login = document.getElementById("login");

// Función que te lleva a la página del formulario al hacer clic en el botón
function irAlFormulario() {
  // Cambiar la URL de la ventana actual a la del formulario
  window.location.href = "formulario.html";
}

// Agregar un evento de click al botón y asignarle la función irAlFormulario
login.addEventListener("click", irAlFormulario);
// Recorrer los enlaces y agregar un evento de clic 
var links = document.querySelectorAll("nav ul li a");
links.addEventListener("click",()=>{
  for (var i = 0; i < links.length; i++){ 
    links[i].addEventListener("click", function() { // Remover la clase “active” de todos los enlaces 
      for (var j = 0; j < links.length; j++) { links[j].classList.remove("active");
     } // Agregar la clase “active” al enlace presionado 
  this.classList.add("active"); }); }
})
