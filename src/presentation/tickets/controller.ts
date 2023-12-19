import { Request, Response } from "express";
export class TicketController {
    // Wss Service
    constructor() {

    }

    public list = (req: Request, res: Response) => {
        res.json({ message: "Get tickets" });
    }
    public getLast = (req: Request, res: Response) => {
        res.json({ message: "Get last ticket" });
    }
    public listPendings = (req: Request, res: Response) => {
        res.json({ message: "Get pending tickets" });
    }
    public create = (req: Request, res: Response) => {
        res.json({ message: "Create ticket" });
    }
    public draw = (req: Request, res: Response) => {
        res.json({ message: "Draw ticket" });
    }
    public done = (req: Request, res: Response) => {
        res.json({ message: "Done ticket" });
    }
    public workingOn = (req: Request, res: Response) => {
        res.json({ message: "Working on ticket" });
    }
}