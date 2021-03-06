let socket = io(); // in questo modo stiamo caricando i socket su p5, prima dobbiamo caricarlo sull'html e poi qui
    // stiamo dicendo che i socket vengono dalla libreria socket.io caricata nell'html
    // ogni volta che apro una nuova finestra ho una new connection che hanno un id unico
    // qui stiamo solo creando una connessione in cui diciamo: quando questo sketch lavora sul computer del cliente carica la libreria socket.io
    // un messaggo di defaul viene mandato al server che si chiama connection. Il server qui sa cosa fare perchè glilo abbiamo detto nel file server.js

let myColor = "white"; // creiamo la variabile del colore

    // ora aggiungiamo la possibilità di vedere l'id del cliente non solo nel server ma anche nello sketch
socket.on("connect", newConnection); // così stiamo dicendo che quando c'è un messaggio chiamato connect ricevuto, va eseguita la funzione newConnection che definiamo ora
    // quando c'è una connessione (connect) al server, eseguiamo la funzione new connection

socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor); // nel momento in cui il socket riceve il messaggio chiamato color viene eseguita la funzione setColor
    // con i socket possiamo mandare messaggi differenti tra cliente e server

function setColor(assignedColor) { // setColor riceve il colore scelto dal server e poi aggiorniamo la nostra variabile myColor assegnandoli non più il colore bianco ma il colore assegnato dal server
  myColor = assignedColor;
}

function newConnection() {
  console.log("my id: " + socket.id);
}

function drawOtherMouse(data) {
  console.log(data);
  push();
  fill(data.color); // scrivendo così mandiamo i dati del colore
  ellipse(data.x, data.y, 20);
  pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background("pink");
}

function draw() {
  // put drawing code here
}

function mouseMoved() {
  push();
  fill(myColor);
  ellipse(mouseX, mouseY, 20);
  pop();

  let message = {   // stiamo creando il messaggio da mandare al server per renderlo visibile agli altri clienti
    x: mouseX,
    y: mouseY,
    color: myColor,
  };

  socket.emit("mouse", message); // in questo modo mandiamo un messaggio al server
}


    // abbiamo quindi 3 tipi di messaggi:
    // - il messaggio di connessione che il cliente manda al server e il serve manda insietro il messaggio di connessione (standard)
    // - un messaggio che va dal cliente al server (socket.emit("mouse", message), linea 47);
    // - un messaggio che va dal server a tutti i clienti connessi (il broadcast
    //   socket.broadcast.emit("mouseBroadcast", dataRecived) si trova nel doc server.js linea 47)

    // socket.io emit cheatsheet - qui possiamo trovare tutte le possibili connessioni tra cliente e server
