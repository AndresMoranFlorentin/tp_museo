class Cronometro {
    /**cronometro para el juego que debe iniciar en 04:59 y luego
 * con el avance del juego se ira decrementando , 
 * cuando termine la partida se reseteara
 */
    constructor() {
        this.cronometro = document.getElementById("cronometro");
        this.cronometroInterval; // Variable para almacenar el identificador del intervalo
        this.segundos = 59;
        this.minutos = 4;//4
        this.horas = 0;
        this.isRunning = false;//con false es que esta apagado el cronometro
        this.tiempoLimite = 4;//4
        this.tiempoC=null;
    }
    iniciaCronometro() {
        this.cronometroInterval = setInterval(()=> this.actualizarCronometro(), 1000);
    }
    stopCronometro() {
        clearInterval(this.cronometroInterval);
        this.segundos = 59;// 59
        this.minutos = 4;//4
        this.horas = 0;//0
        this.isRunning = false;
        this.cronometro.innerHTML = "<h3>00:04:59</h3>";//"00:00:00"
    }
    actualizarCronometro() {
        if (this.isRunning == true) {
            if (this.segundos > 0) {
                this.segundos--;
            } else {
                if (this.minutos > 0) {
                    this.minutos--;
                    this.segundos = 59;
                } else {
                    if (this.horas > 0) {
                        this.horas--;
                        this.minutos = 59;
                        this.segundos = 59;
                    } else {
                        this.stopCronometro();
                    }
                }
            }
            this.tiempoC=`<h3>${this.horas < 10 ? '0' : ''}${this.horas}:${this.minutos < 10 ? '0' : ''}${this.minutos}:${this.segundos < 10 ? '0' : ''}${this.segundos}</h3>`;

            this.cronometro.innerHTML = `<h3>${this.horas < 10 ? '0' : ''}${this.horas}:${this.minutos < 10 ? '0' : ''}${this.minutos}:${this.segundos < 10 ? '0' : ''}${this.segundos}</h3>`;
        }
        if (this.minutos < this.tiempoLimite) {//con este cronometro controlo cuando aumentar la dificultad  
            this.tiempoLimite = this.minutos;//logica para que el tiempo limite se vaya decrementando cada 1 minuto
           // partida.aumentarDificultad();
        }
    }
    getRunning() {
        return this.isRunning;
    }
    setRunning(valor){
        this.isRunning=valor;
    }
    seAgotoElTiempo() {//un simple booleano para saber cuando se termino el tiempo
        if (this.minutos == 0 && this.segundos == 0) {
            return true;
        }
        return false;
    }
    getTiempo(){
        return this.tiempoC;
    }
    addTiempo(){
        console.log("incremente el tiempo "+this.minutos)

        this.minutos+=1;
        console.log("incremente el tiempo "+this.minutos)

    }
   
}
