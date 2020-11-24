console.log("node is running");

let express = require("express"); // stiamo caricando il codice del pacchetto chiamato express e lo mettiamo nella variabile chiamata express
    let socket = require("socket.io"); // iseriamo questa linea di codice qui perchè la posizione delle cose è importante
let app = express(); // qui invece creiamo una nuova variabile chiamata app che "attiva/esegue" il codice express
let port = 3000; // questa è il numero di porta che compare nell'url, sono numeri standard
let server = app.listen(port);
    // queste 4 linee di codice servono a creare il server

app.use(express.static("public")); // stiamo dicendo: app (che è l'istanza express) usa funzione di express chiamata static
    // (ovvero una cartella statica di file) e mettiamo public tra virgoletteperchè è il nome della cartella che abbiamo creato
    // abbiamo creato un server virtuale sul nostro computer e lo usiamo per mandare informazioni al nostro cliente (che è chiunque abbia l'url)

    // ora creeremo web sockets, ovvero daremo al cliente la possibilità di mandare informazioni al server e mandarle ad altri clienti
    // per farlo dobbiamo scaricare il pacchetto sockets.io scrivendo nel terminal: npm install socket.io --save
    // questo vuol dire npm (node package master) install name (nome del pacchetto che vogliamo installare) --save (il salva va messo ATTACCATO alle due --)

    // stiamo usando espress per configurare il server e i socket per mandare e ricercere messaggi dai clienti

let io = socket(server); // io sta per input e output, stiamo usando il pacchetto socket per mandare e ricevere messaggi dal cliente
    // con la variabile io sto abilitando il server a fare connessioni
    // i messaggi (socket) sono standard hanno un titolo e il contenuto. Quando un messaggio viene mandato o ricevuto viene detto evento (event)
    // quindi noi dobbiamo creare funzioni che reagiscono a specifici eventi

    // il messaggio standard che viene mandato quando un cliente si connette al server è intitolato connection (di default)
io.on("connection", newConnection); // on si riferisce al tipo di evento, ovverro in questo caso alla connessione ("connection") e il nome della funaione
    // che viene eseguita nel momento in cui questo messaggio viene eseguito
    // quando il messaggio connection viene ricevuto esegui la funzione newConnection
    // stiamo dicendo: quando c'è un messaggio che si chiama connection esegui la funzione chiamata newConnection che definiamo qui sotto

function newConnection(socket) { // mettiamo socket tra parentesi perchè diamo un nome per riconoscerlo, lo chiamiamo così perchè è il messaggio in arrivo
  console.log("new connection: " + socket.client.id);

    // ora dobbiamo dire al server: quando ricevi il messaggio mouse (che è nello skatch) fai qualcosa
  socket.on("mouse", mouseMessage) // stiamo dicendo che quando il server riceve il messaggio mouse deve eseguire la funzione mouseMessage

}

    // se avvio il server così non funziona perchè il socket va caricato anche sul computer del "cliente" per rendere la comunicazione possibile
    // però va caricato nello skatch che sarà caricato dal cliente

function mouseMessage(dataRecived) {
  console.log(dataRecived);
}

  // fino a qui abbiamo mandato messaggi solo tra un cliente e il server, ora dobbiamo far si che quello che riceve il server venga mandato a tutti gli altri clienti
