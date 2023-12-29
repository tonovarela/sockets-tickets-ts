

async function getLastWorkingTickets() {
  const resp = await fetch('/api/ticket/last-working-tickets').then(res => res.json());
  renderTickets(resp.tickets);
}


function renderTickets(tickets = []) {
  console.log(tickets);
  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i];
    if (!ticket) {
      continue;
    }
    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`);
    lblTicket.innerText = `Ticket ${ticket.number}`;
    lblDesk.innerText = ticket.handleAtDesk;

  }
}
function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');
  socket.onmessage = (event) => { 
   const { type, payload } = JSON.parse(event.data);
   if (type === 'on-working-changed') {
     renderTickets(payload);
   }

   };
  socket.onclose = (event) => {
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);

  };

  socket.onopen = (event) => {
    console.log('Connected');
  };

}

connectToWebSockets();
getLastWorkingTickets();