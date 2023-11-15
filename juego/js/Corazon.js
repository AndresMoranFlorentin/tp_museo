class Corazon extends Personajes {
    constructor() {
        super();
        let entorno = document.getElementById("entorno");
        this.corazon = document.createElement("div");
        this.corazon.classList.add("corazon_vida");
        this.corazon.style.top = Math.floor(Math.random() * (entorno.offsetHeight - 38)) + 'px';

        entorno.appendChild(this.corazon);
        this.corazon.addEventListener("transitionend", () => {
            this.corazon.remove();
        })
    }
    status() {
        return (this.corazon.getBoundingClientRect());
    }
    remove() {
        var parentElement = this.corazon.parentElement; // Obtén el nodo padre
        if (parentElement) {
            parentElement.removeChild(this.corazon); // Elimina el nodo hijo
        }
    }
}