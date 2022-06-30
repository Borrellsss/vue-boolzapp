// BONUS:
// Milestone 5
// Cancella messaggio: cliccando sul messaggio appare
// un menu a tendina che permette di cancellare il
// messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto
// nella lista dei contatti
var app = new Vue(
    {
        el: "#root",
        data: {
            currentIndex: 0,
            currentMessageIndex: null,
            newMessage: "",
            filteredContact: "",
            singleRandomAnswer: "",
            randomAnswers: ["Ciao come stai?", "Hey!", "Ok!", "Sei uscita ieri sera?", "Ho finalmente preso il PC!", "Sono il risultato del Bonus del Bonus", "Non ho idea di cosa sto scrivendo", "Tutto ciò che scrivi non ha senso, sono una sotto-specie di intelligenza artificiale programmata da un ragazzo che a malapena sa scrivere in Javascript Vanilla, figuriamoci farlo in VueJs.", "Ecco a te un'altra risposta casuale, contento/a Debugger?"],
            contacts: [
                {
                    name: 'Michele',
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
                    name: 'Samuele',
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
            ]
        },
        methods: {
            showUserChat(thisIndex) {
                // *ogni volta che cambio chat riporto "currentMessageIndex" a "null"*
                this.currentMessageIndex = null;
                this.currentIndex = thisIndex;
            },
            sendNewMessage() {
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
        },
        mounted() {
            
        },
    }
);