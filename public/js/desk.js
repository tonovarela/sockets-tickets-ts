
//Refencias HTML
const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');
const searchParams = new URLSearchParams(window.location.search);
const lblCurrentTicket = document.querySelector('small');

const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');


let workingTicket = null;

async function getTicket() {

  const { status, message, ticket } = await fetch(`/api/ticket/draw/${numberDesk}`).then(res => res.json());
  workingTicket = ticket;
  if (status == "error") {
    lblCurrentTicket.innerHTML = message;;
    return;
  }
  lblCurrentTicket.innerHTML = ticket.number;

}

async function finishTicket() {
  if (!workingTicket) {
    return;
  }
  await fetch(`/api/ticket/done/${workingTicket.id}`, { method: 'PUT' }).then(res => res.json());
  lblCurrentTicket.innerHTML = "Nadie";
  workingTicket = null;
}


if (!searchParams.has('escritorio')) {
  window.location.href = 'index.html';
}
const numberDesk = searchParams.get('escritorio');
deskHeader.innerHTML = numberDesk;

function checkTicketCount(currentCount = 0) {
  if (currentCount > 0) {
    noMoreAlert.classList.add("d-none");
  } else {
    noMoreAlert.classList.remove("d-none");
  }
  lblPending.innerHTML = currentCount;
}

async function loadTotalTicketsCount() {
  const pending = await fetch('/api/ticket/pending').then(res => res.json());
  lblPending.innerHTML = pending.tickets.length;
  checkTicketCount(pending.tickets.length);
}
loadTotalTicketsCount();
connectToWebSockets();

function connectToWebSockets() {

  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (message) => {
    //on-newTicket  
    const { type, payload } = JSON.parse(message.data);
    if (type === 'on-ticketNumberChanged') {
      checkTicketCount(payload);
    }
  };

  socket.onclose = (event) => {
    console.log('Connection closed');
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);

  };

  socket.onopen = (event) => {
    console.log('Connected');
  };

}


btnDraw.addEventListener('click', getTicket);
btnDone.addEventListener('click', finishTicket);

