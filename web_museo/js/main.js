function changePage(link) {
   // Obtener la URL actual
   var currentPageUrl = window.location.href;

   // Desactivar el borde inferior en todos los enlaces
   var links = document.querySelectorAll('nav ul li');
   links.forEach(function (el) {
       el.style.borderBottom = 'solid 3px transparent'; // Eliminar el borde inferior
       el.style.cursor = 'default'; // Restablecer el cursor para enlaces desactivados
   });

   // Activar el borde inferior en el enlace correspondiente a la página actual
   links.forEach(function (el) {
       var linkUrl = el.href;
       if (currentPageUrl === linkUrl) {
           el.style.borderBottom = '3px solid #fefdfd'; // Aplicar estilo para enlaces de la página actual
           el.style.cursor = 'pointer'; // Opcional: Cambiar el cursor para el enlace de la página actual
       }
   });
   // Obtener el texto del enlace clicado para mostrar la página actual
   var currentPage = link.textContent;
   console.log('Estás en la página: ' + currentPage);
}
let isAuthenticated = false; // Estado de inicio de sesión

const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

function login() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const authenticatedUser = users.find(user => user.username === usernameInput && user.password === passwordInput);
    if (authenticatedUser) {
        isAuthenticated = true;
        console.log(authenticatedUser);
        sessionStorage.setItem('isAuthenticated', 'true'); // Almacenar en sessionStorage
        updateMenu();
        window.location.href = "home_admin.html";
    } else {
        const mensajeError = document.getElementById("mensaje_error");
        mensajeError.textContent = "X. Nombre de usuario o contraseña inválidos";
        mensajeError.style.display = "block";
    }
}

function logout() {
    isAuthenticated = false;
    sessionStorage.setItem('isAuthenticated', 'false'); // Almacenar en sessionStorage
    updateMenu();
    window.location.href = "home.html";
}

function updateMenu() {
    const loginMenuItem = document.getElementById("loginMenuItem");
    if (loginMenuItem) {
        if (isAuthenticated) {
            loginMenuItem.innerHTML = '<a href="javascript:logout()" class="btn-login-logout"><img src="img/logos/logout.png"></a>';
        } else {
            loginMenuItem.innerHTML = '<a href="formulario.html" class="btn-login-logout"><img src="img/logos/login_1.png"></a>';
        }
    }
}

// Llamar a updateMenu al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'; // Recuperar del sessionStorage
    updateMenu();
});
document.addEventListener('DOMContentLoaded', function () {
    var path = window.location.pathname;
    var page = path.split("/").pop(); // obtiene el nombre de la página actual
    var link = document.querySelector('a[href="' + page + '"]');
    if (link) {
        link.parentElement.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("iniciar_sesion").addEventListener("click", login);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("cerrar_formulario").addEventListener("click",()=>{
        window.location.href = "home.html";
    });
});

// Obtén el botón del menú y el ul del menú
var menuBtn = document.getElementById("menuBtn");
var menuUl = document.querySelector("nav ul");

// Agrega un evento click al botón del menú
menuBtn.addEventListener("click", function () {
    // Alternar la clase "active" en el botón del menú
    this.classList.toggle("active");

    // Mostrar u ocultar el menú ul
    if (menuUl.style.display === "block") {
        menuUl.style.display = "none";
    } else {
        menuUl.style.display = "block";
    }
});
