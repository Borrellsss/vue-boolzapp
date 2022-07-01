// BONUS:
// Milestone 5
// Cancella messaggio: cliccando sul messaggio appare
// un menu a tendina che permette di cancellare il
// messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto
// nella lista dei contatti

// MORE BONUSES:
// 1- predisporre una lista di frasi e/o citazioni da utilizzare al
// posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok",
// scegliere una frase random dalla lista e utilizzarla come
// testo del messaggio di risposta del pc 
// 2- dare la possibilità all'utente di cancellare tutti
// i messaggi di un contatto o di cancellare l'intera chat con tutti i
// suoi dati: cliccando sull'icona con i tre pallini in alto a destra,
// si apre un dropdown menu in cui sono presenti le voci
// "Elimina messaggi" ed "Elimina chat"; cliccando su di essi si
// cancellano rispettivamente tutti i messaggi di quel contatto
// (quindi rimane la conversazione vuota) oppure l'intera chat
// comprensiva di tutti i dati del contatto oltre che tutti i
// suoi messaggi (quindi sparisce il contatto anche dalla lista di sinistra)
// 3-cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio)
// finché l'utente sta scrivendo: di default si visualizza l'icona del microfono,
// quando l'input non è vuoto si visualizza l'icona dell'aeroplano. Quando il
// messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono.
// inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano
// 4-aggiungere le emoticons, tramite l'utilizzo di una libreria

// *aggiungo la possibilità di utilizzare le emoji*
Vue.use(EmojiPicker);
var app = new Vue(
    {
        el: "#root",
        data: {
            search: '',
            currentIndex: 0,
            currentMessageIndex: null,
            chatInfo: false,
            newMessage: "",
            filteredContact: "",
            singleRandomAnswer: "",
            randomAnswers: ["Ciao come stai?", "Hey!", "Ok!", "Sei uscita ieri sera?", "Ho finalmente preso il PC!", "Sono il risultato del Bonus del Bonus", "Non ho idea di cosa sto scrivendo", "Tutto ciò che scrivi non ha senso, sono una sotto-specie di intelligenza artificiale programmata da un ragazzo che a malapena sa scrivere in Javascript Vanilla, figuriamoci farlo in VueJs.", "Ecco a te un'altra risposta casuale, contento/a Debugger?"],
            contacts: [
                {
                    name: 'Edoardo',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'              
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Michele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Stella',
                    avatar: '_io',
                    visible: true,
                    messages: [
                        {
                            date: '01/07/2022 15:30:55',
                            text: 'Oggi è il mio ultimo giorno a Valencia...',
                            status: 'sent'
                        },
                        {
                            date: '01/07/2022 16:30:50',
                            text: 'Ah... Mi dispiace molto :(',
                            status: 'received'
                        }
                    ],
                },
            ]
        },
        methods: {
            showUserChat(thisIndex) {
                // *ogni volta che cambio chat riporto "chatInfo" a "false"*
                this.chatInfo = false;

                // *ogni volta che cambio chat riporto "currentMessageIndex" a "null"*
                this.currentMessageIndex = null;
                this.currentIndex = thisIndex;
            },
            sendNewMessage() {
                // *ogni volta che ivio un messaggio riporto "chatInfo" a "false"*
                // *e "currentMessageIndex" a "null"*
                this.chatInfo = false;
                this.currentMessageIndex = null;

                // *standardizzo il messaggio scritto dall'utente nella input*
                // *eliminando eventuali spazi all' inizio e alla fine della stringa*
                // *salvata nella variabile "newMessage" e salvo il risultato*
                // *nella variabile "trimmedMessages"*
                const trimmedMessages = this.newMessage.trim();

                const currentDate = new Date().toLocaleDateString('en-US');
                const currentHours = new Date().toLocaleTimeString('en-US');
                // *creo due nuovi "object": il primo con proprietà "text": "trimmedMessages"*
                // *che risulterà come messaggio inviato e quindi con propietà*
                // *"status": "sent"*
                const newMessageObject = {
                    date: `${currentDate} ${currentHours}`,
                    text: trimmedMessages,
                    status: "sent",
                    info: false
                };
                
                // *scorro l'array "randomAnswers" con un ciclo "for" e assegno a "singleRandomAnswer"*
                // *un elemento presente in "randomAnswers" con indice casuale ricavato dalla funzione "getRndInteger"*
                for(let i = 0; i < this.randomAnswers.length; i++) {
                    const randomIndex = this.getRndInteger(0, this.randomAnswers.length);
                    singleRandomAnswer = this.randomAnswers[randomIndex];
                };

                // *e il secondo con proprietà "text": "ok"*
                // *che risulterà come messaggio inviato e quindi con propietà*
                // *"status": "received"*
                const newReceivedMessage = {
                    date: `${currentDate} ${currentHours}`,
                    text: singleRandomAnswer,
                    status: "received",
                    info: false
                };

                // *se "trimmedMessages.length" è maggiore di "0" allora pusho "newMessageObject"*
                // *nell'array "messages" presente nell'"object" con indice "currentIndex" e*
                // *dopo un secondo pusho anche "newReceivedMessage" nello stesso array così*
                // *da simulare una risposta utilizzando un "setTimeout"* 
                if(trimmedMessages.length > 0) {
                    this.contacts[this.currentIndex].messages.push(newMessageObject);
                    setTimeout(() => {
                        this.contacts[this.currentIndex].messages.push(newReceivedMessage);
                    }, 1000);
                }

                // *al termine della funzione riporto il valore di "newMessage"*
                // *a stringa vuota così da svuotare anche la "textarea" nel "DOM"*
                // *ad essa collegata tramite "v-model"*
                this.newMessage = "";
            },
            filterContact() {
                // *inizializzo un ciclo "for" per ottentere il singolo*
                // *"object" presente nell'array "contacts"*
                for(let i = 0; i < this.contacts.length; i++) {
                    const thisObject = this.contacts[i];

                    // *converto sia "filteredContact" che "thisObject.name" in stringhe*
                    // *".toLowerCase()"*
                    const lowerFilteredContact = this.filteredContact.toLowerCase();
                    const lowerContactName = thisObject.name.toLowerCase();
                    
                    // *se "lowerContactName" include "lowerFilteredContact"*
                    // *"thisObject.visible" diventa "true" altrimenti diventa "false"*
                    if(lowerContactName.includes(lowerFilteredContact)) {
                        thisObject.visible = true;
                    } else {
                        thisObject.visible = false;
                    }
                }
            },
            showInfo(thisIndex) {
                // *al click sulla freccia che appare quando si è in ":hover"*
                // *sul messaggio riporto "chatInfo" a "false"*
                this.chatInfo = false;

                // *al click sulla freccia che appare quando si è in ":hover"*
                // *sul messaggio "currentMessageIndex" prende il valore di "thisIndex"*
                // *solo se "currentMessageIndex" è diverso da "thisIndex" altrimenti riporto*
                // *"currentMessageIndex" a "null"*
                if(this.currentMessageIndex !== thisIndex) {
                    this.currentMessageIndex = thisIndex;
                } else {
                    this.currentMessageIndex = null;
                }
            },
            deleteMessage() {
                // *al click su "delete message" elimino l'"object" dell'array*
                // *"messages" con indice corrispondente*
                this.contacts[this.currentIndex].messages.splice(this.currentMessageIndex, 1);
                
                // *ogni volta che elimino un messaggio riporto "currentMessageIndex" a "null"*
                this.currentMessageIndex = null;
            },
            getRndInteger(min, max) {
                return Math.floor(Math.random() * (max - min) ) + min;
            },
            showChatInfo() {
                // *ogni volta che clicco sull'elemento del DOM "chat-options" riporto "currentMessageIndex" a "null"*
                this.currentMessageIndex = null;

                // *al "click" su "chat-options" il valore della variabile "chatInfo"*
                // *diventa il contrario di se stesso: se è "false" diventa "true" e viceversa*
                this.chatInfo = !this.chatInfo;
            },
            deleteThisChat() {
                // *se l'"object" che sto eliminando è quello con l'ultimo indice dell'array "contacts"*
                // *lo elimino e decremento di 1 la variabile "currentIndex" altrimenti lo elimino e basta*
                if(this.contacts[this.currentIndex] === this.contacts[this.contacts.length - 1]) {
                    this.contacts.splice(this.currentIndex, 1);
                    this.currentIndex--;
                } else {
                    this.contacts.splice(this.currentIndex, 1);
                }         

                // *ogni volta che elimino una chat riporto "chatInfo" a "false"*
                this.chatInfo = false;
            },
            deleteAllMessages() {
                this.contacts[this.currentIndex].messages.splice(0, this.contacts[this.currentIndex].messages.length);
            
                // *ogni volta che elimino tutti i messaggi di una chat riporto "chatInfo" a "false"*
                this.chatInfo = false;
            },
            coloseAllMenus() {
                // *ogni volta che apro il menu delle emoji riporto "chatInfo"*
                // *a "false" e "currentMessageIndex" a "null"*
                this.chatInfo = false;
                this.currentMessageIndex = null;
            },
            append(emoji) {
                this.newMessage += emoji
            }
        },
        directives: {
            inserted(el) {
                el.focus()
            },
        },
        mounted() {
            
        },
    }
);