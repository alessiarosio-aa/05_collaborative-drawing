let socket = io(); // in questo modo stiamo caricando i socket su p5, prima dobbiamo caricarlo sull'html e poi qui
    // stiamo dicendo che i socket vengono dalla libreria socket.io caricata nell'html
    // ogni volta che apro una nuova finestra ho una new connection che hanno un id unico
    // qui stiamo solo creando una connessione in cui diciamo: quando questo sketch lavora sul computer del cliente carica la libreria socket.io
    // un messaggo di defaul viene mandato al server che si chiama connection. Il server qui sa cosa fare perchè glilo abbiamo detto nel file server.js

    // ora aggiungiamo la possibilità di vedere l'id del cliente non solo nel server ma anche nello sketch
socket.on("connect", newConnection); // così stiamo dicendo che quando c'è un messaggio chiamato connect ricevuto, va eseguita la funzione newConnection che definiamo ora
    // quando c'è una connessione (connect) al server, eseguiamo la funzione new connection

    // con i socket possiamo mandare messaggi differenti tra cliente e server

function newConnection() {
  console.log("my id: " + socket.id);
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
  ellipse(mouseX, mouseY, 20);
  
  let message = {   // stiamo creando il messaggio da mandare al server per renderlo visibile agli altri clienti
    x: mouseX,
    y: mouseY,
  };

  socket.emit("mouse", message); // in questo modo mandiamo un messaggio al server
}
