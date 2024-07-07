import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from 'ws';

interface MessagePayload {
	event: string;
	text: string;
}

interface InfoPayload {
	event: string;
	totalClients: number;
}

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
	private logger: Logger = new Logger('SocketEventsGateway');
	private summaryCliet: number = 0;

	@WebSocketServer()
	server: Server;

	public afterInit(server: Server) {
		this.logger.verbose(`WebSocket Server initialized & total: ${this.summaryCliet}`);
	}

	handleConnection(client: WebSocket, ...args: any[]) {
		this.summaryCliet++;
		this.logger.verbose(`Connection & total: [${this.summaryCliet}]`);

		const infoMsg: InfoPayload = {
			event: 'info',
			totalClients: this.summaryCliet,
		};

		this.emitMessage(infoMsg);
	}

	handleDisconnect(client: WebSocket) {
		this.summaryCliet--;
		this.logger.verbose(`Disconnection & total: [${this.summaryCliet}]`);

		const infoMsg: InfoPayload = {
			event: 'info',
			totalClients: this.summaryCliet,
		};

		this.broadcastMessage(client, infoMsg);
	}

	@SubscribeMessage('message')
	public async handleMessage(client: any, payload: any): Promise<void> {
		const newMessage: MessagePayload = { event: 'message', text: payload };

		this.logger.verbose(`NEW MESSAGE: ${payload}`);
		this.emitMessage(newMessage);
	}

	private broadcastMessage(sender: WebSocket, message: InfoPayload | MessagePayload) {
		this.server.clients.forEach((client) => {
			if (client !== sender && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	}

	private emitMessage(message: InfoPayload | MessagePayload) {
		this.server.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	}
}
