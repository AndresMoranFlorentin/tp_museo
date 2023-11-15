
/**Musica para el juego */
let etiquetaAudio = null;
let music = document.getElementById("playMusic").addEventListener("click", () => {
  if (etiquetaAudio == null) {
    etiquetaAudio = document.createElement("audio")
    etiquetaAudio.setAttribute("src", "audio/Battleship.mp3");
    etiquetaAudio.volume = 0.1;
    etiquetaAudio.play();
  }
  else {
    etiquetaAudio.pause();
    etiquetaAudio = null;
  }
});
/**Seccion para controlar el mostrar o quitar las instrucciones del juego */
let botonInfo = document.getElementById("instrucciones_game");
let infoInstrucciones = document.getElementById("instrucciones");
let viewInst = false;
botonInfo.addEventListener("click", () => {
  infoInstrucciones.style.display = "block";//muestro las instrucciones
  menu.style.display = "none";//escondo el menu para que no moleste
})
//cuando toque el div de las instrucciones debe desaparecer y aparecer el menu
infoInstrucciones.addEventListener("click", () => {
  infoInstrucciones.style.display = "none";
  menu.style.display = "block";
})
/** aqui se inicia el juego y controlo el menu del juego */
let partida = null;
document.getElementById("play_juego").addEventListener("click", () => play());
let menu = document.getElementById("menu");
let informeJuego = document.getElementById("informe_juego");
let botonMusic = document.getElementById("playMusic");
let botonJuego = document.getElementById("play_juego");

function play() {
  if (partida == null) {
    partida = new Juego();
    menu.style.display = "none";
    partida.start();
  }
  function mostrarInforme(puntos, tiempo) {
    informeJuego.style.display = "block";
    botonJuego.style.marginTop = "12px";
    botonMusic.style.marginTop = "12px";
    botonInfo.style.marginTop = "12px";
     informeJuego.innerHTML = "<h1> ---------¡¡¡ GAME OVER !!!----</h1>" +
      "<h2> Puntos Acumulados: " + puntos + "<h2>" +
      "<h3> Tiempo de Juego____[ " + tiempo +" ] </h3>" +
      "<p> Tu tiempo de vida termino, consumiste las 3 vidas</p>";
  }
  //funcion recursiva que cada tanto tiempo pregunta el estado del juego, si perdio o sigue jugando
  function verificarFin() {
    let tiempo= partida.getTiempo();
    if (partida.finJuego() || partida.seAgotoElTiempo()) {//  partida.finJuego()
      let puntosGanados = partida.getPuntajeJuego();
      partida.finalizarPartida();
      menu.style.display = "block"; //una funcion para llamar al menu de volver a jugar, tal vez mostrar en un div?
      mostrarInforme(puntosGanados, tiempo);
      partida.stopCronometro();
      partida = null;
    } else {
      setTimeout(verificarFin, 200); // Vuelve a verificar cada 200 ms
    }
  }
  verificarFin();
}   
/**seccion para controlar el juego segun el teclado */
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case " "://tecla espacio
      partida.saltarJugador();
      break;
    case "ArrowDown"://por ahora no le hice la funcion de que pueda agacharse, aunque no le serviria de mucho
      partida.agachar();
      break;
    case "a":
      partida.disparar();
      break;
  }
})