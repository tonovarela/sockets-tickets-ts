
//Refencias HTML
const lblPending = document.querySelector('#lbl-pending');

  async function loadTotalTicketsCount() {
    const pending = await fetch('/api/ticket/pending').then(res=>res.json());    
    lblPending.innerHTML = pending.tickets.length;
  }

  loadTotalTicketsCount();
  connectToWebSockets();





  function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( message ) => {
    //On-ticket-count-change    
    const {type,payload}= JSON.parse(message.data);
    if (type === 'on-newTicket') {        
         loadTotalTicketsCount();
    }        
  };

  socket.onclose = ( event ) => {
    console.log( 'Connection closed' );
    setTimeout( () => {
      console.log( 'retrying to connect' );
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}

