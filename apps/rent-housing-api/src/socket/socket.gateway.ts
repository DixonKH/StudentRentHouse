import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
	private logger: Logger = new Logger('SocketEventsGateway');
	private summaryCliet: number = 0;
	public afterInit(server: Server) {
		this.logger.log(`WebSocket Server initialized total: ${this.summaryCliet}`);
	}

	handleConnection(client: WebSocket, ...args: any[]) {
		this.summaryCliet++;
		this.logger.log(`== Client connected total: ${this.summaryCliet} ==`);
	}

	handleDisconnect(client: WebSocket) {
		this.summaryCliet--;
		this.logger.log(`== Client disconnected left total: ${this.summaryCliet} ==`);
	}

	@SubscribeMessage('message')
	handleMessage(client: any, payload: any): string {
		return 'Hello world!';
	}
}
