class EnemigoED_209 extends Personajes {//le puese el nombre enemigoED_209 porque asi se llama en las peliculas
    constructor() {                    //soy conciente que no es buena practica usar nombres raros en las clases
        super();
        this.adversario = document.createElement("div");
        this.adversario.classList.add("enemigoED_209");
        document.getElementById("entorno").appendChild(this.adversario);
    }
    status() {
        return (this.adversario.getBoundingClientRect());
    }
    remove() {
        //https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement
        var parentElement = this.adversario.parentElement; // Obtén el nodo padre
        if (parentElement) {
            parentElement.removeChild(this.adversario); // Elimina el nodo hijo
        }
    }
}