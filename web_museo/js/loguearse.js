var login = document.getElementById("login");

// Función que te lleva a la página del formulario al hacer clic en el botón
function irAlFormulario() {
  // Cambiar la URL de la ventana actual a la del formulario
  window.location.href = "formulario.html";
}

// Agregar un evento de click al botón y asignarle la función irAlFormulario
login.addEventListener("click", irAlFormulario);
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu");
    const navList = document.querySelector("nav ul");

    menuBtn.addEventListener("click", function () {
        navList.style.display = navList.style.display === "block" ? "none" : "block";
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            navList.style.display = "block";
        } else {
            navList.style.display = "none";
        }
    });
});
