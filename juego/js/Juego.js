
class Juego {

    constructor() {
        this.jugador = null;//variable jugador
        this.enem = []; // Inicializar la variable como un array vacío de enemigos
        this.corazones = [];//donde se guardan los corazones
        this.vidas = 3;
        this.finDelJuego = false;//variable que dice cuando el juego se termino o no
        this.gameLoop = null;
        this.enemigosLoop = null;
        this.contadorVidas = document.getElementById("cont_vidas");
        this.vistaDePuntos = document.getElementById("puntaje");
        this.tiempoGenerarEnemigo = 10000;//10000
        this.tiempoVida = 15000;//en un principio los corazones apareceran cada 8 segundos
        this.puntosAcumulados = 0;//guarda lo que pierde o gana en el juego
        this.racha = 0;//con esto reviso y controlo si tiene buena racha
        this.cronometro=null;//el juego ahora tambien controla el cronometro
    }
    start() {
        this.jugador = new Jugador();
        this.cronometro= new Cronometro();
        this.enem = []; // Reinicializar la variable como un array vacío
        this.corazones = [];
        this.gameLoop = setInterval(this.loop.bind(this), 200);
        this.generarVidasRandom();
        this.generarEnemigosAleatorios()// Llamamos a la función que genera enemigos aleatorios
       if (this.cronometro.getRunning() == false) { // Solo inicia el cronómetro si no está en funcionamiento
            this.cronometro.setRunning(true);
            this.cronometro.iniciaCronometro();
     }
    }
    loop() {
        //verificar colision con enemigos
        let posicion = this.checkCollision();//obtengo la posicion del enemigo
        let adversario = this.enem[posicion];//obtengo directamente el objeto enemigo
        //verificar colisiones con los corazones
        let posCorazon = this.checkCollisionCorazones();
        let corazon = this.corazones[posCorazon];
        if (adversario != null && corazon == null)//debe retornar falso o verdadero
        {
            this.vidas--;
            this.racha=0;
            adversario.remove();            //borrar enemigo
            this.enem.slice(posicion);            //this.enem.slice investigar segun el indice o objeto de un array de javascript
            this.actualizarVidas();
            if (this.puntosAcumulados >= 10) {
                this.puntosAcumulados -= 10;//los enemigos restan 10 puntos, haciendo que evitarlos sea muy importantes
            }
        }
        else if (corazon != null && adversario == null) {
            this.racha++;
            if(this.racha>=3){
                this.racha=0;
                this.cronometro.addTiempo();//aca debo agregar 1 minuto mas al cronometro
            }
            if (this.vidas < 3) {
                this.vidas++;
                this.corazones.slice(posCorazon);
                this.actualizarVidas();
            }
            this.puntosAcumulados = this.puntosAcumulados + 10;//los corazones otorgan 10 puntos;
            corazon.remove();

        }
        else {
            //si toque a un enemigo y a un corazon no deberia hacer nada
        }
        this.actualizarPuntaje();
        if (this.vidas < 0) {
            this.finalizarPartida();
        }
    }
    /*
    ------SECCION CONTROL DEL TIEMPO------------
    */
    getTiempo(){
        return this.cronometro.getTiempo();
    }
    seAgotoElTiempo(){
         this.cronometro.seAgotoElTiempo();
    }
    stopCronometro(){
        this.cronometro.stopCronometro();
    }
    /**--------- CONTROLA LA PARTE DEL PUNTAJE DEL JUEGO------- */
    finJuego() {//retorna variable que el main pide cada tanto de si el juego continua o no
        return this.finDelJuego;
    }
    getPuntajeJuego() {
        return this.puntosAcumulados;
    }
    finalizarPartida() {
        clearInterval(this.gameLoop);
        this.jugador.morir();
        this.actualizarVidas();
         for (let i = 0; i < this.enem.length; i++) {
            this.enem[i].remove();
        }
        for (let j = 0; j < this.corazones.length; j++) {
            this.corazones[j].remove();
        }
        this.vidas = 3;
        this.actualizarVidas();//todos estos timeOut los hice para darle al personaje el tiempo
        setTimeout(() => { this.jugador.remove() }, 3000)//de realizar la animacion de muerte
        setTimeout(() => { this.finDelJuego = true }, 2000)
    }
    aumentarDificultad() {//funcion para que a medida que avanza el juego empeoro los tiempos para el jugador
        if (this.tiempoGenerarEnemigo > 1000 && this.tiempoVida < 30000) {//con el if controlo que el minimo de tiempo sean dos segundos
            //y tambien que el maximo de tiempo en que aparecen los corazones no supere los 30 segundos
            this.tiempoGenerarEnemigo -= 1000;//mientras tanto aumento la velocidad que genera enemigos
            this.tiempoVida += 1000;//incremento el tiempo en que aparecen los corazones
        }
    }
    generarEnemigosAleatorios() {
        // var tiempoEnem = Math.floor(Math.random() * 10000) + 1000;
        var tiempoEnem = Math.floor(Math.random() * this.tiempoGenerarEnemigo) + 1000;//this.tiempoGenerarEnemigo
        // Calculamos un tiempo aleatorio entre 1 y 10000 milisegundos
        //this.generarEnemigo(); // Generamos un enemigo
        if (this.enem != null) {
            let adversario = new EnemigoED_209();
            this.enem.push(adversario); // Añadir el enemigo al array
        }
        if (this.finDelJuego == false) {
            setTimeout(() => { this.generarEnemigosAleatorios() }, tiempoEnem)
        }
    }
    generarEnemigo() {
        if (this.enem != null) {
            let adversario = new EnemigoED_209();
            this.enem.push(adversario); // Añadir el enemigo al array
        }
    }
    generarVidasRandom() {
        let tiempo = Math.floor(Math.random() * this.tiempoVida) + 1000;
        //this.generarVidas();
        if (this.corazones != null) {
            let corazonN = new Corazon();
            this.corazones.push(corazonN)
        }
        if (this.finDelJuego == false) {
            setTimeout(() => { this.generarVidasRandom() }, tiempo)
        }
    }
    generarVidas() {
        if (this.corazones != null) {
            let corazonN = new Corazon();
            this.corazones.push(corazonN)
        }
    }
    actualizarVidas() {
        this.contadorVidas.innerHTML = "<h3> Vidas: " + this.vidas + "</h3> ";
    }
    actualizarPuntaje() {
        this.vistaDePuntos.innerHTML = "<h3> Puntos: " + this.puntosAcumulados + "</h3>";
    }
    //---ACCIONES DEL JUGADOR------//
    saltarJugador() {
        this.jugador.saltar();
    }
    agachar() {//funciones que por el tiempo no las desarrolle
        console.log("agacharse");
    }
    disparar() {
        console.log("....bang!!....")
    }
    /**
     * 
     * @returns Object or null
     */
    checkCollision() {
        const rect1 = this.jugador.status();
        for (let i = 0; i < this.enem.length; i++) {
            // Obtener el estado del enemigo actual
            const rect2 = this.enem[i].status();
            // Verificar si hay colisión
            if (!(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom)) {
                return i;
            }
        }
        return null;
    }
    checkCollisionCorazones() {
        var rect1 = this.jugador.status();
        for (let i = 0; i < this.corazones.length; i++) {
            // Obtener el estado del enemigo actual
            var rect2 = this.corazones[i].status();
            // Verificar si hay colisión
            if (!(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom)) {
                return i;
            }
        }
        return null;
    }
}