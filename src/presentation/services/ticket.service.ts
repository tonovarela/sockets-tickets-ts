import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/tickets";

export class TicketService {

    public readonly tickets: Ticket[] = [
        {
            id: UuidAdapter.v4(),
            number: 1,
            createAt: new Date(),
            done: false
        },
        {
            id: UuidAdapter.v4(),
            number: 2,
            createAt: new Date(),
            done: false
        },
        {
            id: UuidAdapter.v4(),
            number: 3,
            createAt: new Date(),
            done: false
        },
        {
            id: UuidAdapter.v4(),
            number: 4,
            createAt: new Date(),
            done: false
        },
        {
            id: UuidAdapter.v4(),
            number: 5,
            createAt: new Date(),
            done: false
        },
        {
            id: UuidAdapter.v4(),
            number: 6,
            createAt: new Date(),
            done: false
        },
        {
            id: UuidAdapter.v4(),
            number: 1,
            createAt: new Date(),
            done: false
        },
    ];

    private readonly workingOnTickets: Ticket[] = [];

    
    public get lastWorkingOnTickets(): Ticket[] {
        return this.workingOnTickets.splice(0, 4);
    }

    public get pendingTickets(): Ticket[] {
        return this.tickets.filter(ticket => !ticket.handleAtDesk);
    }

    public  get lastTicketNumber(): number {
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
    }

    public createTicket():Ticket {
        const ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTicketNumber + 1,
            createAt: new Date(),
            done: false
        };
        this.tickets.push(ticket);
        return ticket;
        //Notificar que hay un nuevo ticket
    }

    public drawTicket(desk: string) {
        const ticket = this.tickets.find(ticket => !ticket.handleAtDesk);
        if (!ticket)
            return { status: 'error', message: "No hay tickets disponibles" };
        const ticketAsignedPrevius =this.workingOnTickets.find(t=>t.handleAtDesk==desk && t.done==false)
        if (ticketAsignedPrevius){
            return { status: 'error', message: `Ya se encuentra trabajando con el  en ticket ${ticketAsignedPrevius.number}` };        
        }
        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();
        this.workingOnTickets.unshift({ ...ticket });

        return { status: 'ok', ticket };
    }

    public onFinishedTicket(id: string) {
        const ticket = this.tickets.find(ticket => ticket.id === id);
        if (!ticket)
            return { status: 'error', message: "No existe el ticket" };
        ticket.done = true;
        return { status: 'ok', ticket };


    }

}