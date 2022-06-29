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
            newMessage: "",
            filteredContact: "",
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
                this.currentIndex = thisIndex;
            },
            sendNewMessage() {
                // *standardizzo il messaggio scritto dall'utente nella input*
                // *eliminando eventuali spazi all' inizio e alla fine della stringa*
                // *salvata nella variabile "newMessage" e salvo il risultato*
                // *nella variabile "trimmedMessages"*
                const trimmedMessages = this.newMessage.trim();

                // *creo due nuovi "object": il primo con proprietà "text": "trimmedMessages"*
                // *che risulterà come messaggio inviato e quindi con propietà*
                // *"status": "sent"*
                const newMessageObject = {
                    date: "29/06/2022 15:50:00",
                    text: trimmedMessages,
                    status: "sent"
                };

                // *e il secondo con proprietà "text": "ok"*
                // *che risulterà come messaggio inviato e quindi con propietà*
                // *"status": "received"*
                const newReceivedMessage = {
                    date: "29/06/2022 15:50:00",
                    text: "ok",
                    status: "received"
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
            }
        },
        mounted() {
            
        },
    }
);