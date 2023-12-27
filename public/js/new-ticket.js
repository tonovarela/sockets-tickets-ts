

const label = document.querySelector("span");
const createTicketBtn= document.querySelector("button");
async function getLastTicket() {
    const lastTicket = await fetch('/api/ticket/last').then(res => res.json());                
    label.innerText = lastTicket.ticket;
}
async function newTicket() {
    const newTicket = await fetch('/api/ticket', {
        method: 'POST',        
    }).then(res => res.json());
    
    label.innerText = newTicket.ticket.number; 
}

createTicketBtn.addEventListener('click', newTicket);

getLastTicket();
