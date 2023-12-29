import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";
export class TicketController {
    // Wss Service
    constructor(private readonly ticketService: TicketService = new TicketService()) { }

    public list = (req: Request, res: Response) => {
        const tickets = this.ticketService.tickets
        res.json({ tickets });
    }
    public getLast = (req: Request, res: Response) => {
        res.json({ ticket: this.ticketService.lastTicketNumber });
    }
    public listPendings = (req: Request, res: Response) => {
        res.json({ tickets: this.ticketService.pendingTickets });
    }
    public create = (req: Request, res: Response) => {
        const newTicket = this.ticketService.createTicket();
        res.status(201).json({ ticket: newTicket });
    }
    public ticketFinished = (req: Request, res: Response) => {
        const { ticketId } = req.params;
        res.json({ ticket: this.ticketService.onFinishedTicket(ticketId) });
    }
    public draw = (req: Request, res: Response) => {
        const { desk } = req.params;
        const resp = this.ticketService.drawTicket(desk);
        res.json(resp );        
    }
    public done = (req: Request, res: Response) => {
        const { ticketId } = req.params;
        const ticket = this.ticketService.onFinishedTicket(ticketId);
        res.json({ ticket });
    }
    public lastWorkingTickets = (req: Request, res: Response) => {
        res.json({ tickets: this.ticketService.lastWorkingOnTickets });
    }
}