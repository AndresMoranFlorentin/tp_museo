class Jugador extends Personajes {
    constructor() {
        super();
        this.jugador = document.createElement("div");
        this.caminar();
        document.getElementById("entorno").appendChild(this.jugador);
        this.contacto = false;
    }
    status() {
        return (this.jugador.getBoundingClientRect());
    }
    morir() {
        // this.clean();
        this.jugador.classList.add("robocop_muere");
        this.jugador.addEventListener("animationend", () => {
            this.clean();
        });
    }

    caminar() {
        //this.clean();
        this.jugador.classList.add("robocop");
    }
    saltar() {
        //this.clean(); 
        // this.jugador.classList.remove("robocop");
        this.jugador.classList.add("saltarConEstilo");
        this.jugador.addEventListener("animationend", () => {
            this.caer();
            //this.caminar();
        });
    }
    remove() {
        var parentElement = this.jugador.parentElement; // Obtén el nodo padre
        if (parentElement) {
            parentElement.removeChild(this.jugador); // Elimina el nodo hijo
        }
    }
    caer() {
        this.clean();
        this.caminar();
    }
    clean() {
        this.jugador.classList.remove("robocop");
        this.jugador.classList.remove("robocop_muere");
        this.jugador.classList.remove("saltarConEstilo");
        this.jugador.classList.remove("caer");
        this.jugador.removeEventListener("animationend", () => { });
    }
}