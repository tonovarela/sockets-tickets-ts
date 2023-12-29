import { Router } from "express";
import { TicketController } from "./controller";

export class TicketRoutes {
    static get routes() {
        const router = Router();
        const { list, getLast, create, draw, done, lastWorkingTickets, listPendings } = new TicketController();

        router.get("/", list);
        router.get("/last", getLast);
        router.get("/pending", listPendings);
        router.post("/", create);
        router.get("/draw/:desk", draw);
        router.put("/done/:ticketId", done);
        router.get('/last-working-tickets', lastWorkingTickets);

        return router;


    }
}