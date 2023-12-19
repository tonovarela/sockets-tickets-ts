import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

interface Options {
    server: Server;
    path?: string

}
export class WssService {
    private static _instance: WssService;
    private wss: WebSocketServer;

    private start() {
        this.wss.on('connection', (ws: WebSocket) => {
            ws.on('message', (message) => {
                console.log(message);
            });
        });
    }

    private constructor(options: Options) {
        const { server, path = "/ws" } = options;
        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    public static get instance(): WssService {
        if (!WssService._instance) {
            throw new Error("WssService is not initialized");
        }
        return WssService._instance;
    }

    public static initWss(options: Options): void {        
            WssService._instance = new WssService(options);
        
    }


}