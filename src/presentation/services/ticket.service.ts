import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/tickets";
import { WssService } from "./wss.services";

export class TicketService {
    constructor(private readonly wsService = WssService.instance) {

    }

     readonly tickets: Ticket[] = [];
    public get lastWorkingOnTickets(): Ticket[] {
        return this.tickets.splice(0, 4);
    }

    public get pendingTickets(): Ticket[] {
        return this.tickets.filter(ticket => !ticket.handleAtDesk);
    }



    public get lastTicketNumber(): number {
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
    }

    public createTicket(): Ticket {
        const ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTicketNumber + 1,            
            handleAtDesk:undefined,
            createAt: new Date(),            
            done: false
        };
        this.tickets.push(ticket);
        this.onTicketNumberChanged();
        return ticket;        
    }

    public drawTicket(desk: string) {
        const ticket = this.tickets.find(ticket => !ticket.handleAtDesk);
        if (!ticket)
            return { status: 'error', message: "No hay tickets disponibles" };
        const ticketAsignedPrevius = this.tickets.find(t => t.handleAtDesk == desk && t.done == false)
        console.log(ticketAsignedPrevius)
        if (ticketAsignedPrevius) {
            return { status: 'error', ticket: ticketAsignedPrevius, message: `Ya se encuentra trabajando con el  en ticket ${ticketAsignedPrevius.number}` };
        }
        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();
        this.tickets.unshift({ ...ticket });
        this.onTicketNumberChanged();
        return { status: 'ok', ticket };
    }

    public onFinishedTicket(id: string) {
        const ticket = this.tickets.find(ticket => ticket.id === id);
        console.log(ticket)
        if (!ticket)
            return { status: 'error', message: "No existe el ticket" };

        this.tickets.map(t => {
            if (t.id === id) {
                t.done = true;
            }
            return t;
        })            
        return { status: 'ok' };


    }

    private onTicketNumberChanged() {
        this.wsService.sendMessage('on-ticketNumberChanged', this.pendingTickets.length);
    }

}